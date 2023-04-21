import Layout from '@/components/layout'
import { AuthContextProvider } from '@/context/AuthContext'
import { ToastContainer, toast } from "react-toastify";

import '@/styles/globals.css'
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      <ToastContainer />
    </AuthContextProvider>
  )
}
