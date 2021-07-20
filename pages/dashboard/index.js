import React, { Fragment, useState, useEffect } from "react";
import Cookies from "js-cookie";
import MobileHeader from "../../layouts/Header/MobileHeader";
import { useRouter } from "next/router";
import MainHeaderWithSidebar from "../../layouts/Header/MainHeader";
import Head from "next/head";
import { withPrivateRoute } from "../../components/auth/withPrivateRoute";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import FixedHeader from "../../layouts/Header/FixedHeader";
import jQuery from "jquery";
import DoughnutChart from '../charts/Doughnut';
import Line from '../charts/SyncronisedLine';
import Lead from "../lead";
import {
  getHttp,
  getHttp2,
  postHttp2,
  removeHttp,
  putHttp,
} from "../../actions/config";
import { SERVER_URI } from "../../components/utils/config";
import {
  mainScript,
  allScript,
  removeAllScript,
  hoomeScript,
} from "../../components/utils/loadScript";
import Switcher from "../../components/switcher";

// import { useRouter } from 'next/router'
const Dashboard = () => {
  const router = useRouter()

  const [open, setOpen] = useState("");
  const [pending, setPending] = useState("");
  const [success, setSuccess] = useState("");


  // getCallFunForSuccess = async ()  => {
  //   let data = await getHttp2(`${SERVER_URI}api/admin/total-leads?getLeadsByStatus=success`)
  //   console.log('data ok success', data.data.data)
  //   setSuccess(data.data.data);
  // }
  // getCallFunForOpen = async ()  => {
  //   let data = await getHttp2(`${SERVER_URI}api/admin/total-leads?getLeadsByStatus=open`)
  //   console.log('data ok open', data.data.data)
  //   setOpen(data.data.data)
  // }
  // getCallFunForPending = async ()  => {
  //   let data = await getHttp2(`${SERVER_URI}api/admin/total-leads?getLeadsByStatus=pending`)
  //   console.log('data ok pending', data.data.data)
  //   this.setState({
  //     entries: data.data.data
  //   })
  // }
  // useEffect(()=>{
  //   getCallFunForSuccess();
  //   getCallFunForOpen();
  //   getCallFunForPending();
  // },[])


// get success count
  useEffect(() => {
    // router.reload(window.location.pathname)
    
    dispatch(
      getHttp(
        `${SERVER_URI}api/admin/total-leads?getLeadsByStatus=Success`
      )
    )
      .then((response) => {
        setSuccess(response.data.data.total_leads);
        setLoading(false);
      })
      .catch(function (error) {
      });
}, []);
// get open count
useEffect(() => {
  dispatch(
    getHttp(
      `${SERVER_URI}api/admin/total-leads?getLeadsByStatus=Open`
    )
  )
    .then((response) => {
      setOpen(response.data.data.total_leads);
      setLoading(false);
    })
    .catch(function (error) {
    });
}, []);
// get pending count
useEffect(() => {
  dispatch(
    getHttp(
      `${SERVER_URI}api/admin/total-leads?getLeadsByStatus=Pending`
    )
  )
    .then((response) => {
      setPending(response.data.data.total_leads);
      setLoading(false);
    })
    .catch(function (error) {
    });
}, []);

  const dispatch = useDispatch();
  console.log("the pending",pending, "the success ", success, " the open ", open)

  let [entries, setEntries] = useState("");
  
  useEffect(() => {
    dispatch(
      getHttp(
        `${SERVER_URI}api/admin/leads?total_leads=1`
      )
    )
      .then((response) => {
        setEntries(response.data.data.total_leads);
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
 
}, []);
  
  console.log(entries);
  
  return (
    <Fragment>
      <Head>
        <meta charset="utf-8" />
        <title>Admin | Dashboard</title>
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
                className="content d-flex flex-column flex-column-fluid"
                id="tc_content"
              >
                {/*begin::Subheader*/}
                <div className="subheader py-2 py-lg-6 subheader-solid">
                  <div className="container-fluid">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb bg-white mb-0 px-0 py-2">
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Dashboard
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
                {/*end::Subheader*/}
                {/*begin::Entry*/}
                <div className="d-flex flex-column-fluid pt-auto">
                  {/*begin::Container*/}
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                        <div className="row">
                          <div className="col-xl-9 col-lg-6">
                            <div className="row">
                              <div className="col-lg-6 col-xl-4">
                                <div className="card card-custom gutter-b bg-white border-0 theme-circle theme-circle-primary">
                                  <div className="card-body">
                                    <h3 className="text-body text-center font-weight-bold m-0">
                                      Leads
                                    </h3>
                                    <h5 className="text-center">(Open)</h5>
                                    <div className="mt-4">
                                      <div className="d-flex align-items-center justify-content-center">
                                        <span className="text-dark font-weight-bold font-size-h1 mr-3">
                                          <span
                                            className="counter"
                                            data-target={600}
                                          >
                                            {open}
                                          </span>
                                        </span>
                                      </div>
                                    </div>
                                    {/* <div className="mt-3">
                                      <div className="d-flex align-items-center">
                                        <span className="text-dark font-weight-bold font-size-h1 mr-3">
                                          <span
                                            className="counter"
                                            data-target={400}
                                          >
                                            0
                                          </span>
                                        </span>
                                      </div>
                                      <div className="text-black-50 mt-3">
                                        Compare to last year (2019)
                                      </div>
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6 col-xl-4">
                                <div className="card card-custom gutter-b bg-white border-0 theme-circle theme-circle theme-circle-secondary">
                                  <div className="card-body">
                                    <h3 className="text-body text-center font-weight-bold m-0">
                                      Leads
                                    </h3>
                                    <h5 className="text-center">(Pending)</h5>
                                    <div className="mt-4">
                                      <div className="d-flex align-items-center justify-content-center">
                                        <span className="text-dark font-weight-bold font-size-h1 mr-3">
                                          <span
                                            className="counter"
                                            data-target={600}
                                          >
                                            {pending}
                                          </span>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6 col-xl-4">
                                <div className="card card-custom gutter-b bg-white border-0 theme-circle theme-circle theme-circle-secondary">
                                  <div className="card-body">
                                    <h3 className="text-body text-center font-weight-bold m-0">
                                      Leads
                                    </h3>
                                    <h5 className="text-center">(Success)</h5>
                                    <div className="mt-4">
                                      <div className="d-flex align-items-center justify-content-center">
                                        <span className="text-dark font-weight-bold font-size-h1 mr-3">
                                          <span
                                            className="counter"
                                            data-target={600}
                                          >
                                            {success}
                                          </span>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-xl-12">
                                <div className="row">
                                  <div className="col-lg-6 col-xl-12">
                                    <div className="card card-custom gutter-b bg-white border-0">
                                      <div className="card-header align-items-center  border-0">
                                        <div className="card-title mb-0">
                                          {/* this is user div */}
                                          <h4 className="font-weight-bold">Leads Analytics</h4>
                                        </div>
                                      </div>
                                      <div className="card-body pt-3">
                                        <div id="chart-4"></div>
                                        <Line/>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="col-lg-6 col-xl-3 ">
                            <div className="card card-custom gutter-b bg-white border-0 theme-circle theme-circle-info">
                              <div className="card-body p-0">
                                <h4 className="font-weight-bolder" style={{padding:"1.2rem"}}>Leads Source</h4>
                                  <DoughnutChart />    
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="row">
                          <div className="col">
                            <Lead1/>
                          </div>
                        </div> */}
                        
                        <div className="row">
                          <div className="col-lg-12 col-xl-12">
                            <div className="card card-custom gutter-b bg-white border-0">
                              {/* <div className="card-header align-items-center  border-0"> */}
                                {/* <div className="card-title mb-0">
                                  <h3 className="card-label mb-0 font-weight-bold text-body page">
                                    New Leads
                                  </h3>
                                </div> */}
                                {/* <div className="icons d-flex">
                                  <btn
                                    className="btn ml-2 p-0"
                                    onClick={(e) => onClickAddModalOpen(e)}
                                    id="kt_notes_panel_toggle"
                                    data-toggle="tooltip"
                                    title
                                    data-placement="right"
                                    data-original-title="Check out more demos"
                                  >
                                    <span className="bg-secondary h-30px font-size-h5 w-30px d-flex align-items-center justify-content-center  rounded-circle shadow-sm ">
                                      <svg
                                        width="15px"
                                        height="15px"
                                        viewBox="0 0 16 16"
                                        className="bi bi-plus white"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                                        />
                                      </svg>
                                    </span>
                                  </btn>
                                </div> */}
                              {/* </div> */}
                              <div className="card-body">
                                <div>
                                  <div className="kt-table-content table-responsive-sm">
                                    {/* {console.log(res.locals.user)} */}
                                    <Lead 
                                      file= "dashboard"
                                    />
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
              {/* <div
                className="footer bg-white py-4 d-flex flex-lg-column"
                id="tc_footer"
              >
                <div className="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between">
                  <div className="text-dark order-2 order-md-1">
                    <span className="text-muted font-weight-bold mr-2">
                      2020©
                    </span>
                    <a
                      href="#"
                      target="_blank"
                      className="text-dark-75 text-hover-primary"
                    >
                      Themescoder
                    </a>
                  </div>
                  <div className="nav nav-dark">
                    <a href="#" target="_blank" className="nav-link pl-0 pr-5">
                      About
                    </a>
                    <a href="#c" target="_blank" className="nav-link pl-0 pr-5">
                      Team
                    </a>
                    <a href="#" target="_blank" className="nav-link pl-0 pr-0">
                      Contact
                    </a>
                  </div>
                </div>
              </div> */}
              {/*end::Footer*/}
            </div>
            {/*end::Wrapper*/}
          </div>
          {/*end::Page*/}
        </div>
        {/*end::Main*/}

        {/* <Switcher /> */}
      </body>
    </Fragment>
  );
};

Dashboard.getInitialProps = async (props) => {
  console.info("##### Congratulations! You are authorized! ######", props);
  return {};
};

export default Dashboard;
