import { useState } from "react";
import { onChangeArgs, Product } from '../interfaces/interfaces';

// Esto es lo que va a recibir el useProduct
interface useProductArgs {
    product :Product;
    onChange?: ( args: onChangeArgs ) => void// Le ponemos que sea opcional para que indicar que puede venir o no y no nos marque error en el ProductCard
}

// Recibe un objeto que luce como los argumentos de la interface y desestructuramos el onchange
export const useProduct = ( { onChange, product }: useProductArgs ) => {

    const [ counter, setCounter ] = useState(0);

    // Cuando se llame esta funcion, a parte de generar el nuevo valor, lo establecemos en el estado y si la funcion onchange exite la emitimos con sus dos argumentos
    const increaseBy = ( value: number ) => {
        // A la funcion onChange no le podemos pasar directamente el "counter" porque este tiene el valor anterior
        // y nosotros queremos emitir un nuevo valor
        const newValue = Math.max( counter + value, 0 );

        setCounter( newValue );

        // Cuando el counter cambia vamos a mandar el onchange
        // Tambien aqui nos podemos crear un useEffect que este pendiente del counter el problema seria que tendiramos
        // un useEffecto vastante cargado conmuchas dependencias y tendriamos que poner hasta un useCallback para memorizar
        // el resultado de la funcion y eso incrementaria la logica 
        // Por el error del undefinde colocamos la funcion entre esta condicion en el que solo en el caso que tenga valor ejecuta la funcion
        //
        // Despues de la implementacion de la interface nos daba error porque la funcion se tiene que emitir con los respectivos valores
        // que son el Product y el Count
        onChange && onChange({ count: newValue, product });
    }

    return {
        counter,
        increaseBy
    }
}