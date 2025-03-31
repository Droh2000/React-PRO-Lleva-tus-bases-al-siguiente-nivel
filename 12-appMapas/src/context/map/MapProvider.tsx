import { Map } from "mapbox-gl";
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

export const MapProvider = ( {children}: Props) => {

    const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE);

    return (
        <MapContext.Provider value={{
            ...state
        }}>
            {children}
        </MapContext.Provider>
    )
}