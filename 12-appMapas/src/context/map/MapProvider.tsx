import { Map, Marker, Popup } from "mapbox-gl";
import { MapContext } from "./MapContext";
import { useReducer } from "react";
import { MapReducer } from "./MapReducer";

export interface MapState {
    isMapReady: boolean;
    map?: Map; // ES opcional porque en un momento esta nulo y hasta que esta listo es cuando lo mostramos
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined
}

interface Props {
    children: React.JSX.Element | React.JSX.Element[]
}

// Esto es lo que los demos componentes pueden observar (La informacion que les vamos a compartir es lo que esta en los values)
export const MapProvider = ( {children}: Props) => {

    const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE);

    const setMap = ( map: Map ) => {

        // Aqui le podemos hacer modificaciones al mapa 
        const myLocationPopup = new Popup()
            .setHTML(`
                <h4>Aqui estoy</h4>
                <p>En algun lugar de un gran pais</p>
            `);

        // Nos creamos el marcador
        new Marker({
            color: '#61DAFB'
        })
            .setLngLat( map.getCenter() )// Le pasamos la posicion donde queremos colocar el marcador
            .setPopup( myLocationPopup )
            .addTo( map ); // Aqui es donde queremos colocar el marcador

        dispatch({ type: 'setMap', payload: map });
    }

    return (
        <MapContext.Provider value={{
            ...state,
            // Tuvimos que agregar esto en la interfaz para permitir el dato
            setMap,
        }}>
            {children}
        </MapContext.Provider>
    )
}