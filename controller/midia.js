const Arquivo = require('../model/midia');
const Tipo = require('../model/tipo');
const shell = require('shelljs')

class MidiaController{

    index(req, res){
        const { tipo } = req.params;
        Arquivo.index(tipo, (r) => {
            return res.json(r);
        });
    }
    search(req, res){
        const { query } = req.params;
        Arquivo.like(query, (r) => {
            return res.json(r);
        })
    }

    show(req, res){
        const { id } = req.params;
        Arquivo.show(id, (r) => {
            return res.json(r);
        })
    }

    send(req, res){
        const{ id } = req.params;
        Arquivo.show(id, (r)=>{
            if(r[0]) return res.sendFile(decodeURI(r[0].local));
            else return res.json({erro : 'não encontrado'})
        });       
    }

    open(req, res){
        const { id } = req.params;
        Arquivo.show(id, (r) => {
            let loc;
            let local;
            if(r[0]){
                loc = r[0].local.split('/');
                local = loc[0];
                for(var i = 1; i < loc.length; i++)local += '\\'+loc[i];
                shell.exec('start explorer "'+ decodeURI(local))
                return res.send('<script>window.close()</script>')
            }
        })
    }
    openDir(req, res){
        const { id } = req.params;
        Arquivo.show(id, (r) => {
            let loc;
            let local;
            if(r[0]){
                loc = r[0].local.split('/');
                local = loc[0];
                for(var i = 1; i < loc.length-1; i++)local += '\\'+loc[i];
                shell.exec('start explorer "'+ decodeURI(local))
                return res.send('<script>window.close()</script>')
            }
        })
    }

    store(req, res){
        let { nome, local, tipo } = req.body;
        tipo = tipo.toLowerCase();
		local = local.toLowerCase();

        Arquivo.check(local, (arquivo)=>{
            if(!arquivo[0]){
                Tipo.showId(tipo, (resposta) => {
                    if(resposta[0]){
                        Arquivo.store(nome, local, resposta[0].id, (r)=>{
                            return res.json(r);
                        });
                    } 
                    else Tipo.store(tipo, (r) => {
                        Arquivo.store(nome, local, r.insertId, (r)=>{
                            return res.json(r);
                        });
                    })            
                })    
            }else return res.status(400).json({erro: 'arquivo já registrado'})
        })

            
    }
	storeDialog(req, res){
        let { nome, local, tipo } = req.body;
        tipo = tipo.toLowerCase();
		local = local.toLowerCase();

        Arquivo.check(local, (arquivo)=>{
            if(!arquivo[0]){
                Tipo.showId(tipo, (resposta) => {
                    if(resposta[0]){
                        Arquivo.store(nome, local, resposta[0].id, (r)=>{
                            return res(r);
                        });
                    } 
                    else Tipo.store(tipo, (r) => {
                        Arquivo.store(nome, local, r.insertId, (r)=>{
                            return res(r);
                        });
                    })            
                })    
            }else return res({erro: 'arquivo já registrado'})
        })     
    }

    update(req, res){
        const { id } = req.params;
        let { nome, local, tipo } = req.body;
		tipo = tipo.toLowerCase();
		local = local.toLowerCase();
		
		Tipo.showId(tipo, (resposta) => {
            if(resposta[0]){
                Arquivo.update(id, nome, local, resposta[0].id);
				
            }else{ 
			    Tipo.store(tipo, (r) => {
                 Arquivo.update(id, nome, local, r.insertId);
				})
			}
        })
		return res.status(200).json({"id":id});
    }
    delete(req, res){
        const { id } = req.body;
        Arquivo.delete(id, (r) => {
            return res.json(r)
        });
    }
}

module.exports = new MidiaController();