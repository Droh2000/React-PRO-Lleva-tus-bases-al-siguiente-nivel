import { useContext } from "react";
import { ProductContext } from "./ProductCard";
import styles from '../styles/styles.module.css';

// Le vamo a crear su interface donde le asignamos el ClassName
// Esta es la misma interface que esperamos que sea utilizada en las dos tecnicas (Construir tecnicas basado en propiedades o armando el componente basado en componentes hijos)
// La usamos en el "ProductCardHOCProps" del archivo "interfaces"
export interface Props{ 
    title?: string,
    className?:string
}

export const ProductTitle = ({ title, className }: Props) => {

    const { product } = useContext( ProductContext );

    return (
        <span className={ `${styles.productDescription} ${className}` }>{ title ? title : product.title }</span>
    );
}