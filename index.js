require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');



//Crear el servidor de express
const app = express();

//configutar CORS
app.use(cors());

//base de Datos
dbConnection();



//mean_user
//S6TiM7ZJQtwUEPsr
//Rutas
app.get('/', (req, res) => {
    res.json({

        ok: true,
        msg: 'Hola Mundo'

    })

})

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})