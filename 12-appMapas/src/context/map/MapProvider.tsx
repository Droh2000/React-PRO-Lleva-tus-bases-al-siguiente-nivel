import { AnySourceData, LngLatBounds, Map, Marker, Popup, SourceSpecification } from "mapbox-gl";
import { MapContext } from "./MapContext";
import { useContext, useEffect, useReducer } from "react";
import { MapReducer } from "./MapReducer";
import { PlacesContext } from "../places/PlacesContext";
import { direcctionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";

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

    // Para poder juntar dos lugares, ocupamos el punto inicial y final que contiene cada uno sus coordenadas
    const getRouteBeetwenPoints = async (start: [number, number], end: [number, number]) => {
        // Creamos el endpoint como viene en MapBox
        const resp = await direcctionsApi.get<DirectionsResponse>(`/${ start.join(',') };${ end.join(',') }`);

        // Esto lo hacemos para demostrar que tenemos estos datos por si lo querimos
        const { distance, duration, geometry } = resp.data.routes[0];
        // Obtenemos todas las coordenadas
        const { coordinates: coords } = geometry;

        let kms = distance / 1000;
        kms = Math.round( kms * 100 );
        kms /= 100;

        const minutes = Math.floor( duration / 60 );
        console.log({ kms, minutes });

        // Creamos el contenedor para que el mapa se posicione en los dos marcadores seleccionados y podamos ver los puntos completos
        // A esto le pasamos el punto de inicio y el punto final
        const bounds = new LngLatBounds(
            // Aqui le decimos que contenga ese punto
            start, start
        );

        // Recorremos todos los puntos de coordenadas que nos esta regresando
        for(const coord of coords){
            // Creamos una nueva coordenada la que almacenara el valor obtenido del bucle porque solo asi podemos agregarla con el Extends
            const newCoord: [number, number] = [ coord[0], coord[1] ];
            bounds.extend( newCoord );
        }

        // Para que se acomoden correctamente la pantalla segun los puntos
        state.map?.fitBounds( bounds, {
            padding: 200 // Para que no salgan los puntos muy a la orilla de la pantalla
        });

        // Polylined (Estos ejemplos los encontramos en la documentacion de Mapbox)
        // Esto es para que se marque la ruta del punto a punto que seria el camino para llegar un lugar a otro
        const sourceData: SourceSpecification = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                ]
            }
        }

        // Removemos la ruta ya que no pueden tener el mismo ID y queremos reutilizar este mismo ID
        if( state.map?.getLayer('RouteString') ){
            state.map.removeLayer('RouteString');
            state.map.removeSource('state.map.remove');
        }

        // De Id le pusimos este String cualquiera
        state.map?.addSource('RouteString', sourceData);

        // Diseño
        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                'line-color': 'black',
                'line-width': 3
            }
        });
    }

    return (
        <MapContext.Provider value={{
            ...state,
            // Tuvimos que agregar esto en la interfaz para permitir el dato
            setMap,
            getRouteBeetwenPoints,
        }}>
            {children}
        </MapContext.Provider>
    )
}