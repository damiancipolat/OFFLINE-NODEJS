//Incluyo modulos.
const http     = require('http');
const express  = require('express');
const path     = require('path');

//Instancias.
const app      = express();
const server   = http.createServer(app);

// Cargo configuraciòn.
const config   = require('./data/config.json');

// Cargo replication process.
const replica  = require('./lib/replication.js');

// Seteo config. como variable global.
global.config  = config;

// Traigo el archivo cuando se pasa como GET.
app.use((req,res,next)=>{

  // Logeo request a cada url.
  console.log('* SERVER: request to URL:',req.originalUrl);
  next();

},express.static(path.join(config.base_path, config.server.web_files), {dotfiles: 'ignore',index: false}));

// En caso de no bindear una ruta antes, devuelvo el index, lo uso para rutas virtuales de un SPA.
app.get('*', (req, res) => {
  res.sendFile(config.server.virtual_routes , { root : config.base_path});
});

// En caso de no encontrar el archivo, muestro 404.
app.use((req, res, next) => {  

  let err    = new Error('Not Found');
  err.status = 404;
  console.log('* SERVER: file not found ',req.originalUrl);
  next(err);

});

// Muestro error 500.
app.use((err, req, res, next) => {
  res.sendStatus(err.status || 500);
});

// Cuando el server entra en modo escucha.
app.listen(config.server.port, () => {

  // Grabo logeo.
  console.log('* SERVER - start on port:',config.server.port);

  // Redirecciono la pantalla al server.
  window.location.href='http://127.0.0.1:'+config.server.port+'/';

  //Creo un intervalo de revisión de novedades.
  setInterval(replica.scanHost, config.updater.interval);

  //Ejecuto la 1ra vez.
  replica.scanHost();
  

});