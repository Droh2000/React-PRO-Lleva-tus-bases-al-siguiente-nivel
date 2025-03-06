import { useContext } from "react";
import { ProductContext } from "./ProductCard";
import styles from '../styles/styles.module.css';

// Le vamo a crear su interface donde le asignamos el ClassName
interface Props{ 
    title?: string,
    className?:string
}

export const ProductTitle = ({ title, className }: Props) => {

    const { product } = useContext( ProductContext );

    return (
        <span className={ `${styles.productDescription} ${className}` }>{ title ? title : product.title }</span>
    );
}