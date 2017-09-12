const express    = require("express");
const app        = express();
const config     = require('./config.json');
const api        = require('./lib/api.js');
const bodyParser = require('body-parser');

// Asumo de entrada que no hay internet.
global.online = false;

// Configuramos el parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Cuando el request es de un API, ruta: /api.
app.use(config.cache.apiUrl,api);

// Inicio el server en modo escucha.
let port = config.server.port;

try{

  app.listen(port,()=>{

    console.info('');
    console.info('* Request proxy Server *');  
    console.info('> Listen on port: '+port);
    console.info('');

  });

}catch(e){
  console.log('Could not start server in port',port);
}
