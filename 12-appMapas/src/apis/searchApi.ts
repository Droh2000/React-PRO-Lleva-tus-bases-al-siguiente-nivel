import axios from 'axios';

// Cada vez que se use esta instancia, va a tener esta configuracion por defecto
const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places', // Esta ruta la sacamos de MapBox que se genera al buscar un lugar en el mapa
    // Estos parametros nos los dio Mapbox al hacer una peticion de la URL que nos genera al buscar un lugar en el mapa
    params: {
        limit: 5,
        language: 'es',
        access_token: 'MISMO_TOKEN_QUE_SE_NOS_GENERO',
    }
});

export default searchApi;