"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstanceUtility from "../utils/axiosInstanceUtility";
import { toast } from "sonner";

interface AuthContextType {
    isLoading: boolean;
    user: any;
    isAuthenticated: boolean;
    register: (data: any) => Promise<any>;
    registerWithGoogle: (credential: string) => Promise<any>;
    login: (data: any) => Promise<any>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    const checkAuth = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstanceUtility.get("/user/profile");
            setUser(response.data.user);
            setIsLoading(false);
        } catch (error) {
            console.log("Not authenticated");
            setUser(null);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const register = async (data: any) => {
        try {
            setIsLoading(true);
            const response = await axiosInstanceUtility.post("/user/register", data);
            setUser(response.data.user);
            setIsLoading(false);
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            toast.error((error as any).response.data.errorMessage);
            return {};
        }
    };

    const registerWithGoogle = async (credential: string) => {
        try {
            setIsLoading(true);
            const response = await axiosInstanceUtility.post(
                "/user/loginAndRegisterWithGoogle",
                { credential, clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID }
            );
            setUser(response.data.user);
            setIsLoading(false);
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            setIsLoading(false);
            toast.error((error as any).response.data.errorMessage || "Google Auth Failed");
            console.log(error);
            return {};
        }
    };

    const login = async (data: any) => {
        try {
            setIsLoading(true);
            const response = await axiosInstanceUtility.post("/user/login", data);
            setUser(response.data.user);
            setIsLoading(false);
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            setIsLoading(false);
            toast.error((error as any).response.data.errorMessage);
            console.log(error);
            return {};
        }
    };

    const logout = async () => {
        try {
            await axiosInstanceUtility.get("/user/logout");
            setUser(null);
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error((error as any).response.data.errorMessage);
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                user,
                isAuthenticated: !!user,
                register,
                registerWithGoogle,
                login,
                logout,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};