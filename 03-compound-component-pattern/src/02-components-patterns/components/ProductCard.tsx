// Requerimos acesos a los estilos .module
// Al usar el CSS asi React se encarga de darles un hash a cada clase CSS para que sea unico
import styles from '../styles/styles.module.css';
// Asi para usar una clase solo llamamos: styles.Nombre_CLase

import noImage from '../assets/no-image.jpg';
import { useState } from 'react';

export const ProductCard = () => {

    const [ counter, setCounter ] = useState(0);

    const increaseBy = ( value: number ) => {
        // tomamos el valor anterior que teniamos y con Math.max queremos que de todos los argumentos
        // que le pasamos nos regrese el mayor, asi nos evitamos que nos regrese un valor negativo porque en ese caso
        // nos va a regresar siempre cero
        setCounter( prev => Math.max( prev + value, 0 ) );
    }

    return (
        <div className={ styles.productCard }>
            <img className={ styles.productImg } src="./coffee-mug.png" alt="Coffe Mug" />
            {/*<img className={ styles.productImg } src={ noImage } alt="Coffe Mug" />*/}

            <span className={ styles.productDescription }>Coffe Mug</span>

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

        </div>
    )
}