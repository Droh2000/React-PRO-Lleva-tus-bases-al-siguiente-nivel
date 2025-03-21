import { useState } from 'react';
import '../styles/styles.css';

export const RegisterPage = () => {
    /*
        Cuando esta trabajando con formularios en React tenemos que estar al pendiente cuando el input
        cambia y el valor al cual este apuntando ese Input

        Debemos de mantener el estado (Hay gente que se crea un useState para cada uno de los campos del formuario y dentro
        del estado inicial su valor por defecto) pero el useState tambien nos sirve para mantener el estado completo ya que cuando uno de los valores
        cambia podemos saber como se encuentra el estado del formulario en su totalidad 
    */
    const [ registerData, setRegisterData ] = useState({
        // Dentro del objeto va a tener las propiedades del formulario (Si requerimos que unn campo se opcional ya nos tenemos que crear una interface)
        name: '',
        email: '',
        password1: '',
        password2: '',
    });

    // Tenemos que establecer cada una de esta propiedades al formulario, queremos desestructurar del "registerData" cada propiedad 
    // Estos valores se los asignamos a los inputs con la propiedad de "value"
    const { name, email, password1, password2 } = registerData;

    // Tenemos que llamar el "setRegisterData" para cambiar los valores de los campos cada vez que la persona escriba y cambie el Input
    // Este tipo de dato "ChangeEvent" lo sacamos al poner el cursor encima del input en el "onChange"
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Debemos de saber el nombre del input que estamos editando (Por eso el Input tiene la propiedad "name")
        const { name, value } = event.target;
        setRegisterData({
            ...registerData,
            // Propiedad computada
            [name]: value,
        });
    }

    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log( registerData );
    }

    return (
        <div>
            <h1>Register Page</h1>
            {/* El "noValidate" es para quitarle las validaciones que nos da el navegador de manera automatico */}
            <form onSubmit={ onSubmit } noValidate>
                <input
                    type="text"
                    placeholder="name"
                    name="name" 
                    value={ name }
                    onChange={ onChange }
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={ email }
                    onChange={ onChange }
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password1"
                    value={ password1 }
                    onChange={ onChange }
                />
                <input
                    type="password"
                    placeholder="Repeat Password"
                    name="password2"
                    value={ password2 }
                    onChange={ onChange }
                />

                <button type="submit">Create</button>

            </form>
        </div>
    )
}