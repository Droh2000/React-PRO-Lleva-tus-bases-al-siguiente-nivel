import { useState } from "react"

// AL definir los paraemtros si son de tipo ANY nos dara error
// podemos asignarle un valor por defecto para evitar el error
// Lo mejor es definir una interfaz que nos ayude a no tener que defenir todas las propiedades
export const Counter = ({initialValue=0}) => {

    const [counter, setCounter] = useState(initialValue);

    const handlerClick = () => {
        // Hay que recordar que no debemos de inmutar el estado sino que debemos de crear un nuevo estado
        // Aqui estamos tomando el valor anterior y a ese valor le vamos a sumar
        setCounter( prev => prev + 1 );
    }

    return (
        <>
            <h1>Counter: { counter }</h1>

            <button onClick={ handlerClick }>
                +1
            </button>
        </>
    )
}
