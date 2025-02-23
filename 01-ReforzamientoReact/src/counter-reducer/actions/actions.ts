export type CounterAction = 
                   | { type: 'increaseBy', payload: { value: number; } }
                   | { type: 'reset' };

// Mas adelante vamos a trabajar con las Actions Creators que son generadores de acciones porque asi como tenemos implementado el patron
// del reducer es que si en el futuro requerimos hacer un cambio aunque sea muy sutil entonces tendremos
// que implementar ese cambio en todos los archivos donde se implementaba esa accion uno por uno manualmente modificarlo
// Lo mejor es tener centralizada la creacion de acciones y de esa manera daber cual fue disparada y si hay que hacer un cambio de ese 
// tipo ya se modifique en todos los archivos
// Esto esta inpirado en el patron REDUX donde en pocas palabras nos creamos una funcion que nos genere la accion que vamos a disparar
// Como estandar se acostumbra llamarlas al inicion con "do" a las acciones
// la funcion nos tiene que regresar una accion de las permitidas que definimos porque el reducer solo esas acciones espera

// Esta es la forma larga de definir la funcion
/*export const doReset = ():CounterAction => {
    return{
        type: 'reset'
    }
}*/

// Esta la forma refactorizada de la funcion (AQui le estamos diciendo que la funcion nos regresa un objeto
// por eso encerramos entre parentesis)
export const doReset = ():CounterAction => ({
    type: 'reset'
})

export const doIncreaseBy = ( value: number ):CounterAction => ({
    type: 'increaseBy',
    payload: { value }
})