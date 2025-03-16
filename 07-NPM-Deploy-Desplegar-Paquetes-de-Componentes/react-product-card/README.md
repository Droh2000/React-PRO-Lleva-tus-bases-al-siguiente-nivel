# Product-Card NPM

Este es un paquete de pruebas de despliegue en NPM

## Ejemplo de uso

```
import{ ProductCard } from 'react-product-card'


<ProductCard 
    key={ product.id }
    product={ product }
    initialValues = {{
        count: 4, 
        maxCount: 10,
    }}
>
    {
        ({ }) => (
            <>
                <ProductCard.Image/>
                <ProductCard.Title/>
                <ProductCard.Buttons/>

            </>
        )
    }
</ProductCard>
```