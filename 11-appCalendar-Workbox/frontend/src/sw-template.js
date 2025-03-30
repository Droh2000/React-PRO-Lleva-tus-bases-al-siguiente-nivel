// Aqui tenemos acceso a todo lo que ya sabemos de los SW pero lo queremos hacer basado en Workbox
// Este ImportScripts es como el "required" de Node y usamos esto que sacamos de la pagina de Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

// Cargamos el modulo para hacer posteos sin conexion (No lo instalamos, solo lo importamos porque lo estamos tomando de la importacion de arriba)
workbox.loadModule('workbox-background-sync');

// Aqui le decimos a Workbox que revice el directorio en el que esta y que instale todo lo que esta en el precahe
// que seria todo los archivos que estan definidos en el "workbox-config.js" (Durante el proceso de instalacion esto es lo que se va a ejecutar)
// Como no sabemos especificamente los nombre de archivos que vamos requerir con esta variable Workbox busca los archivos que nos propociona la importacion de arriba
workbox.precaching.precacheAndRoute( self.__WB_MANIFEST );

// Para que el codigo que vamos a emplear sea mas elegante
const { registerRoute } = workbox.routing;
// Estrategias que vamos a utilizar
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;

const { BackgroundSyncPlugin } = workbox.backgroundSync;

// Forma optimizada de las lineas de codigo de abajo (Asi tenemos centralizadas las peticiones)
const cacheFirstNetwork = [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'
]

registerRoute(
    ({ request, url }) => {
        // Aqui no usamos el pathname ya que si vemos por consola para este caso, esta propiedad viene el contenido con alfo de AJAX
        // tenemos mas propiedades que podemos manejar para detectar la misma URL en este caso es el href
        if( cacheFirstNetwork.includes( url.href ) ) return true;
        return false;
    },
    new CacheFirst()
)

// Ahora no tenemos que emplear el self.addEventlistener(... | Igual si quisieramos podriamos implementar todo esto en este archivo
// La idea es que con workbox solo llamemos estas mismas funcion
// Si nos vamos a la pestana de Network para los elementos del Bootstrap y fontAwesome los esta obteniendo del Disk Cache y no del Service Worker
// Estos deberian de estar en el Cache en el momento de la instalacion
// Hay varias formas pero en este caso estamos llamando con esta funcion una ruta la cual ejecuta el codigo que le especifiquemos cuando sea llamada y pase por el SW
/*registerRoute(
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
)*/

// Estos son los endpoints que queremos manejar
const cacheNetworkFirst = [
    '/api/auth/renew',
    '/api/events',
];

registerRoute(
    // Tambien podemos mandar un callback (Si regresa true va a aplicar el codigo de abajo)
    // DE los argumentos que recibimos podemos obtener la request y el URL
    ({ request, url }) => {
        // Con este console.Log podemos ver en la consola como en la Request esta el tipo de peticion, dominio, headers, mucha informacion de la solicitud
        // console.log({ request, url });
        // En la parte de la URL tenemos el nombre de las rutas, puerto, protocolo, (Asi evitamos ponerle el Localhost, ya que lo que nos importa son los nombres de ruta)
        // La idea es regresar un TRue si cumplela condicion del callback

        // Verificamos si en la URL la ruta es igual a las que tenemos en el arreglo
        if( cacheNetworkFirst.includes( url.pathname ) ) return true;

        return false;
    },
    new NetworkFirst()
)

// Queremos evitar el mensaje del Espere..., mostrar los eventos (Son los datos guardados de la aplicacion) y la parte de la renovacion
// La estrategia implementada es la del Network first en la que si no tiene conexion, la traiga de lo que se tenga en el cache almacenado
/*registerRoute(
    // Esta es la ruta para esta aplicacion que renueva el token
    // Para saber esta Ruta (Peticion) vimos en la consola del navegador los erroes que mostraba y ahi sacamos esta ruta 
    // No deberiamos de tener la ruta del Localhost:Puerto porque esta ruta no estara cuando se pase la pagina a produccion
    new RegExp('https://localhost:4002/api/auth/renew'),
    new NetworkFirst()
)
// Para saber esta ruta, lo que hicimos fue que despues de implementar la de arriba ejecutamos el comando del "yarn PWA" (Comando el codigo de abajo)
// y ejectuamos el servicio de la aplicacion, SkipWaitting, Activamos el modo Aoffline y al recargar la pagina en la consola veremos la ruta en el error
registerRoute(
    new RegExp('https://localhost:4002/api/events'),
    new NetworkFirst()
)*/

// Posteos Offline
// Estas si las dejamos separadas porque dependiendo de la peticion puede que requiramos o no ejecutar cierta logica
// Creamos este plugin que lo podemos reutlizar para cualquier cantidad de rutas (Este lo sacamos de la documentacion)
const bySyncPlugin = new BackgroundSyncPlugin('posteos-offline', {
    maxRetentionTime: 24 * 60 // Tiempo que durara el cache (El maximo es un dia)
});

// Le pasamos la ruta que se ejecuta cuando hacemos el posteo en la aplicacion (Al que se le hace el posteo)
registerRoute(
    new RegExp('http://localhost:4002/api/events'),
    new NetworkOnly({
        plugins: [bgSyncPlugin] // Aqui podemos mandar mas plugins si asi lo requerimos
    }),// Tipo de estrategia que aplicara
    'POST'// Especificamos el tipo de peticion
)

// Implementacion del PUT y DELETE
// Ahora en los PUT como son dinamicos basicamente tendriamos que evaluar solo la ruta que hace la peticion y despues de cierto Slash que incluya los demas
// toda esa parte ejecutandose en un PUT
registerRoute(
    new RegExp('http://localhost:4002/api/events/'),// La URL es la misma pero tomara en cuenta todo el codigo que venga despues ejecutandolo en un DELETE
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'DELETE'
)

registerRoute(
    new RegExp('http://localhost:4002/api/events/'),
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'PUT'
)
// Si alguien actualiza algo que algien mas borro pero no se da cuenta que ya esta borrado porque esta offline y no obtuvo los cambios
// Aqui el ultimo request es lo que se queda, por ejemplo en este caso la persona que esta Ofline al conectarse otravez les dara un error
// ya depende de nosotros de agregar las validaciones para que se muestre de manera amigable como un mensaje

// Los cambios implementados aqui hace que solo el SW cambio, no toda la aplicacion y para eso creamos el comando de 
// yarn PWA para ejecutar solo este proceso 
// Despues de eso volvemos a levantar el servidor con: serve -s build