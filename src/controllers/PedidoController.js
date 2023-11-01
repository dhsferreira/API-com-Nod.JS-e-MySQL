const PedidoModel = require('../services/PedidoModel')

module.exports = {
    buscarTodosPedi: async (req, res) => { // ----------------------------¿BUSCAR DADOS PEDIDOS?------------------------------//
        let json = { error: '', result: [] };
      
        try {
          // Execute a consulta SQL que combina informações de várias tabelas
          const query = `
            SELECT
            produtos.prod_nome,
            funcionario.func_nome,
            cliente.cliente_nome,
              produtos.*
              FROM
              pedidos
          JOIN
              tabela_de_ligacao ON pedidos.pedido_id = tabela_de_ligacao.pedido_id
          JOIN
              produtos ON tabela_de_ligacao.prod_id = produtos.prod_id
          JOIN
              funcionario ON tabela_de_ligacao.func_id = funcionario.func_id
          JOIN
              cliente ON tabela_de_ligacao.cliente_id = cliente.cliente_id;
          
          `;

          const buscarTodosPedi = await PedidoModel.executarConsulta(query);
      
          json.result = buscarTodosPedi;
        } catch (error) {
          json.error = 'Ocorreu um erro ao buscar os pedidos com detalhes.';
        }
      
        res.json(json);
      },
      
      inserirProdnoPedi:  async (req, res) => {         // ----------------------------INSERIR PRODUTOS NO PEDIDO------------------------------//
        let json ={error:'', result:{}};


        let pedido = req.body.pedido_id;
        let produto = req.body.prod_id;
        let cliente = req.body.cliente_id;
        let funcionario = req.body.func_id;

        if (pedido && produto && cliente && funcionario ){
            let pedido_id = await PedidoModel.inserirProdnoPedi(pedido, produto, cliente, funcionario);
            json.result = {
                pedido_id: pedido_id,
                pedido,
                produto,
                cliente,
                funcionario
            };

        }else{
            json.error = 'Campos nao enviados';
        }

        res.json(json);
    },
    
}