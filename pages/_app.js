import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

import "../styles/global.css";

import { wrapper } from "../store";
import Layout from "../components/layout";

const App = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default wrapper.withRedux(App);
