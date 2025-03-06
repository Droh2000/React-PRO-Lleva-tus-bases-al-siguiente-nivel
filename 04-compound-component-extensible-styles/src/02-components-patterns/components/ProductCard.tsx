import styles from '../styles/styles.module.css';
import { useProduct } from '../hooks/useProduct';
import { createContext, ReactElement } from 'react';
import { Product, ProductContextProps } from '../interfaces/interfaces';

export const ProductContext = createContext({} as ProductContextProps);

const { Provider } = ProductContext;

// Usualmente cuando requerimos defininir las properties de un componente especificamente lo vamos a quitar
// del archivo de interfaces independiente, no es malo solo esta es otra forma de hacerlo para tener 
// las propiedades del componente con su correspondiente componente
export interface Props {
    product: Product
    children?: ReactElement | ReactElement[]
    // Aqui le ponemos que va a estar recibiendo el className
    className?: string
}

// Tenemos que poder desestructurar del "ProductCardProps" el className entonces modificamos la interface
export const ProductCard = ({ children, product, className }: Props) => {

    const { counter, increaseBy } = useProduct();

    return (
       <Provider value={{
            counter,
            increaseBy,
            product
       }}>
        {/* Para mantener los estilos que ya tiene y agregarle aparte el ClassName */}
        <div className={ `${styles.productCard} ${ className }` }>
            { children }
        </div>
       </Provider>
    )
}