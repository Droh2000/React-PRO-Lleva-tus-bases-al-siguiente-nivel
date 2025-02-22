import { useState } from "react"

// AL definir los paraemtros si son de tipo ANY nos dara error
// podemos asignarle un valor por defecto para evitar el error
// Lo mejor es definir una interfaz que nos ayude a no tener que defenir todas las propiedades
/*
    Con "initialValue=0" dejamos que TS infiera muchas cosas por nosotros 
    React nos ofrece trabajar con PropTypes que cuando estamos trabajando con JS se usan los cuales se
    revisan en tiempo de ejecucion de la aplicacion, con Typescript esto no es requerido ya que verifica
    el tipo de dato de forma extricta 

    Ahora la razon por la que no funciona definirle el tipo de dato en el argumento como {initialValue:number = 0}
    porque estamos desestructurando lo que es el argumento en estas properties en pocas palabras no le estamos
    definiendo el tipo de dato sino que le estamos cambian el nombre de "initialValue" a "number" esta es una 
    funcionalidad de JS que al desestructurar podemos cambiarle el nombre
    Hay dos formas para definir el tipo de dato:
        1.- Es ponerlo despues de las llaves y para eso crear una interfaz como la de abajo
            (Como es un componente donde se implementara le ponemos de nombre Props)

    Definimos la interfaz con las properties que vamos a recibir en el compoente
*/
interface Props {
    // ASi le indicamos obligatoriamente a cualquiera que quiera usar el componente a que nos tiene que proporcionar el intialValue
    // Si queremos que sea opcional solo le ponemos un ? antes de los dos puntos
    initialValue: number
}
// Lo que pasa aqui es que recibimos el argumento con un valor establecido por defecto y el tipo de dato lo toma de las Props


export const Counter = ({initialValue = 0}:Props) => {

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
