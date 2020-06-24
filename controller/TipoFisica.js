const Tipo = require('../model/TipoFisica');

class TipoFisicaController
{
    index(req, res){
        Tipo.index((r) => {
            return res.json(r);
        })
    }

    show(req, res)
    {
        const { id } = req.params;

        Tipo.show(id, (r) => {
            return res.json(r);
        });
    }
}

module.exports = new TipoFisicaController;