import '../styles/styles.css';
// Importamos su customHook
import { useFormik } from 'formik';


export const FormikBasicPage = () => {

    // Le tenemos que mandar al Hook cierta configuracion 
    const formik = useFormik({
        initialValues: {
            // Aqui mandamos los campos del formulario
            firstName: '',
            lastName: '',
            email: '',
        },
        // Este es un metodo en el cual vamos a tener los values del formulario y
        // se va a ejecutar cuando el formulario pase todas las reglas de validacion
        onSubmit: (values) => {

        }
    });

    return (
        <div>
            <h1>Formik Basic Tutorial</h1>

            {/* Conectamos los elementos de "formik" a nuestro formulario HTML  
                Ademas para evitar la propagacion del formulario ya nos da la funcion 
            */}
            <form onSubmit={ formik.handleSubmit } noValidate>
                <label htmlFor="firstName">First Name</label>
                <input 
                    type="text" 
                    name='firstName' // Es importante que el valor de "name" sea igual a los que pasamos en initialValues
                    value={ formik.values.firstName } // Le establecemos los valores que sea escritos
                    onChange={ formik.handleChange } // Esto es como lo haciamos antes que nos creabamos una funcion aparte e implementabamos toda la logica
                />
                {/* Aqui vamos a tener las mismas validaciones */}
                <span>Fist names is required</span>

                <label htmlFor="lastName">Last Name</label>
                <input 
                    type="text"
                    name='lastName'
                    value={ formik.values.lastName }
                    onChange={ formik.handleChange } 
                />
                <span>Last name is required</span>

                <label htmlFor="emailAddress">Email Address</label>
                <input 
                    type="email"
                    name='email'
                    value={ formik.values.firstName }
                    onChange={ formik.handleChange } 
                />
                <span>Email Address is required</span>
                <span>Check for an valid email format</span>

                <button type='submit'>Submit</button>

            </form>
        </div>
    )
}