const axios = require("axios");

const BASE_URL = process.env.SWAPI_BASE_URL || "https://swapi.py4e.com/api";

/**
 * Obtiene un personaje de Star Wars por su ID
 * @param {number} id
 * @returns {Promise<Object>}
 */

const getCharacterById = async (id) => {
  const response = await axios.get(`${BASE_URL}/people/${id}/`);
  return response.data;
};

module.exports = {
  getCharacterById,
};
