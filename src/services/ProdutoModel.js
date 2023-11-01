const db = require ('../db')

module.exports = {
    inserirProd: (prod_nome,prod_descricao, prod_preco, prod_categoria) =>{      // ----------------------------INSERIR DADOS PRODUTOS------------------------------//
    return new Promise((aceito, recusado) => {
        
        db.query ('INSERT INTO produtos (prod_nome, prod_descricao, prod_preco, prod_categoria) VALUES (?,?,?,? )', 
        [prod_nome,prod_descricao, prod_preco, prod_categoria], 
        (error, results)=>{
            if(error) { recusado(error); return; }
               aceito(results.insertprod_id);
            
            }
        );
    });
},


buscarTodosProd: () =>{        // -------------------------LISTAR TODOS PRODUTOS--------------------------------- //
    return new Promise((aceito, recusado)=>{

        db.query('SELECT * FROM produtos', (error, results)=>{
            if(error) { recusado(error); return; }
            aceito(results);
        });
    });
},

buscarUmProdu: (prod_id) =>{        // ----------------------------LISTAR SOMENTE UM PRODUTO ------------------------------//
    return new Promise((aceito, recusado) => {
        
        db.query ('SELECT * FROM produtos WHERE prod_id = ?', [prod_id], (error, results)=>{
            if(error) { recusado(error); return; }
            if(results.length > 0){
                aceito(results[0]);
            }else{
                aceito(false);
            }
        });
    });
},

alterarProdu: (prod_id, prod_nome, prod_descricao, prod_preco, prod_categoria) =>{      // ----------------------------ALTERAR DADOS PRODUTOS------------------------------//
    return new Promise((aceito, recusado) => {
        
        db.query ('UPDATE produtos SET prod_nome = ?, prod_descricao = ?, prod_preco= ?, prod_categoria= ? WHERE prod_id = ?',
        [prod_nome, prod_descricao, prod_preco, prod_categoria, prod_id], 
        (error, results)=>{
            if(error) { recusado(error); return; }
               aceito(results);
            
            }
        );
    });
},

excluirProdu: (prod_id) =>{        // -------------------------EXCLUIR DADOS PRODUTOS--------------------------------- //
    return new Promise((aceito, recusado)=>{

        db.query('DELETE FROM produtos WHERE prod_id = ?',[prod_id],(error, results)=>{
            if(error) { recusado(error); return; }
            aceito(results.prod_id);
        });
    });
 }
}