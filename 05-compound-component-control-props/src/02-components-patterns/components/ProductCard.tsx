import styles from '../styles/styles.module.css';
import { useProduct } from '../hooks/useProduct';
import { createContext, ReactElement } from 'react';
import { onChangeArgs, Product, ProductContextProps } from '../interfaces/interfaces';

export const ProductContext = createContext({} as ProductContextProps);

const { Provider } = ProductContext;

export interface Props {
    product: Product
    children?: ReactElement | ReactElement[]
    className?: string
    style?: React.CSSProperties
    // Tenemos que declarar como queremos que se ejecute esta funcion
    onChange?: ( args: onChangeArgs ) => void
    // Para que tome el valor y se vayan sincronizando
    value?: number;
}

export const ProductCard = ({ children, product, className, style, onChange, value }: Props) => {

    // Ahora para manejar el OnChange lo podemos hacer en muchos lugares, una solucion seria implementar aqui
    // un useEffect que este pendiente del counter y cuando este cambie mandar a llamar el onchange
    // Lo que pasa es que queremos que el useProduct como es el encargado de manejar el estado queremo que esa ese Hook
    // el que maneje esta funcion (POR AHORA LE MANDAMOS LA REFERENCIA A LA FUNCION )
    // Le mandamos el argumento en formato de objeto
    // Como el "useProduct" es el que maneja el estado entonces el "value" se lo tenemos que hace llegar
    const { counter, increaseBy } = useProduct({ onChange, product, value });

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