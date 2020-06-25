const { Router } = require('express');
const routes = new Router();
const Arquivo = require('./controller/midia');
const Fisica = require('./controller/fisica');
const Tipo = require('./controller/tipo');
const TipoFisica = require('./controller/TipoFisica');
const qrcode = require('./controller/qrcode')

const shell = require('shelljs');

routes.get('/teste', (req, res) => {
    return res.sendFile(__dirname + "/view/teste.html")
})
routes.get('/', (req, res) => {
    return res.sendFile(__dirname + "/view/index.html")
})
routes.get('/digital', (req, res) => {
    return res.sendFile(__dirname + "/view/arquivos.html")
})
routes.get('/livro', (req, res) => {
    return res.sendFile(__dirname + "/view/livro.ico")
})
routes.get('/processor', (req, res) => {
    return res.sendFile(__dirname + "/view/processor.ico")
})


//Midia Fisica
routes.get('/fisica', (req, res) => {
    return res.sendFile(__dirname + "/view/fisica.html")
});
routes.get('/tipo_fisica', TipoFisica.index);
routes.get('/tipo_fisica/:id', TipoFisica.show);
routes.get('/fisica/:tipo', Fisica.index);
routes.get('/fisica/id/:id', Fisica.show);
routes.get('/fisica/search/:nome', Fisica.like);
routes.post('/fisica', Fisica.store);
routes.put('/fisica/:id', Fisica.update);
routes.delete('/fisica', Fisica.delete);

routes.get('/lapis', (req, res) => {
    return res.sendFile(__dirname + "/view/lapis.ico")
})
routes.get('/fisica/show/:id', (req, res) => {
    return res.sendFile(__dirname + "/view/show.html")
})
routes.get('/lixeira', (req, res) => {
    return res.sendFile(__dirname + "/view/lixeira.ico")
})

routes.post('/', Arquivo.store);
routes.get('/arquivos/:tipo', Arquivo.index);
routes.get('/search/:query', Arquivo.search);
routes.get('/abrir/:id', Arquivo.send)
routes.get('/script', (req, res) => {
    return res.sendFile(__dirname + "/view/script.js")
})
routes.get('/script_fisica', (req, res) => {
    return res.sendFile(__dirname + "/view/script_fisica.js")
})
routes.get('/ab/:id', Arquivo.open)
routes.get('/dir/:id', Arquivo.openDir);
routes.get('/tipos', Tipo.index);

var dialog = false;

routes.get('/dialog', (req, res) => {
	shell.exec('start explorer '+ __dirname + "\\registrar.exe");
	dialog = true;
	return res.send("<script>window.close()</script>")
})

routes.get('/upload/*', (req, res) => {
	
	if(!dialog) return res.send("<html><h1>Origem desconhecida</h1></html>");
	
	var array = req.params[0].split("/");
	
	var loc = encodeURI(req.params[0]);
	var type = array[array.length -1].split(".");
	type = type[type.length -1];
	var name = encodeURI(array[array.length -1].split("."+type)[0]);

	var request = []
	request.body = {nome:name, local: loc, tipo: type}
    Arquivo.storeDialog(request, (r) => {});
	
	return res.send("<html></html>");
	
});

routes.get('/show/:id', Arquivo.show);
routes.get('/qr', qrcode.generate);
routes.delete('/', Arquivo.delete);
routes.put('/:id', Arquivo.update)


module.exports = routes;