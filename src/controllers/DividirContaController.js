const DividirContaModel = require('../services/DividirContaModel')

module.exports = {
    buscarUmaConta: async (req, res) => { // ----------------------------¿BUSCAR UMA CONTA?------------------------------//
        let json = { error: '', result: {} };
        
        try {
          const { conta_id } = req.params;
          const query = `
          SELECT
          pedidos.pedido_id,
          SUM(produtos.prod_preco) AS total_valor_produtos
        FROM
          pedidos
        JOIN tabela_de_ligacao ON pedidos.pedido_id = tabela_de_ligacao.pedido_id
        JOIN produtos ON tabela_de_ligacao.prod_id = produtos.prod_id
        WHERE pedidos.pedido_id = ? ;
        
          `;
      
          const buscarUmaConta = await DividirContaModel.executarConsultaUmPedi(query, [conta_id]);
      
          if (buscarUmaConta.length > 0) {
            json.result = buscarUmaConta; // Agora json.result conterá todos os produtos relacionados ao pedido
          } else {
            json.error = 'Pedido não encontrado.';
          }
        } catch (error) {
          json.error = 'Ocorreu um erro ao buscar o pedido com detalhes.';
        }
      
        res.json(json);
      },


      DividirUmaContaPediPag: async (req, res) => { // ----------------------------¿DIVIDIR UMA CONTA(CADA UM PAGA OQUE PEDIU)?------------------------------//
        let json = { error: '', result: {} };
        
        try {
          const { conta_id } = req.params;
          const query = `
          SELECT
          cliente.cliente_nome,
          cliente.cliente_id,
          GROUP_CONCAT(produtos.prod_nome SEPARATOR ', ') as produtos_comprados,
          SUM(produtos.prod_preco) as total_gasto
      FROM
          tabela_de_ligacao
      JOIN
          produtos ON tabela_de_ligacao.prod_id = produtos.prod_id
      JOIN
          cliente ON tabela_de_ligacao.cliente_id = cliente.cliente_id
      WHERE
          tabela_de_ligacao.pedido_id = ?
      GROUP BY
          cliente.cliente_id;
      
          `;
      
          const DividirUmaContaPediPag = await DividirContaModel.executarConsultaUmPedi(query, [conta_id]);
      
          if (DividirUmaContaPediPag.length > 0) {
            json.result = DividirUmaContaPediPag; // Agora json.result conterá todos os produtos relacionados ao pedido
          } else {
            json.error = 'Pedido não encontrado.';
          }
        } catch (error) {
          json.error = 'Ocorreu um erro ao buscar o pedido com detalhes.';
        }
      
        res.json(json);
      },


      
     DividirContaIgual: async (req, res) => {
        let json = { error: '', result: {} };
      
        try {
          const { conta_id } = req.params;
          const query = `
            SELECT
              SUM(produtos.prod_preco) as valor_total,
              COUNT(DISTINCT tabela_de_ligacao.cliente_id) as num_clientes
            FROM
              tabela_de_ligacao
            JOIN produtos ON tabela_de_ligacao.prod_id = produtos.prod_id
            WHERE tabela_de_ligacao.pedido_id = ?
          `;
      
          const resultado = await DividirContaModel.executarConsultaUmPedi(query, [conta_id]);
      
          if (resultado.length > 0) {
            // Recuperando os valores da consulta
            const { valor_total, num_clientes } = resultado[0];
      
            if (valor_total !== null && num_clientes !== null) {
              // Limitando o número de clientes a 4
              const num_clientes_limitado = Math.min(num_clientes, 4);
      
              // Calculando o valor dividido, limitando a 4 clientes
              const valor_dividido = valor_total / num_clientes_limitado;
      
              json.result = { valor_total, num_clientes: num_clientes_limitado, valor_dividido };
            } else {
              json.error = 'Valores não encontrados ou inválidos.';
            }
          } else {
            json.error = 'Pedido não encontrado.';
          }
        } catch (error) {
          json.error = 'Ocorreu um erro ao dividir a conta igualmente.';
        }
      
        res.json(json);
      },
      
}