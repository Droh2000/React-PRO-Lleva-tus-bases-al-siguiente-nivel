import { LazyPage1, LazyPage2, LazyPage3 } from "../01-lazyload/pages";

/* 
    Tenemos este archivo para crear las rutas de manera dinamica, lo que seria la barra de navegacion
     y asi agregar nuevas de manera facil

    Primero definimos asi el tipo de dato para obligar que siempre se definan estos objetos de esta manera 
*/
interface RouteType {
    to: string;
    path: string;
    // El componente como toma el de React para saber el tipo ponemos el cursor encima del componente y veremos el tipo correspondiente
    Component: () => React.JSX.Element;
    name: string;
}

export const routes: RouteType[] = [
    {
        // Estas rutas que estamos definiendo aqui son para colcarlos en el parametro "To" de "NavLink" de "Navigation.tsx"
        to: '/lazy1',
        path: 'lazy1', // Este le pusimos "path" porque ese es el nombre del parametro del componente "Route"
        // Esto es para la parte donde especificamos el componente dentro de la ruta "Route" y lo ponemos con letra mayusculas porque asi capitalizan los componentes
        Component: LazyPage1,
        name: 'Lazy-1' // Este es el nombre que queremos que visualmente queremos que salga en la pagina del usuario
    },
    {
        to: '/lazy2',
        path: 'lazy2',
        Component: LazyPage2,
        name: 'Lazy-2'
    },
    {
        to: '/lazy3',
        path: 'lazy3',
        Component: LazyPage3,
        name: 'Lazy-3'
    },
]