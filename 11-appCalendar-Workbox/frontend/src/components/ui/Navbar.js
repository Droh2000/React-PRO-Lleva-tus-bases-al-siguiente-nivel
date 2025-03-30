import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth';

// Hire Order Component para mostrar cuando esta online y offline
import { Offline, Online } from 'react-detect-offline';

export const Navbar = () => {

    const dispatch = useDispatch();
    const { name } = useSelector( state => state.auth );

    const handleLogout = () => {
        dispatch( startLogout() );
    }

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                { name }
            </span>

            {/*
                Dentro de cada etiqueta le podemos meter cualquier tipo de contenido que se mostrara ya automaticamente si esta 
                online u offline
                Con esto podremos modificar el Redux, agreagr mensajes para que en cada peticion decirle al usuario que se gaurdar en cache
                entre otras cosas
            */}
            <Online>
                <span className='text-success'>Online</span>
            </Online>

            <Offline>
            <span className='text-danger'>Offline</span>
            </Offline>
            
            <button 
                className="btn btn-outline-danger"
                onClick={ handleLogout }
            >
                <i className="fas fa-sign-out-alt"></i>
                <span> Salir</span>
            </button>

        </div>
    )
}
