import { BtnMyLocation, MapView, ReactLogo } from "../components"

export const HomeScreen = () => {
    return (
        <div>
            <MapView/>
            <BtnMyLocation/> {/* Colocamos el boton en la pantalla */}
            <ReactLogo/>
        </div>
    )
}