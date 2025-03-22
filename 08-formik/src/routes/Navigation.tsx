import { BrowserRouter, Route, NavLink, Routes, Navigate } from 'react-router-dom';

import logo from '../assets/react.svg'

import { RegisterPage, FormikBasicPage, FormikYupPage, FormikComponents,FormikAbstract } from '../03-forms/pages';

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
                            <NavLink to='/formik-basic' className={ ({ isActive }) => !isActive ? 'nav-active' : ''}>Formik Basic</NavLink>
                        </li>
                        <li>
                            <NavLink to='/formik-yup' className={ ({ isActive }) => !isActive ? 'nav-active' : ''}>Formik Yup</NavLink>
                        </li>
                        <li>
                            <NavLink to='/formik-components' className={ ({ isActive }) => !isActive ? 'nav-active' : ''}>Formik Components</NavLink>
                        </li>
                        <li>
                            <NavLink to='/formik-abstrac' className={ ({ isActive }) => !isActive ? 'nav-active' : ''}>Formik Abstract</NavLink>
                        </li>
                        <li>
                            <NavLink to='/users' className={ ({ isActive }) => !isActive ? 'nav-active' : ''}>Users</NavLink>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path='register' element={ <RegisterPage/> } />
                    <Route path='formik-basic' element={ <FormikBasicPage/> } />
                    <Route path='formik-yup' element={ <FormikYupPage/> } />
                    <Route path='formik-components' element={ <FormikComponents/> } />
                    <Route path='formik-abstrac' element={ <FormikAbstract/> } />
                    <Route path='Home' element={ <h1>Home</h1> } />
                    <Route path='/*' element={ <Navigate to='/home' replace /> } />
                </Routes>
            </div>
        </BrowserRouter>
    )
}