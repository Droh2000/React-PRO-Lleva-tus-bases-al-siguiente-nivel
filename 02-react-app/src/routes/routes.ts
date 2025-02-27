import { lazy, LazyExoticComponent } from "react";
// import { LazyPage1, LazyPage2, LazyPage3 } from "../01-lazyload/pages";

// Para no perder la flexibilidad del tipado ya que pasamos de usar los componentes de tipo "React.JSX.Element"  a los componentes pero
// importados usando Lazyload que es de otro tipo (Asi es como soportamos rutas que son por LazyLoad y rutas que estan cargadas de manera estatica)
// Nos definimos un tipo especializado que como esta parte de la funcion con el tipo "React.JSX.Element" se repita en los dos tipos diferentes
type JSXComponent = () => React.JSX.Element;

/* 
    Tenemos este archivo para crear las rutas de manera dinamica, lo que seria la barra de navegacion
     y asi agregar nuevas de manera facil

    Primero definimos asi el tipo de dato para obligar que siempre se definan estos objetos de esta manera 
*/
interface RouteType {
    to: string;
    path: string;
    // El componente como toma el de React para saber el tipo ponemos el cursor encima del componente y veremos el tipo correspondiente
    // De esta manera le decimos que puede ser del tipo de "LazyExoticComponent" o un Componente tradiciaional con JSXComponent
    Component: LazyExoticComponent<JSXComponent> | JSXComponent;
    name: string;
}

// Implememtacion del LazyLoad
// Tod0 empieza definiendo un componente que va a ser cargado bajo demanda 
// usando el metodo de React "lazy()" el cual nos permite cargar el componente de esta manera
// Los componentes que vayamos a cargar por LazyLoad deben de tener una exportacion por defecto
// sino tendremos un error al importarlos en esta linea
const Lazy1 = lazy(() => import('../01-lazyload/pages/LazyPage1'));
const Lazy2 = lazy(() => import('../01-lazyload/pages/LazyPage2'));
const Lazy3 = lazy(() => import('../01-lazyload/pages/LazyPage3'));

export const routes: RouteType[] = [
    {
        // Estas rutas que estamos definiendo aqui son para colcarlos en el parametro "To" de "NavLink" de "Navigation.tsx"
        to: '/lazy1',
        path: 'lazy1', // Este le pusimos "path" porque ese es el nombre del parametro del componente "Route"
        // Esto es para la parte donde especificamos el componente dentro de la ruta "Route" y lo ponemos con letra mayusculas porque asi capitalizan los componentes
        Component: Lazy1,
        name: 'Lazy-1' // Este es el nombre que queremos que visualmente queremos que salga en la pagina del usuario
    },
    {
        to: '/lazy2',
        path: 'lazy2',
        Component: Lazy2,
        name: 'Lazy-2'
    },
    {
        to: '/lazy3',
        path: 'lazy3',
        Component: Lazy3,
        name: 'Lazy-3'
    },
]