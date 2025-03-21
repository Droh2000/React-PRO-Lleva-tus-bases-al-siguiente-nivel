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
        // Cada vez que se hace la validacion el objeto deerrores estan vacios y conforme suceden (Cada vez que precionamos una tecla 
        // se vuelve a disparar todo esto) puede que no existan los nombre de los campos que contengan los errores porque ese campo si cumplio
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
                    onBlur={ formik.handleBlur }//Para funcione el "formik.touched" tenemos que disparar los eventos del foco (y le pasamos una funcion que ya viene en fomik)
                />
                {/* 
                    Aqui vamos a tener las mismas validaciones
                    Debemos de mostrar los mensajes de error solo cuando el campo no cumple con los requisitos
                    ya que ahorita se estan mostrando todos por defecto, en si debemos de mostrar de manera condicional
                    los SPAN y los mensajes de error ya estan definnidos en el objeto "errors" (Del objeto Formik sacamos esos errores)
                    Como el valor del nombre del campo (En este caso "firstName" puede que no exista, pero si existe significa que tenemos un error)
                    (El mensaje del error lo devemos de meter denro del SPAN)

                    Despues de la implementacion ocurria que al escribir en un campo se activaban las demas validaciones en los otros campos y nos marcaba error
                    luego al entrar con el cursor en un campo y salir no se activaba la validacion sino que hasta escribiamos algo
                    Esto es porque al inicio solo esta difinida nuestra constatne "validate" y cuando precionamos una tecla es cuando se disparan las validaciones
                    Como nos interesa que solo los errores salgan si el campo a sido tocado (Esta opcion la podemos sacar del objeto del useFormik)
                */}
                {  formik.touched.firstName && formik.errors.firstName && <span>{formik.errors.firstName}</span>}

                <label htmlFor="lastName">Last Name</label>
                <input 
                    type="text"
                    name='lastName'
                    value={ formik.values.lastName }
                    onChange={ formik.handleChange } 
                    onBlur={ formik.handleBlur }
                />
                { formik.touched.lastName && formik.errors.lastName && <span>{formik.errors.lastName}</span>}

                <label htmlFor="emailAddress">Email Address</label>
                <input 
                    type="email"
                    name='email'
                    value={ formik.values.firstName }
                    onChange={ formik.handleChange } 
                    onBlur={ formik.handleBlur }
                />
                { formik.touched.email && formik.errors.email && <span>{formik.errors.email}</span>}
                
                <button type='submit'>Submit</button>

            </form>
        </div>
    )
}