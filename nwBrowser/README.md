# NW Browser

Ejemplo de aplicación de browser usando Node Webkit, agregando features de webserver y cache de archivos estaticos.

### Instalación:

Para descargar todos los modulos adicionales:
```sh
$ npm install
```

### Configuración:
En el archivo "/data/config.json", se encuentra la config. basica del webserver y el updater de contenido.

```json
{
  "base_path" : "D:\\WWW\\Test\\Node JS\\offline\\nwBrowser\\src\\data\\",
  "server":{
    "port"      : 80,
    "web_files" : "/www/",
    "virtual_routes"  : "/www/index.html"
  },
  "updater":{
    "host_copy"     : "http://127.0.0.1:9000",
    "file_list"     : "fileList.json",
    "interval"      : 3000,
    "download_path" : "/data/downloads/",
    "copy_path"     : "/wwww"
  },
  "log":{
    "server"  : "/logs/server/",
    "updater" : "/logs/updater/"
  }
}

-fileList.json:

{
	"files":[
		{"name":"index.html","checksum":"0e818c9d7218a36ac2e07014383aca83d04da10b"},
		{"name":"/imgs/alf.jpg","checksum":"a55793c5e1541996fdcc7a99333dcba7696feddb"},
		{"name":"/imgs/inspector.jpg","checksum":"1e78aab2fc19bf0b8c78bb2c3fea896973015175"}		
	]
}

- Forzar siempre la descarga del archivo:
"checksum": "all"

- Descargar si hay cambios:
"checksum": "1e78aab2fc19bf0b8c78bb2c3fea896973015175"

```

### Ejecución:
Para ejecutar el proyecto ejecuar:

```sh
$ node recorridosLoader.js
```
