const {Schema, model} = require('mongoose'); // Importa las funciones Schema y
//model de mongoose para definir esquemas y modelos de datos
// Define el esquema del modelo Usuario
const UsuarioSchema = Schema({
nombre: {
type: String,
required: [true, 'El nombre es obligatorio'] // Define que el campo
//nombre es obligatorio
},
email: {
type: String,
required: [true, 'El email es obligatorio'] // Define que el campo email
//es obligatorio
},
password: {
type: String,
required: [true, 'El password es obligatorio'], // Define que el campo
//password es obligatorio
minlength: 3, // Define la longitud mínima del campo password
maxlength: [60, 'El password debe ser de máximo 7 y se obtuvo: {VALUE}'],
// Define la longitud máxima del campo password
},
rol: {
type: String,
required: true, // Define que el campo rol es obligatorio
enum: ['Admin', 'Usuario'] // Define que el campo rol solo puede tener
//los valores 'Admin' o 'Usuario'
},
estado: {
type: Boolean,
default: true, // Define el valor por defecto del campo estado como true
required: [true, 'El estado es obligatorio'] // Define que el campo
//estado es obligatorio
},
})
module.exports = model('Usuario', UsuarioSchema);