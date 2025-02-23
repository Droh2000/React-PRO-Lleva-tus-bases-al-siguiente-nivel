import { useReducer } from "react";
import { CounterState } from "./interfaces/interfaces";
import { counterReducer } from "./state/counterReducer";

// Aqui vamos a factorizar el codigo separando la logica
// Tenemos la libertad de crearnos el Filersystem como mejor nos plasca, este caso como el patron del Reducer
// fue en el que se baso el patron Redux en el cual tenemos las carpeta donde tenemos las acciones
// tambien una carpeta donde creamos las intefaces, la carpeta State donde va a estar el reducer
// El componente unicamente va a tener lo necesario para trabajar lo requerido que es el dispatch de las acciones

const INITIAL_STATE: CounterState = {
    counter: 0,
    previous: 0,
    changes: 0,
}

// Mas adelante vamos a trabajar con las Actions Creators que son generadores de acciones porque asi como tenemos implementado el patron
// del reducer es que si en el futuro requerimos hacer un cambio aunque sea muy sutil entonces tendremos
// que implementar ese cambio en todos los archivos donde se implementaba esa accion uno por uno manualmente modificarlo
// Lo mejor es tener centralizada la creacion de acciones y de esa manera daber cual fue disparada y si hay que hacer un cambio de ese 
// tipo ya se modifique en todos los archivos

export const CounterReducerComponent = () => {
    const [counterState, dispatch] = useReducer(counterReducer, INITIAL_STATE);

    const handlerReset = () => {
        dispatch({ type: 'reset' });
    }

    const increaseBy = (value: number) => {
        dispatch({ type: 'increaseBy', payload: {value} });
    }

    return (
        <>
            <h1>Counter Reducer Segmentado</h1>
            <pre>
                { JSON.stringify( counterState, null, 2) }
            </pre>

            <button onClick={ () => increaseBy(1) }>
                +1
            </button>
            <button onClick={ () => increaseBy(5) }>
                +5
            </button>
            <button onClick={ () => increaseBy(10) }>
                +10
            </button>
            <button onClick={ handlerReset }>
                Reset
            </button>
        </>
    )
}