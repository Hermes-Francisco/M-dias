const Fisica = require('../model/Fisica');
const Tipo = require('../model/tipo');
const shell = require('shelljs');

class Fisica
{
    index(req, res)
    {
        Fisica.index(tipo, (r) => {
            return res.json(r);
        });
    }

    show(req, res)
    {
        const { id } = req.params;

        Fisica.show(id, (r) => {
            return res.json(r);
        });
    }

    store(req, res)
    {
        let { nome, local, tipo } = req.body;
        tipo = tipo.toLowerCase();
		local = local.toLowerCase();

        Fisica.store(nome, local, tipo, (r)=>{
            return res.json(r);
        });
    }

    update(req, res)
    {
        const { id } = req.params;
        let { nome, local, tipo } = req.body;
		
        Fisica.update(id, nome, local, tipo);
		
		return res.status(200).json({ "id": id });
    }

    delete(req, res)
    {
        const { id } = req.body;

        Fisica.delete(id, (r) => {
            return res.json(r);
        });
    }
}