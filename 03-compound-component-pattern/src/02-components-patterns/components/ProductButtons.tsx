import { useContext } from "react";
import { ProductContext } from "./ProductCard";
import styles from '../styles/styles.module.css';

export const ProductButtons = () => {

    // Sabemos que este componente estara dentro del contexto
    // Usamos este hook le pasamos el context que creamos y desestructuramos lo que necesitamos
    // Con esto ya no requerimos la dependencias de recibir esto parametros como argumento
    const { counter, increaseBy } = useContext( ProductContext );

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