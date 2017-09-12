
// Analiza si una url es de un archivo estatico.
module.exports.isFile = (pathname) => {
    return pathname.split('/').pop().indexOf('.') > -1;
}

// Analiza si una url es una ruta virtual / folder.
module.exports.isDir = (pathname)=>{
 return !isFile(pathname); 
}

