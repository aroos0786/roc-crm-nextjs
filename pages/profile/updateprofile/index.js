import React ,{Fragment, useState, useEffect} from "react";
import MobileHeader from "../../../layouts/Header/MobileHeader";
import MainHeaderWithSidebar from "../../../layouts/Header/MainHeader";
import Head from "next/head";
import FixedHeader from "../../../layouts/Header/FixedHeader";
import Switcher from "../../../components/switcher";
import Link from 'next/link';
import Additems from '../../components/additem';
import { useDispatch, useSelector } from "react-redux";
import {
  getHttp,
  postHttp2,
  removeHttp,
  putHttp,
} from "../../../actions/config";
import { SERVER_URI } from "../../../components/utils/config";
import Swal from "sweetalert2";
import {useRouter, withRouter} from "next/router";
// import { entries } from "lodash";

const UpdateProfile = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {query} = useRouter();
  const [entries, setEntries] = useState([]);
  const [postError, setPostError] = useState();

    // get method
    useEffect(()=>{
      dispatch(
        getHttp(
          `${SERVER_URI}api/admin/loginUser/1`
        )
      )
        .then((response) => {
          setEntries(response.data.data);
          setName(response.data.data.name);
          setTotal(response.data.meta.total);
          setpage(response.data.meta.current_page);
          setLoading(false); 
        })
        .catch(function (error) {
          // Swal.fire({
          //   position: "top-end",
          //   icon: "error",
          //   title: "server Error Please try again",
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
        });
    },[]) 
    

  // const lead_id = query.lead_id;
  // console.log("name we get from user123", entries.name)

  // const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [password, setPassword] = useState(entries.email);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState(entries.email);
  const [addSuccess, setAddSuccess] = useState(false);
  const [requestLoader, setRequestLoader] = useState(false);
  // const [entries, setEntries] = useState([]);
  // console.log("name we ge",name)

    // method implimentation
  const inputEvent = (event) => {
    const {name,value} = event.target;
  }
  const setEmailValue = (obj) => {
    // setEmail(entries.email);
  }
  const setNameEvent = (obj) => {
    // setName(obj.target.value);
   setName(obj.target.value);
  }
  const setPasswordEvent = (obj) => {
    setPassword(obj.target.value);
  }
  const setConfirmPasswordEvent = (obj) => {
    setConfirmPassword(obj.target.value);
  } 

// update the user handler  
  const UpdateHandler = (e) => {
    e.preventDefault();
    setAddSuccess(false);
    setRequestLoader(true);
    const body = {
      role_id: 1,
      name: name,
      email: email,
      password: password,
     }
  
    //  update 
    dispatch(putHttp(`${SERVER_URI}api/admin/user/${entries.user_id}`, body))
      .then((res) => {
        if (res.data.status === "Success") {
          router.push("/leads");
          setRequestLoader(false);
          console.log("success if runs");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          setEditSuccess(true);
        } else{
          setRequestLoader(false);
           // error handling
          //  console.log("it also works");
          //  setPostError(res.data.errors);
          // let arr = [];
          // let dat = res.data.data.errors
          // arr =  Object.keys( res.data.data.errors);
          // for(let i=0 ; i < arr.length ; i++ ){
          // setErrorHandling((prevState) => ({ ...prevState,  [arr[i]] :  dat[arr[i]] }));
          // }
          // Swal.fire({
          //   position: "top-end",
          //   icon: "error",
          //   title: "The name has already been taken",
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
          setRequestLoader(false);
        }
      })
      .catch((err) => {
        // Swal.fire({
        //   position: "top-end",
        //   icon: "error",
        //   title: "The name has already been taken",
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
        setRequestLoader(false);
      });
  };

// this is end of end
    return (
    
    <Fragment>
    <Head>
        <meta charset="utf-8" />
        <title>Admin | UpdateUser</title>
        <meta name="description" content="Updates and statistics" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
    </Head>
    <body
        id="tc_body"
        className="header-fixed header-mobile-fixed subheader-enabled aside-enabled aside-fixed"
      >
        {/*begin::Header Mobile*/}
        <MobileHeader />
        {/*end::Header Mobile*/}
        {/*begin::Main*/}
        <div className="d-flex flex-column flex-root">
          {/*begin::Page*/}
          <div className="d-flex flex-row flex-column-fluid page">
            <MainHeaderWithSidebar />
            {/*end::Aside*/}
            {/*begin::Wrapper*/}
            <div
              className="d-flex flex-column flex-row-fluid wrapper"
              id="tc_wrapper"
            >
              {/*begin::Header*/}
              <FixedHeader />
              {/*end::Header*/}
              {/*begin::Content*/}
              <div
                className="content d-flex flex-column flex-column-fluid padding-0"
                id="tc_content" 
              >
                  <div className="subheader py-2 py-lg-6 subheader-solid">
                  <div className="container-fluid">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb bg-white mb-0 px-0 py-2">
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                             <Link href="/dashboard">Dashboard</Link> / Update Profile 

                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
                
                {/*begin::Entry*/}
                <div className="d-flex flex-column-fluid padding-0">
                  {/*begin::Container*/}
                  <div className="container-fluid">
                    
                        <div className="row">
                          <div className="col-lg-12 col-xl-12">
                            <div className="card card-custom gutter-b bg-white border-0">
                              <div className="card-header align-items-center  border-0">
                                <div className="card-title mb-0">
                                  <h3 className="card-label mb-0 font-weight-bold text-body page">
                                   Update Profile 
                                  </h3>
                                </div>
                                
                              </div>
                              <div className="card-body">
                                <div className="row">
                                    <div className="col-8 m-auto">
                                      <div className="form">
                                        
                                        <div className="form-group row">
                                            <div className="col-4 text-left my-auto">
                                                <label>Name<span>*</span></label>
                                            </div>
                                            <div className="col-8">
                                                <input type="text" className="form-control" onChange={(e)=>setNameEvent(e)} value={name} name="name" placeholder="Enter Name" />
                                            </div> 
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-4 text-left my-auto">
                                                <label>Email</label>    
                                            </div>
                                            <div className="col-8">
                                                <input className="lead-input" type="email" onChange={(e)=>setEmailValue(e)} value={entries.email} name="email" className="form-control" placeholder="Enter Email" disabled />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-4 text-left my-auto">
                                                <label>Password</label>    
                                            </div>
                                            <div className="col-8">
                                                <input className="lead-input" type="password" onChange={(e) =>setPasswordEvent(e)} value={password} name="owner" className="form-control" placeholder="Enter password" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-4 text-left my-auto">
                                                <label>Confirm Password</label>    
                                            </div>
                                            <div className="col-8">
                                                <input className="lead-input" type="password" onChange={(e) =>setConfirmPasswordEvent(e)} value={confirmPassword} name="source" className="form-control" placeholder="Confirm Password"/>
                                            </div>
                                        </div>
                                        {/* 1 to 4 */}
                                        
                                        {/* end */}
                                        
                                      </div>
                                    </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end align-items-start mb-5 px-5 py-0">
            <div>
              <button className="btn btn-primary mx-1" onClick={(e) =>UpdateHandler(e)}>Update</button>
              
              <button className="btn btn-primary mx-1" onClick={()=>{ router.push("/leads")}}>Cancel</button>
            </div>
          </div>
          
              {/*end::Footer*/}
        </div>
            {/*end::Wrapper*/}
          {/* </div> */}
          {/*end::Page*/}
        {/* </div> */}
        {/*end::Main*/}


        {/* <Switcher /> */}

      </body>
    </Fragment>);
}

export default UpdateProfile;
