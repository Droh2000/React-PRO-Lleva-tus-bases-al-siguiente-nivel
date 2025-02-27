import { BrowserRouter, Route, NavLink, Routes, Navigate } from 'react-router-dom';

import logo from '../assets/react.svg';

import { LazyPage1, LazyPage2, LazyPage3 } from '../01-lazyload/pages';

export const Navigation = () => {
    return (
        <BrowserRouter>
            {/* Aqui adentro definimos las rutas */}
            <div className='main-layout'>
                <nav>
                    <img src={ logo } alt='React Logo'/>

                    {/* Opciones de menu para hacer mejor la navegacion 
                        Aqui estamos usando el NavLink pero tambien tenemos el Link, la diferencia es que
                        el Link es como un "a href" y el NavLink es para eso mismo pero tambien podemos determinar si estamos
                        en esa ruta o no y asi poner una clase de si esta activo o no (Esto lo implementamos con el ClassName)

                        La logica implementada dentro del className es que de manera condicional mostramos una clase
                        que creamos en el CSS llamada .nav-active, con el argumento "isActiva" regresamos o no la clase

                        En la carpeta 01-lazyload es un modulo en donde vamos a agrupar todo lo rleacionado a Lazyload
                        Dentro de pages creamos varios componentes que son los que configuramos como rutas aqui
                    */}
                    <ul>
                        <li>
                            <NavLink to='/lazy1' className={ ({ isActive }) => !isActive ? 'nav-active' : ''} >Lazy 1</NavLink>
                        </li>
                        <li>
                            <NavLink to='/lazy2' className={ ({ isActive }) => !isActive ? 'nav-active' : ''}>Lazy 2</NavLink>
                        </li>
                        <li>
                            <NavLink to='/lazy3' className={ ({ isActive }) => !isActive ? 'nav-active' : ''}>Lazy 3</NavLink>
                        </li>
                    </ul>
                </nav>

                {/* Definicion de las rutas, aqui como prueba solo nos creamos unos componentes dentro de la propiedad element 
                
                    Sin lazyload los componentes estan siendo cargados dentro del main.chunk.js, las rutas son parte del archivo "bundle.js" que es el que sabe crear 
                    esos componente pero con la primera carga cuando se hace el llamado a la URL nos trae toda la aplicacion y todos los componentes 
                    Al agregar el LAzyload en cada uno de los componentes hacen que el archivo "bundle.js" se mas chico y por ende carge mas rapido la aplicacion
                    Pero hay que saber que si segmentamos mas nuestra la aplicacion entonces hay mas tiempo de carga que va a estar separado en diferentes partes del tiempo

                    El chiste esta que en modulos donde todo usuario va a tener acceso hay que dejarlo que se carge desde el inicio pero ya en partes que son de acceso restringido
                    o donde puede que el usuario nunca entre, es donde podemos implementar el LAzyload pero por modulo completo no por componente, asi tenemos todo lista ya cargado
                    en una unica carga y no tener cargado de manera segmentada
                */}
                <Routes>
                    {/* Cada ruta la mandamos a su componente correspondiente */}
                    <Route path='lazy1' element={ <LazyPage1 /> } />
                    <Route path='lazy2' element={ <LazyPage2 /> } />
                    <Route path='lazy3' element={ <LazyPage3 /> } />
                    {/* Esto es para cualquier otra ruta que no sea reconocida, lo mandamos al Home y con el replace es para que no pueda regresar */}
                    <Route path='/*' element={ <Navigate to='/lazy1' replace /> } />
                </Routes>
            </div>
        </BrowserRouter>
    )
}