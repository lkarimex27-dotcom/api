const {response} = require('express'); // Importa la función `response` desde el
//módulo express
const bcrypt = require('bcryptjs'); // Importa la librería bcryptjs para el
//cifrado de contraseñas
// Importar modelos
const Usuario = require('../modules/usuario'); // Importa el modelo de Usuario
//desde el módulo '../modules/usuario'
// Controlador para la solicitud GET a la ruta de usuarios
const usuariosGet = async (req, res = response) => {
const body = req.query; // Extrae los parámetros de la consulta
const {q, nombre, page= 1, limit} = req.query; // Extrae los parámetros de la
consulta
const usuarios = await Usuario.find(); // Consulta todos los documentos de la
//colección Usuario
res.json({
usuarios // Devuelve un objeto JSON con los usuarios obtenidos de la base
//de datos
});
}
// Controlador para la solicitud GET de promedio de usuarios
const PromGet = async (req, res = response) => {
const body = req.query; // Extrae los parámetros de la consulta
const {q, nombre, page= 1, limit} = req.query; // Extrae los parámetros de la
consulta
const usuarios = await Usuario.find(); // Consulta todos los documentos de la
//colección Usuario
usuarios.forEach(numero => console.log(numero)); // Muestra cada documento de
//usuario por consola
res.json({
msg: 'Prom API controlador', // Devuelve un mensaje indicando que es el
//controlador del promedio
q,
nombre,
page,
limit,
usuarios // Devuelve los usuarios obtenidos de la base de datos
});
}
// Controlador para la solicitud POST a la ruta de usuarios
const usuariosPost = async(req, res = response) => {
const body = req.body; // Extrae el cuerpo de la solicitud
let msg = ''; // Inicializa una variable para el mensaje de respuesta
const usuario = new Usuario(body); // Crea un nuevo objeto Usuario con los
//datos del cuerpo de la solicitud
const {nombre, email, password, rol, estado} = req.body; // Extrae los datos
//del cuerpo de la solicitud
try {
// Encripta la contraseña antes de guardarla en la base de datos
const salt = bcrypt.genSaltSync(10); // Genera una sal para el cifrado
usuario.password = bcrypt.hashSync(password, salt); // Cifra la
//contraseña con la sal generada
await usuario.save(); // Guarda el usuario en la base de datos
msg = 'Usuario Registrado'; // Asigna un mensaje de éxito
} catch (error) {
console.log(error); // Muestra el error por consola
if (error) {
if (error.name === 'ValidationError') {
console.error(Object.values(error.errors).map(val =>
val.message)); // Muestra los mensajes de error de validación
msg = Object.values(error.errors).map(val => val.message); //

//Asigna los mensajes de error al mensaje de respuesta

}
}
}
console.log(msg); // Muestra el mensaje de respuesta por consola
res.json({
msg: msg // Devuelve el mensaje de respuesta como un objeto JSON
});
}
// Controlador para la solicitud PUT a la ruta de usuarios
const usuariosPut = async(req, res = response) => {
const body = req.query; // Extrae los parámetros de la consulta
console.log(body); // Muestra los parámetros de la consulta por consola
const {nombre, email, password, rol, estado} = req.body; // Extrae los datos
//del cuerpo de la solicitud
// Busca y actualiza un usuario en la base de datos
const usuario = await Usuario.findOneAndUpdate({email: email}, {nombre:
nombre, rol: rol});
res.json({
msg: 'Usuario Modificado', // Devuelve un mensaje indicando que se
//modificó el usuario
//usuario // Devuelve el usuario modificado
});
}
// Controlador para la solicitud DELETE a la ruta de usuarios
const usuariosDelete = async(req, res = response) => {
const body = req.query; // Extrae los parámetros de la consulta
console.log(body); // Muestra los parámetros de la consulta por consola
const {nombre, email, password, rol, estado} = req.query; // Extrae los datos
//del cuerpo de la solicitud
// Busca y elimina un usuario en la base de datos
const usuario = await Usuario.findOneAndDelete({email: email});
res.json({
msg: 'Usuario Eliminado', // Devuelve un mensaje indicando que se eliminó
//el usuario
//usuario // Devuelve el usuario eliminado
});
}
// Exporta los controladores de las rutas de usuarios para que estén disponibles
//para otros módulos
module.exports ={
usuariosGet,
usuariosPost,
usuariosPut,
usuariosDelete,
PromGet
}