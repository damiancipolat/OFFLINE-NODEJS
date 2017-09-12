const dns  = require('dns');
const http = require('http');

// Me permite revisar si resuelve el dns en ese host.
module.exports.resolve = (url)=>{

  return new Promise((resolve,reject)=>{

    dns.resolve(url,(err)=>{

      if (err){
        console.log(err);
        reject(true);
      }
      else
        resolve(true);

    });

  });

};

// Me permite saber si tengo acceso al host.
module.exports.hostCheck = (url)=>{

  return new Promise((resolve,reject)=>{

    http.get(url,(res)=>{
      resolve(res);
    }).on('error', (e)=>{
      reject(e);
    });

  });

}
