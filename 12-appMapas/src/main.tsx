import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MapsApp } from './MapsApp'

// Aqui los colocamos porque es el punto mas alto de la aplicacion
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'TOKEN_QUE_NO_SE_PUSO';

// Si el navegador que esta usando el usuario no tiene la opcion de la geolocalizacion
// ya que de ahi es donde sacamos para pedirle permisos de la geolozalizacion
if( !navigator.geolocation ){
  // LE mandamos mensajes y evitamos que se sigua ejecutando la aplicacion
  alert('Tu navegador no tiene opcion de Geolocalizacion');
  throw new Error('No se puede continuar con la aplicacion');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MapsApp />
  </StrictMode>,
)
