import { useReducer } from "react";
import { CounterState } from "./interfaces/interfaces";
import { counterReducer } from "./state/counterReducer";
//import { doIncreaseBy, doReset } from "./actions/actions";
// Como arriba podemos tener un monton de importaciones
import * as CounterActions from "./actions/actions";

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

export const CounterReducerComponent = () => {
    const [counterState, dispatch] = useReducer(counterReducer, INITIAL_STATE);

    const handlerReset = () => {
        //dispatch({ type: 'reset' });

        // Ahora llamamos asi el dispatch
        // El doReset lo que va a hacer es mandar a llamar la accion que es lo que nos retorna esta funcion en forma de objeto
        // Asi la ventaja que tenemos es que si cambiamos el ombre de la accion en el "actions.ts" el cambio solo lo tenemos que hacer en ese archivo y en 
        // el archivo de "counterReducer.ts" dentro del Switch/case (Incluso todabia lo podemos mejorar creando un objeto el cual usariamos en todo 
        // donde se tiene el nombre y los cambios solo se harian ahi, asi como en el patron REDUX)
        dispatch( CounterActions.doReset() );
    }

    const increaseBy = (value: number) => {
        dispatch( CounterActions.doIncreaseBy(value) );
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