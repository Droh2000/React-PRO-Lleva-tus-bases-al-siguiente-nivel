import { useField } from "formik"

interface Props {
    label: string;
    name: string;
    [x: string]: any;
}

export const MyCheckbox = ( { label, ...props }: Props ) => {

    // A este si le tenemos especificar que sera de tipo Checkbox
    const [ field, meta ] = useField({ ...props, type: 'checkbox'});

    return (
        <>
            <label>
                {/* Dentro colcoamos el input para que al hacer click ahi se selccione tambien el checkbox */}
                <input type="checkbox" {...field} {...props} />
                { label }
            </label>
            {
                meta.touched && meta.error && (
                    <span className="error">{ meta.error }</span>
                )
            }
            
        </>
    )
}