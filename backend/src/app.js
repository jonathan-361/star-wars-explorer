const express = require("express");
const cors = require("cors");
const characterRoutes = require("./routes/characterRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/people", characterRoutes);

app.get("/", (req, res) => {
  res.json({ message: "SWAPI Proxy Server funcionando correctamente" });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Ruta no encontrada." });
});

app.use(errorHandler);

module.exports = app;
