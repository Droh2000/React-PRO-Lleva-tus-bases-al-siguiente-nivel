import '../styles/styles.css';
// Importamos su customHook
import { FormikErrors, useFormik } from 'formik';

interface FormValues {
    firstName: string,
    lastName: string,
    email: string,
}

export const FormikBasicPage = () => {

    // Esta funcion recibe los values del formulario, el tipo de dato del argumento serian los campos que definimos
    // Esto nos ahorra tener que hacer una validacion en cada input y luego hacer las validaciones en el Submit ya que todo se hace aqui
    const validate = ( values: FormValues ) => {

        // Esta funcion tiene que regresar los errores, este objeto debe de tener algun formato porque lo tiene que interpretar Formik
        const errors: FormikErrors<FormValues> = {};

        // Si el campo no existe
        if( !values.firstName ){
            errors.firstName = 'Required';
        }else if( values.firstName.length >= 15 ){
            errors.firstName = 'Must be 15 characters or less';
        }

        if( !values.lastName ){
            errors.lastName = 'Required';
        }else if( values.lastName.length >= 10 ){
            errors.lastName = 'Must be 10 characters or less';
        }

        if(!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        return errors;
    }

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

        },
        // En esta funcion creamos las validaciones.
        validate
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