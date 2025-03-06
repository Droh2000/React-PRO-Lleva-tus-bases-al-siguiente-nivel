import { ProductButtons, ProductCard, ProductImage, ProductTitle } from "../components";
import '../styles/custom-styles.css';

const product = {
    id: '1',
    title: 'Coffe Mug - Card',
    img: './coffe-mug.png'
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
                <ProductCard product={ product }>
                    <ProductImage/>
                    <ProductTitle title="Titulo Cambiado"/>
                    <ProductButtons />
                </ProductCard>

                {/*
                    Habilitar a nuestros componentes para que acepten el className
                    Dentro de la carpeta Styles nos definimos un par de clases dentro del archivo
                    "custom-styles.css" donde va a habilitar todos esos estilos de manera que nos permita
                    definir las clases propiamente

                    Aqui le definimos la clase para que acepte los estilos
                */}
                <ProductCard 
                    product={ product }
                    className="bg-dark"
                >
                    <ProductCard.Image/>
                    <ProductCard.Title/>
                    <ProductCard.Buttons/>
                </ProductCard>
            </div>
        </div>
    )
}
