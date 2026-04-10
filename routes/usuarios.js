const { Router } = require('express'); // Importa la función Router de express
//para crear un router
const router = Router(); // Crea una instancia de Router
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, PromGet } =
require('../controllers/usuario'); // Importa los controladores desde el archivo
//'../controllers/usuario'
// Define rutas y asigna controladores a cada ruta
// Ruta para obtener todos los usuarios (GET '/')
router.get('/', usuariosGet);
// Ruta para obtener el promedio de usuarios (GET '/promedio')
router.get('/promedio', PromGet);
// Ruta para crear un nuevo usuario (POST '/')
router.post('/', usuariosPost);
// Ruta para actualizar un usuario existente (PUT '/')
router.put('/', usuariosPut);
// Ruta para eliminar un usuario existente (DELETE '/')
router.delete('/', usuariosDelete);
// Exporta el router para que esté disponible para otros módulos
module.exports = router;