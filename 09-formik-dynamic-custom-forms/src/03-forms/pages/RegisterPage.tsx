import '../styles/styles.css';
import { useForm } from '../hooks/useForm';

export const RegisterPage = () => {

    const { formData, onChange, resetForm, isValidEmail,
        name, email, password1, password2
     } = useForm({
        name: '',
        email: '',
        password1: '',
        password2: '',
    }

    );
    
    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log( formData );
    }

    return (
        <div>
            <h1>Register Page</h1>
            <form onSubmit={ onSubmit } noValidate>
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