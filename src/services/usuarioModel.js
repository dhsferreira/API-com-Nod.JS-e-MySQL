const db = require('../db')

module.exports = {
    buscarTodos: ()=>{
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM usuario', (error, results)=>{
                if(error) {rejeitado(error); return}
                aceito(results);
            });
        });
    },

    buscarPorEmail: (email)=>{
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM usuario WHERE USUA_email = ?', [email], (error, results)=>{
                if(error) {rejeitado(error); return}
                aceito(results);
            });
        });
    },

    inserir: (nome, email, senha)=>{
        return new Promise((aceito, rejeitado)=>{
            db.query('INSERT INTO usuario (USUA_nome, USUA_email, USUA_senha) VALUES (?, ?, ?)', [nome, email, senha], (error,results)=>{
                if(error) {rejeitado(error); return;}
                aceito(results.insertcodigo);
            });
        });
    },

    alterar: (nome, email, senha, codigo)=>{
        return new Promise((aceito, rejeitado)=>{
            db.query('UPDATE usuario SET USUA_nome= ?, USUA_email= ?, USUA_senha= ? WHERE USUA_id= ?', [nome, email, senha, codigo], (error, results)=>{
                if(error) {rejeitado(error); return;}
                aceito(results);
            });
        });
    },

    excluir: (codigo)=>{
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM usuario WHERE USUA_id= ?', [codigo], (error, results)=>{
                if(error) {rejeitado(error); return;}
                aceito(results);
            });
        });
    }
}