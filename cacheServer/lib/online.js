const downloader  = require('./downloader.js');
const urlUtil     = require('./url.js');
const config      = require('../config.json');
const path        = require('path');
const moment      = require('moment');
const fs          = require('fs');

class online{

  // Descarga un archivo estatico.
  downloadStatic(urlDownload,fileCache,res,file){    

    // Proceso la descarga del archivo.
    downloader.download(urlDownload,fileCache).then((pathlocal)=>{

      // Teniendo descargado el archivo, lo devuelvo al cliente.
      res.sendFile(file, { root : path.dirname(__dirname)+config.cache.downloads});

      // Logeo la descarga.
      console.log('DOWNLOAD '+urlDownload+' OK');
      console.log('CACHE    '+fileCache);

    }).catch((error)=>{
      
      // Logeo la descarga.
      console.log('GET '+urlDownload+'ERROR');

    });

  }

  // Cuando recibo una ruta virtual.
  virtualRoute(res)
  {
    // Armo el path del archivo base.
    let baseFile = path.dirname(__dirname)+config.cache.downloads+'/'+config.cache.fileRoot;

    // Reviso que el archivo a redireccionar exista.
    if (fs.existsSync(baseFile)){

      // Si no es un archivo estatico es una ruta virtual, lo redirecciono al index.html
      res.sendFile('/'+config.cache.fileRoot, { root : path.dirname(__dirname)+config.cache.downloads});
      console.log('REDIRECT '+config.cache.fileRoot);
    }
    else{

      // En este caso intento acceder por una ruta virtual, pero no tengo en cache el archivo index.html para recibir la ruta.
      console.log('CACHE 404 '+config.cache.fileRoot);
      console.log('TRY   GET '+config.cache.fileRoot);

      // Fuerzo la descarga del base path, reutilizo la funcion de getfile pero con el path base.
      this.getFile('/',res);

    }

  }

  // Cuando recibo el request para procesar archivos.
  getFile(file,res){

    // Armo la url para descargar.
    let urlDownload = config.cache.host+file;

    // Armo el path de escritura del archivo.
    let fileCache   = path.dirname(__dirname)+config.cache.downloads+file;

    // Logeo el request de get.
    console.log('GET      '+urlDownload);

    // Si es la url base, tengo que agregarle el index.html.
    if (file=='/'){

      urlDownload = config.cache.host;
      file        = '/index.html';
      fileCache   = path.dirname(__dirname)+config.cache.downloads+file;

    }

    // Aca se diferencia si el request es para traer un archivo estatico o se recibio una ruta virtual.
    if (urlUtil.isFile(urlDownload))
      this.downloadStatic(urlDownload,fileCache,res,file);
    else
      this.virtualRoute(res);

  }

}

module.exports = new online();
