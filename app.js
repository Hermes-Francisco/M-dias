const express = require('express');
const routes = require('./routes');

class App{
    constructor(){
        this.app = express();
        this.middlewares();
        this.router();
        this.app.listen(3000);
    }

    middlewares(){
        this.app.use(express.json());
    }

    router(){
        this.app.use(routes);
    }

}
module.exports = new App().app;