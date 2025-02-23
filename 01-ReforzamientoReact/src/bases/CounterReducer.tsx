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
    */
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const handlerClick = () => {
        setCounter( prev => prev + 1 );
    }

    return (
        <>
            <h1>Counter Reducer: { counter }</h1>

            <button onClick={ handlerClick }>
                +1
            </button>
        </>
    )
}