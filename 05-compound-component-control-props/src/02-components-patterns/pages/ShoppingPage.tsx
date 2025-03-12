import { ProductButtons, ProductCard, ProductImage, ProductTitle } from "../components";
import '../styles/custom-styles.css';
import { useShoppingCart } from "../hooks/useShoppingCart";
import { products } from "../data/products";

export const ShoppingPage = () => {
    
    const { shoppingCart, onProductCountChange} = useShoppingCart();

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