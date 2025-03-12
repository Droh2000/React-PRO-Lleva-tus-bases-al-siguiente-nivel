import { useEffect, useState } from "react";
import { onChangeArgs, Product } from '../interfaces/interfaces';

// Esto es lo que va a recibir el useProduct
interface useProductArgs {
    product :Product;
    onChange?: ( args: onChangeArgs ) => void// Le ponemos que sea opcional para que indicar que puede venir o no y no nos marque error en el ProductCard
    value?: number
}

// Recibe un objeto que luce como los argumentos de la interface y desestructuramos el onchange
// Como el "value" puede ser nulo al ser opcional le agregamos el valor por defecto para el contador 
export const useProduct = ( { onChange, product, value = 0 }: useProductArgs ) => {
    /*
        Vamos a refactorizar el codigo ya que el ShopingPage.tsx solo deveria de encargarse de mostrar la informacion y no tener la logica
        PERO para lograr que las propiedades controlen el estado del componente tenemos que hacerle una modificacion al useProduct porque este
        todavia sigue controlando el state (El counter y setCounter) siempre tienen el valor el cual les estamos incrementando o decrementando
        esto no deberia de funcionar de esta manera porque con cada elemento que vemos en la pagina se mantiene un estado diferente
        La idea es que mediante el VALUE que estamos mandando al ProductCard en ShoppingPage debe de ser el value que se tiene que mostrar, asi si cambia
        se actualizara en todos, ahorita este VALUE no es el que controla el STATE del useProduct es el useState el que prevalece de este hook
        (Si implementamos bien el patron no ocupamos llamar el SetCounter)

        En el proximo Commit haremos que el OnChange y Value sean quienes controlen la forma de visualizacion de los valores en la tarjeta
        y de los carros de compras
    */
    // Este VALUE aqui se pone solo como el valor inicial pero si lo dejamos hasta aqui no seguira cambiando (ya que el useState no vuelve a ejecutarse solo mantiene el estado)
    const [ counter, setCounter ] = useState(value);

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

    // Estamos al pendiente de actualizar los valores cada vez que el VALUE cambia
    useEffect(() => {
        setCounter( value );
    }, [value]);

    return {
        counter,
        increaseBy
    }
}