const MySql = require('../config/connection');
SQL = new MySql();
sql = SQL.sql;

class Tipo{

    index(res){
        sql.query('select nome, id from tipo order by id', (err, r) => {
            if(err)throw err;
            return res(r);
        });
    }

    store(tipo, res){
        sql.query('insert into tipo (nome) values ("'+tipo+'")', (err, r) => {
            if(err)throw err;
            return res(r);
        });
    }

    show(id, res){
        sql.query('select nome from tipo where id='+id, (err, r) => {
            if(err)throw err;
            return res(r);
        })        
    }

    showId(tipo, res){
        sql.query('select id from tipo where nome="'+tipo+'"', (err, r) => {
            if(err)throw err;            
            return res(r);
        });
    }
    
}
module.exports = new Tipo();