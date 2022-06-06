const Titan = require('./titan.model');

// obtenemos todos los titans
const getAllTitans = async (req, res, next) => {
    try{
        const titans = await Titan.find()
        return res.status(200).json(titans);
    } catch (error) {
        return next(error);
    }
}

// lo obtenemos por ID
const getTitan = async (req, res, next) => {
    try {
        const {id} = req.params;
        const titan = await Titan.findById(id); // ¿haría falta el populate????
        if(!titan){
            const error = new Error("No titans found by the provided Id");
            error.status = 404;
            return next(error);
        }
        return res.status(200).json(titan);
    }catch (error) {
        return next(error);
    }
}

// creamos un nuevo titan
const postNewTitan = async (req, res, next) => {
    try{
        const newTitan = new Titan(req.body); //REQ BODY recoge los elementos del cuerpo del mensaje
        if(req.file){
            newTitan.image = req.file.path;
        }
        // newTitan.height = req.body.height;
        // newTitan.description = req.body.description;
        // newTitan.name = req.body.name;
        // newTitan.type = req.body.type;
        const titanDB = await newTitan.save();  //Aquí guardamos el nuevo titan en la base de datos
        return res.status(201).json(titanDB);
    } catch (error) {
        return next(error);
    }
}

// actualizamos un titan
const putTitan = async (req, res, next) => {
    try {
        const {id} = req.params;
        const putTitan = new Titan(req.body);
        putTitan._id = id;
        const titanDB = await Titan.findByIdAndUpdate(id, putTitan);
        if(!titanDB){
            const error = new Error("No titans found by this id");
            error.status = 404;
            return next(error);
        }
        if(titanDB.image){
            deleteFile(titanDB.image);
        }
        return res.status(200).json(titanDB);
    } catch (error) {
        return next(error);
    }
}

// borramos un titan
const deleteTitan = async (req, res, next) => {
    try {
        const {id} = req.params;
        const titanDB = await Titan.findByIdAndDelete(id);
        if(!titanDB){
            const error = new Error("No titan found by this id");
            error.status = 404;
            return next(error);  
        }
        return res.status(200).json(titanDB);
    } catch (error) {
        return next(error);
    }
}


module.exports = {
    getAllTitans,
    getTitan,
    postNewTitan,
    putTitan,
    deleteTitan
}