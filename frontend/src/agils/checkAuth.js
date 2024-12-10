import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://localhost:5000/auth/verifyToken', {
                    method: 'GET',
                    credentials: 'include'
                });
                if (response.ok) {
                  const data = await response.json();
                  console.log('User info:', data);
                    setIsLoggedIn(true);
                    setUserInfo(data.userInfo);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error checking auth:', error);
                setIsLoggedIn(false);
            }
            finally {
               setIsLoading(false);
           }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userInfo, setUserInfo, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};