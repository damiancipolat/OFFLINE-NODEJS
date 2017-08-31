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


Ejemplo de prueba:
http://127.0.0.1:5000/felix.txt
