import { JSX, ReactElement } from "react";
import { Props as ProductCardProps, ProductCard } from '../components/ProductCard';
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
    product: Product,
    maxCount?: number,
}

export interface  ProductCardHOCProps {
    ({ children, product }: ProductCardProps): JSX.Element,
    Title: (Props: ProductTitleProps) => JSX.Element,
    Image: (Props: ProductImageProps) => JSX.Element,
    Buttons: (Props : ProductButttonsProps) => JSX.Element
}

export interface onChangeArgs {
    product: Product;
    count: number;
}

export interface ProductInCart extends Product{
    count: number;
}

export interface InitialValues{
    count?: number;
    maxCount?: number;
}

// Nos definimos una interface de todo lo que va a regresar el children
export interface ProductCardHandlers {
    // Aqui definimos todo lo que el componente va a regresar al mundo exterior
    count: number;
    isMaxCountReached: boolean;
    maxCount?: number;
    product: Product;

    increaseBy: ( value: number ) => void;
    reset: () => void; // Con esta vamos a resetear el estado de nuestro componente
}