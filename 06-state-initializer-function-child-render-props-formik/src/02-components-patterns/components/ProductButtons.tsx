import { useCallback, useContext } from "react";
import { ProductContext } from "./ProductCard";
import styles from '../styles/styles.module.css';

export interface Props {
    className?: string;
    style?: React.CSSProperties
}

export const ProductButtons = ({ className, style } : Props) => {

    const { counter, increaseBy, maxCount } = useContext( ProductContext );

    // Usamos el useCallback porque es mas eficiente
    const isMaxReached = useCallback(() => 
        // Si ya alcanzamos el valor maximo que nos regres TRUE sino FALSE
        // Esta condicion verificamos primero si exste el "maxCount", despues preguntamos si el counter llego al maximo
        // si la primera es false ya no evalua la segunda
        !!maxCount && counter === maxCount, 
    [counter, maxCount]);

    return (
        <div 
            className={ `${styles.buttonsContainer} ${className}` }
            style={ style }
        >
            <button 
                className={ styles.buttonMinus }
                onClick={ () => increaseBy( -1 ) }
            >-</button>

            <div className={ styles.countLabel }>{ counter }</div>

            <button 
                // Si es True que le aplique el estilo de "disable" sino no aplica nada
                className={ `${styles.buttonAdd} ${ isMaxReached() && styles.disable }` }
                onClick={ () => increaseBy( +1 ) }
            >+</button>
        </div>
    );
}