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
            
            {/* Preguntamos si en el Product viene el IMG entonces que use la imagen caso contrario use la otra que no contiene nada*/}    
            <img className={ styles.productImg } src={ product.img ? product.img : noImage } alt="Coffe Mug" />

            <span className={ styles.productDescription }>{ product.title }</span>

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

        </div>
    )
}