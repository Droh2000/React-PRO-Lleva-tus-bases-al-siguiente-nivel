import { ProductButtons, ProductCard, ProductImage, ProductTitle } from "../components";
import '../styles/custom-styles.css';
import { products } from "../data/products";
import styles from '../styles/styles.module.css';

// Seleccionamos cualquier producto que queramos
const product = products[0];

export const ShoppingPage = () => {
    
    return (
        <div>
            <h1>Shopping Store</h1>
            <hr />
            {/*
                Queremos mandar en el ProductCard la informacion necesaria
                Empezamos con la propiedad del initialValue

                Lo interesantes es saber la forma en la que tenemos que regresar la informacion a otra persona
                que vaya a usar el componente
                El patron State Initializer tambien exige que asi como nostros podemos mandar un valor inicial tambien 
                podemos mandarle al usuario la forma de reinicializar el valor al estado inicial

                Lo que queremos emplear es como la logica que emplea Fornik en el que dentro le pasamos una funcion y queremos que
                nos retorne un JSX (Al ver => () significa que esta regresando un objeto que seria el JSX y lo retorna automaticamente)
                Ademas este JSX debe de respetar las mismas normas que el return principal de nuestro componente
                (Es decir tenemos que regresar un unico objeto por eso colocamos el fragmento) y dentro del fragmento 
                le colocamos todo el contenido del JSX
            */}
            <ProductCard 
                key={ product.id }
                product={ product }
                className="bg-dark text-bold"
                initialValues = {{
                    // Aqui dentro le podemos mandar todo lo que requiramos
                    count: 4, // Que empieze el contador en esto
                    maxCount: 10, // Solo le vamos a permitir que pueda llevar 10
                }}
            >
                {
                    // Des los args podemos desestructurar y tomar lo que nos intereses
                    ({ reset,count,increaseBy, isMaxCountReached }) => (
                        <>
                            <ProductCard.Image className="custom-image"/>
                            <ProductCard.Title className="text-bold"/>
                            <ProductCard.Buttons className="custom-buttons"/>

                            <button onClick={ reset }>Reset</button>

                            {/* Con esto podemos ver todos los valores y los argumentos que se reciben  
                                (Aqui no van a aparecer las referencias de las funciones)
                            
                                JSON.stringify( args, null, 3 )

                                Ahora vamos a aprovechar para poder agregar mas botones, cada uno con su respectiva logica
                            */}
                            <button onClick={ () => increaseBy(-2) }>-2</button>

                            {/* Si no se llega al isMAxCount mostrar el boton sino ocultar */}
                            <button
                                className={`${isMaxCountReached && styles.hideButton}`}
                                onClick={ () => increaseBy(2) }
                            >+2</button>
                            {/*
                                Otra forma de resolver lo de arriba es dentro de las {} llamar una funcion autoinvocada
                                y si se cumple la condicion del isMax entones muestra el boton
                            */}
                            {
                                /*( !isMaxCountReached && <button onClick={ () => increaseBy(2) }>+2</button> )*/
                            }

                            <span>Count: { count }</span>
                        </>
                    )
                }
            </ProductCard>
                 
        </div>
    )
}