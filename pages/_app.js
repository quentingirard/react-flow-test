import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { createStandaloneToast } from '@chakra-ui/toast'


import '../styles/global.css';

import { store, persistor } from '../store'
import Layout from '../components/layout';

const App = ({ Component, pageProps }) => {
  const { ToastContainer } = createStandaloneToast()

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </PersistGate>
    </Provider>
  )};

export default App;