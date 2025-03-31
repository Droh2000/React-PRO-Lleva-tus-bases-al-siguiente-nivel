// Este es el componente que vamos a terminar utilizando para obtener de aqui la informacion del context

import { useReducer } from "react"
import { PlacesContext } from "./PlacesContext"
import { placesReducer } from "./placesReducer"

// Definimos como queremos que se mire el estado
export interface PlacesState {
    isLoading: boolean,
    useLocation?: [ number, number ],
}

// Cuando carga la aplicacion inmediatamente vamos a querer aplicandole el Loading para saber si tenemos la ubicacion de la persona
const INITIAL_STATE: PlacesState = {
    isLoading: true,
    useLocation: undefined,
}

// Saber como luce el Componente hijo que recibe como argumento
interface Props {
    children: React.JSX.Element | React.JSX.Element[]
}

// Usemos el contexto en el provider y este provider lo coloquemos en el arbol de componentes
export const PlacesProvider = ({ children }: Props) => { // Recibe un JSX como argumento
    // Utilizamos el Reducer
    // El tercer argumento es la funcion inicializadora para que inicialize el state pero ahora no lo requerimos
    const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

    return (
        // El Value le pasamos los valores inicializados que son los valores del PlacesContextProps y es por eso que en el Context no 
        // iniciamos los valores y solo le pusimos un "as" ya que tambien lo tenemos que inicializar aqui
        <PlacesContext.Provider value={{
            ...state,// Esparcimos el State para poder tomar cualquier informacion que nesecitemos del contexto
            
        }}>
            { children }
        </PlacesContext.Provider>
    )
}