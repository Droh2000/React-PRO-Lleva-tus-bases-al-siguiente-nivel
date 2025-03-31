import { BtnMyLocation, MapView, ReactLogo, SearchBar } from "../components"

export const HomeScreen = () => {
    return (
        <div>
            <MapView/>
            <BtnMyLocation/> {/* Colocamos el boton en la pantalla */}
            <ReactLogo/>
            <SearchBar/>
        </div>
    )
}