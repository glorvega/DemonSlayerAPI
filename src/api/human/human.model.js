const mongoose = require('mongoose');
/* const { humanSchema } = require('./titan.model'); */
const Schema = mongoose.Schema;

const humanSchema = new Schema({
    name: {type: String, required: true, trim: true}, //Trim limpia los espacios del string
   /*  race: {type: String, required: true, trim: true}, */
    age: {type: Number, trim: true},
    origin: {type: String, trim: true},
    role: {type: String, trim: true},
    image: {type: String, trim: true},
    titan_inherited: [{type: Schema.Types.ObjectId, ref:"Titan", trim: true}],
},
{
    timestamps:true //muestra las actualizaciones y fecha de creación
})

const Human = mongoose.model('Human', humanSchema);

module.exports = Human;