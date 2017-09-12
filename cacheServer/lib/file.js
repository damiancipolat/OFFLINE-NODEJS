const request  = require("request");
const https    = require('https');
const http     = require('http');
const fs       = require('fs');
const path     = require('path');
const checksum = require('checksum');
const cs       = checksum('dshaw');

//Traigo un archivo json desde una url.
let loadFromUrl= (url)=>{

  //Retorno una promise.
  return new Promise((resolve,reject)=>{

    //Hago el request para traer el archivo json.
    request({url: url,json: true},(error, response, body)=>{

      if (!error && response.statusCode === 200)
        resolve(body);  
      else
        reject(error);

    });

  });

}

//Descarga un solo archivo por HTTPS.
let httpsDownload = (url,destino)=>{

  return new Promise((resolve,reject)=>{

    //Analizo si existe el directorio, si no existe lo crea.
    if (!fs.existsSync(dirname))
        fs.mkdirSync(path.dirname(path.dirname(destino)));

    //Armo el stream para el archivo.
    let file    = fs.createWriteStream(destino);

    //Hago el equest al server.
    let request = https.get(url, (response)=>{
    
      if (err){
        console.log('file not found');
        reject({stat:'error',data:'file not found'});        
      }
      else {

        // Analizo si existe el directorio, si no existe lo crea.
        if (!fs.existsSync(path.dirname(destino)))
          fs.mkdirSync(path.dirname(destino));

        // Vuelco el contenido en el disco.
        response.pipe(file);

        // Cuando termino de descargar el archivo.
        file.on('finish',()=>{
          file.close();
          resolve({stat:'ok',path:destino});
        });

      }

    }).on('error', (err)=>{
      fs.unlink(dest);
      reject(err.message);
    });

  });

};

//Descarga un solo archivo por HTTP.
let httpDownload = (url,destino)=>{

  return new Promise((resolve,reject)=>{

    // Armo el stream para el archivo.
    let file    = fs.createWriteStream(destino);

    // Hago el equest al server.
    let request = http.get(url, (err,response)=>{

      if (err){
        console.log('file not found');
        reject({stat:'error',data:'file not found'});        
      }
      else {

        // Analizo si existe el directorio, si no existe lo crea.
        if (!fs.existsSync(path.dirname(destino)))
          fs.mkdirSync(path.dirname(destino));

        // Vuelco el contenido en el disco.
        response.pipe(file);

        // Cuando termino de descargar el archivo.
        file.on('finish',()=>{
          file.close();
          resolve({stat:'ok',path:destino});
        });

      }

    }).on('error', (err)=>{
      fs.unlink(dest);      
      reject({stat:'error',msj:err.message});      
    });

  });

};

//Descarga un archivo, segun la url decide si usar http u https.
let download = (url,destino)=>{

  //Si es https.
  if ((url.indexOf('https')>=0)||(url.indexOf('HTTPS')>=0))
    return httpsDownload(url,destino);

  //Si es http.
  if ((url.indexOf('http')>=0)||(url.indexOf('HTTP')>=0))
    return httpDownload(url,destino);

};

//Traigo el checksum de un archivo.
let checksumFile = (file)=>{

  return new Promise((resolve,reject)=>{

    checksum.file(file, (err, sum)=>{
     
      if (err)
        reject(err);
      else
        resolve({fileName:file,checksum:sum});

    });

  });

}

//Dice si el archivo existe.
let fileExists = (file)=>{  
  return fs.existsSync(file);
}

module.exports.loadFromUrl      = loadFromUrl;
module.exports.httpDownload     = httpDownload;
module.exports.httpsDownload    = httpsDownload;
module.exports.download         = download;
module.exports.checksumFile     = checksumFile;
module.exports.fileExists       = fileExists;
