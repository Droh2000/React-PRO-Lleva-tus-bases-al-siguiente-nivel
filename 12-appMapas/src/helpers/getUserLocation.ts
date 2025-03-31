
export const getUserLocation = async(): Promise<[number, number]> => {
    return new Promise( (resolve, reject) => {
        // Obtenemos la posicion actual del usuario
        navigator.geolocation.getCurrentPosition(
            // Esta funcion es si todo sale bien (Por el objeto tenemos podemos desestructurar las coordenadas)
            ({ coords }) => {
                // Asi pasamos los datos porque asi es como los quiere la libreria que vamos a usar del mapa
                resolve([ coords.longitude, coords.latitude ]);
            },
            // Esta funcion se ejecuta si algo sale mal
            ( err ) => {
                alert('No se pudo obtener la geolocalizacion');
                console.log(err);
                reject();
            }
        );
    });
}