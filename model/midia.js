const sql = require('../config/connection');

class Midia{

    store(nome, local, tipo, res){
        local = local.toLowerCase();
        sql.query('insert into arquivo (nome, local, tipo) values ("'+nome+'", "'+local+'",'+tipo+')', (err, r) => {
            if(err)throw err;
            return res(r);
        });
    }

    index(tipo, res){
        sql.query('select id, nome, local, tipo from arquivo where tipo = ' + tipo +' order by nome', (err, r) => {
            if(err)throw err;
            return res(r);
        });
    }

    like(nome, res){
        sql.query('select id, nome, local, tipo from arquivo where nome like "%' + nome +'%" order by nome', (err, r) => {
            if(err)throw err;
            return res(r);
        });
    }

    show(id, res){
        sql.query('select nome, local from arquivo where id='+id, (err, r) => {
            if(err)throw err;
            return res(r);
        });
    }

    check(local, res){
        local = local.toLowerCase();
        sql.query('select id from arquivo where local = "'+local+'"', (err, r) => {
            if(err)throw err;
            return res(r);
        })
    }

    update(id, nome, local, tipo){
        sql.query('UPDATE arquivo SET nome = "'+nome+'", local = "'+local+'", tipo='+tipo+' WHERE id='+id, (err, r) => {
            if(err)throw err;
			return r;
        })
    }

    delete(id, res){
        sql.query('delete from arquivo where id ='+id, (err, r) => {
            if(err)throw err;
            return res(r);
        })
    }
}
module.exports = new Midia();