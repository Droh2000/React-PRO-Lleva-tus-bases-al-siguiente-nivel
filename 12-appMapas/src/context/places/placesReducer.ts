// Cuando estamos con el contexto es bueno usar el Reducer porque no 
// sabemos si las funcionalidades van a crecer el dia de manana

import { PlacesState } from "./PlacesProvider";

// Esta es una funcion pura osea que solo se puede resolver con los argumentos que recibe sin requerir acceder a cosas del mundo exterior
// El punto de entrada de un reducer es una funcion pura que recibe el estado y regresa un objeto del mismo tipo del estado y tambien recibe las acciones
// para determinar determinar el nuevo estado puede que una accion no genere ningun nuevo estado pero de todas maneras esta funcion tiene que regresar siempre
// el estado (El estado es un objeto que sea igual al INITIAL_STATE que definimos en el PlaceProvider.tsx que tendra todas esas propiedades o las que definamos)

// Las acciones asi se miran (Estas son las acciones que van a estar permitidas en este reducer)
type PlacesAction = {
    type: 'setUserLocation', // Cuando recibamos este tipo de accion, abajo definimos la informacion que vamos a estar recibiendo
    // En payload (La informacion que puede tener la accion) estamos esperando que venga los datos como [Longitud, Latitud]
    payload: [number, number]
};

export const placesReducer = ( state: PlacesState, action: PlacesAction ): PlacesState => {
    // Evaluamos cada una de las acciones
    switch( action.type ){
        case 'setUserLocation':
            return {
                ...state,// Copiamos todas sus propiedades como se encuentran (Las esparcimos para crear un nuevo estado)
                isLoading: false,// Porque ya termino de cargar al tener ya la informacion
                useLocation: action.payload,
            }
        default:
            // Regresamos el state como tal sin cambios si no recibimos una accion valida
            return state;
    }
}