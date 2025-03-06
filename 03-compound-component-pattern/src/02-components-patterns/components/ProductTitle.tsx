import { useContext } from "react";
import { ProductContext } from "./ProductCard";
import styles from '../styles/styles.module.css';

// Para hacerlo diferente, aplicamos una interface para obligar que nos pase el titulo
export const ProductTitle = ({ title }: { title?: string }) => {

    const { product } = useContext( ProductContext );

    // Aqui solo son dos casos, si viene o no viene
    return (
        <span className={ styles.productDescription }>{ title ? title : product.title }</span>
    );
}