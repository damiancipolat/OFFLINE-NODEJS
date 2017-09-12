const express    = require("express");
const app        = express();
const config     = require('./config.json');
const connect    = require('./lib/connection.js');
const file       = require('./lib/file.js');
const online     = require('./lib/online.js');
const offline    = require('./lib/offline.js');
const bodyParser = require('body-parser');

//Asumo de entrada que no hay internet.
global.online = false;

//Configuramos el parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Bindeo la ruta y obtengo el archivo.
app.get(/^(.+)$/, (req, res)=>{

  //Si puedo obtener el nombre del archivo solicitado por GET, trato de ubicarlo en la cache.
  if (req.params[0]!=null){
   
    //Si hay conexión.
    if (global.online)
      online.getFile(req.params[0],res);
    else
      offline.getFile(req.params[0],res);

  }

});

//Reviso si hay acceso al host cada x tiempo.
let testConecction = ()=>{

  connect.hostCheck(config.cache.host+'/index.html').then((status)=>{

    global.online = true;

    //Salida por consola de cada intento de ping.
    console.log('PING     '+config.cache.host+' OK');

  }).catch((reason)=>{

    global.online = false;

    //Salida por consola de cada intento de ping.
    console.log('PING     '+config.cache.host+' ERROR');

  });

};

//Inicio el server en modo escucha.
let port = config.server.port;

app.listen(port,()=>{

console.log('');
console.log('* Cache Web Server *');  
console.log('> Listen on port: '+port);
console.log('');

//Inicio un hilo de revision de conectividad cada 3 segundos.
setInterval(testConecction,3000);

// Reviso desde el arranque.
testConecction();

});