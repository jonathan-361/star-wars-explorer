const { Router } = require("express");
const { getCharacter } = require("../controllers/characterController");

const router = Router();

router.get("/:id", getCharacter);

module.exports = router;
