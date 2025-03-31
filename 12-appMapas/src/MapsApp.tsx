// Este archivo nos sirve para mantener todo nuestro estado y poder colocar ahi los Providers
// Estes es el punto de entrada de nuestra aplicacion
import { MapProvider, PlacesProvider } from "./context";
import { HomeScreen } from "./screens";
import './styles.css';

export const MapsApp = () => {
    return (
        <PlacesProvider>
            {/* Los ponemos aqui para que sean parte del arbol de componentes */}
            <MapProvider>
                <HomeScreen/>
            </MapProvider>
        </PlacesProvider>
    )
}