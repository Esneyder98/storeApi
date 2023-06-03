const express = require("express");
const session = require('express-session');
const cookies = require('cookie-parser');
const app = express();
const cors = require("cors");
// Declarando y requiriendo  la ruta principal 
const routerApi = require('./routes');
//Declarando uso de session
app.use(session({
	secret: "Shhh, It's a secret",
	resave: true,
	saveUninitialized: true,
}));
app.use(cookies());
//Declaracion del puerto en el cual correra el servidor
const port = process.env.PORT || 3001;
// middleware para manejo de datos en formato JSON
app.use(express.json());
// habilitar todas las solicitudes de terceros a la API de manera Global
app.use(cors());
// indicandole al express que ruta usar
app.get('/', (req, res) =>{
    res.send('Welcome Api Store')
  })
  routerApi(app)
  
// Poniendo a escuchar al servidor en el puerto previamente declarado
app.listen(port, () => console.log(`server is listening on ${port}`));