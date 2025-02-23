import { useCounter } from "../hooks/useCounter"

export const CounterHook = () => {
    // Creamos el customHook para separar la logica
    const { counter, counterElement, handlerClick } = useCounter();

    return (
        <>
            <h1>CounterHook:</h1>
            <h2 ref={ counterElement }>{ counter }</h2>

            <button onClick={ handlerClick }>
                +1
            </button>
        </>
    )
}
