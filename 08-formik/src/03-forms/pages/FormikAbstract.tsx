import '../styles/styles.css';
import { Formik ,Form } from 'formik';
import * as Yup from 'yup';

import { MyCheckbox, MySelect, MyTextInput } from '../components';

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

                        {/* Para selector despues de implementado el componente, remplazamos el  "Field" por el componente 
                            El name tiene que ser igual al especificado en InitialValues

                            Tambien si quisieramos podriamos evitar mandarle internamente los "opcions" y mandarselos como una propiedad
                            adicional en un arreglo
                        */}
                        <MySelect label='Job Type' name='jobType'>
                            <option value="">Pick something</option>
                            <option value="developer">Developer</option>
                            <option value="designer">Designer</option>
                            <option value="it-senior">It Senior</option>
                            <option value="it-junior">It Junior</option>
                        </MySelect>

                        <MyCheckbox label='Terms and Conditions' name='terms'/>
                        
                        <button type='submit'>Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}