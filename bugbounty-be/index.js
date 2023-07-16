require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const path = require('path');

const app = express();
const port = 3000;

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

app.use(express.json());
app.use('/api/public', express.static(path.join(__dirname, 'uploads')))
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
