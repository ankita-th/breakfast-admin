import { cleanFilters } from "../utils/helpers";
import { authAxios, authorizeAxios, authorizeFileInstance } from "./apiConfig";
import { GET_PRODUCT_ENDPOINT, PRODUCT_ENDPOINT } from "./endpoints";

export const login = (payload) => {
  return authAxios.post("/login/", payload);
};

//  products flow
export const getProducts = (filters) => {
  // for removing filter keys from an object whose values are empty and further implementing encodingURIComponent
  const cleanedFilters = cleanFilters(filters);
  return authorizeAxios.get(GET_PRODUCT_ENDPOINT, { params: cleanedFilters });
};

export const bulkActionProduct = (payload) => {
  const { status } = payload;
  if (status === "delete") {
    return authorizeAxios.delete("/bulk-product-update/", { data: payload });
  } else if (status === "draft") {
    return authorizeAxios.patch("/bulk-product-update/", payload);
  } else if (status === "duplicate") {
    delete payload?.status;
    return authorizeAxios.post("/duplicate-product/", payload);
  }
};

export const deleteProduct = (id) => {
  console.log("delete product id", id);
  return authorizeAxios.delete(`/products/${id}/`);
};

export const addProduct = (payload) => {
  console.log("add product payload", payload);
  return authorizeAxios.post(`/products/`, payload);
};

export const METHODS = {
  get: "GET",
  post: "POST",
  put: "PUT",
  patch: "PATCH",
  delete: "DELETE",
};

export const INSTANCE = {
  authorized: "authorized",
  auth: "auth",
  formInstance: "formInstance",
};

export const makeApiRequest = async ({
  endPoint,
  method,
  params,
  payload,
  instanceType = INSTANCE.authorized,
  delete_id,
  update_id,
}) => {
  try {
    let API_INSTANCE = null;
    if (instanceType === INSTANCE.auth) {
      API_INSTANCE = authAxios;
    } else if (instanceType === INSTANCE.formInstance) {
      API_INSTANCE = authorizeFileInstance;
    } else {
      API_INSTANCE = authorizeAxios;
    }

    switch (method) {
      case METHODS.get: {
        let cleanedParams;
        // for removing empty key value pairs and for encoding
        if (params) {
          cleanedParams = cleanFilters(params);
        }
        const config = params ? { params: { ...cleanedParams } } : {};
        return await API_INSTANCE.get(endPoint, config);
      }

      case METHODS.post: {
        return await API_INSTANCE.post(endPoint, payload);
      }

      case METHODS.put: {
        return await API_INSTANCE.put(endPoint + update_id + "/", payload);
      }

      case METHODS.patch: {
        return await API_INSTANCE.patch(endPoint + update_id + "/", payload);
      }

      case METHODS.delete: {
        return await API_INSTANCE.delete(`${endPoint}${delete_id}/`);
      }

      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  } catch (error) {
    console.error(`API call failed: ${error}`);
    throw error;
  }
};

// export const BASE_URL= "http://192.168.1.128:8005/"
