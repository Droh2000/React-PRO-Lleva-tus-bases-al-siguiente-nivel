import '../styles/styles.css';
import { Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { MyTextInput } from '../components';

export const RegisterFormikPage = () => {

    return (
        <div>
            <h1>Register Formik Page</h1>
            <Formik
                initialValues = {{
                    name: '',
                    email: '',
                    password1: '',
                    password2: '',
                }}
                onSubmit = { (values) => {
                    console.log(values);
                }}
                validationSchema = {
                    Yup.object({
                        name: Yup.string()
                                    .min(2, 'Debe de tener minimo 2 caracteres')
                                    .max(15, 'Debe de tener 15 caracteres o menos')
                                    .required('Requerido'),
                        email: Yup.string()
                                .email('El email no tien un formato valido')
                                .required(),
                        password1: Yup.string()
                                    .required('No password proporcionado')
                                    .min(6, 'Debe contener minimo 6 caracteres'),
                        password2: Yup.string()
                                    // Este password debe ser uno de los valores que se encuentran dentro del otro campo de password
                                    .oneOf([Yup.ref('password1') ], 'los password deben coincidir')
                                    .required('Requerido')
                })}
            >
                { (formik) => (
                    <Form onSubmit={ formik.handleSubmit } noValidate>
                        <MyTextInput
                            label="Nombre"
                            name="name"
                        />

                        <MyTextInput
                            label="Email"
                            name="email"
                            type='email'
                        />

                        <MyTextInput
                            label="Password"
                            name="password1"
                            type='password'
                        />

                        <MyTextInput
                            label="Confirm Password"
                            name="password2"
                            type='password'
                        />

                        <button type="submit">Create</button>
                        <button type="submit" onClick={ formik.handleReset }>Reset form</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}