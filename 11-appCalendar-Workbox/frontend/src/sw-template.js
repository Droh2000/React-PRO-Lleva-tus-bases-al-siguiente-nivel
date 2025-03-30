// Aqui tenemos acceso a todo lo que ya sabemos de los SW pero lo queremos hacer basado en Workbox
// Este ImportScripts es como el "required" de Node y usamos esto que sacamos de la pagina de Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

// Aqui le decimos a Workbox que revice el directorio en el que esta y que instale todo lo que esta en el precahe
// que seria todo los archivos que estan definidos en el "workbox-config.js" (Durante el proceso de instalacion esto es lo que se va a ejecutar)
// Como no sabemos especificamente los nombre de archivos que vamos requerir con esta variable Workbox busca los archivos que nos propociona la importacion de arriba
workbox.precaching.precacheAndRoute( self.__WB_MANIFEST );

// Para que el codigo que vamos a emplear sea mas elegante
const { registerRoute } = workbox.routing;
// Estrategias que vamos a utilizar
const { CacheFirst, NetworkFirst } = workbox.strategies;

// Ahora no tenemos que emplear el self.addEventlistener(... | Igual si quisieramos podriamos implementar todo esto en este archivo
// La idea es que con workbox solo llamemos estas mismas funcion
// Si nos vamos a la pestana de Network para los elementos del Bootstrap y fontAwesome los esta obteniendo del Disk Cache y no del Service Worker
// Estos deberian de estar en el Cache en el momento de la instalacion
// Hay varias formas pero en este caso estamos llamando con esta funcion una ruta la cual ejecuta el codigo que le especifiquemos cuando sea llamada y pase por el SW
registerRoute(
    // Requerimos el URL de lo que queremos aplicarle el Cache
    // Cuando venga una ruta que cumpla esa condicion
    new RegExp('https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'),
    // Queremos aplicar una estrategia del cache pero para eplicar eso tenemos que mandar como segundo argumento la estategia
    // en la que primero va al Cache y si no esta lo obtiene desde internet
    new CacheFirst()
)

// Aqui hacemos los mismo para el otro CDN (Estas rutas son almacenadas en el momento que la aplicacion solicita el recurso)
registerRoute(
    new RegExp('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'),
    new CacheFirst()
)

// Queremos evitar el mensaje del Espere..., mostrar los eventos (Son los datos guardados de la aplicacion) y la parte de la renovacion
// La estrategia implementada es la del Network first en la que si no tiene conexion, la traiga de lo que se tenga en el cache almacenado
registerRoute(
    // Esta es la ruta para esta aplicacion que renueva el token
    // Para saber esta Ruta (Peticion) vimos en la consola del navegador los erroes que mostraba y ahi sacamos esta ruta 
    new RegExp('https://localhost:4002/api/auth/renew'),
    new NetworkFirst()
)
// Para saber esta ruta, lo que hicimos fue que despues de implementar la de arriba ejecutamos el comando del "yarn PWA" (Comando el codigo de abajo)
// y ejectuamos el servicio de la aplicacion, SkipWaitting, Activamos el modo Aoffline y al recargar la pagina en la consola veremos la ruta en el error
registerRoute(
    new RegExp('https://localhost:4002/api/events'),
    new NetworkFirst()
)

// Los cambios implementados aqui hace que solo el SW cambio, no toda la aplicacion y para eso creamos el comando de 
// yarn PWA para ejecutar solo este proceso 
// Despues de eso volvemos a levantar el servidor con: serve -s build