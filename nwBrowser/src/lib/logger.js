/*
const fs      = require('fs');
const config  = require('../data/config.json');

//A rmo un enum con los tipos de logeos.
const logTypes = {
  ERROR : 'ERROR',
  LOG   : 'LOG',
  DEBUG : 'DEBUG'
}

// Seteo el nombre del archivo.
let fileName = config.log.server+'log.txt';

// Guardo en un archivo el log.
let writeLoggerFile= (content)=>{

  try {

    let getCurrentDate   = dateType.getDate('YYYYMMDDHHMMSS');
    let parseCurrentDate = dateType.readableDate(getCurrentDate.toString(), true, '/');
    let _content         = `\r\n\r\n[${parseCurrentDate}]\r\n${content}`;

    // Antes de hacer la escritura del archivo reviso que existe.
    fs.exists(_file_name_,(exists)=>{
      
      // Si existe hago append, sino write.
      if (exists)
        fs.writeFileSync(_file_name_, _content, {'flag':'a'});
      else
        fs.writeFileSync(_file_name_, _content, {'flag':'w'});

    });

  }
  catch(err) {
    console.error(err)
  }

}

// Función que inicializa el logger
let init = (type, content) => {

  try{

    let _content;

    _content = '--------| ' + type + ' |--------\r\n';

    if (typeof content === 'object') {
      _content += JSON.stringify(content);
    } else {
      _content += content;
    }

    _content += '\r\n';

    if (type !== _LOG_TYPES_.DEBUG) {

      console.log(_content);

      // Guardo en el archivo.      
      writeLoggerFile(_content);

    } else if (type === _LOG_TYPES_.DEBUG && _DEBUG_) {

      console.log(_content);

      // Guardo en el archivo.
      writeLoggerFile(_content);

    }

  } catch(err) {
    console.error(`logger.js: error (${err.stack})`);
  }

}

// Funcion para registrar un log en modo LOG.
let logContent = (content) => {
  init(_LOG_TYPES_.DEBUG, content);
}

// Funcion para registrar un log en modo ERROR.
let errorContent = (content) => {
  init(_LOG_TYPES_.ERROR, content);
}

// Funcion para registrar un log en modo DEBUG.
let debugContent = (content) => {
  init(_LOG_TYPES_.DEBUG, content);
}

module.exports.debug = debugContent;
module.exports.error = errorContent;
module.exports.log   = logContent;*/