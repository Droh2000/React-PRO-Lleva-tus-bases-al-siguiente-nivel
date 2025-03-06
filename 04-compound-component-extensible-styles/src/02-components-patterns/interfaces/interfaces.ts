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

export interface  ProductCardHOCProps {
    ({ children, product }: ProductCardProps): JSX.Element,
    Title: ({ title, className }: { title?: string, className?: string }) => JSX.Element,
    Image: ({ img, className }: { img?: string, className?: string }) => JSX.Element,
    Buttons: () => JSX.Element
}