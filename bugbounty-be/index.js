require("dotenv").config();
const path = require('path');
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const routes = require("./routes/routes");

const app = express();
const port = 3000;

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión exitosa a la base de datos");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.use(express.json());

app.use(
  "/api",
  upload.any(),
  (req, res, next) => {
    if (req.files) {
      req.body.attachments = req.files.map((file) => ({
        url: file.path,
        name: file.originalname,
        type: file.mimetype,
      }));
    }
    next();
  },
  (error, req, res, next) => {
    console.error("Error handling file upload:", error);
    res
      .status(500)
      .json({ message: "An error occurred while handling file upload" });
  }
);

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
