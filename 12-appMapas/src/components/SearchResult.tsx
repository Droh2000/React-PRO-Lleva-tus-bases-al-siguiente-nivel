import { useContext } from "react"
import { PlacesContext } from "../context";

export const SearchResult = () => {

    // Requerimos el contexto para sacar los lugares
    const { places, isLoadingPlaces } = useContext( PlacesContext );

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
                        className="list-group-item list-group-item-action"
                    >
                        <h6>{ place.text_es }</h6>
                        <p
                            className="text-muted"
                            style={{
                                fontSize: '12px'
                            }}
                        >
                            { place.place_name }
                        </p>

                        <button className="btn btn-outline-primary btn-sm">
                            Direcciones
                        </button>
                    </li>
                ))
            }
        </ul>
    )
}