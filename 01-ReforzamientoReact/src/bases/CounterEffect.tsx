import { useEffect, useRef, useState } from "react"

// Agregar Animacion
// Queremos que cuando el conunter llegue a 10, el numero rebote y salga, para eso usaremos la libreria de 
// GreenSock (yarn add gsap)
import { gsap } from 'gsap';

// Vamos a controlar la ejecucion del contador para que nunca llegue a ser mayor a 10
const MAXIMUN_COUNT = 10;

export const CounterEffect = () => {

    const [counter, setCounter] = useState(5);

    // Para tomar la referencia por nodo en la libreria de la animacion
    // A diferencia del useState cuando cambiamos el valor del useRef este no vuelve a reconstruir el componente
    // este hook lo vamos a usar para mantener la referencia al elemento
    // El hook lo debemos de inicializar podriamos darle null y asi se quita el error pero debemos de especificar el tipo correcto para saber
    // que informacion contiene para saber el tipo correcto implementamos el parametro "ref=" en el elemento HTML donde se usara y al poner el cursor
    // encima nos dara el tipo de dato (Aqui NULL es el valor inicial)
    const counterElement = useRef<HTMLHeadingElement>(null);

    const handlerClick = () => {
        // Aqui hacemos para que el contador no llegue a ser mayor a la constante de arriba
        // para lograr esto tomamos la funcion "min()" para que tome el valor minimo y haga una comparacion de una serie de valores
        // le podemos mandar cualquier cantidad de numeros y va a tomar el valor minimo, en este caso "prev" tiene el valor actual
        // y le sumamos el valor y la constante, la funcon tomara el valor minimo de los dos y esto hara que el counter nunva vaya a pasar
        // del valor del 10 (Cuando los dos valgan 10 pues toma ese valor en ambos casos y ya no sigue sumando)
        setCounter( prev => Math.min( prev + 1, MAXIMUN_COUNT ) );
        
    }

    // Por lo menos una vez se va a disparar cuando el componente sea montando
    // Cuando queramos trabajar con las referencias HTML es conveniente usar el useLayoutEffect para asegurarnos que 
    // se ejecute despues de que se construyo el HTML (Se define igual que el useEffect)
    // La mayoria de los casos podemos trabajar con el useEffect perfectemente
    useEffect(() => {
        // Acciones que hara el hook
        // Queremos disparar algo solamente si el counter mayor a 10
        if ( counter < 10 ) return; // Si es menor no haga nada y se sale con el return

        // Mientras no sea mayor se ejecutara lo siguiente
        // Para darle un Estilo al console log asi le podemos definir estilo de CSS
        console.log('%cSe llego al valor maximo','color:red; background-color: black;');

        // Aqui vamos a querer disparar la animacion
        // Con el "to()" -> Partimos de la pocicion en la que se encuentra actualmente a la dimenciones que vamos a especificar dentro de los argumento
        // El primero es el selector (Es el elemento HTML que queremoa animar donde podemos apuntar a la referencia como en vanilla JS
        // o mandar la refernecia a un NODO que es lo que vamoa a hacer ) y el segundo es el objeto en el cual queremos configurarlo
        // En este caso nuestro selector va a apuntar al H2 (No es buena practica usar directamente los elementos HTML ni usar las clases)
        // Lo mejor es usar los nodos de referencias, Luego como segundo argumento queremos que suba en el EJE y ese valor, la duration es en segundos
        // "ease" es para configurar el tipo de animacion (En este caso queremo que se desaselere al llegar al final)
        // Esta funcion de "to()" es una promesa por eso podemos usar el "then"
        /*
            gsap.to('h2', { y: -10, duration: 0.2, ease: 'ease.out'}).then( () => {
                // Queremos hacer la raferencia al mismo objeto (Como al inicio llega a 10px arriba ahora lo movemos a su posicion oroginal)
                // ademas le configuramos para que rebote a la salida
                gsap.to('h2', { y: 0, duration: 1, ease: 'bounce.out'})
            })
        */
        // La seleccion por elemento es: 'elementoHTML'
        // La seleccion por clase: '.NombreClase'
        // La seleccion por ID es: '#NombreID'

        // TimeLine (Controlador del tiempo)
        const tl = gsap.timeline();

        // Cualquier elemento con la misma clase, ID o elemento le afectara la animacion, Aqui tenemos varios problemas
        // no se recomienda hacer la animacion de la manera de arriba, lo ideal es crearnos un TimeLine que seria como una barra 
        // donde sabemos en todo momento en donde se encuentra la animacion (No importa si la animacion es muy compleja porque todo
        // se puede crear en una secuencia de animaciones)
        // Lo seguno es la referencia, lo mejor es hacerlo por NODO para eso usamos el Hook de useRef y para eso llamamos el .current 
        /*gsap.to(counterElement.current, { y: -10, duration: 0.2, ease: 'ease.out'}).then( () => {
            // Con la construccion del TimeLine evitamos hacer las cosas como la de abajo y asi controlamos las secuencias de animaciones
            //gsap.to(counterElement.current, { y: 0, duration: 1, ease: 'bounce.out'})
        })*/

        // Al .to le mandamos toda la animacion y el objeto que queremos animar
        tl.to(counterElement.current, { y: -10, duration: 0.2, ease: 'ease.out'})
        // Esta seria la otra animacion que poniamos dentro de la promesa, asi como esta arriba
        // Asi lo podemos encadenar sin terminar con punto y coma como esta arriba
            .to(counterElement.current, { y: 0, duration: 1, ease: 'bounce.out'});

        // Ahora asi como esta la logica implementada se reconstruye el TimeLine y tenemos dos Timeline que se pelean la animacion
        // la razon de porque tenemos la condicion inicial de que solo llegue elc otnador hasta 10 es para que solo tengamos un Timeline y no mas

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
            <h1>CounterEffect:</h1>
            {/* El useRef lo asociamos a este elemento para que tenga la referencia al HTML*/}
            <h2 ref={ counterElement }>{ counter }</h2>

            <button onClick={ handlerClick }>
                +1
            </button>
        </>
    )
}
