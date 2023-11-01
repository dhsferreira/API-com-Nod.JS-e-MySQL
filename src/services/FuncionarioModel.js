const db = require ('../db')

module.exports = {
    buscarTodosFunc: () =>{        // -------------------------LISTAR TODOS OS FUNCIONARIOS--------------------------------- //
        return new Promise((aceito, recusado)=>{

            db.query('SELECT * FROM funcionario', (error, results)=>{
                if(error) { recusado(error); return; }
                aceito(results);
            });
        });
    },

    buscarUmFunc: (func_id) =>{        // ----------------------------LISTAR SOMENTE UM FUNCIONARIO ------------------------------//
        return new Promise((aceito, recusado) => {
            
            db.query ('SELECT * FROM funcionario WHERE func_id = ?', [func_id], (error, results)=>{
                if(error) { recusado(error); return; }
                if(results.length > 0){
                    aceito(results[0]);
                }else{
                    aceito(false);
                }
            });
        });
    },

    inserirFunc: (func_nome, func_cargo, func_datacontrato) =>{        // ----------------------------INSERIR DADOS FUNCIONARIO------------------------------//
        return new Promise((aceito, recusado) => {
            
            db.query ('INSERT INTO funcionario (func_nome, func_cargo, func_datacontrato) VALUES (?,?,? )', 
            [func_nome, func_cargo, func_datacontrato], 
            (error, results)=>{
                if(error) { recusado(error); return; }
                   aceito(results.insertfunc_id);
                
                }
            );
        });
    },

    alterarFunc: (func_id, func_nome, func_cargo, func_datacontrato) =>{      // ----------------------------ALTERAR DADOS FUNCIONARIO------------------------------//
        return new Promise((aceito, recusado) => {
            
            db.query ('UPDATE funcionario SET func_nome = ?, func_cargo = ?, func_datacontrato= ? WHERE func_id = ?',
            [func_nome, func_cargo, func_datacontrato, func_id], 
            (error, results)=>{
                if(error) { recusado(error); return; }
                   aceito(results);
                
                }
            );
        });
    },

    excluirFunc: (func_id) =>{        // -------------------------EXCLUIR DADOS FUNCIONARIOS--------------------------------- //
        return new Promise((aceito, recusado)=>{

            db.query('DELETE FROM funcionario WHERE func_id = ?',[func_id],(error, results)=>{
                if(error) { recusado(error); return; }
                aceito(results.func_id);
            });
        });
    },
}