const RelatorioCozinhaModel = require('../services/RelatorioCozinhaModel')
module.exports = {

    RelatorioTotalParaCozinha: async (req, res) => { // ----------------------------MOSTRAR TODOS OS PEDIDOS------------------------------//
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

          const RelatorioTotalParaCozinha = await RelatorioCozinhaModel.executarConsulta(query);
      
          json.result = RelatorioTotalParaCozinha;
        } catch (error) {
          json.error = 'Ocorreu um erro ao buscar os pedidos com detalhes.';
        }
      
        res.json(json);
      },

      RelatorioUnicoParaCozinha: async (req, res) => {
        let json = { error: '', result: {} };
    
        try {
            const { pedido_id } = req.params; // Mude de conta_id para pedido_id
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
                cliente ON tabela_de_ligacao.cliente_id = cliente.cliente_id
            WHERE
                pedidos.pedido_id = ?
            `;
    
            const RelatorioUnicoParaCozinha = await RelatorioCozinhaModel.executarConsultaUmPedi(query, [pedido_id]);
    
            if (RelatorioUnicoParaCozinha.length > 0) {
                json.result = RelatorioUnicoParaCozinha;
            } else {
                json.error = 'Pedido não encontrado.';
            }
        } catch (error) {
            json.error = 'Ocorreu um erro ao buscar o pedido com detalhes.';
        }
    
        res.json(json);
    }
    
}