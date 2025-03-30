// Aqui tenemos acceso a todo lo que ya sabemos de los SW pero lo queremos hacer basado en Workbox
// Este ImportScripts es como el "required" de Node y usamos esto que sacamos de la pagina de Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

// Aqui le decimos a Workbox que revice el directorio en el que esta y que instale todo lo que esta en el precahe
// que seria todo los archivos que estan definidos en el "workbox-config.js" (Durante el proceso de instalacion esto es lo que se va a ejecutar)
// Como no sabemos especificamente los nombre de archivos que vamos requerir con esta variable Workbox busca los archivos que nos propociona la importacion de arriba
workbox.precaching.precacheAndRoute( self.__WB_MANIFEST );
