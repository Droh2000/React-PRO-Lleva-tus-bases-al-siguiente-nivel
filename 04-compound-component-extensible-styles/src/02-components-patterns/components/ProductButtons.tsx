import { useContext } from "react";
import { ProductContext } from "./ProductCard";
import styles from '../styles/styles.module.css';

export interface Props {
    className?: string;
    style?: React.CSSProperties
}

export const ProductButtons = ({ className, style } : Props) => {

    const { counter, increaseBy } = useContext( ProductContext );

    return (
        <div 
            className={ `${styles.buttonsContainer} ${className}` }
            // Lo unico malo mediante estos estilos es que solo podemos cambiar el elemento directo no podemos irnos a los
            // elementos de abajo (Los hijos) porque no es asi
            style={ style }
        >
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