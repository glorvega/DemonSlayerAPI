const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const titanSchema = new Schema({
    name: {type: String, required: true, trim: true},
    height: {type: String, trim: true},
    description: {type: String, trim: true},
    image: {type: String, trim: true},
    abilities: {type: String, trim: true},
    number_of_inheritors: {type: Number, trim: true},
    type: {type: String, trim: true},
},
{
    timestamps:true //muestra las actualizaciones y fecha de creación
})

const Titan = mongoose.model('Titan', titanSchema);

module.exports = Titan;