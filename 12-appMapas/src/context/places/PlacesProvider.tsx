// Este es el componente que vamos a terminar utilizando para obtener de aqui la informacion del context

import { PlacesContext } from "./PlacesContext"

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
    return (
        // El Value le pasamos los valores inicializados que son los valores del PlacesContextProps y es por eso que en el Context no 
        // iniciamos los valores y solo le pusimos un "as" ya que tambien lo tenemos que inicializar aqui
        <PlacesContext.Provider value={{
            isLoading: true,
            useLocation: undefined,
        }}>
            { children }
        </PlacesContext.Provider>
    )
}