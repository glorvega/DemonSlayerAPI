const Human = require('./human.model');

// obtenemos todos los humans
const getAllHumans = async (req, res, next) => {
    try{
        const humans = await Human.find().populate('titan_inherited');
        return res.status(200).json(humans);
    } catch (error) {
        return next(error);
    }
}

// lo obtenemos por ID
const getHuman = async (req, res, next) => {
    try {
        const {id} = req.params;
        const human = await Human.findById(id); // ¿haría falta el populate????
        if(!human){
            const error = new Error("No humans found by the provided Id");
            error.status = 404;
            return next(error);
        }
        return res.status(200).json(human);
    }catch (error) {
        return next(error);
    }
}

// creamos un nuevo human
const postNewHuman = async (req, res, next) => {
    try{
        const newHuman = new Human(req.body); //REQ BODY recoge los elementos del cuerpo del mensaje
        // newHuman.height = req.body.height;
        // newHuman.description = req.body.description;
        // newHuman.name = req.body.name;
        // newHuman.type = req.body.type;
        const humanDB = await newHuman.save();  //Aquí guardamos el nuevo human en la base de datos
        return res.status(201).json(humanDB);
    } catch (error) {
        return next(error);
    }
}

// actualizamos un human
const putHuman = async (req, res, next) => {
    try {
        const {id} = req.params;
        const putHuman = new Human(req.body);
        putHuman._id = id;
        const humanDB = await Human.findByIdAndUpdate(id, putHuman);
        if(!humanDB){
            const error = new Error("No humans found by this id");
            error.status = 404;
            return next(error);
        }
        return res.status(200).json(humanDB);
    } catch (error) {
        return next(error);
    }
}

// borramos un human
const deleteHuman = async (req, res, next) => {
    try {
        const {id} = req.params;
        const humanDB = await Human.findByIdAndDelete(id);
        if(!humanDB){
            const error = new Error("No human found by this id");
            error.status = 404;
            return next(error);  
        }
        return res.status(200).json(humanDB); // Aquí responde un OK status 200 y me sigue pintando el humano en consola
    } catch (error) {
        return next(error);
    }
}


module.exports = {
    getAllHumans,
    getHuman,
    postNewHuman,
    putHuman,
    deleteHuman
}