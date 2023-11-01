const db = require('../db')

module.exports = {
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