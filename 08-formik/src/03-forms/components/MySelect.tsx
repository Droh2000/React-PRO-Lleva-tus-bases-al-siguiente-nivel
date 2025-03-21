import { useField } from "formik"

// Esto es para el Selector de opciones en el HTML

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    [x: string]: any;
}

export const MySelect = ( { label, ...props }: Props ) => {

    const [ field, meta ] = useField( props );

    return (
        <>
            <label htmlFor={ props.id || props.name }>{ label }</label>
            {/*
                Aqui es donde cambia que ya no es un Input
                Solo hace falta colocarle el "select" porque las propiedades que estamos colocando reciben tambien los hijos
                lo vamos a transformar en un Hide Order Component
            */}
            <select { ...field } { ...props }/>
            {
                meta.touched && meta.error && (
                    <span className="error">{ meta.error }</span>
                )
            }
            
        </>
    )
}