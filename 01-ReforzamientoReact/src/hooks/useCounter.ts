import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { gsap } from 'gsap';

//const MAXIMUN_COUNT = 10;

// Este CustomHook se creo para separar la logica que se tenia originalmente en el Counterhook
// Como argumento recibira el valor maximo por el que no se pasara 
export const useCounter = ({ maxCount = 10 }) => {
    const [counter, setCounter] = useState(5);
    // Se le puso ANY para que podamos agreagr la animacion en cualquier elemento HTML
    const elementToAnimate = useRef<any>(null);

    // Para que no se cree un nuevo timeline cada vez que el useEffect se dispara, asi que nos creamos otro useRef
    // para crearlo una sola vez y almacenar la referencia en memoria
    const tl = useRef( gsap.timeline() );

    const handlerClick = () => {
        setCounter( prev => Math.min( prev + 1, maxCount ) );
    }

    // Desdes de la implementacion del useRef en el timeline nos dimos cuenta que salta varias veces esto es porque
    // cada vez que precionamos el boton se van agregando animaciones al timeline y no deberia de dispararse cuanto el counter cambia
    // porque crea mas animaciones de las que deberia y la animacion que creamos deberia de dispararse solo cuando algo suceda
    // Vamos a usar este hook para asegurarnos que se ejecute cuando ya tenemos creado los elementos HTML y dentro movemos las animaciones
    // este funciona muy parecido al useEffect y vamos a dejar la dependencia vacia para que apenas se construya el componente solo se creen una vez
    // las animaciones
    useLayoutEffect(()=>{
        // Podria pasar que en el momoento que esto se crea el "counterElement" podria ser que tenga una referencia nula y esto nos podra dar un error
        // Se puede agregar la validacion para que se ejecute solo si tenemos la referencia al elemento
        if( !elementToAnimate.current ) return;

        // Otra cosa es que apenas se ejecuta el timeline, se va a disparar asi que le ponemos el Pause al final 
        // esto es para que al crear el componente no se ejecute sino que solo lo haga cuando cambie el counter
        tl.current.to(elementToAnimate.current, { y: -10, duration: 0.2, ease: 'ease.out'})
                  .to(elementToAnimate.current, { y: 0, duration: 1, ease: 'bounce.out'})
                  .pause();
    }, []);

    // Como buena practica se recomienda que cada hook tenga una rsponsabilidad unica
    useEffect(() => {
        //if ( counter < 10 ) return;

        // Por la logica que teniamos anteriormente es que cada vez que el useEffect pasa de la condicion de arriba
        // se crea una nueva instancia del timeline(), lo mejor es no crear esto dentro del useEffect sino que 
        // lo elevamos a tal punto en el que podamos mantener la referencia a su valor actual y no crear una nueva instancia
        // cada vez que este efecto se dispara (Esto tambien nos ayudara si queremos que la animacion se repita cada vez que cambia)
        
        //console.log('%cSe llego al valor maximo','color:red; background-color: black;');

        //const tl = gsap.timeline();

        // Como ahora tenemos el timeline en el useRef para usalo tenemos que llamar el .current
        //tl.current.to(counterElement.current, { y: -10, duration: 0.2, ease: 'ease.out'})
        //    .to(counterElement.current, { y: 0, duration: 1, ease: 'bounce.out'});

        // Para ejecutar la animacion cada vez que el counter cambia tenemos la funcion PLAY() pero hay que pasarle como argumentos
        // que inicie desde la pocicion 0 oara que cada vez que cambie el conunte se reprodusca desde el inicio
        tl.current.play(0);

    }, [counter]);

    // Retornamos lo que va a usar el CounterHook
    return {
        counter,
        elementToAnimate,
        handlerClick,
    }
}