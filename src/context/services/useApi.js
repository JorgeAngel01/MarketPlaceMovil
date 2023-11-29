import React from "react";
import { handleShowError } from "../../helpers/handleShowError";
import { handleGetSecureStore } from "../../helpers/handleSecureStore";

const getAuthHeaders = async () => {
  const token = await handleGetSecureStore("token");
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`,
    },
  };
};

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
  const response = await fetch(
    `https://marketplace-ylae.onrender.com/usuarios/`,
    await getAuthHeaders()
  );
  const data = await response.json();
  return data;
};
};

export const getUsuario = async ({ username }) => {
  const response = await fetch(
    `https://marketplace-ylae.onrender.com/usuario/${username}/`,
    await getAuthHeaders()
  );
  const data = await response.json();
  return data;
};
};

export const getProductos = async () => {
  const response = await fetch(
    `https://marketplace-ylae.onrender.com/productos/`,
    await getAuthHeaders()
  );
  const data = await response.json();
  return data;
};

export const getCategoriasProductos = async () => {
  const response = await fetch(
    `https://marketplace-ylae.onrender.com/productos/categorias`,
    await getAuthHeaders()
  );
  const data = await response.json();
  return data;
};
};

export const getProductosProveedor = async (id) => {
  const response = await fetch(
    `https://marketplace-ylae.onrender.com/productos_proveedor/${id}`,
    await getAuthHeaders()
  );

  const data = await response.json();
  return data;
};

export const getProductosRestaurante = async (id) => {
  const response = await fetch(
    `https://marketplace-ylae.onrender.com/productos_restaurante/${id}`,
    await getAuthHeaders()
  );
  const data = await response.json();
  console.log(data);
  return data;
};

export const getProveedores = async () => {
  const response = await fetch(
    `https://marketplace-ylae.onrender.com/proveedores/`,
    await getAuthHeaders()
  );
  const data = await response.json();
  return data;
};

export const getCategoriasProveedor = async () => {
  const response = await fetch(
    `https://marketplace-ylae.onrender.com/proveedores/categorias`,
    await getAuthHeaders()
  );
  const data = await response.json();
  return data;
};

export const getRestaurantes = async () => {
  const response = await fetch(
    `https://marketplace-ylae.onrender.com/restaurantes/`,
    await getAuthHeaders()
  );

  const data = await response.json();
  return data;
};

export const getCategoriasRestaurante = async () => {
  const response = await fetch(
    `https://marketplace-ylae.onrender.com/restaurantes/categorias`,
    await getAuthHeaders()
  );
  const data = await response.json();
  return data;
};
};

export const getReviews = async () => {
  const response = await fetch(
    
    `https://marketplace-ylae.onrender.com/reviews/`,
    await getAuthHeaders()
  
  );
  const data = await response.json();
  return data;
};

export const getUserOrdenes = async (username, latest = false) => {
  const token = await handleGetSecureStore("token");
  const url = `https://marketplace-ylae.onrender.com/ordenes/${username}${
    latest ? "?latest=true" : ""
  }`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const getItemsOrden = async (id) => {
  const token = await handleGetSecureStore("token");
  const url = `https://marketplace-ylae.onrender.com/items_orden/?orden_id=${id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
};
