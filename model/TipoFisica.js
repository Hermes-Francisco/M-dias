const sql = require('../config/connection');

class TipoFisica
{
    index(res)
    {
        sql.query('select nome, id from tipo_fisica order by id', (err, r) => {
            if(err) {
                throw err;
            }

            return res(r);
        });
    }

    show(id, res)
    {
        sql.query('select nome from tipo_fisica where id='+id, (err, r) => {
            if(err) {
                throw err;
            }

            return res(r);
        })     
    }
}

module.exports = new TipoFisica();