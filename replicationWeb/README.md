# REPLICATION SERVER

Ejemplo de webserver usando NodeJS y ExpressJS, que agrega una feature especial que es la de sincronizar el contenido de una carpeta local, con archivos de un host especifico. Cada X tiempo el mismo realizara la descargar de archivos y comprobación de los mismos.

### Instalación:

Para descargar todos los modulos adicionales:
```sh
$ npm install
```

### Configuración:
En el archivo "config.json", se encuentra la config. basica del server y el host de donde se obtendran la lista de archivos a descargar.

```json
{
  "webFiles"      : "./www",
  "replicaHost"   : "http://127.0.0.1/replica/fileList.json",
  "host"          : "http://127.0.0.1/replica/",
  "checkInterval" : 10000
}
```

#### Lista de archivos:
Debe estar publicado en el server que queremos sincronizar un archivo json con el nombre que dese, en este caso es "fileList.json", debe tener la sig. estructura:

```json
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

Cada vez que se realize un cambio en el archivo se debera correr el script que actualiza la lista de archivos y los checksums.
```
### Ejecución:
Para ejecutar el proyecto ejecuar:

```sh
$ node recorridosLoader.js
```
