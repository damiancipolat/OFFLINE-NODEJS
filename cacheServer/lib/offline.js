const downloader  = require('./downloader.js');
const urlUtil     = require('./url.js');
const config      = require('../config.json');
const path        = require('path');
const moment      = require('moment');
const fs          = require('fs');

class offline{

  // Traigo el archivo desde la carpeta de cache.
  getFromCache(fileCache,file,res){

    // Reviso si el archivo existe dentro de la cache.
    if (fs.existsSync(fileCache)){

      console.log('CACHE    '+fileCache);

      // Devuelvo el archivo del directorio cache.
      res.sendFile(file, { root : path.dirname(__dirname)+config.cache.downloads});

    }
    else{
      res.status(404).send('File not found in cache');
      console.log('CACHE 404'+fileCache);
    }

  }

  getFile(file,res){

    // Armo la url para descargar.
    let urlDownload = config.cache.host+file;

    // Armo el path de escritura del archivo.
    let fileCache   = path.dirname(__dirname)+config.cache.downloads+file;

    // Armo el path base.
    let baseFile    = path.dirname(__dirname)+config.cache.downloads+'/'+config.cache.fileRoot;

    // Logeo el request de get.
    console.log('GET      '+urlDownload);

    // Analizo si la url es de un archivo estatico o una ruta virtual.    
    if (urlUtil.isFile(urlDownload))
      this.getFromCache(fileCache,file,res);
    else
      this.getFromCache(baseFile,config.cache.fileRoot,res);

  }

}

module.exports = new offline();
