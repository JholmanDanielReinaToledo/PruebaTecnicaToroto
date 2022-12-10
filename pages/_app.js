import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import WorksProvider from '../src/context/worksContext';


function MyApp({ Component, pageProps }) {
  // traer los datos
  return (
    <WorksProvider>
      <Component {...pageProps} />
    </WorksProvider>
  )
}

export default MyApp
