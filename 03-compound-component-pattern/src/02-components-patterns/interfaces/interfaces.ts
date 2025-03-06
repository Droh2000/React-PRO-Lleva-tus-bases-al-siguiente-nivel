import { JSX, ReactElement } from "react";

// Este componente sabe como es la informacion que debe de esperar
// y asi el hijo tambien debe de esaber lo que tiene que recibir
export interface Product{
    id: string,
    title: string,
    img?: string
}

// De los argumentos de la funcion recibimos las PROPS pero a parte de esto queremos recibir todo el Prducto
// (Con los functional components podemos recibir mas informacion a parte de las props), entonces definamos las Props 
// de la siguiente manera
export interface ProductCardProps {
    // Como puede que recibamos mucha informacion de aqui editamos como queremos recibir estos datos
    product: Product
    // Es comun aqui tengamos que defenir muchas cosas que son propias de React y podemos estar usando en la Aplicacion
    // Lo definimos de este tipo y puede que sea solo uno o varios por eso el arreglo
    children?: ReactElement | ReactElement[]
}

/*
    Para compartir informacion entre un padre y sus hijos que no sean mediante las properties, para este caso tenemos el contextApi
    
    Aqui creamos el contexto y dentro del objeto le pasamos la informacion que vamos a compartir entre todos sus hijos
    Le tenemos que definir a este contexto como va a lucir para que al momento de usarlo sepamos mediante Typescript las propiedades 
    con las que tenemos (Para eso nos creamos una interface)
*/
export interface ProductContextProps {
    // Dentro definimos lo que definimos en la pripiedad de VALUE del "provider"
    counter: number,
    increaseBy: (n: number) => void,
    product: Product
}

// Interface para el ProductCard que lleva adentro varias componentes y tuvimos que exportarlo de otra forma
export interface  ProductCardHOCProps {
    ({ children, product }: ProductCardProps): JSX.Element,
    Title: ({ title }: { title?: string }) => JSX.Element,
    Image: ({ img }: { img?: string }) => JSX.Element,
    Buttons: () => JSX.Element
}