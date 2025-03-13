import styles from '../styles/styles.module.css';
import { useProduct } from '../hooks/useProduct';
import { createContext, ReactElement } from 'react';
import { InitialValues, onChangeArgs, Product, ProductContextProps } from '../interfaces/interfaces';

export const ProductContext = createContext({} as ProductContextProps);

const { Provider } = ProductContext;

// Aqui definimos todas las propiedades que el componente puede recibir
export interface Props {
    product: Product
    children?: ReactElement | ReactElement[]
    className?: string
    style?: React.CSSProperties
    onChange?: ( args: onChangeArgs ) => void
    value?: number;
    // Nos creamos una interface extra para evitar anidamientos al tener mas de una propiedad
    initialValues?: InitialValues
}

export const ProductCard = ({ children, product, className, style, onChange, value, initialValues }: Props) => {

    // El nuevo "initialValues" se lo tenemos que mandar al que maneja nuestro estado que es el "useProduct"
    const { counter, increaseBy } = useProduct({ onChange, product, value, initialValues });

    return (
       <Provider value={{
            counter,
            increaseBy,
            product
       }}>
        <div 
            className={ `${styles.productCard} ${ className }` }
            style={ style }
        >
            { children }
        </div>
       </Provider>
    )
}