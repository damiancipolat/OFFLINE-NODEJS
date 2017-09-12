# Cache Server

Ejemplo de proxy server y sistema de cache de archivos con un webserver.

### Instalación:

Para descargar todos los modulos adicionales:
```sh
$ npm install
```

### Configuración:
En el archivo "/config.json", se encuentra la config. basica del webserver y el updater de contenido.

```json
{
  "server":{    
    "port"     : 5000,
    "webFiles" : "/www"
  },
  "cache" :{
    "host"      : "http://127.0.0.1:9000",
    "apiUrl"	: "/api",
    "downloads" : "/www",
    "fileRoot"  : "index.html"
  }
}

```

### Ejecución:
Para ejecutar el proyecto ejecutar:

```sh
$ node app.js
```
