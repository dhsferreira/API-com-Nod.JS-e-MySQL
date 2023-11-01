const ProdutoModel = require ('../services/ProdutoModel')

module.exports = {
    inserirProd:  async (req, res) => {         // ----------------------------INSERIR DADOS PRODUTOS------------------------------//
        let json ={error:'', result:{}};

        let nome = req.body.prod_nome;
        let descricao = req.body.prod_descricao;
        let preco = req.body.prod_preco;
        let categoria = req.body.prod_categoria;

        if (nome && descricao && preco && categoria ){
            let prodID = await ProdutoModel.inserirProd(nome, descricao, preco, categoria);
            json.result = {
                prod_id: prodID,
                nome,
                descricao,
                preco,
                categoria
            };

        }else{
            json.error = 'Campos nao enviados';
        }

        res.json(json);
    },

    buscarTodosProd: async (req, res)=>{                  // -------------------------LISTAR TODOS PRODUTOS--------------------------------- //
        let json ={error:'', result:[]};

        let produtos = await ProdutoModel.buscarTodosProd();   

        for(let i in produtos){
            json.result.push({
                prod_id: produtos[i].prod_id,
                prod_nome: produtos[i].prod_nome,
                prod_descricao: produtos[i].prod_descricao,
                prod_preco: produtos[i].prod_preco,
                prod_categoria: produtos[i].prod_categoria,
        
            });
        }
        res.json(json);
    },

    buscarUmProdu: async (req, res)=> {      // ----------------------------LISTAR SOMENTE UM PRODUTO ------------------------------//
        let json ={error:'', result:{}};

        let prod_id = req.params.prod_id;
        let produto = await ProdutoModel.buscarUmProdu(prod_id);

        if(produto){
            json.result = produto;
        }

        res.json(json);
    },

    alterarProdu:  async (req, res) => {         // ----------------------------ALTERAR DADOS PRODUTO------------------------------//
        let json ={error:'', result:{}};

        let id = req.params.prod_id;
        let nome = req.body.prod_nome;
        let descricao = req.body.prod_descricao;
        let preco = req.body.prod_preco;
        let categoria = req.body.prod_categoria;


        if (id&& nome && descricao && preco && categoria){
            await ProdutoModel.alterarProdu(id, nome, descricao, preco, categoria);
            json.result = {
                id,
                nome,
                descricao,
                preco,
                categoria
            };

        }else{
            json.error = 'Campos nao enviados';
        }

        res.json(json);
    },
    

    excluirProdu:  async (req, res) => { // ----------------------------EXCLUIR DADOS PRODUTOS------------------------------//
        let json ={error:'', result:{}};

        await ProdutoModel.excluirProdu(req.params.prod_id);

        res.json(json);

    },
}