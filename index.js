const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const HumanRoutes = require('./src/api/human/human.routes');
const TitanRoutes = require('./src/api/titan/titan.routes');

const {connectDb} = require('./src/utils/database/database');

const PORT = process.env.PORT || 8080;

const app = express();
connectDb();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE'); //Definimos los metodos que permitimos para nuestra API
    res.header('Access-Control-Allow-Credentials', 'true'); //Decimos que permitos la conexion con credenciales(cookies, autenticacion, etc)
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.use(cors({   //Definimos las rutas para las que damos permiso a acceder a nuestra API, para que no la bloquee el CORS
    origin: ['https://localhost:3000', 'https://localhost:4200'],    //Implementamos el cors para poder conectarnos desde los puertos estandar de ANGULAR Y REACT
    credentials: true,
}))

app.use(express.json({
    limit: '5mb'            //Limitamos el tamaño máximo de nuestra petición
}))

app.use(express.urlencoded({limit: '5mb', extended: true})) ////Se asegura que lo que recibas sean urls con clave--valor(ej: name:Pepe, apellido:perez)

//app.use('/characters', charactersRoutes);
// / --> get --> /characters
// /:id --> get by id --->  /characters/:id


app.use('/titan', TitanRoutes);

app.use('/human', HumanRoutes);

app.use('/', (req, res) => {
    return res.status(200).json("Mi api de Attack on Titan");
})
app.use('*', (req, res, next) => {  //Para las rutas que no estén definidas muestranos un Route not found
    return res.status(404).json('Route not found');
});

app.use((error, req, res, next)=>{              //Para cualquier error que suceda en la aplicación
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
})

app.listen(PORT, ()=>{
    console.log(`listening in http://localhost:${PORT}`);
});