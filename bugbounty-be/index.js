require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const routes = require('./routes/routes');

const app = express();
const port = 3000;

// Conexión a la base de datos MongoDB
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

// Configuración de Multer para la carga de archivos
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Middleware para analizar JSON en las solicitudes
app.use(express.json());

// Middleware para la carga de archivos con Multer
app.use('/api', upload.any(), (req, res, next) => {
  if (req.files) {
    req.body.attachments = req.files.map((file) => ({
      url: file.path,
      name: file.originalname,
      type: file.mimetype,
    }));
  }
  next();
});

// Rutas
app.use('/api', routes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
