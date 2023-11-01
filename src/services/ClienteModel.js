const db = require('../db')

module.exports = {
buscarTodos: () =>{        // -------------------------LISTAR TODOS--------------------------------- //
    return new Promise((aceito, recusado)=>{

        db.query('SELECT * FROM cliente', (error, results)=>{
            if(error) { recusado(error); return; }
            aceito(results);
        });
    });
},

buscarUm: (cliente_id) =>{        // ----------------------------LISTAR SOMENTE UM ------------------------------//
    return new Promise((aceito, recusado) => {
        
        db.query ('SELECT * FROM cliente WHERE cliente_id = ?', [cliente_id], (error, results)=>{
            if(error) { recusado(error); return; }
            if(results.length > 0){
                aceito(results[0]);
            }else{
                aceito(false);
            }
        });
    });
},

inserir: (cliente_nome, cliente_endereco, cliente_telefone) =>{        // ----------------------------INSERIR DADOS------------------------------//
    return new Promise((aceito, recusado) => {
        
        db.query ('INSERT INTO cliente (cliente_nome, cliente_endereco, cliente_telefone) VALUES (?,?,? )', 
        [cliente_nome, cliente_endereco, cliente_telefone], 
        (error, results)=>{
            if(error) { recusado(error); return; }
               aceito(results.insertcliente_id);
            
            }
        );
    });
},

alterar: (cliente_id, cliente_nome, cliente_endereco, cliente_telefone) =>{        // ----------------------------ALTERAR DADOS------------------------------//
    return new Promise((aceito, recusado) => {
        
        db.query ('UPDATE cliente SET cliente_nome = ?, cliente_endereco = ?, cliente_telefone = ? WHERE cliente_id = ?',
        [cliente_nome, cliente_endereco, cliente_telefone, cliente_id], 
        (error, results)=>{
            if(error) { recusado(error); return; }
               aceito(results);
            
            }
        );
    });
},

excluir: (cliente_id) =>{        // -------------------------EXCLUIR DADOS--------------------------------- //
    return new Promise((aceito, recusado)=>{

        db.query('DELETE FROM cliente WHERE cliente_id = ?',[cliente_id],(error, results)=>{
            if(error) { recusado(error); return; }
            aceito(results);
        });
    });
  }
}