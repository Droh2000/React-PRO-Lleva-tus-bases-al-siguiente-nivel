import { useReducer } from "react";

// Nos creamos como se mirara ese estado inicial
interface CounterState {
    counter: number,
    previous: number,
    changes: number,
}

// La idea va a ser que cada vez que incrementemos en un valor se incrementara el valor del contador, la propiedad de previus
// va a tener el valor anterior (Para mantener el estado anterior) esto se usa cuando el usario tiene permitido cancelar los cambios
// y asi lo mandamos al estado anterior y los changes nos diran cuantos cambias se han realizado
const INITIAL_STATE: CounterState = {
    counter: 0,
    previous: 0,
    changes: 0,
}

// En la funcion pura del "reducer" significa que recibe un estado inicial o un estado anterior, una accion y produce otro estado
// Recibimos como argumento el state del mismo tipo que definimos y la accion
/* Las acciones seria por ejemplo:
{
    type: 'Nombre de la Accion',
    payload: Es el dato que requiramos para manipular y puede ser opcional
}
Asi que nos creamos el tipo de dato para decirle a TS como se miran las acciones y a la vez controlar las acciones permitidas en el reducer

En este caso las acciones las definimos en el Type y el payload lo ponemos entre llavez porque si y 
especificarle el valor , todas las acciones las defenimos entre {} y las separamos con el operado OR |

Solo estas dos tipos de acciones las vamos a permitir
*/
type CounterAction = 
                   | { type: 'increaseBy', payload: { value: number; } }
                   | { type: 'reset' } // Este es para resetear a un estado inicial

const counterReducer = ( state:CounterState, action: CounterAction): CounterState => {
    switch (action.type) {
        // Aqui definimos lo que va a realizar cada accion y tenemos que regresar algo del tipo CounterState
        case 'reset':    
            return{
                counter: 0,
                changes: 0,
                previous: 0
            }
        case 'increaseBy':    
            return{
                counter: 0,
                changes: 0,
                previous: 0
            }
        default:
            return state;
    }
}

export const CounterReducerComponent = () => {

    /*
        El useReducer es parecido al useState en cuanto a que maneja un estado interno en el componente
        por estado nos referimos a la informacion que tienen los objetos en ese punto en el tiempo determinado
        es decir en el momento en el que el componente se recarga ese es el estado de la aplicacion en cual el counter es 0 
        pero en el momento en que comenzamos a incrementarlo el estado del counter es ese valor en el que se incremento

        El useReducer se usa cuando el estado es mas complejo y cuando hay cambios que afectan diferentes cosas de manera
        simultanea, entre los argumentos que se le mandan al hook son:
            * reducer: Es una funcion pura que solo debe de trabajar con los argumentos que recibe y ya, no debe de tener
                       interaccion con el mundo externo y tampoco debe de ser asyncrona
            * initialState: Este es el satado inicial que le queremos dar al useReducer
            * init: Es para implemetar el Lazyload es decir mediante una carga perezosa cuando el componente ya esta construido se llama este init 
        
        El "state" contiene cada una de las propiedades que definimos de counter, prevoius, changes
            Asi que de este podemos desestructurar estas propiedades que las que se usaran 
        la funcion "dispatch" se encrga de ejecutar las acciones
    */
    const [{ counter }, dispatch] = useReducer(counterReducer, INITIAL_STATE);

    const handlerClick = () => {
        // Aqui se manda la accion al reducer, esa accion es la que se envia como parametro a la funcion Reducer que se va
        // al Switch/case y dentro ejecuta la logica correspondiente del nuevo estado y React con el useReducer sabe que el
        // esta cambio por consecuencia tiene que redibujar lo que tenga que redibujar
        dispatch({ type: 'reset' });
    }

    return (
        <>
            <h1>Counter Reducer: { counter }</h1>

            <button onClick={ handlerClick }>
                Reset
            </button>
        </>
    )
}