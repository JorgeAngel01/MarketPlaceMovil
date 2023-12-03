import React, { useEffect, useState } from "react";
import { createContext } from "react";
import * as SecureStore from "expo-secure-store";
import { handleShowError } from "../helpers/handleShowError";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useApi, { authenticate, getUsuario } from "./services/useApi";
import {
  handleDeleteSecureStore,
  handleGetSecureStore,
  handleSecureStore,
} from "../helpers/handleSecureStore";
import { notEmptyOrNullValidator } from "../helpers/handleValidator";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: (username, password) => authenticate(username, password),
    onSuccess: async (data, variables, context) => {
      console.log("data", data);
      console.log("variables", variables);
      console.log("context", context);
      if (data.token) {
        handleSecureStore("authToken", data.token);
        setToken(data.token);
        handleSecureStore("user", variables.username);
        setUser(variables.username);
        setIsAuthenticated(true);
      }
    },
    onError: (error) => {
      console.log(error);
      handleShowError("There was an error logging in.");
    },
  });

  const handleLogin = async (username, password) => {
    try {
      await login.mutateAsync({ username, password });
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleLogout = async () => {
    let token = await handleGetSecureStore("authToken");
    if (token) {
      setUser(null);
      setIsAuthenticated(false);
      await handleDeleteSecureStore("authToken");
    }
  };
  
  const register = useMutation({
    mutationFn: (username, email, first_name, last_name, password) =>
    register(username, email, first_name, last_name, password),
    onSuccess: async (data, variables, context) => {},
    onError: (error) => {
      console.log(error);
      handleShowError("There was an error registering the user.");
    },
  });
  
  const handleRegister = async ({
    username,
    email,
    first_name,
    last_name,
    password,
    confirmPassword,
  }) => {
    try {
      if (
        !notEmptyOrNullValidator(
          username,
          email,
          first_name,
          last_name,
          password
          )
          ) {
            throw new Error("Por favor, complete todos los campos.");
          }
          
          if (password !== confirmPassword) {
            throw new Error("Las contraseñas no coinciden.");
          }
          const response = await register.mutateAsync({
            username,
            email,
            first_name,
            last_name,
            password,
            confirmPassword,
          });
          
          return response;
        } catch (error) {
          console.error(error);
          throw error;
        }
      };
      
      const getUser = async () => {
        let token = await handleGetSecureStore("authToken");
        let user = await handleGetSecureStore("user");
        if (token) {
          setIsAuthenticated(true);
          setUser(token.user);
        }
        if (user) {
          setUser(user);
        }
      };
      
      useEffect(() => {
        getUser();
      }, []);

      const userName = user;
      console.log("UserName: ", userName);

      const userData = useQuery({
        queryKey: ["user", userName],
        queryFn: () => getUsuario(userName),
      });
    
      useEffect(() => {
        if (userData.isSuccess) {
          // Ensure userData.data is not null or undefined
          if (userData.data && userData.data.user_id) {
            setUserId(userData.data.user_id);
            console.log("UserId: ", userId);
          } else {
            // Log an error or handle the case where userData.data is not as expected
            console.error("User data is missing or does not have an 'id' property:", userData.data);
          }
        }
      }, [userData.isSuccess, userData.data]);

      const values = {
        user,
        userId,
        token,
        isAuthenticated,
        handleLogin,
        handleLogout,
        handleRegister,
      };
      
      return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
    };
    
    export { AuthContext, AuthProvider };
