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

    const login = (email, password) => {
        // Mock login logic
        const registeredUsers = JSON.parse(localStorage.getItem('pharma_registered_users') || '[]');
        const foundUser = registeredUsers.find(u => u.email === email && u.password === password);

        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('pharma_user', JSON.stringify(foundUser));
            return { success: true };
        }

        // Fallback specific mock user if no registration exists yet (for easiness)
        if (email === 'demo@pharmacy.com' && password === 'demo123') {
            const demoUser = { name: 'Demo Pharmacist', email, role: 'PHARMACIST' };
            setUser(demoUser);
            localStorage.setItem('pharma_user', JSON.stringify(demoUser));
            // Auto-register this demo user so persistence works next time
            localStorage.setItem('pharma_registered_users', JSON.stringify([...registeredUsers, { ...demoUser, password }]));
            return { success: true };
        }

        return { success: false, message: 'Invalid email or password' };
    };

    const register = (userData) => {
        const registeredUsers = JSON.parse(localStorage.getItem('pharma_registered_users') || '[]');

        if (registeredUsers.find(u => u.email === userData.email)) {
            return { success: false, message: 'User already exists' };
        }

        const newUser = { ...userData, role: 'PHARMACIST', joined: new Date().toISOString() };
        const updatedUsers = [...registeredUsers, newUser];

        localStorage.setItem('pharma_registered_users', JSON.stringify(updatedUsers));

        // Auto login after register
        setUser(newUser);
        localStorage.setItem('pharma_user', JSON.stringify(newUser));

        return { success: true };
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
