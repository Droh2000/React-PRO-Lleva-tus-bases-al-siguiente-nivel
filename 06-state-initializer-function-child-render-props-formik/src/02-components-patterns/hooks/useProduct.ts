import { useEffect, useState } from "react";
// La ventaja de tener las interfaces asi es que si hacemos algun cambio, eso afecta a todo
import { InitialValues, onChangeArgs, Product } from '../interfaces/interfaces';

interface useProductArgs {
    product :Product;
    onChange?: ( args: onChangeArgs ) => void
    value?: number
    initialValues?: InitialValues
}

export const useProduct = ( { onChange, product, value = 0, initialValues }: useProductArgs ) => {
    // A la hora de inicalizar el valor verificamos si viene un "initialValues" si es ese el caso entonces
    // de ahi tomamos los valores y si no usamos el "value" 
    // Si el "initialValues" viene null tomara el valor del Value
    const [ counter, setCounter ] = useState<number>( initialValues?.count || value );

    // En un inicio no veiamos el valor reflejado que le pasamos al componente por el initialValues
    //      console.log( initialValues?.count );
    // Vemos que al verificar con el console.log se dispara dos veses ya que tenemos un useEffect
    // ese dispara dos veses cuando se cambia el valor y cuando es la primera vez que se ejecuta el hook
    // Lo que podemos hacer es mantener la referencia y no ejecutar el codigo hasta que el componente haya 
    // sido correctamente montado

    const increaseBy = ( value: number ) => {

        const newValue = Math.max( counter + value, 0 );

        setCounter( newValue );
        onChange && onChange({ count: newValue, product });
    }

    useEffect(() => {
        setCounter( value );
    }, [value]);

    return {
        counter,
        increaseBy
    }
}