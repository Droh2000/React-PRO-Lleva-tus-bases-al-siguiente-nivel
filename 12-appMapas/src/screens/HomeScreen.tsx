import { BtnMyLocation, MapView } from "../components"

export const HomeScreen = () => {
    return (
        <div>
            <MapView/>
            <BtnMyLocation/> {/* Colocamos el boton en la pantalla */}
        </div>
    )
}