import { useState } from "react";

export const useProduct = () => {

    const [ counter, setCounter ] = useState(0);

    const increaseBy = ( value: number ) => {
        // tomamos el valor anterior que teniamos y con Math.max queremos que de todos los argumentos
        // que le pasamos nos regrese el mayor, asi nos evitamos que nos regrese un valor negativo porque en ese caso
        // nos va a regresar siempre cero
        setCounter( prev => Math.max( prev + value, 0 ) );
    }

    return {
        counter,
        increaseBy
    }
}