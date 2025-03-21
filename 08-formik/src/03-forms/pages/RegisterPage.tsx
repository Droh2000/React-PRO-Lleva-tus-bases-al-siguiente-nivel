import '../styles/styles.css';
import { useForm } from '../hooks/useForm';

export const RegisterPage = () => {

    // Al usar nuestro CustomHook tenemos que mandarle los datos que serian los campos del form que va a manejar
    const { formData, onChange,
        name, email, password1, password2
     } = useForm({
        name: '',
        email: '',
        password1: '',
        password2: '',
    });
    
    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log( formData );
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