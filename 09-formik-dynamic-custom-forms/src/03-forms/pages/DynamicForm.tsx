/*
    Basado en la respuesta JSON es como creamos el formulario 
    Vamos a simular la respuesta HTTP en un archivo JSON que creamos nosotros dentro de la carpeta Data

    Primero importamos esa Data (En la vida real hariamos la peticion HTTP)
    Ademas lo vamos a implementar con formik
*/
import { MySelect, MyTextInput } from '../components';
import formJson from '../data/custom-form.json';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

// Para no nos de el error que tenemos hasta el momento tenemos que crearnos el InitianValues
// El tipo de dato es una llave y como los campos pueden ser muy variados pueden ser cualquier valor
const initialValues: { [key: string]: any } = {};

// Para las validaciones basicamente nos tenemos que crear todo el objeto del "validationSchema" que vimos en el "FormikYupPage"
// Vamos a recorrer todos los campos y extraer los que tengan validacioens
const requiredFields: { [key: string]: any } = {};

// Vamos a llenar los datos del "inintialValues" con el archivo JSON
// El "input" del for es cada uno de los elementos del JSON (Lo podriamos desestructurar)
for(const input of formJson){
    // Creamos la propiedad al objeto que apunta al "value" porque puede ser que alguien nos establesca el valor inicial en el JSON
    initialValues[ input.name ] = input.value;

    // Creamos el objeto de las validaciones
    // Primero verificamos que si ese objeto no existe encontes que continue con el ciclo pero ignore las lineas de abajo
    if( !input.validations ) continue;

    // CReamos el esquema de validaciones que en este punto es como crearnos el objeto vacio al que despues le agregaremos las validaciones que queramos
    let schema = Yup.string();

    // Como este objeto de validaciones puede ser otro arreglo con muchas validaciones entonces ponemos otro bucle
    for (const rule of input.validations) {
        // Si esto es True nos tenemos que crear una regla de validacion en este punto
        if( rule.type === 'required' ){
            // Como aqui podra entrar varias veses la igualacion es a lo que se tenia antes en el "schema" con el mensaje 
            // El mensaje igual lo podemos poner desde el backend
            schema = schema.required('Este campo es requerido');
        }
        // ... Aqui irian otras reglas
    }

    // Despues de recorrer todas las reglas de validacion
    // Creamos el objeto como en el "initialValues" dandole el eschema que requiere validar
    requiredFields[input.name] = schema;
}

// Para hacer la conexion con el "validationSchema" del HTML, Aqui es donde creamos el objeto 
// al que le pasamos todas nuestras validaciones
const validationSchema = Yup.object({ ...requiredFields });

export const DynamicForm = () => {
    return (
        <div>
            <h1>Dynamic Form</h1>

            <Formik
                initialValues={ initialValues }
                validationSchema={validationSchema}
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

                            En un inicio no importa que campo sea, siempre nos va a regresar un Input, tenemos que determinar basado en el Type
                            el control que vamos a regresar 
                        */}
                        { formJson.map( ({ type, name, placeholder, label, options }) => {
                            // Detectamos el elemento a retornar segun el "type"
                            if( type==='input' || type==='password' || type==='email' ){ // En estas tres se puede usar un Input
                                return <MyTextInput 
                                        key={ name }
                                        type={ type as any } // Como el type puede ser muy variado, aqui temporalmente para evitar el error le ponermos any
                                        label={label}
                                        name={name}
                                        placeholder={ placeholder }/>
                            }else if( type === 'select' ){
                                // Queremos regresar el JSX
                                return (
                                    <MySelect
                                        key={ name }
                                        label={ label }
                                        name={ name }
                                    >
                                        {/*
                                            Construyamos las opciones que solo es un Arreglo de String en este caso asi que no hay problemas 
                                            pero tambien podriamos tener algo mas complejo, tambien la opcion que viene por defecto la podriamos ya obtener
                                            del backend pero en este caso la creamos aqui
                                        */}
                                        <option value="">Select an option</option>
                                        {
                                            // Dentro de la funcion map despues de la flecha ponemos parentesis porque vamos a regresar otro JSX
                                            options?.map( opt => (
                                                // En el "value" si estubieramos tratando un objeto seria "opt.Elemento"
                                                <option key={ opt.id } value={ opt.lable }>{ opt.lable }</option>
                                            ))
                                        }
                                    </MySelect>
                                )
                            }

                            // Este error nunva lo deberiamos de ver, pero se pone como ejemplo para cuando especificamos un nuevo elemento HTML
                            // saber el motivo por el que falla la aplicacion
                            throw new Error(`El type ${ type }, no es soportado`);
                        }) }

                        <button type='submit'>Submit</button>
                    </Form>
                )}
            </Formik>
            
        </div>
    )
}