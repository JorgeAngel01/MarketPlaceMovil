import React, { useEffect, useState } from "react";
import { createContext } from "react";
import * as SecureStore from "expo-secure-store";
import { handleShowError } from "../helpers/handleShowError";

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
      if (username === "" || password === "") {
        handleShowError("Por favor, ingrese su usuario y contraseña.");
        return;
      }

      // Authenticate user through API
      const response = await fetch(
        `https://marketplace-ylae.onrender.com/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      console.log(JSON.stringify({ username, password }));

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Store token in secure storage if successful
        if (data.token) {
          await storeToken("token", data.token);
          setIsAuthenticated(true);
        }
      } else if (response.status === 400) {
        handleShowError("Usuario o contraseña incorrectos.");
      } else {
        handleShowError("Ha ocurrido un error. Por favor, intente nuevamente.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    let token = getToken("token");
    if (token) {
      setUser(null);
      setIsAuthenticated(false);
      SecureStore.deleteItemAsync("token");
    }
  };

  const handleRegister = async (
    username,
    email,
    first_name,
    last_name,
    password,
    confirmPassword
  ) => {
    try {
      if (
        username === "" ||
        email === "" ||
        first_name === "" ||
        last_name === "" ||
        password === "" ||
        confirmPassword === ""
      ) {
        handleShowError("Por favor, complete todos los campos.");
        return;
      }

      if (password !== confirmPassword) {
        handleShowError("Las contraseñas no coinciden.");
        return;
      }

      const response = await fetch(
        `https://marketplace-ylae.onrender.com/registro/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            first_name,
            last_name,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          await storeToken("token", data.token);
          setIsAuthenticated(true);
        }
      } else if (response.status === 400) {
        handleShowError("Alguno de los datos ingresados es incorrecto.");
      } else {
        handleShowError("Ha ocurrido un error. Por favor, intente nuevamente.");
      }
    } catch (error) {
      console.log(error);
    }
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
    handleRegister,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
