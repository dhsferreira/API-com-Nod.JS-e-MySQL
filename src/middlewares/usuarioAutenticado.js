const { verify } = require('jsonwebtoken')

const { jwt } = require('../Config/auth')

function usuarioAutenticado(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        throw new Error('Token não informado.');
    }

    const [, token] = authHeader.split(' ');

    try {
        verify(token, jwt.secret);
        
        return next();
    } catch (err) {
        throw new Error('Token inválido.');
    }
}

module.exports = {
    usuarioAutenticado
}