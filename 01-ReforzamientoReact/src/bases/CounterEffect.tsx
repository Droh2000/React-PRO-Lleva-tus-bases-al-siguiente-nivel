import { useEffect, useState } from "react"

// Vamos a controlar la ejecucion del contador para que nunca llegue a ser mayor a 10
const MAXIMUN_COUNT = 10;

export const CounterEffect = () => {

    const [counter, setCounter] = useState(5);

    const handlerClick = () => {
        // Aqui hacemos para que el contador no llegue a ser mayor a la constante de arriba
        // para lograr esto tomamos la funcion "min()" para que tome el valor minimo y haga una comparacion de una serie de valores
        // le podemos mandar cualquier cantidad de numeros y va a tomar el valor minimo, en este caso "prev" tiene el valor actual
        // y le sumamos el valor y la constante, la funcon tomara el valor minimo de los dos y esto hara que el counter nunva vaya a pasar
        // del valor del 10 (Cuando los dos valgan 10 pues toma ese valor en ambos casos y ya no sigue sumando)
        setCounter( prev => Math.min( prev + 1, MAXIMUN_COUNT ) );
        
    }

    // Por lo menos una vez se va a disparar cuando el componente sea montando
    useEffect(() => {
        // Acciones que hara el hook
        // Queremos disparar algo solamente si el counter mayor a 10
        if ( counter < 10 ) return; // Si es menor no haga nada y se sale con el return

        // Mientras no sea mayor se ejecutara lo siguiente
        // Para darle un Estilo al console log asi le podemos definir estilo de CSS
        console.log('%cSe llego al valor maximo','color:red; background-color: black;');

        /*
        Esta funcion se va a ejecutar cuando el componente sea destruido
            return () => {
                
            }
        */
    }, 
    // Arreglo de dependencia en la que cada vez que cambia se ejecuta el useEffect
        [counter]);

    return (
        <>
            <h1>CounterEffect: { counter }</h1>

            <button onClick={ handlerClick }>
                +1
            </button>
        </>
    )
}
