import { Map, Marker } from "mapbox-gl";
import { MapState } from "./MapProvider";

type MapAction = 
    { type: 'setMap', payload: Map }
// Tenemos que impactar el State para que al agregar nuevos marcadores al mapa se borren a si mismo
// Entonces aqui requerimos un tipo de accion para manejar eso
| { type: 'setMarkers', payload: Marker[] };

export const MapReducer = ( state: MapState, action: MapAction ): MapState => {
    switch ( action.type ) {
        case 'setMap':
            return {
                ...state, // Sacamos una copia actual del estado
                isMapReady: true,
                map: action.payload, // Establecemos el mapa
            }
        // Para modificar el estado de los marcadores que que al agregar nuevos se borren los antiguos
        case 'setMarkers':
            return {
                ...state,
                markers: action.payload
            }
        default:
            return state
    }
}