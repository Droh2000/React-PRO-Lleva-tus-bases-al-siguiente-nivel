import { ChangeEvent, useContext, useRef } from "react"
import { PlacesContext } from "../context";
import { SearchResult } from "./SearchResult";

export const SearchBar = () => {

    // Vamos a hacer que solo se emitan valores cuando queremos que se emitan porque no podemos disparar peticiones
    // HTTP por cada tecla o felchas que toquemos (hay puetes para esto pero lo vamos a hacer manual)
    // Haremos que cuando la persona deje de escribir por N cantidad de milesimas de segundos entonces ahi es donde emitimos la accion
    const debounceRef = useRef<NodeJS.Timeout>(null); // De tipo generico este es el tipo para que sepa que es un timer

    const { searchPlacesByTerm } = useContext( PlacesContext );

    // Le especificamos el tipo de dato para saber el autocompletado
    const onQueryChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
        // La idea es que con cada nuevo valor emitido vamos a reiniciar el Timer, pero tambien no hay que ejecutar nada
        // si no tenemos nada escrito
        if( debounceRef.current ) clearTimeout( debounceRef.current );

        // Definimos que el Timeout se ejecute este timepo
        debounceRef.current = setTimeout(() => {
            // Aqui vamos a mandar a llamar la peticion, tenemos que usar su correspondiente contexto
            searchPlacesByTerm( event.target.value );// Le tenemos que pasar el Query
        }, 1000);
    }


    return (
        <div className="search-container">
            <input
                type="text"
                className="form-control"
                placeholder="Buscar Lugar..."
                onChange={ onQueryChanged }
            />

            {/*
                Como ya tenemos los lugares cargados en el State (Store) solo hay que mostrarlos
                en este lugar con este componente que creamos
            */}
            <SearchResult/>
        </div>
    )
}