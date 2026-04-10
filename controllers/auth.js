const Usuario = require('../modules/usuario')
const bcrypt = require('bcryptjs')

async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}
const login = async(req, res) => {
    const { email, password } = req.body // Extrae el email y la contraseña
    
    try {
    // Verifica si el usuario existe en la base de datos
    if( !usuario ){
    return res.status(400).json({
    msg: 'Correo electrónico no encontrado'
    })
    }
    
        resultado = await comparePassword(password, usuario.password)
    
    if(resultado == true){
    return res.status(400).json({
    msg: 'El password es correcto'
    })
    }
    else{
    return res.status(400).json({
    msg: 'El password es incorrecto'
    })
    }
    } catch (err) {
    return res.status(400).json({
    msg: 'Apreciado usuario contacte al administrador.' // Mensaje
    })
    }
    }
    // Exporta la función de inicio de sesión para que esté disponible para
    module.exports = {
    login
    }
