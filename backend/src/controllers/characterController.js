const swapiService = require("../services/swapiService");

const getCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;

    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId) || parsedId <= 0) {
      return res.status(400).json({
        success: false,
        message: "El ID debe ser un número entero positivo.",
      });
    }

    const character = await swapiService.getCharacterById(parsedId);

    return res.status(200).json({
      success: true,
      data: character,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        success: false,
        message: `No se encontró ningún personaje con el ID proporcionado.`,
      });
    }
    next(error);
  }
};

module.exports = {
  getCharacter,
};
