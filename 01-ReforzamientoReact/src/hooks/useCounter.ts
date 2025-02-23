import { useEffect, useRef, useState } from "react"
import { gsap } from 'gsap';

const MAXIMUN_COUNT = 10;

// Este CustomHook se creo para separar la logica que se tenia originalmente en el Counterhook
export const useCounter = () => {
    const [counter, setCounter] = useState(5);

    const counterElement = useRef<HTMLHeadingElement>(null);

    const handlerClick = () => {
        setCounter( prev => Math.min( prev + 1, MAXIMUN_COUNT ) );
    }

    useEffect(() => {
        if ( counter < 10 ) return;

        // Por la logica que teniamos anteriormente es que cada vez que el useEffect pasa de la condicion de arriba
        // se crea una nueva instancia del timeline(), lo mejor es no crear esto dentro del useEffect sino que 
        // lo elevamos a tal punto en el que podamos mantener la referencia a su valor actual y no crear una nueva instancia
        // cada vez que este efecto se dispara (Esto tambien nos ayudara si queremos que la animacion se repita cada vez que cambia)
        
        console.log('%cSe llego al valor maximo','color:red; background-color: black;');

        const tl = gsap.timeline();

        tl.to(counterElement.current, { y: -10, duration: 0.2, ease: 'ease.out'})
            .to(counterElement.current, { y: 0, duration: 1, ease: 'bounce.out'});

    }, [counter]);

    // Retornamos lo que va a usar el CounterHook
    return {
        counter,
        counterElement,
        handlerClick,
    }
}