import { useState } from "react";

// Le ponemos que sea opcional para que indicar que puede venir o no y no nos marque error en el ProductCard
export const useProduct = ( onChange?: () => void ) => {

    const [ counter, setCounter ] = useState(0);

    const increaseBy = ( value: number ) => {
        setCounter( prev => Math.max( prev + value, 0 ) );

        // Cuando el counter cambia vamos a mandar el onchange
        // Tambien aqui nos podemos crear un useEffect que este pendiente del counter el problema seria que tendiramos
        // un useEffecto vastante cargado conmuchas dependencias y tendriamos que poner hasta un useCallback para memorizar
        // el resultado de la funcion y eso incrementaria la logica 
        // Por el error del undefinde colocamos la funcion entre esta condicion en el que solo en el caso que tenga valor ejecuta la funcion
        onChange && onChange();
    }

    return {
        counter,
        increaseBy
    }
}