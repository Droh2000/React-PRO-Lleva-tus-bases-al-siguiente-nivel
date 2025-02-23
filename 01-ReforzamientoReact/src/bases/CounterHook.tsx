import { useCounter } from "../hooks/useCounter"

export const CounterHook = () => {
    // Creamos el customHook para separar la logica
    // Podriamos usar este "counterElement" para animar cualquier cosa, solo pasandolo en el atributo "ref=" del elemento HTML
    // y asegurandonos de que el tipo de dato que definamos en el useRef del "useCunter" sea el correcto para el elemento HTML
    const { counter, elementToAnimate, handlerClick } = useCounter({
        maxCount: 15
    });

    return (
        <>
            <h1>CounterHook:</h1>
            <h2 ref={ elementToAnimate }>{ counter }</h2>

            <button onClick={ handlerClick }>
                +1
            </button>
        </>
    )
}
