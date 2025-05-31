import axiosInstance from "./service";

export const create = async (url, data) => {
  
  try {
    const isFileUpload = data instanceof FormData || 
      Object.values(data).some(value => value instanceof File);

    if (isFileUpload) {
      const formData = data instanceof FormData 
        ? data 
        : Object.keys(data).reduce((formData, key) => {
            formData.append(key, data[key]);
            return formData;
          }, new FormData());

      const response = await axiosInstance.post(`/${url}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    }

    const response = await axiosInstance.post(`/${url}`, data);
    return response.data;
  } catch (error) {
    console.error("Error in createItem:", error);
    throw error;
  }
};

export const get = async (url) => {
  try {
    const response = await axiosInstance.get(`/${url}`);
    return response.data;
  } catch (error) {
    console.error("Error in getItems:", error);
    throw error;
  }
};

export const getById = async (url, id) => {
  try {
    const response = await axiosInstance.get(`/${url}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in getItemById:", error);
    throw error;
  }
};

export const update = async (url, id, data) => {
  try {
    const response = await axiosInstance.put(`/${url}${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error in updateItem:", error);
    throw error;
  }
};

export const _delete = async (url, id) => {
  try {
    const response = await axiosInstance.delete(`/${url}${id}`);
    
    return response;
  } catch (error) {
    console.error("Error in deleteItem:", error);
    throw error;
  }
};
