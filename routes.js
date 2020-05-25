const { Router } = require('express');
const routes = new Router();
const Arquivo = require('./controller/midia');
const Tipo = require('./controller/tipo');

const shell = require('shelljs');

routes.get('/teste', (req, res) => {
    return res.sendFile(__dirname + "/view/teste.html")
})
routes.get('/', (req, res) => {
    return res.sendFile(__dirname + "/view/index.html")
})
routes.get('/upload', (req, res) => {
    return res.sendFile(__dirname + "/view/upload.html")
})

routes.post('/', Arquivo.store);
routes.get('/arquivos/:tipo', Arquivo.index);
routes.get('/search/:query', Arquivo.search);
routes.get('/abrir/:id', Arquivo.send)
routes.get('/script', (req, res) => {
    return res.sendFile(__dirname + "/view/script.js")
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
	
})


module.exports = routes;