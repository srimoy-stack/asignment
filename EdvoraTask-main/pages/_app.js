import '../styles/globals.css'
import StoreProvider from '../Context/Apihandle'
function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
         <Component {...pageProps} />
    </StoreProvider>
  )
}
export default MyApp
