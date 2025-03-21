import '../styles/styles.css';
import { Formik ,Field, Form, ErrorMessage, FormikHelpers, FormikValues } from 'formik';
import * as Yup from 'yup';
import { MyTextInput } from '../components/MyTextInput';

export const FormikAbstract = () => {

    return (
        <div>
            <h1>Formik Abstract</h1>

            <Formik 
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    terms: false,
                    jobType: '',
                }} 
                
                onSubmit={ ( values ) => {
                    console.log(values);
                }}
                
                validationSchema = {
                    Yup.object({
                        firstName: Yup.string()
                                    .max(15, 'Debe de tener 15 caracteres o menos')
                                    .required('Requerido'),
                        lastName: Yup.string()
                                    .max(10, 'Last Name debe de tener 10 caracteres o menos')
                                    .required(),
                        email: Yup.string()
                                .email('El email no tien un formato valido')
                                .required(),
                        terms: Yup.boolean()
                                  .oneOf([true], 'Debe de aceptar las condiciones'),
                        jobType: Yup.string()
                                    .notOneOf(["it-junior"], 'Esta opcion no es permitida')
                                    .required('Requerido') 

                    })
                }
            >
                {(formik) => (
                    <Form>
                        {/*
                            Vemos que los campos "Field", "ErrorMessage", "Label" se repiten, asi que podemos crear un control reutilizado
                            para simplificar mas el codigo nos creamos este componente
                            que por lo que definimos en la interface por lo menos le tenemos que pasar el label y name que son obligatorios
                            Lo que pasemos en el "name" tiene que ser igual a como lo definmos en el "InitiaValue", Como estamos dentro del 
                            componente Formik el control que esta usando el "useField" va a ver el context, analiza el contexto y busca al 
                            elemento por el "name"
                            (Esta linea de codigo equivale a las tres que teniamos)
                        */}
                        <MyTextInput 
                            label={'First Name'}
                            name={'firstName'}
                            // Luego podemos agregar argumentos adicionales
                            placeholder='Nombre'    
                        />

                        <MyTextInput 
                            label={'Last Name'}
                            name={'lastName'}
                            placeholder='Apellido'    
                        />

                        <MyTextInput 
                            label={'Email Address'}
                            name={'email'}
                            placeholder='Email'
                            type='email' 
                        />

                        <label htmlFor="jobType">Job Type</label>
                        <Field
                            name="jobType"
                            as="select"
                        >
                            <option value="">Pick something</option>
                            <option value="developer">Developer</option>
                            <option value="designer">Designer</option>
                            <option value="it-senior">It Senior</option>
                            <option value="it-junior">It Junior</option>
                        </Field>
                        <ErrorMessage name="jobType" component="span"/>
                        
                        <label>
                                <Field
                                    name="terms"
                                    type="checkbox"
                                />
                                Terms and Conditions
                        </label>
                        <ErrorMessage name="terms" component="span"/>
                        
                        <button type='submit'>Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}