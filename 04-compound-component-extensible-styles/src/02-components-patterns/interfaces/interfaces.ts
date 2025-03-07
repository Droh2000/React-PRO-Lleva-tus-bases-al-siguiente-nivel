import { JSX, ReactElement } from "react";
// Para que no tenga un nombre generico le cambiamos el Alias
import { Props as ProductCardProps } from "../components/ProductCard";

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
export interface  ProductCardHOCProps {
    ({ children, product }: ProductCardProps): JSX.Element,
    Title: ({ title }: { title?: string }) => JSX.Element,
    Image: ({ img }: { img?: string }) => JSX.Element,
    // Para resolver vamos a desestructurar de aqui lo que por lo menos sabemos que vamos a recibir
    Buttons: ({ className } : { className?: string }) => JSX.Element
}
// Con esta logica implementada tenemos que de las dos formas de definir el componente en el "ShoppingPage" solo va a founcionar lo
// de agregar el className al de los Buttons y al componente padre pero para los otros componentes hijos nos dara erro