import { ProductButtons, ProductCard, ProductImage, ProductTitle } from "../components";
import '../styles/custom-styles.css';

const product = {
    id: '1',
    title: 'Coffe Mug - Card',
    img: '/coffee-mug.png'
}

const product2 = {
    id: '2',
    title: 'Coffe Mug - Meme',
    img: '/coffee-mug2.png'
}

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
                <ProductCard 
                    product={ product }
                    className="bg-dark text-white"
                >
                    <ProductImage className="custom-image"/>
                    <ProductTitle className="text-bold"/>
                    <ProductButtons className="custom-buttons"/>
                </ProductCard>

                <ProductCard 
                    product={ product2 }
                    className="bg-dark text-bold" // Estos estilos le afecta a todos los componentes hijos, esta mecanica la podemos hacer para modificar los botones
                >
                    <ProductCard.Image className="custom-image"/>
                    <ProductCard.Title className="text-bold"/>
                    <ProductCard.Buttons className="custom-buttons"/>
                </ProductCard>
            </div>
        </div>
    )
}
