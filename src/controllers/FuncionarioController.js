const FuncionarioModel = require('../services/FuncionarioModel')

module.exports = {
    buscarTodosFunc: async (req, res)=>{                  // -------------------------LISTAR TODOS OS FUNCIONARIOS--------------------------------- //
        let json ={error:'', result:[]};

        let funcionario = await FuncionarioModel.buscarTodosFunc();   

        for(let i in funcionario){
            json.result.push({
                func_id: funcionario[i].func_id,
                func_nome: funcionario[i].func_nome,
                func_cargo: funcionario[i].func_cargo,
                func_datacontrato: funcionario[i].func_datacontrato,
            });
        }
        res.json(json);
    },

    buscarUmFunc: async (req, res)=> {      // ----------------------------LISTAR SOMENTE UM FUNCIONARIO ------------------------------//
        let json ={error:'', result:{}};

        let func_id = req.params.func_id;
        let funcionario = await FuncionarioModel.buscarUmFunc(func_id);

        if(funcionario){
            json.result = funcionario;
        }

        res.json(json);
    },


    inserirFunc:  async (req, res) => {         // ----------------------------INSERIR DADOS FUNCIONARIO------------------------------//
        let json ={error:'', result:{}};

        let nome = req.body.func_nome;
        let cargo = req.body.func_cargo;
        let datacontrato = req.body.func_datacontrato;

        if (nome && cargo && datacontrato ){
            let funcid = await FuncionarioModel.inserirFunc(nome, cargo, datacontrato);
            json.result = {
                func_id: funcid,
                nome,
                cargo,
                datacontrato
            };

        }else{
            json.error = 'Campos nao enviados';
        }

        res.json(json);
    },

    
    alterarFunc:  async (req, res) => {         // ----------------------------ALTERAR DADOS FUNCIONARIO------------------------------//
        let json ={error:'', result:{}};

        let id = req.params.func_id;
        let nome = req.body.func_nome;
        let cargo = req.body.func_cargo;
        let datacontrato = req.body.func_datacontrato;

        if (id&& nome && cargo && datacontrato){
            await FuncionarioModel.alterarFunc(id, nome, cargo, datacontrato);
            json.result = {
                id,
                nome,
                cargo,
                datacontrato
            };

        }else{
            json.error = 'Campos nao enviados';
        }

        res.json(json);
    },

    excluirFunc:  async (req, res) => { // ----------------------------EXCLUIR DADOS FUNCIONARIOS------------------------------//
        let json ={error:'', result:{}};

        await FuncionarioModel.excluirFunc(req.params.func_id);

        res.json(json);

    },
}