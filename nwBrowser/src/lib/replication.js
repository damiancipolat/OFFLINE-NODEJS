const fileCtrol = require("./files");
const config    = require('../data/config.json');

class replicaMaster
{

  constructor(){
    this.scanHost         = this.scanHost.bind(this);
    this.checkFileChanges = this.checkFileChanges.bind(this);
  }

  //Escaneo el host en busca de nuevas versiones.
  scanHost(){

    console.log('- Buffer actual: ',global.data.fileList);    

    //Traigo la url a escargar.
    let url  = global.data.configData.replicaHost;
    let that = this;

    //Traigo la lista de archivos.
    fileCtrol.loadJsonFromUrl(url).then(function(fileBody){

      console.log('- Get list file from host: ',url);

      //Analizo si hay cambios en los archivos.
      that.checkFileChanges(fileBody.files);

    }).catch((error)=>{

      console.log(error);

      //Logeo la carga ok del archivo.
      global.data.log.push({stat:'error',file:'url'});

    });

  }

  //Lleno el buffer en como un array clave valor.
  fillBuffer(lista){

    global.data.fileList = [];

    lista.forEach((item)=>{
      global.data.fileList[item.name] = {name:item.name,checksum:item.checksum};
    });

  }

  //Reviso si hay novedades.
  checkFileChanges(files){

    //Lista de archivos a descargar.
    let promFiles = [];
    
    //Si el buffer de archivos esta vacio lo actualizo.
    if (global.data.fileList.length==0)
    {
      this.fillBuffer(files);
      console.log('- Actualizo buffer',(global.data.fileList));
    }

    //Reviso toda la lista de archivos.
    files.forEach((file)=>{

      //Armo el path para marcar la descarga del archivo.
      let host = global.data.configData.host+file.name ;
      let path = global.data.configData.webFiles+'/'+file.name;

      console.log('- check file status',host,path);

      //Actualizo el buffer, con las novedades que hubiesen.
      if (this.updateDownloads(file)){

        //Si el path es un directorio saco la 1ra barra.
        if (path[0]=='/')
          path = path.substring(1,path.length);

        promFiles.push(fileCtrol.download(host,path));

      }

    });

    //Si hay request que procesar.
    if (promFiles.length>0){

      //Proceso todos los archivos a descargarn de forma asincronica.
      Promise.all(promFiles).then((okDownload)=>{
        console.log('bajados ok',okDownload);
        console.log('----------------------------');
      }).catch((errorDownload)=>{
        console.log('bajados error',errorDownload);
      });

    }

  }

  //Cargo las novedades a descargar.
  updateDownloads(file){

    //Traigo el elemento del array.
    let tmpFile = global.data.fileList[file.name];

    //Descarga obligatorio.
    if (file.checksum=='all')
    {
      console.log('** descarga obligatoria',tmpFile);
      return true;
    }
    else
    {
      //Si es un archivo nuevo hasta el momento.
      if ((tmpFile==null)||(tmpFile==undefined))
      {
        console.log('** new file',tmpFile);
        global.data.fileList[file.name] = {name:file.name,checksum:file.checksum};        
        return true;
      }
      else
      {
        //Si tiene diferente checksum.
        if (tmpFile.checksum!=file.checksum)
        {
          console.log('** updated file',tmpFile);
          global.data.fileList[file.name] = {name:file.name,checksum:file.checksum};        
          return true;
        }
        else
        {
          //Si esta en el buffer el archivo y coincide el checksum pero puede que no este descargado.
          if (!fileCtrol.fileExists(file.name))
          {
            console.log('** descargo ',file.name);
            return true;
          }
        }
      }
    }

    return false;

  }

}

module.exports = new replicaMaster();