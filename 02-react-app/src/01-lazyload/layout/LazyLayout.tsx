/*
    Implementacion del Lazyload pero con rutas anidadas esto es lo que nos va a permitir a nosotros cargar modulos
    es decir una ruta anidada la vamos a cargar como si fuera un componente comun y corriente, como en este caso
    para cada una de las opciones del menu pero esta vez cada opcion va a tener una configuracion interna de rutas 
    y esas rutas no las vamos a cargar de manera peresosa porque vamos a poner ahi todas las rutas de manera estatica
    asi todo eso va a formar parte del mismo chunk o del mismo pedaso que va a terminar siendo cargado bajo demanda
     
    Lo vamos a crear de esta manera porque en una aplicacion donde se por ejemplo una parte de autenticacion y despues se tiene un dashboar
    (Otro aspecto totalmente diferente al login) nosotros vamos a requerir diferentes Templates (Aqui es donde vamos a renderizar los elementos 
    requeridos) pero esto siempre van a estar en todas las paginas cosa que en una pagina del login no pasaria

    Estas son las rutas hijas que van a estar anidadas y seran mostradas aqui
    (Este componente lo vamos a cargar de manera perezosa por lo tanto requiere ser exportado por defecto)
*/

import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { LazyPage1, LazyPage2, LazyPage3 } from "../pages";

// Esto es un modulo que carga todo a la vez, si la persona no entra a este modulo no se carga nada de esto 
export const LazyLayout = () => {
    return (
        <div>
            <h1>LazyLayout Page</h1>    

            {/* Las rutas hijas iran aqui y poder renderizarlas, cuando se carge el LazyLayout queremos que se carge 
                Lo que estamos haciendo aqui es generar enlaces y hace que la ruta sea de la que especificamos routes.ts
                toma lo de "lazyload/" y le agrega dinamicamente "laz1y" o "lazy2" o "lazy3"
            */}
            <ul>
                <li>
                    <NavLink to="lazy1">Lazy 1</NavLink>
                </li>
                <li>
                    <NavLink to="lazy2">Lazy 2</NavLink>
                </li>
                <li>
                    <NavLink to="lazy3">Lazy 3</NavLink>
                </li>
            </ul>

            {/* Definimos las Rutas que a ahora no estamos cargando de manera perezosa por componente
                sino que ahora va a cargar todo esto en conjunto
            */}
            <Routes>
                <Route path="lazy1" element={ <LazyPage1/> } />
                <Route path="lazy2" element={ <LazyPage2/> } />
                <Route path="lazy3" element={ <LazyPage3/> } />

                {/* 
                    Si no se cumple ninguna de las rutas de arriba va a mostrar esto 
                    <Route path="*" element={ <div>Not Found</div> } />
                       
                    Lo de arriba se comento ya que queremos que una ves se ingrese al menu del LazyLoad nos salga por defecto el componente
                    este componente es el que determina a que path va a manejar
                    Con el Navigate usamos el "replace" para que remplaze la ruta y en to definimos a la ruta que salga
                */}
                <Route path="*" element={ <Navigate replace to="lazy1" /> } />
            </Routes>
        </div>
    )
}

export default LazyLayout;