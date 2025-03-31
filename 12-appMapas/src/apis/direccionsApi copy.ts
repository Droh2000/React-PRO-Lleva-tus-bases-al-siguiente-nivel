import axios from 'axios';

const direcctionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: 'MISMO_TOKEN_QUE_SE_NOS_GENERO',
    }
});

export default direcctionsApi;