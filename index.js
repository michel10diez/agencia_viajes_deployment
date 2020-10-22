// const express = require('express');
import express from 'express';
import router from './routes/routes.js';
import db from './config/db.js';


const app = express();

//conectar la base de dats
db.authenticate()
    .then(() => console.log('conectado a la bd'))
    .catch(error=>console.log(error));

//Definir puerto
const port = process.env.PORT || 4000;
//Definir host
const host = process.env.HOST || '0.0.0.0';

//Habilitar pug
app.set('view engine', 'pug');

//Obtener el año actual
app.use((req, res, next)=>{
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';
    next();
});

//Agregar body parser para leer datos del formulario
app.use(express.urlencoded({extended: true}));

//Definir la carpeta publica
app.use(express.static('public'));

app.use('/', router);
//Habilitar puerto
app.listen( port, host, () => {
    console.log(`puerto: ${port}`);
});

