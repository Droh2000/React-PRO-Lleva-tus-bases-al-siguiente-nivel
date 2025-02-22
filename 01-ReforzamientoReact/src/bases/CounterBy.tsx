import { useState } from "react"

interface Props {
    initialValue?: number
}

interface Values {
    counters: number,
    clicks: number
}

// En este componente queremos saber el valor del counter y saber cuanteas veses ah cambiado
export const CounterBy = ({initialValue = 5}:Props) => {

    // En el estado requerimos mantener el Counter y la cantidad de clicks
    const [counterState, setCounterState] = useState({
        counter: initialValue,
        clicks: 0,//Cada vez que se incremente el counter debemos de contar los clicks
    });

    const handlerClick = (value:number) => {
        // Tenemos que definir a fuerzas las propiedades del state que definimos
        /*
            Una forma de declarar la sintaxis seria:
                setCounter(prev => {
                    return {
                        counters: prev + value,
                        clicks: prev + 1
                    }
                })

            Una mejor forma de hacerlo es regresar directamente un objeto
                setCounter(prev => ({
                    counters: prev.counters + value,
                    clicks: prev.clicks + 1
                }))

            Esta fue mi forma de solucionarlo:
                setCounterState({
                    counter: counter + value,
                    clicks: clicks + 1,
                });
        */
        setCounterState( prev => ({
            counter: prev.counter + value,
            clicks: prev.clicks + 1
        }))
    }

    const { counter, clicks } = counterState;

    return (
        <>
            <h1>CounterBy: { counter }</h1>
            <h1>Clicks: { clicks }</h1>

            <button onClick={ () => handlerClick(1) }>
                +1
            </button>
            <button onClick={ () => handlerClick(5) }>
                +5
            </button>
        </>
    )
}
