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

routes.get('/dialog', (req, res) => {
	shell.exec('start explorer '+ __dirname + "\\registrar.exe");
	return res.send("<script>window.close()</script>")
})
routes.get('/upload/*', (req, res) => {
	console.log(req.params[0])
	res.send("<html></html>");
	var array = req.params[0].split("/");
	
	var name = encodeURI(array[array.length -1].split(".")[0]);
	var loc = encodeURI(req.params[0]);
	var type = array[array.length -1].split(".")[1];
	var request = []
	request.body = {nome:name, local: loc, tipo: type}
    Arquivo.storeDialog(request, (r) =>{console.log(r)});
	
})


module.exports = routes;