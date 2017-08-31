/******************************************
 *
 *  Creado por Damián Cipolat @damcipolat
 *  www.damiancipolat.com
 *
 ******************************************/

const express = require("express");
const app     = express();
const config  = require('./config.json');
const replic  = require('./lib/replication.js');

//Puerto del server.
const port    = process.env.PORT || 5000;

//Guardo en una variable global datos del server.
global.data   = {
                  configData : config,
                  fileList   : [],
                  log        : []
                };

//CORS
app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//Bindeo la ruta y obtengo el archivo, lo devuelvo por socket al browser.
 app.get(/^(.+)$/, function(req, res)
 { 
     console.log('>> Static file request : ' + req.params);  
   res.sendfile( config.webFiles+ req.params[0]); 
 });
 
 //Inicio server en modo escucha.
 app.listen(port, function()
 {
  //Logeo inicio.
  console.log('> Replication Web Server - by @damcipolat');
  console.log("> Listening on " + port);

  //Creo un intervalo de revisión de novedades.
    setInterval(replic.scanHost, config.checkInterval);

    //Ejecuto la 1ra vez.
    replic.scanHost();
 });