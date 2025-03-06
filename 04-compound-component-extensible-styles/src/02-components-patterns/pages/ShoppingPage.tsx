import { ProductButtons, ProductCard, ProductImage, ProductTitle } from "../components";

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
                <ProductCard product={ product }>
                    <ProductCard.Image/>
                    <ProductCard.Title/>
                    <ProductCard.Buttons/>
                </ProductCard>
            </div>
        </div>
    )
}
