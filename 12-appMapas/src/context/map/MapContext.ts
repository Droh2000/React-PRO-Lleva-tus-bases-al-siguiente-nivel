// Creamos el contexto del mapa poder mandarle acciones desde cualquier lugar

import { Map } from "mapbox-gl";
import { createContext } from "react";

// Esta es la informacion que vamos a exponer a los componentes
interface MapContextProps {
    isMapReady: boolean,
    map?: Map,
    // Para que acepte los metodos
    setMap: (map: Map) => void,
}

export const MapContext = createContext({} as MapContextProps);