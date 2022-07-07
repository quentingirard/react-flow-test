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
