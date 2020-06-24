const { Router } = require('express');
const routes = new Router();
const Arquivo = require('./controller/midia');
const Fisica = require('./controller/fisica');
const Tipo = require('./controller/tipo');
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

//Midia Fisica
routes.get('/fisica', (req, res) => {
    return res.sendFile(__dirname + "/view/fisica.html")
});
routes.get('/fisica/:tipo', Fisica.index);
routes.get('/fisica/:id', Fisica.show);
routes.post('/fisica', Fisica.store);
routes.put('/fisica/:id', Fisica.update);
routes.delete('/fisica/:id', Fisica.delete);

routes.get('/upload', (req, res) => {
    return res.sendFile(__dirname + "/view/upload.html")
})
routes.get('/lapis', (req, res) => {
    return res.sendFile(__dirname + "/view/lapis.ico")
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