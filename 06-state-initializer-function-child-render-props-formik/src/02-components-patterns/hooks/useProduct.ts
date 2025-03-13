import { useEffect, useRef, useState } from "react";
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
    //     console.log( initialValues?.count );
    // Vemos que al verificar con el console.log se dispara dos veses ya que tenemos un useEffect
    // ese dispara dos veses cuando se cambia el valor y cuando es la primera vez que se ejecuta el hook
    // Lo que podemos hacer es mantener la referencia y no ejecutar el codigo hasta que el componente haya 
    // sido correctamente montado
    // Primero vamos a darle seguimiento cuando el componente es monado con el useRef (El primer valor es False 
    // cuando el componente no este montado), este hook nos permite crear un objeto que va a sobrerir diferentes
    // renderizaciones del mismo componente manejando una variable para que cambie sin que dispare nuevos renderizados de React
    const isMounted = useRef(false);

    const increaseBy = ( value: number ) => {

        // Implementar para que si esta definido el maxCount solo llegue hasta ese limite
        let newValue = Math.max( counter + value, 0 );
        // Verificamos si existe la propiedad
        if(initialValues?.maxCount){
            // Tomamos el minimo de esos dos valores ya que el "newValue" va a estar incrementandose
            // hasta que llege a valer lo mismo que el "maxCount" mientras regresa el "newValue"
            newValue = Math.min( newValue, initialValues.maxCount );
        }
        
        setCounter( newValue );
        onChange && onChange({ count: newValue, product });
    }

    // Esta funcion de Reset la espera la funcion Children del "ProductCard"
    const reset = () => {
        // Regresamos al estado inicial (Si el value es nulo por defecto le dara el valor por defecto que es 0)
        setCounter(initialValues?.count || value);
    }

    // Si el componente no ah sido montado entonces no queremos cambiar esto
    useEffect(() => {
        // Solo cuando este montado queremos ejecutar el setCounter
        // Como esto es un Hook de react no hace falta mandarlo como una dependencia
        if( !isMounted.current ) return;

        setCounter(initialValues?.count || value);
    }, [initialValues, value]);

    // Como recomendacion a los useEffect lo debemos de usar solo a una tarea en especifica, por eso creamos otro
    // este va a estar evaluando el "isMounted", una vez que nuestro componente sea utilizado sera true
    useEffect(()=>{
        isMounted.current = true;
    }, []);

    return {
        counter,
        increaseBy,
        // Regresamos este valor para poder bloquear el boton de incremento cuando se llega al maximo
        maxCount: initialValues?.maxCount,
        // Esta propiedad se la pasamos a la funcion Children (la sacamos de aqui porque aqui es donde sabemos cuando cambia)
        // Si el "initialValue" existe entonces evalua si es igual al counter
        isMaxCountReached: !!initialValues?.count && initialValues.maxCount === counter,
        reset
    }
}