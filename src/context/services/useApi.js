import React from "react";
import { handleShowError } from "../../helpers/handleShowError";
import { handleGetSecureStore } from "../../helpers/handleSecureStore";

const getAuthHeaders = async () => {
  const token = await handleGetSecureStore("authToken");
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


export const getUsuario = async (username) => {
  const response = await fetch(
    `https://marketplace-ylae.onrender.com/usuario/${username}`,
    await getAuthHeaders()
  );
  const data = await response.json();
  return data;
};


export const getProductos = async (id) => {
  const response = await fetch(
    `https://marketplace-ylae.onrender.com/productos/${id}`,
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


export const getReviews = async () => {
  const response = await fetch(
    
    `https://marketplace-ylae.onrender.com/reviews/`,
    await getAuthHeaders()
  
  );
  const data = await response.json();
  return data;
};

export const getUserOrdenes = async (username, latest = false) => {
  const token = await handleGetSecureStore("authToken");
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
  const token = await handleGetSecureStore("authToken");
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

export const createOrden = async (cliente) => {
  const token = await handleGetSecureStore("authToken");
  const url = `https://marketplace-ylae.onrender.com/ordenes/`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ cliente }),
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export const createItemOrden = async (dataItem) => {
  const { orden, producto, cantidad } = dataItem;

  const token = await handleGetSecureStore("authToken");
  const url = `https://marketplace-ylae.onrender.com/items_ordenes/?username=${dataItem.user}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ orden, producto, cantidad }),
  });
  const data = await response.json();
  return data;
};

export const updateItemOrdenQuantity = async (data) => {
  const token = await handleGetSecureStore("authToken");
  const url = `https://marketplace-ylae.onrender.com/items_ordenes/${data.id}/`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ cantidad: data.cantidad }),
  });
  const responseData = await response.json();
  return responseData;
}

export const deleteItemOrden = async (data) => {
  const token = await handleGetSecureStore("authToken");
  const url = `https://marketplace-ylae.onrender.com/items_ordenes/${data.id}/`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  const responseData = await response.json();
  return responseData;
}

export const updateOrdenStatus = async (data) => {
  console.log("updateOrdenStatus " + data.id + " " + data.estado);
  const token = await handleGetSecureStore("authToken");
  const url = `https://marketplace-ylae.onrender.com/ordenes/${data.id}/`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ estado: data.estado }),
  });
  const responseData = await response.json();
  return responseData;
}
