const usuarioModel = require('../services/usuarioModel')

module.exports = {
    buscarTodos : async (req,res) =>{
        let json = {error:'', result:[]}

        let usuarios = await usuarioModel.buscarTodos();

        for(let i in usuarios){
            json.result.push({
                codigo: usuarios[i].USUA_id,
                nome: usuarios[i].USUA_nome,
                email: usuarios[i].USUA_email,
                senha: usuarios[i].USUA_senha
            })
        }

        res.json(usuarios);
    },

    inserir: async (req,res)=>{
        let json = {error:'', result:{}}
        
        let {nome, email, senha} = req.body
       
        if(nome && email && senha){
            const codigoUsuario = await usuarioModel.inserir(nome, email, senha);
            json.result = {
                codigo: codigoUsuario,
                nome,
                email,
                senha
            }
        }else{
            json.error = 'campos nao enviados';
        }

        res.json(json);
    }
}