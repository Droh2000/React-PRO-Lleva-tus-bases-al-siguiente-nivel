import { JSX, ReactElement } from "react";
// Para que no tenga un nombre generico le cambiamos el Alias
import { Props as ProductCardProps } from "../components/ProductCard";
import { Props as ProductTitleProps } from "../components/ProductTitle";
import { Props as ProductImageProps } from "../components/ProductImage";
import { Props as ProductButttonsProps } from "../components/ProductButtons";

export interface Product{
    id: string,
    title: string,
    img?: string
}

export interface ProductContextProps {
    counter: number,
    increaseBy: (n: number) => void,
    product: Product
}

// Originalmente en esta interface solo le estamos diciendo que recibe el titulo (Esta es la definicion para crear el componente
// de la forma ComponentePadre.ComponenteHijo) por eso funcion el className sin pasar por la definicion de estas interfaces
// Entonces la razon por la que nos sale el error en el "ProductCard" del archivo index y no tenemos el error aqui ya que en TS cuando
// definimos una interface por lo menos el objeto que le mandamos tiene que cumplir esa interface
/*export interface  ProductCardHOCProps {
    ({ children, product }: ProductCardProps): JSX.Element,
    Title: (Props: { title?: string, className?: string }) => JSX.Element,
    Image: (Props: { img?: string, className?: string }) => JSX.Element,
    // Para resolver vamos a desestructurar de aqui lo que por lo menos sabemos que vamos a recibir
    Buttons: (Props : { className?: string }) => JSX.Element
}*/
// Asi como lo declaramos arriba, resolvimos el error pero el problema es que tenemos la interface duplicada ya que si nos vamos a
// las interfaces internas que tiene cada uno de los componentes y le agregamos una propiedad, esta nueva propiedad no se va a ver
// reflejada en las dos formas de llamar el componente en "ShoppingPage" porque son dos interfaces diferentes las que se estan aplicando
// Para resolverlo vamos a exportar las interfaces que tiene internos cada componente
export interface  ProductCardHOCProps {
    ({ children, product }: ProductCardProps): JSX.Element,
    // Asi si despues agregamos una nueva propiedad se puede aplicar en los dos componentes
    Title: (Props: ProductTitleProps) => JSX.Element,
    Image: (Props: ProductImageProps) => JSX.Element,
    Buttons: (Props : ProductButttonsProps) => JSX.Element
}