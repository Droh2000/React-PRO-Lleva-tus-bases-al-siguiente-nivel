import { useState } from "react"

interface Props {
    initialValue?: number
}

// Como recomendacion hay que especificar el tipado del STATE para que sepan los demas usuarios como luce
interface CounterState {
    // Aparte del tipo de dato tambien el nombre tiene que coincidar a la hora de implementar el tipado
    counter: number,
    clicks: number
}

// En este componente queremos saber el valor del counter y saber cuanteas veses ah cambiado
export const CounterBy = ({initialValue = 5}:Props) => {

    // En el estado requerimos mantener el Counter y la cantidad de clicks
    // Si ponemos el cursor encima del USESTATE veremos los <> que significa que es un generico con esto le podemos
    // definir el tipo de informacion que maneje internamente
    // Ademas tenemos la ventaja que si comentemos un error al definir las propiedades al dejar el cursor encima obtendremos un mensaje mas amigable
    //  si nos fijamos que dice el tipo que es "(() => CounterState)" es porque con el useState podemos tener una funcion que retorne el STATE cuando lo
    //  queramos preprocesar o asignar una funcion que retorne el estado inicial
    const [{ counter, clicks }, setCounterState] = useState<CounterState>({
        counter: initialValue,
        clicks: 0,//Cada vez que se incremente el counter debemos de contar los clicks
    });

    const handlerClick = ( value:number ) => {
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
       // En el argumento que antes era "prev" lo desestructuramos para sacar directamente las variables
       // que no se nos olvide que para la desestructuracion tenemos que usar ( ) y dentro van los {}
        setCounterState( ({ counter, clicks }) => ({
            counter: counter + value,
            clicks: clicks + 1
        }));
        // Porque no chocan el counter de aqui con el counter del useState
        // Como estamos implementando este "counter" de arriba por el Scope  donde JS primero resuelve este que esta mas interno
        // y despues resuelve el "counter" de afuera que sacamos del useState
    }

    // Para no hacer este paso extra se desestructuro desde la definicion del useState()
    //const { counter, clicks } = counterState;

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
