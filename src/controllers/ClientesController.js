const ClienteModel = require('../services/ClienteModel');

module.exports = {

    buscarTodos: async (req, res)=>{                  // -------------------------LISTAR TODOS--------------------------------- //
        let json ={error:'', result:[]};

        let cliente = await ClienteModel.buscarTodos();   

        for(let i in cliente){
            json.result.push({
                cliente_id: cliente[i].cliente_id,
                cliente_nome: cliente[i].cliente_nome,
                cliente_endereco: cliente[i].cliente_endereco,
                cliente_telefone: cliente[i].cliente_telefone,
            });
        }
        res.json(json);
    },
    
    buscarUm: async (req, res)=> {      // ----------------------------LISTAR SOMENTE UM ------------------------------//
        let json ={error:'', result:{}};

        let cliente_id = req.params.cliente_id;
        let cliente = await ClienteModel.buscarUm(cliente_id);

        if(cliente){
            json.result = cliente;
        }

        res.json(json);
    },

    inserir:  async (req, res) => {         // ----------------------------INSERIR DADOS------------------------------//
        let json ={error:'', result:{}};

        let nome = req.body.cliente_nome;
        let endereco = req.body.cliente_endereco;
        let telefone = req.body.cliente_telefone;

        if (nome && endereco && telefone){
            let clienteId = await ClienteModel.inserir(nome, endereco, telefone);
            json.result = {
                cliente_id: clienteId,
                nome,
                endereco,
                telefone
            };

        }else{
            json.error = 'Campos nao enviados';
        }

        res.json(json);
    },

    alterar:  async (req, res) => {         // ----------------------------ALTERAR DADOS------------------------------//
        let json ={error:'', result:{}};

        let id = req.params.cliente_id;
        let nome = req.body.cliente_nome;
        let endereco = req.body.cliente_endereco;
        let telefone = req.body.cliente_telefone;

        if (id&& nome && endereco && telefone){
            await ClienteModel.alterar(id, nome, endereco, telefone);
            json.result = {
                id,
                nome,
                endereco,
                telefone
            };

        }else{
            json.error = 'Campos nao enviados';
        }

        res.json(json);
    },

    excluir:  async (req, res) => {  
        let json ={error:'', result:{}};

        await ClienteModel.excluir(req.params.cliente_id);

        res.json(json);

    },
}