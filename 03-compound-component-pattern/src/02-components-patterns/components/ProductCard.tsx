// Requerimos acesos a los estilos .module
// Al usar el CSS asi React se encarga de darles un hash a cada clase CSS para que sea unico
import styles from '../styles/styles.module.css';
// Asi para usar una clase solo llamamos: styles.Nombre_CLase

import { useProduct } from '../hooks/useProduct';
import { createContext } from 'react';
import { ProductCardProps, ProductContextProps } from '../interfaces/interfaces';

// Esto no lo ponemos en un archivo independiente porque estos dos solo van a estar en el "ProductCard" (El componente padre)
export const ProductContext = createContext({} as ProductContextProps);
// De ese Productcontext sacamos el proveedor de ese contexto, el Provide es nuestro proveedor de informacion
// lo colcamos en el punto en el que sabemos que ya viene todos nuestros hijos
const { Provider } = ProductContext;

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
*/

// Asi obligamos que nos tiene que mandar un producto y le configuramos para que reciba hijos y las tenemos que defenir en los PROPS
export const ProductCard = ({ children, product }: ProductCardProps) => {

    const { counter, increaseBy } = useProduct();

    return (
        /*
            Hasta este momento esta es la forma tradicional con la que se construyen los componentes, aparte del Style que se puede resumir de una manera
            el inconveniente es que a la hora de que le tangamos que informar al padre que hubo algun cambio (LE tenemos que mandar alguna propiedad)
            A parte el uso del componente tienen muy poco control al respecto y solo nos pueden mandar el producto (Si queren cambiar el estilo o cambiar 
            los atributos no van a poder, osea se tienen que definir muchas cosas) y aqui es donde vienen diferentes patrones para crear estos componentes
            Vamos a ver la forma de crear componentes donde podamos tener mayor control al respecto

            Desde este punto todos los hijos podran tener acceso a ese provider que es otro HOC
            que recibe todo el codigo que le especificamos
            En el "value" le especificamos la informacion que va a compartir con todo sus hijos, ahi es donde le pasamos el 
            counter, increaseBy y el product (De ahi viene toda la informacion de la imagen, titulo y todo o demas que pueda venir)
        */
       <Provider value={{
            counter,
            increaseBy,
            product
       }}>
        <div className={ styles.productCard }>
            {/*
                Estas son las Pieza y a esta le tenemos que mandar la imagen para que salga 
            <ProductImage img={ product.img }/>

            <ProductTitle title={ product.title } />

                Hay varias maneras de constuir este, lo podriamos separar por partes pero aqui solo movemos todo
            <ProductButtons counter={ counter } increaseBy={increaseBy} />

            Comentamos estas lineas para generar aqui el Children
            */}
            { children }
        </div>
       </Provider>
    )
}

/*
    Esta es una nueva propiedad que le estamos agregando al componente padre "ProductCard" 
    y esta propiedad apunta al componente

    Despues de hacer la Factorizacion ya no podemos agreagrlos de esta manera 

ProductCard.Title = ProductTitle;
ProductCard.Image = ProductImage;
ProductCard.Buttons = ProductButtons;

    Lo vamos a hacer de una manera mas elegante en el archivo index.ts de la carpeta Components
*/ 