const { Router } = require('express');
const routes = new Router();
const Arquivo = require('./controller/midia');
const Tipo = require('./controller/tipo');


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
routes.get('/tipos', Tipo.index)
module.exports = routes;