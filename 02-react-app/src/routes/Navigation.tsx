import { BrowserRouter, Route, NavLink, Routes, Navigate } from 'react-router-dom';

import logo from '../assets/react.svg'

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
                    */}
                    <ul>
                        <li>
                            <NavLink to='/home' className={ ({ isActive }) => !isActive ? 'nav-active' : ''} >Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/about' className={ ({ isActive }) => !isActive ? 'nav-active' : ''}>About</NavLink>
                        </li>
                        <li>
                            <NavLink to='/users' className={ ({ isActive }) => !isActive ? 'nav-active' : ''}>Users</NavLink>
                        </li>
                    </ul>
                </nav>

                {/* Definicion de las rutas, aqui como prueba solo nos creamos unos componentes dentro de la propiedad element */}
                <Routes>
                    <Route path='about' element={ <h1>About Page</h1> } />
                    <Route path='users' element={ <h1>Users Page</h1> } />
                    <Route path='home' element={ <h1>Home Page</h1> } />
                    {/* Esto es para cualquier otra ruta que no sea reconocida, lo mandamos al Home y con el replace es para que no pueda regresar */}
                    <Route path='/*' element={ <Navigate to='/home' replace /> } />
                </Routes>
            </div>
        </BrowserRouter>
    )
}