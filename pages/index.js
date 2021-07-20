import { Fragment , useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import {BASE_URI} from '../components/utils/config'; 
import {allScript} from '../components/utils/loadScript';
import {useDispatch, useSelector} from 'react-redux';
import { login } from "../actions/auth";
import { useRouter } from 'next/router'
import cookie from 'js-cookie';

import {REMOVE_MESSAGE} from '../actions/types';
// const DynamicComponent = dynamic(() => import('../pages/login'))

function Home() {
  const router = useRouter()
 
  const dispatch = useDispatch();
  // states of login components
  const [loginEmail, setLoginEmail] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const [LoginEmptyEmail, setLoginEmptyEmail] = useState("");
  const [LoginEmptyPassword, setLoginEmptyPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  //  get state from store for login
  const ServerLoginResponsMsg = useSelector((state) => state.auth.LoginError);
  const isLoginAuthenticated = useSelector((state) => state.auth.isLoginAuthenticated);
  
 
  useEffect(() =>{
    const token = cookie.get('token')
    //console.log('console work')
    let allowed = true;
  if (token === undefined) {
    allowed = false;
  } else {
    allowed = true;
  }
    if(token) {
      setLoading(true);
      setTimeout(() => {
        router.push('/dashboard')
      }, 3000)
  }
 }, [isLoginAuthenticated === true])

  // on change remember me
  const onChangeRememberMe = (e) => {
    setRememberMe(!rememberMe)
    // console.log(rememberMe)
  }
   
  
  // on change event handler of login component
  const onChangeLoginEmail = (e) => {
    dispatch({
              type: REMOVE_MESSAGE
            });
    setLoginEmptyEmail("");
    setLoginEmptyPassword("");
    setLoginEmail(e.target.value);
  };
  const onChangeLoginPassword = (e) => {
    dispatch({
      type: REMOVE_MESSAGE
    });
    setLoginEmptyEmail("");
    setLoginEmptyPassword("");
    setLoginPassword(e.target.value);
  };
  /////////////////////////////
  // const ComponentToRender = allowed ? Component : Home;
  loading ? (
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
    <div>abc</div>
  )

  // on submit Login form
  const onSubmitLogin = (e) => {
    e.preventDefault();
    setLoginLoading(true);

    if (!loginEmail || loginEmail.length == 0) {
      setLoginEmptyPassword("");
      setLoginLoading(false);

      setLoginEmptyEmail("Please Enter Email!");
    } else if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginEmail) == false
    ) {
      setLoginEmptyPassword("");
      setLoginLoading(false);
      setLoginEmptyEmail("Please Enter Valid Email!");
    } else if (!LoginPassword || LoginPassword.length == 0) {
      setLoginEmptyEmail("");
      setLoginLoading(false);
      setLoginEmptyPassword("Please Enter Password!");
    } else {
      setLoginLoading(true)
      let data = new FormData();
      data.append('email', loginEmail);
      data.append('password', LoginPassword);
      setLoginEmptyPassword("");
      setLoginEmptyEmail("");
      dispatch(login(data, rememberMe))
      setLoginLoading(false);
    }
 
  };


  // if(ServerLoginResponsMsg !== ''){
  //       alert.error(ServerLoginResponsMsg)
  //       setLoginLoading(false)
  //      setTimeout(() =>{
  //       dispatch({
  //         type: REMOVE_MESSAGE
  //       });
  //     }, 2000 )
  
  //   }
        
  
  return (
    <Fragment >  
    <section className="container-fluid h-100 bg-image position-fixed" style={{backgroundImage: 'url(/images/misc/bg-login1.jpg)'}}>
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="row w-100 justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-4">
            <div className="card card-custom gutter-b bg-white border-0 mb-0 p-5 login-card">
              <div className="card-header align-items-center  justify-content-center border-0 h-100px flex-column">
                <div className="card-title mb-0">
                  <h3 className="card-label font-weight-bold mb-0 text-body">
                    <img src="/images/misc/logo.png" alt="logo" height="65" />
                  </h3>
                </div>
                <h5 className="font-size-h5 mb-0 mt-3 text-dark">
                  Please login to your account.
                </h5>
              </div>
              <div className="card-body p-0">
                <form id="myform" className="pb-5 pt-5">
                  <div className="form-group  row">
                    <div className="col-lg-2 col-3 ">
                      <label htmlFor="exampleInputEmail1" className="mb-0 text-dark">
                        <svg width="20px" height="20px" viewBox="0 0 16 16" className="bi bi-person" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        </svg>
                      </label>
                    </div>
                    <div className="col-lg-10 col-9 pl-0">
                      <input type="email" 
                      name="loginEmail"
                      value={loginEmail}
                      onChange={(e) => onChangeLoginEmail(e)}
                      className="form-control bg-transparent text-dark border-0 p-0 h-20px font-size-h5" placeholder="example@mail.com" id="exampleInputEmail1" aria-describedby="emailHelp" />
                      <span className="login-text-margin">{LoginEmptyEmail}</span>
                    </div>
                  </div>
                  <div className="form-group row ">
                    <div className="col-lg-2 col-3 ">
                      <label htmlFor="exampleInputPassword1" className="mb-0 text-dark">
                        <svg width="20px" height="20px" viewBox="0 0 16 16" className="bi bi-lock" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M11.5 8h-7a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1zm-7-1a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-7zm0-3a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z" />
                        </svg>
                      </label>
                    </div>
                    <div className="col-lg-10 col-9 pl-0">
                      <input type="password" 
                       name="LoginPassword"
                       value={LoginPassword}
                       onChange={(e) => onChangeLoginPassword(e)}
                      placeholder="......." className="form-control text-dark bg-transparent font-size-h4 border-0 p-0 h-20px" id="exampleInputPassword1" />
                      <p className="login-text-margin">
                        {LoginEmptyPassword}
                        <span>{ServerLoginResponsMsg}</span>
                      </p>
                    </div>
                  </div>
                  <div className="form-group row align-items-center justify-content-between">
                    <div className="col-6">
                      {/* <div className="form-check pl-4">
                        <input type="checkbox" className="form-check-input ml--4" name="rememberMe"   onChange={(e) => onChangeRememberMe(e) }  id="exampleCheck1" />
                        <label className="form-check-label text-dark"  htmlFor="exampleCheck1">Remember me</label>
                      </div> */}
                    </div>
                    <div className="col-6 text-right">
                      <a href="/forgot">Forgot Password?</a>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary text-white font-weight-bold w-100 py-3"
                    onClick={(e) => onSubmitLogin(e)}
                  >{loginLoading ? "...wait" : "Login"}</button>
                </form>
                <div className="text-center h-100px">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
     </Fragment>
  )
}

export default  Home;