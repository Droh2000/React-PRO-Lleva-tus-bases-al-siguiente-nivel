// Este archivo nos sirve para mantener todo nuestro estado y poder colocar ahi los Providers
// Estes es el punto de entrada de nuestra aplicacion
import { PlacesProvider } from "./context"

export const MapsApp = () => {
    return (
        <PlacesProvider>
            <h1>Hola mundo de nuevo</h1>
        </PlacesProvider>
    )
}