const Tipo = require('../model/tipo');

class TipoController{
    index(req, res){
        Tipo.index((r) => {
            return res.json(r);
        })
    }
}
module.exports = new TipoController;