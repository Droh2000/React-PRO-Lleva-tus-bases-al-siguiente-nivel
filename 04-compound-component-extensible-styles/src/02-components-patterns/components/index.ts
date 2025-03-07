export { ProductButtons } from "./ProductButtons";
export { ProductImage } from "./ProductImage";
export { ProductTitle } from "./ProductTitle";

import { ProductButtons } from "./ProductButtons";
import { ProductImage } from "./ProductImage";
import { ProductTitle } from "./ProductTitle";
import { ProductCard as ProductCardHOC } from "./ProductCard";
import { ProductCardHOCProps } from "../interfaces/interfaces";

// Despues de agregar el className en el "ProductButtons" nos maracara aqui un erro, esto es porque tenemos un problema con el tipado
// Podriamos quitar el tipado y ya pero TS despues infiere el tipo basado en el objeto que esta recibiendo pero nosotros queremos
// controlar Bien para asegurarnos que no pongan otras propiedades que no van
export const ProductCard: ProductCardHOCProps = Object.assign( ProductCardHOC, {
    Title: ProductTitle,
    Image: ProductImage,
    Buttons: ProductButtons
});
