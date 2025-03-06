// Requerimos acesos a los estilos .module
// Al usar el CSS asi React se encarga de darles un hash a cada clase CSS para que sea unico
import styles from '../styles/styles.module.css';
// Asi para usar una clase solo llamamos: styles.Nombre_CLase

import noImage from '../assets/no-image.jpg';
import { useProduct } from '../hooks/useProduct';


// Este componente sabe como es la informacion que debe de esperar
// y asi el hijo tambien debe de esaber lo que tiene que recibir
interface Product{
    id: string,
    title: string,
    img?: string
}
// De los argumentos de la funcion recibimos las PROPS pero a parte de esto queremos recibir todo el Prducto
// (Con los functional components podemos recibir mas informacion a parte de las props), entonces definamos las Props 
// de la siguiente manera
interface Props {
    // Como puede que recibamos mucha informacion de aqui editamos como queremos recibir estos datos
    product: Product
}

/*
    Patron de composicion de componentes
        La idea es como cuando trabajamos con el Select en el HTML donde creamos el <select> que ese es el componente padre
        y luego internamente creamos todas las opciones (<option>), este se el mismo patron, la idea es que estas opciones
        le dicen al componente padre la cantidad de opciones que tiene y es desde el mundo exterior que se le esta dando
        las diferentes opcions que nesecitamos
        Asi le damos control a los usarios de poner o quitar las opcioens que requieran, para lograr esto se requieren 
        implementar vairas cosas:
            1. Vamos a separar cada uno de los componentes que tenemos aqui en diferentes componentes solo llamandolos 
               dentro de este archivo

    En este primer componente hay que preguntarnos que es lo que requrimos pasar por argumento, aqui:
        Desestructuramos la imagen y la igualamos a comillas para que sea opcional el valor y no crearnos una interfaces para eso
        (Esta IMG hace que no requieramos llamarla desde Product que es donde la teniamos antes)
*/
export const ProductImage = ({ img = '' }) => {
    return (
        // Preguntamos si en el Product viene el IMG entonces que use la imagen caso contrario use la otra que no contiene nada
        // Un String vacio para un ternario es concidetado que no tiene valor 
        <img className={ styles.productImg } src={ img ? img : noImage } alt="Product" />
    );
}

// Para hacerlo diferente, aplicamos una interface para obligar que nos pase el titulo
export const ProductTitle = ({ title }: { title: string }) => {
    return (
        <span className={ styles.productDescription }>{ title }</span>
    );
}

interface ProductButtonsProps {
    counter: number,
    increaseBy: (n: number) => void,
}

export const ProductButtons = ({ counter, increaseBy }:ProductButtonsProps ) => {
    return (
        <div className={ styles.buttonsContainer }>
            <button 
                className={ styles.buttonMinus }
                onClick={ () => increaseBy( -1 ) }
            >-</button>

            <div className={ styles.countLabel }>{ counter }</div>

            <button 
                className={ styles.buttonAdd }
                onClick={ () => increaseBy( +1 ) }
            >+</button>
        </div>
    );
}
// Esto que hicimos desde aqui es el punto inicial del patron
// Solo creamos un monton de componentes y en base a estas piezas el usuario podra crear el componente como el quiere


// Asi obligamos que nos tiene que mandar un producto
export const ProductCard = ({ product }: Props) => {

    const { counter, increaseBy } = useProduct();

    return (
        /*
            Hasta este momento esta es la forma tradicional con la que se construyen los componentes, aparte del Style que se puede resumir de una manera
            el inconveniente es que a la hora de que le tangamos que informar al padre que hubo algun cambio (LE tenemos que mandar alguna propiedad)
            A parte el uso del componente tienen muy poco control al respecto y solo nos pueden mandar el producto (Si queren cambiar el estilo o cambiar 
            los atributos no van a poder, osea se tienen que definir muchas cosas) y aqui es donde vienen diferentes patrones para crear estos componentes
            Vamos a ver la forma de crear componentes donde podamos tener mayor control al respecto
        */
        <div className={ styles.productCard }>

            {/* Estas son las Pieza y a esta le tenemos que mandar la imagen para que salga */}
            <ProductImage img={ product.img }/>
            
            <ProductTitle title={ product.title } />

            {/* Hay varias maneras de constuir este, lo podriamos separar por partes pero aqui solo movemos todo */}
            <ProductButtons counter={ counter } increaseBy={increaseBy} />
        </div>
    )
}