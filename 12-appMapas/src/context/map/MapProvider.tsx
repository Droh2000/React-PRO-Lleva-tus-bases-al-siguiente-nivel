import { Map, Marker, Popup } from "mapbox-gl";
import { MapContext } from "./MapContext";
import { useContext, useEffect, useReducer } from "react";
import { MapReducer } from "./MapReducer";
import { PlacesContext } from "../places/PlacesContext";

export interface MapState {
    isMapReady: boolean;
    map?: Map; // ES opcional porque en un momento esta nulo y hasta que esta listo es cuando lo mostramos
    // Cuando obtenemos los lugares buscados, estos internamente tiene una propiedad que seria la longitud y latitud
    // esta es la informacion que requerimos para crear un marcadores en otros lugares, ahora el espacio para recibir y crear esos
    // marcadores de cada lugar tiene que ser en el contexto de "MapContext" porque ahi tenemos el control del mapa y marcadores
    markers: Marker[],
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: [], // EStos son los marcadores que sacamos de los lugares obtenidos de la busquedad
}

interface Props {
    children: React.JSX.Element | React.JSX.Element[]
}

// Esto es lo que los demos componentes pueden observar (La informacion que les vamos a compartir es lo que esta en los values)
export const MapProvider = ( {children}: Props) => {

    const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE);

    // Ahora quienes concen los lugares es el PlacesContext y el que conoces los marcadores es el Mapcontext, para hacer esa relacion
    // tenemos que saber cual de los provedores de informacion es el que no tiene ninguna dependencia, en este caso por como estan
    // definidos en el MapsApps, el MapProvider depende del PlacesProvider ya que el mapa no se puede crear si no tenemos la ubicacion
    // del usuario que esta en el PlacesProvider, entonces por eso en el MapProvider podemos agreagrle la dependencia y leer el contexto
    // En los "places" que tomamos es en donde estan los datos que nos interesa
    const { places } = useContext( PlacesContext );

    // Con este sabemos cuando ocurrieron cambios en los Places, asi sabemos cuando tenemos un arreglo vacio o nuevos lugares
    useEffect(() => {
        // Primero tenemos que borrar todos los marcadores anteriores, lo que pasa es que los marcadores estan incrustados en el mapa y aunque borremos el estado
        // con el dispatch siempre van a estar existiendo dentro del mapa, para eliminarlos cada uno de estos marcadores tienen una funcion interna
        // para borrarse a si mismo (Si aqui tenemos 0 elementos en el arreglo no pasara nada)
        state.markers.forEach( marker => marker.remove() );

        // Estos son los nuevos maracadores que vamos a insertar en el Initial State
        const newMarkers: Marker[] = [];

        for (const place of places) {
            // Extramos la longitud y latitud
            const [ lng, lat ] = place.center;

            const popup = new Popup()
                .setHTML(`
                    <h6>${ place.text_es }</h6>
                    <p>${ place.place_name_es }</p>
                `);
            // Creamos el nuevo marcador
            const newMarker = new Marker()
                .setPopup( popup )
                .setLngLat([ lng, lat ])
                .addTo( state.map! ) // Lo agregamos al mapa pero esto solo se puede llamar si ya tenemos el mapa creado

            newMarkers.push( newMarker );
        }

        // Para guardar los marcadores en el State
        dispatch({ type: 'setMarkers', payload: newMarkers });

    }, [ places ]);

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