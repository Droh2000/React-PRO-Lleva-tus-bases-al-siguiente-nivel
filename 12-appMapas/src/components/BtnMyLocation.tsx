// Este componente lo creamos para cuando nos movemos por el mapa y nos perdemos, queremos que al precionar este boton

import { useContext } from "react"
import { MapContext, PlacesContext } from "../context";

// nos regresa a la ubicacion donde esta el marcador
export const BtnMyLocation = () => {
    // Para que esto funcione requerimos que el mapa este lista y saber la ubicacion del usuario
    // estos se encuentran en contextos diferentes asi que vamos a ocupar usar los dos
    const { map, isMapReady } = useContext( MapContext );
    const { useLocation } = useContext( PlacesContext );

    const onClick = () => {
        // si el mapa no esta listo ni el useLocation mandamos un error
        if( !isMapReady ) throw new Error('Mapa no esta Listo');
        if( !useLocation ) throw new Error('No hay ubicacion del usuario');

        // Mandamos al usuario en la ubicacion del marcador
        map?.flyTo({
            zoom: 14,
            center: useLocation
        })
    }

    return (
        <button
            className="btn btn-primary"
            onClick={ onClick }
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 999
            }}
        >
            My Ubicacion
        </button>
    )
}