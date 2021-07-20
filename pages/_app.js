import "../assets/scss/style.scss";
// import 'bootstrap/dist/js/bootstrap.bundle';

import { useEffect, useState } from "react";
// import '../assets/fontawesome.css'
import App from "next/app";
// import '../assets/js/scripts.js'
import { Provider } from "react-redux";
import store from "../store/store";

import { appWithTranslation } from "../i18n";
import { AuthProvider } from "../components/auth/withPrivateRoute";
import { useRouter } from "next/router";
import Home from "./index";
import cookie from "js-cookie";
import { conforms } from "lodash";


function MyApp({ Component, pageProps }) {
  // const appState = useContext(AppState);

  const token = cookie.get("token");
  const [loading, setLoading] = useState(false);
  let allowed = true;
  const router = useRouter();
   console.log('outer.pathname', router.pathname)
 if(router.pathname === '/forgot'){
   
   allowed = true;

 }else{
  if (token === undefined ) {
    allowed = false;
  } else {
    allowed = true;
  }

 }
 

  
  // for loader
  useEffect(() => {
    const handleStart = (url) => setLoading(true);
    const handleComplete = (url) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  const ComponentToRender = allowed ? Component : Home;

  return (
    <Provider store={store}>
     
        <AuthProvider>
          {loading ? (
            <div className="se-pre-con">
              <div className="pre-loader">
                <img
                  className="img-fluid"
                  src="/images/loadergif.gif"
                  alt="loading"
                />
              </div>
            </div>
          ) : (
            <ComponentToRender {...pageProps} />
          )}
        </AuthProvider>
      
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext) => ({
  ...(await App.getInitialProps(appContext)),
});

export default appWithTranslation(MyApp);
