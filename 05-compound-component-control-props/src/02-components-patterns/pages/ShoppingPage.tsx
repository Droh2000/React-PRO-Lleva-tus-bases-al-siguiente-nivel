import { ProductButtons, ProductCard, ProductImage, ProductTitle } from "../components";
import { Product } from "../interfaces/interfaces";
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

export const ShoppingPage = () => {
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
                <ProductCard 
                    product={ product2 }
                    className="bg-dark text-bold"
                    style={{ width: '100px' }}
                >
                    <ProductCard.Image className="custom-image"/>
                    <ProductCard.Buttons className="custom-buttons"/>
                </ProductCard>

                <ProductCard 
                    product={ product1 }
                    className="bg-dark text-bold"
                    style={{ width: '100px' }}
                >
                    <ProductCard.Image className="custom-image"/>
                    <ProductCard.Buttons className="custom-buttons"/>
                </ProductCard>
            </div>

        </div>
    )
}
