import '../styles/styles.css';
import { useForm } from '../hooks/useForm';

export const RegisterPage = () => {

    // Al usar nuestro CustomHook tenemos que mandarle los datos que serian los campos del form que va a manejar
    // Este useForm para que este completo tenemos que implementar muchas validaciones
    const { formData, onChange, resetForm, isValidEmail,
        name, email, password1, password2
     } = useForm({
        name: '',
        email: '',
        password1: '',
        password2: '',
    }
        // Como idea para ahorrarnos el tener que copiar y pegar validaciones podemos recibir en el estado inicial 
        // en base a los campos si son obligatorios o no
        /*validations: {
            email: {required: true, validations: LOGICA}
        }*/
        // Al final solo el submit se llamaria si el formulario es valido
    );
    
    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log( formData );
    }

    return (
        <div>
            <h1>Register Page</h1>
            {/* El "noValidate" es para quitarle las validaciones que nos da el navegador de manera automatico */}
            <form onSubmit={ onSubmit } noValidate>
                {/* Aqui implementamos las validaciones visuales para mostrar los mensajes que colocamos en el SPAN ademas si hay algo que no se cumple
                    el INPUT debe de estar activado la clase que le pasemos por CSS (Todo estos estilos ya los definimos en el CSS)
                    Ahora le agregamos la condicion en la que verifica si el campo esta vacio entonces muestra el mensaje o estiolo (trim() -> eliminamos espacios vacios)

                    Estas son las validaciones por parte de la interfaces pero aparte tenemos que hacer esta validaciones en el Submit para evitar que se suba
                    la informacion si no se cumple alguna
                 */}
                <input
                    type="text"
                    placeholder="name"
                    name="name" 
                    value={ name }
                    onChange={ onChange }
                    className={`${name.trim().length <= 0 && 'has-error'}`}
                />
                { name.trim().length <= 0 && <span>Este campo es obligatorio</span>}

                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={ email }
                    onChange={ onChange }
                    className={`${!isValidEmail(email) && 'has-error'}`}
                />
                { !isValidEmail(email) && <span>El Email no es valido</span>}

                <input
                    type="password"
                    placeholder="Password"
                    name="password1"
                    value={ password1 }
                    onChange={ onChange }
                />
                { password1.trim().length <= 0 && <span>Este campo es obligatorio</span>}
                { password1.trim().length < 6 && password1.trim().length > 0 && <span>El password debe de tener mas de 6 caracteres</span>}

                <input
                    type="password"
                    placeholder="Repeat Password"
                    name="password2"
                    value={ password2 }
                    onChange={ onChange }
                />
                { password2.trim().length <= 0 && <span>Este campo es obligatorio</span>}
                { password2.trim().length > 0 && password1 !== password2 && <span>Los passwords deben de ser iguales</span>}
                
                    <button type="submit">Create</button>
                    <button type="button" onClick={ resetForm }>Reset form</button>
            </form>
        </div>
    )
}
/*
    El useForm no lo terminamos, hay muchas cosas que se pueden implementar y tener el customHook robusto en el cual podemos hacer un
    paquete de NPM para poder reutilizarlo
    Para ahorrarnos todo ese trabajo esta Formik
*/