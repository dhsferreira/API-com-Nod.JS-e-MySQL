const { sign } = require('jsonwebtoken')

const { jwt } = require('../Config/auth')
const usuarioModel = require('../services/usuarioModel')

module.exports = {
    criar : async (req,res) =>{
        let json = {error:'', result:{}}

        const { email, senha } = req.body;
        
        const usuarios = await usuarioModel.buscarPorEmail(email)
        const usuario = usuarios[0];

        if (!usuario) {
            json.error = 'Usuário ou senha inválida.'
            return res.json(json)
        }

        if (senha !== usuario.USUA_senha) {
            json.error = 'Usuário ou senha inválida.'
            return res.json(json)
        }

        const token = sign({}, jwt.secret, {
            subject: usuario.USUA_id.toString(),
            expiresIn: jwt.expiresIn
        });

        json.result = {
            usuario,
            token
        }

        res.json(json);
    }
}