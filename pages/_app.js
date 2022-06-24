import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

import '../styles/global.css';
import Layout from '../components/layout';

import { store, persistor } from '../store'


const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  )};

export default App;