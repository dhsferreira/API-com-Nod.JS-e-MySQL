const db = require ('../db')

module.exports = {

    RelatorioParaCozinha: () =>{        // -------------------------MOSTRA TODOS OS PEDIDOS FEITOS--------------------------------- //
        return new Promise((aceito, recusado)=>{

            db.query('SELECT * FROM pedidos', (error, results)=>{
                if(error) { recusado(error); return; }
                aceito(results);
            });
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

      executarConsultaUmPedi: (query, pedido_id) => {
        return new Promise((aceito, recusado) => {
          db.query(query, [pedido_id], (error, results) => {
            if (error) {
              recusado(error);
            } else {
              aceito(results);
            }
          });
        });
        
      },
      
}