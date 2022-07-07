import "../styles/global.css";
import { createStandaloneToast } from '@chakra-ui/toast'

import { wrapper } from "../store";
import Layout from "../components/layout";

const App = ({ Component, pageProps }) => {
  const { ToastContainer } = createStandaloneToast()

  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer />
    </Layout>
  )};

export default wrapper.withRedux(App);
