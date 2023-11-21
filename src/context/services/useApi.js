import React from "react";
import { handleShowError } from "../../helpers/handleShowError";

export const authenticate = async ({ username, password }) => {
  console.log("authenticate " + username + password);

  const response = await fetch(`https://marketplace-ylae.onrender.com/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();

  if (response.status === 400) {
    if (data.non_field_errors) {
      handleShowError(data.non_field_errors[0]);
      return data;
    }
    if (data.username) {
      handleShowError(data.username[0]);
      return data;
    }
    if (data.password) {
      handleShowError(data.password[0]);
      return data;
    }
  }
  return data;
};

export const register = async ({
  username,
  email,
  first_name,
  last_name,
  password,
}) => {
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
  return data;
};

export const getUsuarios = async () => {
  const response = await fetch(`https://marketplace-ylae.onrender.com/usuarios/`);
  const data = await response.json();
  return data;
}

export const getUsuario = async (username) => {
  const response = await fetch(`https://marketplace-ylae.onrender.com/usuario/${username}/`);
  const data = await response.json();
  return data;
}

export const getProductos = async () => {
  const response = await fetch(`https://marketplace-ylae.onrender.com/productos/`);
  const data = await response.json();
  return data;
}

export const getProveedores = async (username) => {
  const response = await fetch(`https://marketplace-ylae.onrender.com/proveedores/`);
  const data = await response.json();
  return data;
}

export const getRestaurantes = async () => {
  const response = await fetch(`https://marketplace-ylae.onrender.com/restaurantes/`);
  const data = await response.json();
  return data;
}

export const getReviews = async () => {
  const response = await fetch(`https://marketplace-ylae.onrender.com/reviews/`);
  const data = await response.json();
  return data;
}
