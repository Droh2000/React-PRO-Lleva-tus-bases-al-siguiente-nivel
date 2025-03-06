export { ProductButtons } from "./ProductButtons";
export { ProductImage } from "./ProductImage";
export { ProductTitle } from "./ProductTitle";

import { ProductButtons } from "./ProductButtons";
import { ProductImage } from "./ProductImage";
import { ProductTitle } from "./ProductTitle";

// El ProductCard no lo vamos a exportar pero si lo importamos cambiandole el nombre
// export { ProductCard } from "./ProductCard";
// Le cambiamos el nombre porque nos vamos a crear una constante con ese nombre por defecto y asi mantener 
// la funcionalidad por ambos lados
import { ProductCard as ProductCardHOC } from "./ProductCard";
import { ProductCardHOCProps } from "../interfaces/interfaces";

// La idea es que nos creemos una constante que esta es la que vamos a exportar, este sera nuestro componente y es especial
// Aqui es donde le adicinamos las propiedades que son los demas componentes
// En JS todas las cosas menos los primitivos son objetos entonces usamos el ".assign" para pasarle el componente y asi
// poder asignarle nuevas propiedades
export const ProductCard: ProductCardHOCProps = Object.assign( ProductCardHOC, {
    // Las popiedades apuntaran a los componentes
    Title: ProductTitle,
    Image: ProductImage,
    Buttons: ProductButtons
})
// Gracias a la implementacion de la interface tenemos al usar el componente tendremos los metodos de autoayuda
