
// Aqui requerimos acceso la informacion que se encuentra en el context provider, en la parte del PalcesProvider

import { useContext, useLayoutEffect, useRef } from "react";
import { MapContext, PlacesContext } from "../context";
import { Loading } from "./Loading";
import mapboxgl from "mapbox-gl";

// requerimos saber si esta en Loading o si no esta mostrar los datos del userLocation
export const MapView = () => {

    const { isLoading, useLocation } = useContext( PlacesContext );

    // Queremos establecer el mapa en el reducer
    const { setMap } = useContext( MapContext );

    // Por como esta la implementacion en la documentacion, podriamos solo con poner un ID en los DIV que estan dentro del return
    // pero como queremos que se puedan generar X cantidad de mapas y esto al ser ID solo se renderiza una sola vez
    // asi que ocupamos cambiar la implementacion manteniendo la referencia a ese elemento DIV para no hacerlo por el ID
    const mapDiv = useRef<HTMLDivElement>(null); // Al inicio tendra null

    // Para poder renderizar el mapa necesitamos esperarnos a que la referencia tenga un valor, que el componente haya sido montado
    // pero como queremos esperarnos que el componente ya tengalas dimenciones finales usaremos este hook
    useLayoutEffect(() => {
        // Si esta en true entonces esta cargando y no hacemos nada pero si esta en False mandamos a iniciar el mapa
        if(!isLoading){
            // Este codigo lo sacamos de la documentacion
            const map = new mapboxgl.Map({
                container: mapDiv.current!, // Como sabemos que si va a tener un valor le ponemos el !
                style: 'mapbox://styles/mapbox/light-v10', // Tema del mapa
                center: useLocation,
                zoom: 14
            });
            setMap(map);
        }
    }, [isLoading]);

    // En caso de no tener los datos, seria bueno mostrar un Loading
    if( isLoading ){
        return (<Loading/>);
    }

    return (
        <div ref={ mapDiv }
            style={{
                height: '100vh',
                left: 0,
                position: 'fixed',
                top: 0,
                width: '100vw'
            }}
        >
            { useLocation?.join(',') }
        </div>
    )
}