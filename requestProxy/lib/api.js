const config    = require('../config.json');
const request   = require('request');
const moment    = require('moment');
const express   = require('express');
const router    = express.Router();

// Hago un request por GET a una url.
let requestGET = (url)=>{

  return new Promise((resolve,reject)=>{

    request.get(url,(err,res,body)=>{
      
      if (err)
        reject(err);
      
      if(res.statusCode== 200 )
        resolve(body);

    });

  });

}

// Armar la configuración del request a enviar en base a los headers que recibe.
let configRequest = (header,data,url)=>{

  let options = null;

  // Contenido del tipo form.
  if((header['content-type']=='application/x-www-form-urlencoded')||(header['Content-Yype']=='application/x-www-form-urlencoded'))
    options = {method: 'post',form:data,url: url,headers: header};

  // Contenido del tipo json.
  if ((header['content-yype']=='application/json')||(header['Content-Type']=='application/json'))
    options = {method: 'post',json:JSON.stringify(data),url: url,headers: header};

  return options;
}

// Hago un request por POST a una url.
let requestPOST = (url,header,data)=>{

  // Traigo la config. del request.
  let options = configRequest(header,data,url);

  return new Promise((resolve,reject)=>{
  
    // Si no se pudo armar la config. del request por que no se usan content-type desarrollados.
    if (options!=null){

      // Vuelvo a enviar el request que recibo al host.
      request(options,(err, res, body)=>{
        
        if (err)
          reject(err);
        else
          resolve({code:res.statusCode,data:body});

      });

    }
    else
      reject({'error':'Content-Type invalid, only: x-www-form-urlencoded or json'});

  });

}

// Cuando se recibe un request en modo GET.
let apiGET = (req,res)=>{

  if (global.online){

    // Traigo la url a la que se debe repetir el request.
    let reqUrl = config.cache.host+req.originalUrl; 
    
    // Repito el mismo request al host.
    requestGET(reqUrl).then((data)=>{

      // Devuelvo el resultado del request al api.
      res.status(res.statusCode).json(JSON.parse(data));

      // Muestro el request.
      console.log('GET API  '+reqUrl+' OK status: '+res.statusCode);

    })
    .catch((error)=>{

      // Devuelvo el resultado del request al api.
      res.status(500).json(JSON.parse(data));

      // Muestro el request.
      console.log('GET API  '+reqUrl+' ERROR status: '+res.statusCode);

    });

  }
  else
    res.status(500).json({'error':'host access not available, request can not be made'});

}

// Cuando se recibe un request en modo POST.
let apiPOST = (req,res)=>{
  
  if (global.online){

    // Traigo la url a la que se debe repetir el request.
    let reqUrl = config.cache.host+req.originalUrl; 
    
    // Hago el request por POST.
    requestPOST(reqUrl,req.headers,req.body).then((response)=>{

      let reply = null;
      
      //response.data = '{dfff';

      try{
        reply = JSON.parse(response.data);
      }
      catch(e){
        res.status(500).json({error:'Invalid JSON response from host'});
      }

      // Si el app cumple con formato esa no code 404.
      res.status(200).json(reply);

      // Muestro el request.
      console.log('POST API '+reqUrl+' OK status: ',res.statusCode);      

    }).catch((error)=>{

      // Si el app cumple con formato esa no code 404.
      res.status(500).json(JSON.parse(error));

      // Muestro el request.
      console.log('POST API '+reqUrl+' ERROR status: '+res.statusCode);

    });

  }
  else
    res.status(500).json({'error':'host access not available, request can not be made'});  
  
}

// Agrego al middleware las acciones cuando se recibe post y get.
router.get('*',  apiGET);
router.post('*', apiPOST);

module.exports = router;
