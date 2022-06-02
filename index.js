const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

/* const CharacterRoutes = require('./src/api/characters/character.routes');
const RaceRoutes = require('./src/api/race/race.routes'); */

const {connectDb} = require('./src/utils/database/database');

const PORT = process.env.PORT || 8080;

const app = express();
connectDb();


app.use('/', (req, res) => {
    return res.status(200).json("Mi api de Demon Slayer");
})

app.use('*', (req, res, next) => {              //Para las rutas que no estén definidas muestranos un Route not found
    return res.status(404).json('Route not found');
});

app.use((error, req, res, next)=>{              //Para cualquier error que suceda en la aplicación
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
})

app.listen(PORT, ()=>{
    console.log(`listening in http://localhost:${PORT}`);
});