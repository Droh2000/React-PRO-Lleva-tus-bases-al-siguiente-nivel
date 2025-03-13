import { ProductButtons, ProductCard, ProductImage, ProductTitle } from "../components";
import '../styles/custom-styles.css';
import { products } from "../data/products";

// Seleccionamos cualquier producto que queramos
const product = products[0];

export const ShoppingPage = () => {
    
    return (
        <div>
            <h1>Shopping Store</h1>
            <hr />
            
            <ProductCard 
                key={ product.id }
                product={ product }
                className="bg-dark text-bold"
            >
                <ProductCard.Image className="custom-image"/>
                <ProductCard.Title className="text-bold"/>
                <ProductCard.Buttons className="custom-buttons"/>
            </ProductCard>
                 
        </div>
    )
}