import { ErrorMessage, useField } from "formik"

// Tenemos que saber como se ve la informacion que ingresa a este componente, de aqui le queremos mandar
// los elementos a reutilizar que son "label", "field", "ErrorMessage"
interface Props {
    label: string;
    name: string; // Este lo ponemos para saber qual parte del Contex del Formik es el que vamos a tomar
    type?: 'text' | 'email' | 'password';// Este es el argumento HTML que definimos en los elementos 
    placeholder?: string;
    // Adicionalmente queremos indicar que pueden ser muchas mas propiedades que pueda recibir
    // Este es un comodin que nos permite agegar cualquier cantidad de parametros o propieades adicionales
    [x: string]: any; // Esto por defecto es opcional
}

// De las propiedades extraemos el "label" y el resto de las propiedades caen en "props"
export const MyTextInput = ( { label, ...props }: Props ) => {

    // Formik nos permite ir a su contexto y tomar de ahi todas las propiedades de los elementos HTML
    // con este Hook a este le pasamos las props y de ahi desestructuramos
    // "meta" -> Este metadata contiene todos los eventos y si hay errores
    // "field" -> Viene los argumentos de los elementos HTML
    const [ field, meta ] = useField( props );

    return (
        <>
            {/*
                Aqui para darle un nombre verificamos si viene definido el ID le asignamos eso, 
                sino el Name que si es seguro que venga porque la propiedad es obligatoria
            */}
            <label htmlFor={ props.id || props.name }>{ label }</label>
            {/*
                Para el input requerimos que tenga todas las propieades de un Input de HTML normal
                y para eso tenemos el "useField", ademas le desestructuramos las props para tener las propiedades aqui
            */}
            <input className="text-input" { ...field } { ...props }/>
            {
                // Si ah sido tocado y hay errores entonces mostramos el mensaje del error en el Span
                // Tambien podemos aprovechar para agregar estilos
                /*meta.touched && meta.error && (
                    <span className="error">{ meta.error }</span>
                )*/

                // Se comento para usar el coponente propio de los mensajes de Error
                // Le pasamos el nombre del campo que queremos controlar
                // Le especificamos el elemnto HTML donde nos mostrara el texto
                // Tambien le podemos especificar una clase CSS con className y con Meta podemos sacer el error para aplicar un estilo respectivo
            }
            <ErrorMessage name={props.name} component="span"/>
            
        </>
    )
}