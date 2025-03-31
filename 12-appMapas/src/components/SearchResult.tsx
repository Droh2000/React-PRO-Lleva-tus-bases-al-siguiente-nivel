import { useContext, useState } from "react"
import { MapContext, PlacesContext } from "../context";
import { Feature } from "../interfaces/places";

export const SearchResult = () => {

    // Requerimos el contexto para sacar los lugares
    const { places, isLoadingPlaces } = useContext( PlacesContext );

    // Queremos que cuando se hace click en el cuadro (Que sale en los resultados de busquedad), lleve al usuario a ese lugar en especifico donde esta el marcador
    // asi que vamos a ocupar el mapa y por tanto el contexto correspondiente
    const { map } = useContext( MapContext );

    // Esto es para que cuando el usuario haga click en el cuadro este se seleccione de otro color para distinguirlo de los demas
    const [ activeId, setActiveId ] = useState('');

    const onPlacedClicked = ( place: Feature ) => {
        // La propiedad Center de abajo esta esperando que le pasemos la latotiud y longitud
        const [ lng, lat ] = place.center;
        setActiveId( place.id );// Obtenemos el lugar al que se le hizo click
        map?.flyTo({
            zoom: 14,
            center: [lng, lat]
        });
    } 

    // Hay detectar si es True para poner que se esta cargando
    if( isLoadingPlaces ){
        return (
            <div className="alert alert-primary mt-2 text-center">
                <h6>Buscando</h6>
                <p>Espere por favor...</p>
            </div>
        )
    }

    // Hacemos esta condicion para el caso que no haya nada que mostrar y porque en la vista se estaba agregando la separacion de los dos elementos
    // de arriba y abajo
    if( places.length === 0 ){
       return <></>;
    }

    return (
        <ul className="list-group mt-3">
            {
                // Recorremos cada uno de los lugares almacenados en el arreglo
                // Despues de la flecha le pusimos parentesis para hacer un return explicito 
                places.map( place => (
                    <li
                        key={ place.id }
                        // Agregamos condicion para seleccionar el lugar al que le dimos click (Cuando sea true nos agregara la clase 'active')
                        className={`list-group-item list-group-item-action pointer ${ (activeId === place.id) ? 'active' : '' }`}
                        onClick={ () => onPlacedClicked(place) }
                    >
                        <h6>{ place.text_es }</h6>
                        <p
                            style={{
                                fontSize: '12px'
                            }}
                        >
                            { place.place_name }
                        </p>
                        
                        {/* Cambiamos el color del boton segun si esta seleccionada la caja o no */}
                        <button className={`btn btn-sm ${ activeId === place.id ? 'btn-outline-light' : 'btn-outline-primary'}`}>
                            Direcciones
                        </button>
                    </li>
                ))
            }
        </ul>
    )
}