import styles from '../styles/styles.module.css';
import { useProduct } from '../hooks/useProduct';
import { createContext } from 'react';
import { InitialValues, onChangeArgs, Product, ProductContextProps } from '../interfaces/interfaces';

export const ProductContext = createContext({} as ProductContextProps);

const { Provider } = ProductContext;

// Aqui definimos todas las propiedades que el componente puede recibir
export interface Props {
    product: Product
    // Aqui configuramos lo que espera el componente que le pasemo internamente (Ahora le ponemos una funcion que nos regres JSX)
    // children?: ReactElement | ReactElement[]
    children?: () => React.JSX.Element;
    className?: string
    style?: React.CSSProperties
    onChange?: ( args: onChangeArgs ) => void
    value?: number;
    // Nos creamos una interface extra para evitar anidamientos al tener mas de una propiedad
    initialValues?: InitialValues
}

export const ProductCard = ({ children, product, className, style, onChange, value, initialValues }: Props) => {

    // El nuevo "initialValues" se lo tenemos que mandar al que maneja nuestro estado que es el "useProduct"
    // Aqui tenemos que sacar el maxCount y darselo al provider para poder obtenerlo en el ProductButtons
    const { counter, increaseBy, maxCount } = useProduct({ onChange, product, value, initialValues });

    return (
       <Provider value={{
            counter,
            increaseBy,
            product,
            maxCount
       }}>
        <div 
            className={ `${styles.productCard} ${ className }` }
            style={ style }
        >
            {/* 
                React por defecto no puede renderizar funciones, asi que le agregamos los perentesis 
                La ventaja ahora es que podemos mandar cualquier cantidad y tipo de Argumentos    
                podemos regresar y exponer tantas cosas como sean nesesarias y dar informacion a cualquiera
                que use el componente desestructurando lo que nesecite
                
            */}
            { children!() }
        </div>
       </Provider>
    )
}