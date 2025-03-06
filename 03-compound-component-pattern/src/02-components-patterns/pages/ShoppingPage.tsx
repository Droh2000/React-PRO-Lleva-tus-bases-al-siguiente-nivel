import { ProductCard } from "../components/ProductCard"

// Aqui nos definimos productos para agregarlos a las tarjetas
// este objeto no sabemos como va a lucir y se lo vamos a mandar al div del Style
const product = {
    id: '1',
    title: 'Coffe Mug - Card',
    img: './coffe-mug.png'
}

export const ShoppingPage = () => {
    return (
        <div>
            {/* 
                La idea es que seamos capaces de recibir informacion del componente padre a la hora de renderizar la tarjeta 
                donde tenemos el contador, asi si tenemos mas productos reutilizemos esa tarjeta 
            */}
            <h1>Shopping Store</h1>
            <hr />

            {/*
                Nosotros podriamos recibir varias tarjetas
            */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row'
            }}>
                <ProductCard product={ product }/>
            </div>
        </div>
    )
}
