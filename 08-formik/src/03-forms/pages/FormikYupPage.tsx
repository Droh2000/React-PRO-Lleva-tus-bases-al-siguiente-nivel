import '../styles/styles.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface FormValues {
    firstName: string,
    lastName: string,
    email: string,
}

export const FormikYupPage = () => {

    // Aqui ya eliminamos la funcion validadora

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        onSubmit: (values) => {

        },
        // Aqui llamamos esta propiedad donde usamos Yup, dentro pasamos los campos del formulario 
        // y le declaramos las regles que queremos aplicarle (Debe de tener los mismo nombres que le pusimos en el initialValues)
        validationSchema: Yup.object({
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
    });

    return (
        <div>
            <h1>Formik Yup</h1>

            <form onSubmit={ formik.handleSubmit } noValidate>
                <label htmlFor="firstName">First Name</label>
                <input 
                    type="text" 
                    name='firstName'
                    value={ formik.values.firstName }
                    onChange={ formik.handleChange }
                    onBlur={ formik.handleBlur }
                />
                
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