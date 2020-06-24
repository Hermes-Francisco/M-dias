const sql = require('../config/connection');

class Fisica
{
    store(nome, local, tipo)
    {
        sql.query('insert into fisica (nome, local, tipo) values ("'+nome+'", "'+local+'",'+tipo+')', (err, r) => {
            if (err) {
                throw err;
            }

            return res(r);
        });
    }

    update(id, nome, local, tipo) 
    {
        sql.query('UPDATE fisica SET nome = "'+nome+'", local = "'+local+'", tipo='+tipo+' WHERE id='+id, (err, r) => {
            if (err) {
                throw err;
            }

			return res(r);
        });
    }

    delete(id, res)
    {
        sql.query('delete from fisica where id ='+id, (err, r) => {
            if(err) {
                throw err;
            }

            return res(r);
        });
    }

    index(tipo, res)
    {
        sql.query('select id, nome, local, tipo from fisica where tipo = ' + tipo +' order by nome', (err, r) => {
            if(err) {
                throw err;
            }

            return res(r);
        });
    }

    like(nome, res)
    {
        sql.query('select id, nome, local, tipo from fisica where nome like "%' + nome +'%" order by nome', (err, r) => {
            if(err)throw err;
            return res(r);
        });
    }

    show(id, res)
    {
        sql.query('select nome, local from fisica where id='+id, (err, r) => {
            if(err) {
                throw err;
            }

            return res(r);
        });
    }
}

modules.export = new Fisica(); 