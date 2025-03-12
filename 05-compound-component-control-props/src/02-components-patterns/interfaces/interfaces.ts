import { JSX, ReactElement } from "react";
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

export interface  ProductCardHOCProps {
    ({ children, product }: ProductCardProps): JSX.Element,
    Title: (Props: ProductTitleProps) => JSX.Element,
    Image: (Props: ProductImageProps) => JSX.Element,
    Buttons: (Props : ProductButttonsProps) => JSX.Element
}

// Interface para los argumentos que espera la funcion Onchange que seran los que emitamos a los componentes externos
export interface onChangeArgs {
    product: Product;
    count: number;
}