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
            {/*
                Queremos mandar en el ProductCard la informacion necesaria
                Empezamos con la propiedad del initialValue
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
                <ProductCard.Image className="custom-image"/>
                <ProductCard.Title className="text-bold"/>
                <ProductCard.Buttons className="custom-buttons"/>
            </ProductCard>
                 
        </div>
    )
}