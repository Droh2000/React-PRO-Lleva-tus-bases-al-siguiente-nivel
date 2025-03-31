
// Aqui requerimos acceso la informacion que se encuentra en el context provider, en la parte del PalcesProvider

import { useContext } from "react";
import { PlacesContext } from "../context";
import { Loading } from "./Loading";

// requerimos saber si esta en Loading o si no esta mostrar los datos del userLocation
export const MapView = () => {

    const { isLoading, useLocation } = useContext( PlacesContext );

    // En caso de no tener los datos, seria bueno mostrar un Loading
    if( isLoading ){
        return (<Loading/>);
    }

    return (
        <div>
            { useLocation?.join(',') }
        </div>
    )
}