import '../styles/styles.css';
/* En Formik tenemos componentes preconfigurados para que los utilizemos y nos va a ayudar a reducir mas el codigo
    Estos componentes usan en el fondo una configuracion del context que crea un Provider en el cual se proporciona la informacion
    que viene de useFormik. Hay una menar sencilla de tener que evitarse crear todo un contexto para poder proporcionar toda la informacion
    del formulario y poder utilizar estos componentes
    Ademas que es una manera de evitar usar el hook de "useFormik" como lo hemos estando utilizando

    En el fondo de esta logica Formik se crea un contexto en el cual trabaja con el useFormik que recibe los props que son las que especificamos 
    en InitialValue, onSubmit, ValidationSchema que este useFormik es proporcionado mediante el "FormikContext.Provider" donde se da tosa la informacion
    del formulario
*/
import { Formik ,Field, Form, ErrorMessage, FormikHelpers, FormikValues } from 'formik';
import * as Yup from 'yup';

export const FormikComponents = () => {

    return (
        <div>
            <h1>Formik Components</h1>

            {/*
                El primer paso es usar este componente
                Que en el lugar de usar nuestro CustomHook pasaremos de sus propiedades a este objeto de formik
                asi que con esto podemos eliminar el "useFormik" que usamos antes
            */}
            <Formik 
                // Aqui le pasamos los campos que vamos a usar en el 
                // formulario (Aqui es doble llave porque la primera es porque es una expreccion y la segunda es el objeto de los campos)
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                }} 
                // Aqui samos los Values y otras cosas que nos dan mayor control del formulario
                onSubmit={ ( values ) => {
                    console.log(values);
                }}
                // A este le pasamos el Yup object
                validationSchema = {
                    Yup.object({
                        firstName: Yup.string() // El campo va a ser un string
                                    .max(15, 'Debe de tener 15 caracteres o menos')
                                    .required('Requerido'),
                        lastName: Yup.string()
                                    .max(10, 'Last Name debe de tener 10 caracteres o menos')
                                    .required(),
                        email: Yup.string()
                                .email('El email no tien un formato valido')
                                .required(),
                    })
                }
            >
                {/*
                    En lugar de usar un "form" de HTML usaremos el componente que importamos "Form"
                    para usarlo lo ponemos dentro de Formik pero en una funcion con retorno por eso esta encerrada entre parentesis
                    al usarlo ya no requerimos especificar el "onSubmit"
                    El "formik" no lo estamos usando pero lo ponemos para saber que de ahi podemos sacar varias cosas
                */}
                {(formik) => (
                    <Form>
                        <label htmlFor="firstName">First Name</label>
                        {/*
                            Borramos los Inputs y usaramos el componente importado "field"
                            Ademas en lugar de poner todo el codigo debajo para mostrar los errores usamos el componente de ErrorMessage
                            A estos les tenemos que especificar cuales son los campos que van a manejar

                            El "ErrorMessage" nos regresa de manera cruda un Texto pero requerimos que este dentro de etiquetas HTML
                            por los estilos por eso lo especificamos el "component" que es el tipo de elemento donde se crea el contenido
                        */}
                        <Field
                            name="firstName"
                            type="text"
                        />
                        <ErrorMessage name="firstName" component="span"/>

                        <label htmlFor="lastName">Last Name</label>
                        <Field
                            name="lastName"
                            type="text"
                        />
                        <ErrorMessage name="lastName" component="span"/>

                        <label htmlFor="emailAddress">Email Address</label>
                        <Field
                            name="email"
                            type="text"
                        />
                        <ErrorMessage name="email" component="span"/>
                        
                        <button type='submit'>Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}