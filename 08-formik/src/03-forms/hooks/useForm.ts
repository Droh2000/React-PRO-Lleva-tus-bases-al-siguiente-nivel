// Queremos que se pueda reutilizar el formulario y se adapte segun lo vamos a necesitar, seria 
// un customHook y los datos que manejara es la que moldeara como luce la informacion

import { useState } from "react";

// Recibira como argumento en objeto los campos que va a menejar el formulario (Como estos datos son variables creamos el hook que sea Generico)
export const useForm = <T>( initState: T ) => {
    // Aqui adentro ponemos la logica que podemos reutilizar
    /*
        Cuando esta trabajando con formularios en React tenemos que estar al pendiente cuando el input
        cambia y el valor al cual este apuntando ese Input

        Debemos de mantener el estado (Hay gente que se crea un useState para cada uno de los campos del formuario y dentro
        del estado inicial su valor por defecto) pero el useState tambien nos sirve para mantener el estado completo ya que cuando uno de los valores
        cambia podemos saber como se encuentra el estado del formulario en su totalidad 
    */
    const [ formData, setFormData ] = useState(initState);

    // Tenemos que establecer cada una de esta propiedades al formulario, queremos desestructurar del "registerData" cada propiedad 
    // Estos valores se los asignamos a los inputs con la propiedad de "value"
    //      const { name, email, password1, password2 } = registerData;
    // Estos datos los comentamos porque mejor los vamos a desestructurar en el RETURN

    // Tenemos que llamar el "setFormData" para cambiar los valores de los campos cada vez que la persona escriba y cambie el Input
    // Este tipo de dato "ChangeEvent" lo sacamos al poner el cursor encima del input en el "onChange"
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Debemos de saber el nombre del input que estamos editando (Por eso el Input tiene la propiedad "name")
        const { name, value } = event.target;
        setFormData({
            ...formData,
            // Propiedad computada
            [name]: value,
        });
    }

    // Regresamos un objeto porque asi queremos desestructurar lo que requerimos
    // Aqui exponemos lo elementos que queremos mandar al mundo exterior
    return {
        // Como requerimos pasarle los campos al input, desestructuramos los valores
        ...formData, // Asi donde usemo el hook podemos desestructurar los campos sin hacerlo en otra linea
        formData,
        onChange,
    }
}