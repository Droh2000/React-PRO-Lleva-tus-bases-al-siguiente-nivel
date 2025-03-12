import { useState } from "react";
import { Product, ProductInCart } from '../interfaces/interfaces';
//import { products } from "../data/products"; // Los importamos solo para exportarlos y mandarlos al ShoppingPAge cuando se use este Hook
// Se comento porque no es buena idea mezclar los datos con este hook (En la vida real estariamos recibiendo estos datos de la BD)

export const useShoppingCart = () => {
    // Este estado es el que tiene que ser el que controle los valores que mostremos en las tarjetas
    // Con estos datos la idea es asignarle cuantos articulos son los que estamos llevando y ese sera el estado inicial de nuestros componentes
    // El estado inicial lo declaramos como objeto porque asi podemos llegar a las propiedades de manera directa
    const [shoppingCart, setShoppingCart ] = useState<{
        // Para definir el tipo de dato correctamente sabemos que es un objeto asi que lo encerramos entre llaves
        [key:string]: // El identificador es de tipo string pero lo encerramos entre [] para indicar que pueden venir varias cantidades
        ProductInCart // Esto es lo que contendra los valores del identificadro
    }>({
        // la idea es ponerle un identificador que apunte al producto y ademas pasarle el contador (De cuantos productos se estan llevando)
        /*'1': { ...product1, count: 10 },
        '2': { ...product2, count: 2 }
            Gracias al tipado ya no requerimos inicializar con valores como arriba
        */
    });

    /*
        Hay que saber cuando el estado cambia 
            El estado global esta en el ProductCard.tsx el cual es cambiando con el CustomHook useProduct
            Dentro del UseProduct tenemos el contador de la tarjeta que usa un UseState, la funcion de "increaseBy"
            termina estableciendo el nuevo valor y ahi podriamos mandar a llamar lo que este definido en el shoppingCart
            Por ejemplo:
                Viendo el caso de los formularios con el Input donde le especificamos la funcion "onChange" que dentro le definimos
                una funcion que recibe un Evento que luce dependiendo de lo que queremos emitir (El onChange se emite con el evento 
                que disparo el cambio en ese input)
                Para nuestro caso podemos crear un evento especifico no el completo del HTML y dentro le especificamos la funcion
                que ejecuta el trabajo 

        Queremos que nuestro componente pueda llegar a llamar esta funcion
        Pero tambien hay que saber que no solo queremos disparar la funcion sino tambien saber cual es el valor actual, si es cero no
        se tiene porque seguir disparando la funcion y saber cual articulo es el que se esta incrmentado

        Como la funcion onChange nos esta mandando varios argumentos los podemos desestructurar pero ademas le definimos el tipo
        de dato especifico para que no sean ANY (En un inicio los pusimos de tipo ANY para ver como venian los argumentos y asi fue como
        supimos como declararlos)

        La idea es que en esta funcion el "Count" no debe de decirnos cual es el valor que tinene sino que solo saber si se esta incrementando o decrementando
        Por lo tanto el COUNT no debe incrementarse solo emitir los valores de +1 o -1 
    */
    const onProductCountChange = ({ count, product }:{ count:number, product: Product }) => {
        // Vamos a construir nuestro carro de compras donde vamos a almacenar donde vamos a tener una llave, esa llave sera igual al ID del producto
        // y a lo que apunta ese valor va a ser de tipo ProductInCart
        //  shoppingCart[ product.id ] = {...product, count};
        // Lo de arriba es una mala practica porque estamos mutando el estado directamente solo debemos de cambiar el estado usando el setShoppingCart
        // Igual si queremos mostrarlo en la interface no veremos nada pero si en la consola
        setShoppingCart( oldshoppingCart => {

            // Tenemos que hacer que cuando un producto lo regresamos a CERO no tiene porque seguir apareciendo en el objeto asi que lo tenemos que borrar
            // Asi que tenemos que removerle la propiedad al objeto oldshoppingCart
            /*if( count === 0 ){
                // Vamos a hacer la eliminacion de un objeto mediante desestructuracion
                // Vamos a desestructurar el objeto que tenga la KEY (identificador) igual al product.id lo ponemos entre []
                // porque asi lo declaramos y es una propiedad computada
                const {
                    [product.id]: toDelete, // Este es el elemento que queremos eliminar y "toDelete" es el nombre que le estamos dando
                    ...rest // T.odo lo demas requerimos mantenerlo y le ponemos 'rest' del resto del argumentos
                } = oldshoppingCart;

                return rest;
            }
            
            // Tenemos que regresar lo mismo que nos pide el State (Del mismo tipo de dato)
            return {
                ...oldshoppingCart,
                // Aqui aplicamos la modificacion en el cual ponermos entre [] para que sea computada y a lo que apunta tiene que ser igual a la interface
                [ product.id ]: { ...product, count }
            };*/

            /* 
                Nueva implementacion

                Hay varias condiciones que tenemos que evaluar:
                    Tenemos que verificar si tenemos un producto y si el producto existe entonces tenemos que incrementar el valor en 1
                    o -1 pero si tenemos 0 productos y se pulsa -1 entonces no tenemos qe hacer nada, ademas hay que evaluar si no tenemos un
                    producto y queremos incrementarlo o decrementarlo y si es cero eliminarlo

                Vamos a buscarnos dentro del ShoppingCart un producto que tenga el ID que le pasemos
                pero esto puede ser nulo la primera vez, en ese caso lo creamos usando el producto que nos emite el "onProductCountChange"
                y le pasamos el count en 0 porque eso significa que si esta en nulo entonces no existe ningun producto
                Con esto ya nos evitamos implementar varios IF/ELSE
            */
           const productInCart: ProductInCart = oldshoppingCart[product.id] || { ...product, count: 0 };

            // Evaluamos para saber si requerimos incrementarlo o no
            // La logica de esta funcion MAth.max es que nos regresa el mayor de los dos valores que le pasamos
            // en el caso de que el Count sea 0 y le sumamos lo del product nos dara -1 pero como se compara con el 0 nos regresara 0
            // asi que en la interfaz no veremos el -1
            if( Math.max( productInCart.count + count, 0 ) > 0 ){
                // Significa que podemos incrementarlo
                productInCart.count += count;
                // Regresamos el nuevo estado que nesecita el ShoppingCart
                return {
                    ...oldshoppingCart,
                    [product.id]: productInCart
                }
            }

            // Aqui significa que hay que borrar el producto ya que el articulo no existe o la sumatoria va a ser menor a cero
            const { [product.id]: toDelete, ...rest } = oldshoppingCart;

            return rest;
        });
    }

    return {
        //products,
        shoppingCart,
        onProductCountChange
    }
}