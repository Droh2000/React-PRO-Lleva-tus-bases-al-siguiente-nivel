/*
    Basado en la respuesta JSON es como creamos el formulario 
    Vamos a simular la respuesta HTTP en un archivo JSON que creamos nosotros dentro de la carpeta Data

    Primero importamos esa Data (En la vida real hariamos la peticion HTTP)
    Ademas lo vamos a implementar con formik
*/
import { MyTextInput } from '../components';
import formJson from '../data/custom-form.json';
import { Form, Formik } from 'formik';

// Para no nos de el error que tenemos hasta el momento tenemos que crearnos el InitianValues
// El tipo de dato es una llave y como los campos pueden ser muy variados pueden ser cualquier valor
const initialValues: { [key: string]: any } = {};

// Vamos a llenar los datos del "inintialValues" con el archivo JSON
// El "input" del for es cada uno de los elementos del JSON (Lo podriamos desestructurar)
for(const input of formJson){
    // Creamos la propiedad al objeto que apunta al "value" porque puede ser que alguien nos establesca el valor inicial en el JSON
    initialValues[ input.name ] = input.value;
}

export const DynamicForm = () => {
    return (
        <div>
            <h1>Dynamic Form</h1>

            <Formik
                initialValues={ initialValues }
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {/* Despues de la funcion de flecha abrimos y cerramos parentesis porque queremos regresar automaticamente un objeto 
                    Pero inmediatamente tenemos que recorrer el JSON y empezar a crear los campos correspondientes
                */}
                {(formik) => (
                    <Form>
                        {/* 
                            Para recorrer un JSON y regresar elementos JSX lo hacemos con un MAP 
                            Ahora en el argumento de la funcion podemos desetructurrar para obtener la informacion que requieren 
                            los elementos (Si tenemos mas type de tipo Input automaticamente esta linea nos mostrara esos input ya en la interface) 
                        */}
                        { formJson.map( ({ type, name, placeholder, label }) => {
                            return <MyTextInput 
                                        key={ name }
                                        type={ type as any } // Como el type puede ser muy variado, aqui temporalmente para evitar el error le ponermos any
                                        label={label}
                                        name={name}
                                        placeholder={ placeholder }/>
                        }) }

                        <button type='submit'>Submit</button>
                    </Form>
                )}
            </Formik>
            
        </div>
    )
}