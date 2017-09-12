const request  = require("request");
const https    = require('https');
const http     = require('http');
const fs       = require('fs');
const path     = require('path');
const checksum = require('checksum');
const cs       = checksum('dshaw');

// Clase para el manejo de las descargas de archivo desde internet.
class Downloader{

  // Traigo el tipo de protocolo HTTP o HTTPS.
  getTypeProtocol(url){

    // Si es https.
    if ((url.indexOf('https')>=0)||(url.indexOf('HTTPS')>=0))
      return 'HTTPS';

    // Si es http.
    if ((url.indexOf('http')>=0)||(url.indexOf('HTTP')>=0))
      return 'HTTP';

    return null;

  }

  // Realizo la descarga del archivo, decido segun el protocolo que camino tomar.
  download(url,destino){

    // Según el tipo de protocolo HTTP/HTTPS voy a obtener una promise.
    switch(this.getTypeProtocol(url)){
      case 'HTTP' : return this.httpDownload(url,destino);
                    break;
      case 'HTTPS': return this.httpsDownload(url,destino);
                    break;
    }

  }

  // Descarga por HTTP.
  httpDownload(url,destino){
    
    return new Promise((resolve,reject)=>{

      // Analizo si existe el directorio, si no existe lo crea.
      if (!fs.existsSync(path.dirname(destino)))
        fs.mkdirSync(path.dirname(destino));

      // Hago el equest al server.
      let request = http.get(url, (response)=>{

        // Armo el stream para el archivo.
        let file = fs.createWriteStream(destino);

        // Vuelco el archivo en disco.
        response.pipe(file);

        //Cuando termina la operación de escritura.
        file.on('finish',function(){
          file.close();
          resolve(destino);
        });


      }).on('error', (err)=>{
        fs.unlink(dest);
        reject({stat:'error',msj:err.message});      
      });

    });

  }

  // Descarga por HTTPS.
  httpsDownload(url,destino){

    return new Promise((resolve,reject)=>{

      // Armo el stream para el archivo.
      let file    = fs.createWriteStream(destino);

      // Hago el equest al server.
      let request = https.get(url, (err,response)=>{

        // Armo el stream para el archivo.
        let file = fs.createWriteStream(destino);

        // Vuelco el archivo en disco.
        response.pipe(file);

        //Cuando termina la operación de escritura.
        file.on('finish',function(){
          file.close();
          resolve(destino);
        });


      }).on('error', (err)=>{
        fs.unlink(dest);      
        reject({stat:'error',msj:err.message});      
      });

    });

  }

}

module.exports = new Downloader();