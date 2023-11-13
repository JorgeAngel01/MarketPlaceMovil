import React, { useEffect, useState } from "react";
import { createContext } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function storeToken(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async function getToken(key) {
    return await SecureStore.getItemAsync(key);
  }

  const handleLogin = async (username, password) => {
    try {
      // Authenticate user through API
      const response = await fetch(`https://marketplace-ylae.onrender.com/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // Store token in secure storage if successful
      const data = await response.json();

      if (data.token) {
        await storeToken("token", data.token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const getUser = async () => {
    let token = await getToken("token");
    if (token) {
      setIsAuthenticated(true);
      setUser(token.user);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const values = {
    user,
    isAuthenticated,
    handleLogin,
    handleLogout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
