import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // CHECK USER ON REFRESH
  useEffect(() => {
    const storedUser = localStorage.getItem("pharma_user");
    const token = localStorage.getItem("pharma_token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  // LOGIN
  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!data.success) return data;

      localStorage.setItem("pharma_token", data.token);

      // GET STATUS FROM SUPABASE
      const { data: profile } = await supabase
        .from("profiles")
        .select("verification_status")
        .eq("id", data.user.id)
        .single();

      const userWithStatus = {
        ...data.user,
        verificationStatus: profile?.verification_status || "not_submitted",
      };

      localStorage.setItem("pharma_user", JSON.stringify(userWithStatus));
      setUser(userWithStatus);

      return { success: true };
    } catch {
      return { success: false, message: "Server error" };
    }
  };

  // REGISTER
  const register = async (userData) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (!data.success) return data;

      if (data.token) {
        localStorage.setItem("pharma_token", data.token);
      }

      // CREATE PROFILE
      await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: userData.name,
        role: "pharmacist",
        verification_status: "not_submitted",
      });

      const userWithStatus = {
        ...data.user,
        verificationStatus: "not_submitted",
      };

      localStorage.setItem("pharma_user", JSON.stringify(userWithStatus));
      setUser(userWithStatus);

      return { success: true };
    } catch {
      return { success: false, message: "Server error" };
    }
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("pharma_user");
    localStorage.removeItem("pharma_token");
  };

  // AFTER DOCUMENT SUBMISSION
  const submitOnboarding = async () => {
    if (!user) return;

    await fetch("http://localhost:5000/api/profile/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id }),
    });

    const updatedUser = {
      ...user,
      verificationStatus: "pending",
    };

    localStorage.setItem("pharma_user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isLoading, submitOnboarding }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);