const db = require('../db')

module.exports ={
    buscarTodosPedi: () =>{        // -------------------------LISTAR TODOS PEDIDOS--------------------------------- //
        return new Promise((aceito, recusado)=>{

            db.query('SELECT * FROM pedidos', (error, results)=>{
                if(error) { recusado(error); return; }
                aceito(results);
            });
        });
    },
    inserirProdnoPedi: (pedido_id, prod_id, cliente_id, func_id) =>{      // ----------------------------INSERIR DADOS PRODUTOS------------------------------//
        return new Promise((aceito, recusado) => {
            
            db.query ('INSERT INTO  tabela_de_ligacao (pedido_id, prod_id, cliente_id, func_id) VALUES (?,?,?,? )', 
            [pedido_id, prod_id, cliente_id, func_id], 
            (error, results)=>{
                if(error) { recusado(error); return; }
                   aceito(results.insertpedido_id);
                
                }
            );
        });
    },
    executarConsulta: (query) => {   
        return new Promise((aceito, recusado) => {
          db.query(query, (error, results) => {
            if (error) {
              recusado(error);
            } else {
              aceito(results);
            }
          });
        });
      },
}