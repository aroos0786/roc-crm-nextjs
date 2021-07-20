import { Fragment , useEffect, useState} from 'react';



function Forgot() {
 
        
  
  return (
    <Fragment >  
   <section className="container-fluid h-100 bg-image position-fixed" style={{backgroundImage: 'url(/images/misc/bg-login1.png)'}}>
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
                {/* <h5 className="font-size-h5 mb-0 mt-3 text-dark">
                  Please login to your account.
                </h5> */}
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
                    //   value={loginEmail}
                    //   onChange={(e) => onChangeLoginEmail(e)}
                      className="form-control bg-transparent text-dark border-0 p-0 h-20px font-size-h5" placeholder="example@mail.com" id="exampleInputEmail1" aria-describedby="emailHelp" />
                      {/* <span className="login-text-margin">{LoginEmptyEmail}</span> */}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary text-white font-weight-bold w-100 py-3"
                    // onClick={(e) => onSubmitLogin(e)}
                  >Submit</button>
                </form>
                <div className="text-center h-100px">
                  {/* <h5 className="font-size-h5 mb-3 mt-3 text-dark">
                    or Login with
                  </h5>
                  <div>
                    <a href="#"><img className="img-fluid w-45px" src="images/social/fb.png" alt="social1" /></a>
                    <a href="#"><img className="img-fluid w-45px ml-2" src="images/social/gp.png" alt="social1" /></a>
                    <a href="#"><img className="img-fluid w-45px ml-2" src="images/social/pn.png" alt="social1" /></a>
                    <a href="#"><img className="img-fluid w-45px ml-2" src="images/social/tw.png" alt="social1" /></a>
                  </div> */}
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

export default  Forgot;