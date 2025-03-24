import { BrowserRouter, Route, NavLink, Routes, Navigate } from 'react-router-dom';

import logo from '../assets/react.svg'

import { RegisterPage, RegisterFormikPage, DynamicForm } from '../03-forms/pages';

export const Navigation = () => {
    return (
        <BrowserRouter>
            <div className='main-layout'>
                <nav>
                    <img src={ logo } alt='React Logo'/>

                    <ul>
                        <li>
                            <NavLink to='/register' className={ ({ isActive }) => !isActive ? 'nav-active' : ''} >Register Page</NavLink>
                        </li>
                        <li>
                            <NavLink to='/formik-register' className={ ({ isActive }) => !isActive ? 'nav-active' : ''} >Register Formik Page</NavLink>
                        </li>
                        <li>
                            <NavLink to='/dynamic-form' className={ ({ isActive }) => !isActive ? 'nav-active' : ''}>Dynamic Form</NavLink>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path='register' element={ <RegisterPage/> } />
                    <Route path='formik-register' element={ <RegisterFormikPage/> } />
                    <Route path='dynamic-form' element={ <DynamicForm/> } />
                    <Route path='Home' element={ <h1>Home</h1> } />
                    <Route path='/*' element={ <Navigate to='/home' replace /> } />
                </Routes>
            </div>
        </BrowserRouter>
    )
}