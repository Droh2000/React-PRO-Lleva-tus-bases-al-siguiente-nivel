import { ProductButtons, ProductCard, ProductImage, ProductTitle } from "../components/ProductCard"

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
                {/*
                    La refactorizacion logica que buscamos, aqui cambiamos la etiqueta de cierra de /> a </ProductCard>
                    Al hacerlo de esta manera el componente lo tenemos que definir que recibe el Hijo en las properties
                    y esto lo hace un Hide Order Component (HOC) (Tenemos que hacer que este componente reciba los hijos)
                    Asi que internamente le definimos los hijos
                        Dentro le especificamos cada uno de los componentes individuales que habiamos creado
                    Es importante ver la logica que si en el padre le mandamos el "product" los componentes hijos deben de poder
                    tomar las propieades que le interese y ademas poder desde el componente hijo cambiar la propieadad por si queremos 
                    otro valor y pueda cambiarlo manualmente

                    El siguiente paso es ver de que manera podemos compartir toda la informacion que el "product" tiene a sus hijos
                    y tambien el "ProductButtons" no deberia de tener ninguna relacion o dependencia con el increaseBy y Counter porqie
                    son propiedades que estan internas en el estado del "ProductCard" no deberian de estar expuestas al mundo exterior
                    Vamos a seguir en el patron en el que en lugar de pasarle los componentes hijos internamnete al padre mejor vamos a
                    hacer que solo llamando "ComponentePadre.ComponenteHijo" 
                */}
                <ProductCard product={ product }>
                    <ProductImage/>
                    <ProductTitle 
                        title="" // Si no se lo mandamos se va a quejar porque es obligatoria 
                    />
                    
                    <ProductButtons
                        // Este es mas complicado porque ni siquiera se relaciona sus atributos con los del padre sino que 
                        // los sacamos del "useProduct" que definimos dentro del componente
                    />
                </ProductCard>
            </div>
        </div>
    )
}
