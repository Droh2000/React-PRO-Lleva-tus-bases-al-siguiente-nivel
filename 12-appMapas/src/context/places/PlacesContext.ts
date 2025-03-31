// Aqui tenemos el contexto de React
import { createContext } from "react";

// Definimos como se mira el contexto (No hay que pensar que el Estado y el Contexto son lo mismo)
// el estado es la informacion que almacenamos en memoria y el contexto es lo que vamos a exponer a los demas componentes
// Aqui en el contexto es donde definimos metodos, funciones, propiedades (Lo que los otros componentes podran ver)
export interface PlacesContextProps {
    isLoading: boolean,
    useLocation?: [ number, number ],
    searchPlacesByTerm: (query: string) => Promise<any>,
}

// Como estamos en TS tenemos que definir como luce este contexto
// Para no defenirlo en el generico y que tengamos que inicializarle los valores ponemos lo de "as"
export const PlacesContext = createContext({} as PlacesContextProps);