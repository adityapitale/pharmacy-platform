import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check localStorage on mount
        const storedUser = localStorage.getItem('pharma_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
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

        if (data.success) {
            setUser(data.user);
            localStorage.setItem("pharma_user", JSON.stringify(data.user));
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

        if (data.success) {
            const loggedUser = { ...userData, role: "PHARMACIST" };
            setUser(loggedUser);
            localStorage.setItem("pharma_user", JSON.stringify(loggedUser));
        }

        console.log("REGISTER RESPONSE:", data);

        return data;
        } catch (err) {
        return { success: false, message: "Server error" };
        }
    };


    const logout = () => {
        setUser(null);
        localStorage.removeItem('pharma_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
