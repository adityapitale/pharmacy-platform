import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage on mount
    const storedUser = localStorage.getItem("pharma_user");
    const storedStatus = localStorage.getItem("pharma_verification_status");

    if (storedUser) {
      setUser({
        ...JSON.parse(storedUser),
        verificationStatus: storedStatus || "APPROVED", // Default to APPROVED for existing demo users
      });
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (data.success) {
        // Check if specific verification status exists for this email
        // In a real app, this comes from backend. For demo, we persist it or default to 'APPROVED'
        let status =
          localStorage.getItem(`status_${data.user.email}`) || "APPROVED";

        // For demo purposes: If it's the specific "new user" flow we are testing
        // we might want to force NEW. But for general login, assume APPROVED unless specified.

        const userWithStatus = { ...data.user, verificationStatus: status };
        setUser(userWithStatus);

        // save token
        localStorage.setItem("pharma_token", data.token);

        // save user also
        localStorage.setItem("pharma_user", JSON.stringify(data.user));
        localStorage.setItem("pharma_verification_status", status);
      }

      return data;
    } catch (err) {
      return { success: false, message: "Server error" };
    }
  };

  const register = async (userData) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      console.log("REGISTER RESPONSE:", data);

      if (data.success) {
        setUser(data.user);

        // optional if backend sends token
        if (data.token) {
          localStorage.setItem("pharma_token", data.token);
        }

        // NEW USER -> Status = NEW
        // We use email-specific key to simulate persistent status for this user
        const initialStatus = "NEW";
        localStorage.setItem(`status_${data.user.email}`, initialStatus);
        localStorage.setItem("pharma_verification_status", initialStatus);

        const userWithStatus = {
          ...data.user,
          verificationStatus: initialStatus,
        };
        setUser(userWithStatus);
        localStorage.setItem("pharma_user", JSON.stringify(data.user));
      }

      return data;
    } catch (err) {
      return { success: false, message: "Server error" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pharma_user");
    localStorage.removeItem("pharma_token");
    localStorage.removeItem("pharma_verification_status");
  };

  const submitOnboarding = () => {
    if (!user) return;

    // BACKEND INTEGRATION:
    // 1. Upload files to S3/Cloudinary
    // 2. Call API to update user status to 'PENDING'
    // 3. Trigger admin notification email

    const newStatus = "PENDING";
    // Update state
    setUser((prev) => ({ ...prev, verificationStatus: newStatus }));

    // Update storage
    localStorage.setItem("pharma_verification_status", newStatus);
    localStorage.setItem(`status_${user.email}`, newStatus);
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
