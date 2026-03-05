import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

/**
 * @param {number} id
 * @returns {Promise<Object>}
 */
export const getCharacter = async (id) => {
  const response = await api.get(`/people/${id}`);
  return response.data;
};
