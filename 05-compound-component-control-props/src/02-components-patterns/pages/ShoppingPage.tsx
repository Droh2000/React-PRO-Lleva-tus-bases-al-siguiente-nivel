import { useState } from "react";
import { ProductButtons, ProductCard, ProductImage, ProductTitle } from "../components";
import { Product } from '../interfaces/interfaces';
import '../styles/custom-styles.css';

const product1 = {
    id: '1',
    title: 'Coffe Mug - Card',
    img: '/coffee-mug.png'
}

const product2 = {
    id: '2',
    title: 'Coffe Mug - Meme',
    img: '/coffee-mug2.png'
}

const products: Product[] = [ product1, product2 ];

// Definimos el tipo de dato del useState
// Esta interface va a tener todas las propiedades de "Product" por eso la extendemos
interface ProductInCart extends Product{
    count: number;
}

export const ShoppingPage = () => {
    
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

    return (
        <div>
            <h1>Shopping Store</h1>
            <hr />

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row'
            }}>
                {
                    // Vamos a duplicar la cantidad de tarjetas "ProductCard" por la cantidad de productos en el arreglo
                    products.map( product => (
                        <ProductCard 
                            key={ product.id }
                            product={ product }
                            className="bg-dark text-bold"
                            /* Tenemos que definir esta nueva propiedad en nuestro componente
                                    onChange={ onProductCountChange } // Si lo definimos asi significa que el evento que emita el "onChange" es el primero argumento que manda a llamar la funcion
                                                Osea si la funcion que le mandamos espera argumentos el onChange no le mandara nada asi, entonces nos dara error
                               Con esto ya podemos disparar la funcion personalizada cuando el estado cambia
                               Requerimos que nos diga cual es la cantidad de elemento en el contador del producto (Este es el valor que debe emitir el onChange) para esto modificamos la interface Props de ProductCard

                               Vamos a tener el incoveniente cuando estamos esperando que en la funcion nos envien el valor del contador y del producto
                               porque los valores que el onChange esta emitiendo no son iguales en el tipo de dato a los que les estamos mandando
                               para esto a la funcion "onProductCountChange" le especificamos los argumentos son sus tipos y asi podemos mandar a llamar la funcion
                               como antes 
                            */
                            onChange={ onProductCountChange } // Asi podemos mandar los argumentos que espera la funcion
                            // Para ver los valores reflejados a la inversa a la tarjeta le falta el Value pero lo dificil es saber cual es el valor
                            // Sera 0 si es la primera vez y no tenemos nada en el carro pero si tenemos algo en el carro de compras el valor que tendra sera el que tenemos en "shoppingCart"
                            // Como puede ser que sea undefined le agregamos el ? y si es nulo le agrege 0
                            value={shoppingCart[product.id]?.count || 0}
                        >
                            <ProductCard.Image className="custom-image"/>
                            <ProductCard.Title className="text-bold"/>
                            <ProductCard.Buttons className="custom-buttons"/>
                        </ProductCard>
                    ))
                }
            </div>

            {/* 
                Vamos a hacer una simulacion de un carro de compras y ver la sincronizacion del contador 
                    El problema es que 
                        * Estos articulos no estan sincronizados, 
                        * Si el valor es 0 no tiene porque salir el articulo hasta en esta seccion hasta que sea mayor o igual a 1
                        * Si nos salimos de la pagina y volvemos a entrar el contador debe mantenerse igual a como lo dejamos
                Lo que pasa es que no nos podemos dar cuenta cuando cambia el contador de la pagina principal para modificar el contador del carro
                Debemos de pasarle al componente de manera externa los valores y controlar lo que queremos que nos regrese
            */}
            <div className="shopping-cart">
                {
                    // Vamos a hacer se dibujen por cada elementos que entre en el objeto por tener el contador mayor a 0
                    // Para esto tenemos que recorrer el objeto y en el map como argumentos tenemos esto porque es de un objeto
                    // y Ademas haciendo el Return implicito encerrando todo entre parentesis despues de la =>
                    Object.entries(shoppingCart).map(([ key, product ]) => (
                        /*
                            Sincronizar los valores en los contadores
                                Siguiendo la ideologia de React todo es ReadOnly donde si queremos cambiar un valor tenemos que mandar a llamar una funcion la cual
                                manda a llamar la funcion que cambia el estado y el estado es el que redibuja el componente que al redibujarse tiene el nuevo valor

                                Al cambiar los botones de incremento sabemos que viene siempre vendra un valor, este lo podremos ver si colocamos
                                    <ProductTitle title={`${product.count}`}/>
                                Con solo esto veremos que si incrementamos en las tarjetas principilaes tambien se incrementara en el Carro de compras, cada vez que nosotros cambiamos el estado
                                el estado se reconstruye y react cambia los lugares donde cambio algun valor
                        */
                        <ProductCard 
                            key={ key }
                            product={ product }
                            className="bg-dark text-bold"
                            style={{ width: '100px' }}
                            // Aqui le pasamos la referencia al valor
                            value={ product.count }
                            // Asi como estaba antes estabamos solo emitiendo valores pero estos quedan en el Aire porque no estamos cambiando el estado global 
                            // Del ShoppingCart porque no estabamos llamando la funcion del "setShoppingCart" entonces tenemos que mandar a llamar el "onProductCountchange"
                            onChange={ onProductCountChange }   
                        >
                            <ProductCard.Image className="custom-image"/>
                            <ProductCard.Buttons 
                                className="custom-buttons" 
                                style={{ display: 'flex', justifyContent: 'center' }}
                            />
                        </ProductCard>
                    ))
                }
            </div>

            {/*<div>
                <code>
                    { JSON.stringify( shoppingCart, null, 5 ) }
                </code>
            </div>*/}

        </div>
    )
}