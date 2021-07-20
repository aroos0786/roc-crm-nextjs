import React, { Fragment, useEffect, useState } from 'react'
import { logout } from "../../../actions/auth";
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux';
import { i18n, useTranslation } from '../../../i18n'
import $ from 'jquery';
import { newScript } from '../../../components/utils/loadScript';
import { TOGGLE_SIDEBAR } from '../../../actions/types';
import {
  getHttp,
  postHttp2,
  removeHttp,
  putHttp,
} from "../../../actions/config";
import { SERVER_URI } from "../../../components/utils/config";
import Swal from "sweetalert2";

// or less ideally
import { Dropdown } from 'react-bootstrap';
import { BASE_URI } from '../../../components/utils/config';
// so it doesn't throw if no window or document
//  const document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
//  const docu = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
//  const doc = $(window.docu);
// var elem = document.documentElement;
const FixedHeader = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const [requestLoader, setRequestLoader] = useState(false);
  const [entries, setEntries] = useState([]);
  const [notificationToggle, setNotificationToggle] = useState(0);
  const [name, setName] = useState([]);
  const [countUnseen, setCountUnseen] = useState("");
  const [limitPage, setLimit] = useState(10);
  const [editSuccess, setEditSuccess] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [removeProduct, setRemoveProduct] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [editUnit, setEditUnit] = useState(false);
  const [searchParameter, setSearchParameter] = useState("");
  const [search, setSearch] = useState([]);
  const [searchdata, setSearchData] = useState("");
  // const [editSuccess, setEditSuccess] = useState(false);
  // const [addSuccess, setAddSuccess] = useState(false);
  //for language excahnger
  const { t } = useTranslation();
  const langauge = Cookies.get('next-i18next')
  const login_user_id = Cookies.get('userID')
  // useEffect(() => {
  //   // newScript();
  //   $('#tc_aside_toggle').on("click", function(e){
  //     $('body').toggleClass('aside-minimize');
  //   });
  // })


  // getting notified leads
  useEffect(() => {
    // tableRef.current.dataManager.changePageSize(limitPage);
    dispatch(
      getHttp(
        `${SERVER_URI}api/admin/leads?getUnseenLeads=1`
      )
    )
      .then((response) => {
        setName(response.data.data);
        setNotificationToggle(1);
        setTotal(response.data.meta.total);
        // setpage(response.data.meta.current_page);
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

    setLoading(true);
  }, [
    limitPage,
    removeProduct === true,
    editSuccess === true,
    addSuccess === true,
  ]);
  console.log("name", name);

  //unseen count
  useEffect(() => {
    // tableRef.current.dataManager.changePageSize(limitPage);
    dispatch(
      getHttp(
        `${SERVER_URI}api/admin/leads?getUnseenCount=1`
      )
    )
      .then((response) => {
        setCountUnseen(response.data);
        // setTotal(response.data.meta.total);
        // setpage(response.data.meta.current_page);
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
    console.log("count:::", countUnseen)
    setLoading(true);
  }, [
    limitPage,
  ]);

  const onClickH = () => {
    // $('#tc_aside_toggle').on("click", function(e){
    $('body').toggleClass('aside-minimize');
    dispatch({
      type: TOGGLE_SIDEBAR
    });

    // });

  }

  /* Get the documentElement (<html>) to display the page in fullscreen */


  /* View in fullscreen */
  const openFullscreen = () => {


    $('#kt_open_fullscreen').hide();
    $('#kt_close_fullscreen').show();
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }



  }

  /* Close fullscreen */
  const closeFullscreen = () => {

    $('#kt_close_fullscreen').hide();
    $('#kt_open_fullscreen').show();
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) { /* Firefox */
      doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      doc.webkitExitFullscreen();
    } else if (doc.msExitFullscreen) { /* IE/Edge */
      doc.msExitFullscreen();
    }
  }

  // get call for user
  useEffect(() => {
    dispatch(
      getHttp(
        `${SERVER_URI}api/admin/user/${login_user_id}`
      )
    )
      .then((response) => {
        setEntries(response.data.data);
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

  }, []);
  // route to the next page 

  // updated handler for searchbar and notificationbar 
  const Updatehandler = (data) => {
    const { e, d } = data;
    setEditUnit(true);
    setEditSuccess(false);
    dispatch(getHttp(`${SERVER_URI}api/admin/leads/${d.lead_id}`))
      .then((response) => {
        router.push({
          pathname: "/leads/viewlead",
          query: {
            id: d.lead_id,
            lead_id: response.data.data.lead_id,
          }
        });
        dispatch({
          type: GET_SINGLE_UNIT,
          payload: response.data.data,
        });
      }).catch((error) => {
        // Swal.fire({
        //   position: "top-end",
        //   icon: "error",
        //   title: "server Error Please try again",
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
        setRequestLoader(false);
      });
  };

  const UpdateProfileHandler = (data) => {
    const { e, d } = data;
    router.push({
      pathname: "/profile/updateprofile",
    });
  };
  // end get call 

  // search call 
  const onSearchHandler = (searchdata) => {

    // if(searchdata.length > "2"){
    setLoading(true);
    setSearchData(searchdata.target.value);
    setSearchParameter(searchdata.target.value);
    console.log("ddt:", searchdata.target.value.length)
    if (searchdata.target.value.length > 2) {
      dispatch(
        getHttp(
          `${SERVER_URI}api/admin/leads?searchParameter=${searchdata.target.value}&limit=${limitPage}&getDetail=1`
        )
      )
        .then((response) => {
          setSearch(response.data.data);
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
    }


    if (searchdata.target.value.length < 2) {
      setSearch([]);
    }
  };
  // end search

  // const [click, setClick] = useState(False)
  // const onClickHandler = (e) =>{
  //   e.preventDefault()
  //   $('#tc_aside_toggle').on("click", function(e){
  //     $('body').toggleClass('aside-minimize');
  // });
  // }
  // useEffect(() => {
  //   //get langauge from cookie and change the direction if language is arabic


  //   if (langauge === 'ar') {
  //     document.body.classList.add('rtl');
  //   } else {
  //     document.body.classList.remove('rtl');
  //   }
  // }, [langauge]);
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   if (user !== null) {
  //     setUserData(user.token);
  //   }else{
  //     router.push('/')
  //   }
  // }, []);

  // const dispatch = useDispatch();

  //logout function
  console.log("search:::", search)
  const onLogout = () => {
    let token = Cookies.get('token')

    //  dispatch(logout(token));
    localStorage.removeItem("user")
    // router.push('/login')

    dispatch(logout(token));
    Cookies.remove('token')
    Cookies.remove('user')
    router.push("/");
  };

  const dropdownEvent = () => {
    router.push("/leads");
  }

  // console.log("Name",entries);
  return (
    <Fragment>
      <div id="tc_header" className="header header-fixed">
        {/*begin::Container*/}
        <div className="container-fluid d-flex align-items-stretch justify-content-between">
          {/*begin::Header Menu Wrapper*/}
          <div className="header-menu-wrapper header-menu-wrapper-left" id="tc_header_menu_wrapper">
            {/*begin::Header Menu*/}
            <div id="tc_header_menu" className="header-menu header-menu-mobile header-menu-layout-default">
              {/*begin::Header Nav*/}
              <ul className="menu-nav">
                <li className="menu-item menu-item-open menu-item-here menu-item-submenu menu-item-rel menu-item-open menu-item-here menu-item-active" data-menu-toggle="click" aria-haspopup="true">
                  {/*begin::Toggle*/}
                  <div className="btn btn-icon btn-clean btn-dropdown mr-1" id="tc_aside_toggle" onClick={() => onClickH()} >
                    <span className="svg-icon svg-icon-xl svg-icon-primary">
                      <svg width="24px" height="24px" viewBox="0 0 16 16" className="bi bi-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                      </svg>
                    </span>
                  </div>
                  {/*end::Toolbar*/}
                </li>
              </ul>
              {/*end::Header Nav*/}
            </div>
            {/*end::Header Menu*/}
          </div>
          {/*end::Header Menu Wrapper*/}
          {/*begin::Topbar*/}
          <div className="topbar">


            {
              login_user_id == "1" ?
                <>
                  <div className="topbar-item">
                    <div className="quick-search quick-search-inline ml-20 mr-1 w-300px" id="kt_quick_search_inline">
                      {/*begin::Form*/}

                      <Dropdown className="dropdown_dynamic shadow-none">
                        <Dropdown.Toggle className="topbar-item shadows w-100 l p-0"
                          drop="right"
                          variant="">
                          <form method="get" className="quick-search-form w-100" width="100%">
                            <div className="input-group rounded bg-light">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <span className="svg-icon svg-icon-lg">
                                    <svg width="20px" height="20px" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                      <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
                                      <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                                    </svg>
                                  </span>
                                </span>
                              </div>
                              <input type="text" className="form-control h-45px" value={searchdata} onChange={(p) => onSearchHandler(p)} placeholder="Search Leads ..." />
                            </div>
                          </form>
                        </Dropdown.Toggle>
                        {
                          searchParameter.length > 2 &&
                          <Dropdown.Menu className=" shadow-sm">
                            <div className="bg-light " style={{ background: "white", position: "absolute", width: "300px", padding: "0 15px" }}>
                              {
                                search.map((search) => (
                                  <Dropdown.Item className="mt-2"
                                    onClick={(event, data) =>
                                      Updatehandler({
                                        e: event,
                                        d: search,
                                      })}
                                  >
                                    {search.first_name}
                                  </Dropdown.Item>
                                ))
                              }
                            </div>


                          </Dropdown.Menu>
                        }
                      </Dropdown>
                      {/* <form method="get" className="quick-search-form">
                    <div className="input-group rounded bg-light">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <span className="svg-icon svg-icon-lg">
                            <svg width="20px" height="20px" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
                              <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                            </svg>
                          </span>
                        </span>
                      </div>
                      <input type="text" className="form-control h-45px" value={searchdata} onChange={(p)=>onSearchHandler(p)} placeholder="Search..." />
                    </div>
                  </form>
                  <div className="bg-light " style={{ background: "white", position: "absolute", width: "300px", padding: "0 15px" }}>
                    {
                      search.map((search)=>(
                        <p className="mt-2" onClick={(event, data) =>
                          Updatehandler({
                            e: event,
                            d: search,
                          })}>{search.first_name}</p>
                      ))
                    }
                  </div> */}
                      {/*end::Form*/}
                      {/*begin::Search Toggle*/}
                      <div id="kt_quick_search_toggle" data-toggle="dropdown" data-offset="0px,1px" />
                      {/*end::Search Toggle*/}
                      {/*begin::Dropdown*/}
                      <div className="dropdown-menu dropdown-menu-left dropdown-menu-lg dropdown-menu-anim-up">
                        <div className="quick-search-wrapper scroll ps" data-scroll="true" data-height={350} data-mobile-height={200} style={{ height: 350, overflow: 'hidden' }}>
                          <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                            <div className="ps__thumb-x" tabIndex={0} style={{ left: 0, width: 0 }}>
                            </div>
                          </div>
                          <div className="ps__rail-y" style={{ top: 0, right: 0 }}>
                            <div className="ps__thumb-y" tabIndex={0} style={{ top: 0, height: 0 }}>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end::Dropdown*/}
                    </div>
                  </div>
                </>
                : null
            }

            {/*begin::Languages*/}

            {/* flag dropdown language */}

            {/* <Dropdown  > 
            
              <Dropdown.Toggle
              
                id="dropdown-basic"
                className=" btn-icon ml-1  shadows"
                variant=""
               
              >
                {i18n.language === "en" ? (
                  <img
                    className="h-20px w-20px rounded-sm"
                    src="/images/svg/flags/united-states.svg"
                  />
                ) : (
                  <img
                    className="h-20px w-20px rounded-sm"
                    src="/images/svg/flags/arabic.svg"
                  />
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1" 
                   
                
                >
                  <a
                    href="#"
                    className="dropdown-item "
                    onClick={() => i18n.changeLanguage("en")}
                  >
                    <span className="symbol symbol-20 mr-3">
                      <img
                        className="h-20px w-20px rounded-sm"
                        src="/images/svg/flags/united-states.svg"
                      />
                    </span>
                    English
                  </a>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                  <a
                    href="#"
                    className="dropdown-item"
                    onClick={() => i18n.changeLanguage("ar")}
                  >
                    <span className="symbol symbol-20 mr-3">
                      <img
                        className="h-20px w-20px rounded-sm"
                        src="/images/svg/flags/arabic.svg"
                      />
                    </span>
                    Arabic
                  </a>
                </Dropdown.Item>
              </Dropdown.Menu>
            
            </Dropdown> */}
            {/* <div className="dropdown">
                <div className="topbar-item" data-toggle="dropdown" data-display="static">
                  <div className="btn btn-icon btn-clean btn-dropdown btn-lg mr-1">
                   
                   {
                      i18n.language === 'en' ?  <img className="h-20px w-20px rounded-sm" src="/images/svg/flags/united-states.svg"/>
                      :  <img className="h-20px w-20px rounded-sm" src="/images/svg/flags/arabic.svg"/>
                   }
                  </div>
                </div>
                <div className="dropdown-menu dropdown-menu-right">
                  <a href="#" className="dropdown-item"  onClick={() => i18n.changeLanguage('en')}>
                    <span className="symbol symbol-20 mr-3">
                      <img className="h-20px w-20px rounded-sm" src="/images/svg/flags/united-states.svg"/>
                    </span>
                    English
                  </a>
                  <a href="#" className="dropdown-item"  onClick={() => i18n.changeLanguage('ar')}>
                    <span className="symbol symbol-20 mr-3">
                      <img className="h-20px w-20px rounded-sm" src="/images/svg/flags/arabic.svg"/>
                    </span>
                    Arabic
                  </a>
                </div>
              </div> */}
            {/*end::Languages*/}
            {/*begin::Quick Actions*/}
            {/* full screen icon  */}
            {/* <div className="dropdown">
                <div className="topbar-item" data-toggle="dropdown" data-offset="10px,0px">
                  <div id="kt_open_fullscreen" className="btn btn-icon btn-clean btn-dropdown mr-1" onClick={ () => openFullscreen()}>
                    <span className="svg-icon svg-icon-xl svg-icon-primary">
                      <svg width="20px" height="20px" viewBox="0 0 16 16" className="bi bi-fullscreen" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z" />
                      </svg>
                    </span>
                  </div>
                  <div id="kt_close_fullscreen" className="btn btn-icon btn-clean btn-dropdown mr-1" onClick={() =>  closeFullscreen()} style={{display: 'none'}}>
                    <span className="svg-icon svg-icon-xl svg-icon-primary">
                      <svg width="20px" height="20px" viewBox="0 0 16 16" className="bi bi-fullscreen-exit" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div> */}
            {/*end::Quick Actions*/}
            {/*begin::Quick panel*/}
            {/* user icon  */}
            {/* <div className="topbar-item">
                <div className="btn btn-icon btn-clean  mr-1" id="tc_quick_panel_toggle">
                  <span className="svg-icon svg-icon-xl svg-icon-primary">
                    <img
                      className="h-20px w-20px rounded-sm"
                      src="/images/svg/user.png"
                    />
                  </span>
                </div>
              </div> */}
            {/*end::Quick panel*/}
            {/*begin::Notifications*/}

            {
              login_user_id == "1" ?
                <>
                  <Dropdown className="dropdown_dynamic shadow-none">
                    <Dropdown.Toggle
                      className="topbar-item shadows l p-0"
                      drop="right"
                      variant=""
                    >
                      <div className="btn btn-icon w-auto btn-clean d-flex align-items-center pr-1 pl-3">
                        <span className="text-dark-50 font-size-base d-none d-md-inline mr-3"><span className="svg-icon svg-icon-xl svg-icon-primary">
                          <svg width="20px" height="20px" viewBox="0 0 16 16" className="bi bi-bell" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2z" />
                            <path fillRule="evenodd" d="M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                          </svg>
                          {/* <div className="lds-ripple">
                        <div />
                        <div />
                      </div> */}
                          {/* <span className="badge badge-pill badge-primary">5</span> */}
                        </span></span>
                        <span className="badge badge-pill badge-primary">{countUnseen}</span>
                        {/* <span className="symbol symbol-35 symbol-light-success">
                      
                    </span> */}
                      </div>
                    </Dropdown.Toggle>


                    {/* jnj */}
                    {console.log("thsi is this", countUnseen)}
                    {
                      countUnseen >= 1  ?
                        <Dropdown.Menu className=" shadow-sm">
                          {
                            name.map((names) => (
                              <Dropdown.Item
                                onClick={(event, data) =>
                                  Updatehandler({
                                    e: event,
                                    d: names,
                                  })}
                              >
                                {/* <span className="svg-icon svg-icon-xl svg-icon-primary mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-user">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx={12} cy={7} r={4} />
                              </svg>
                              </span> */}
                                {/* {console.log("names::::",names.first_name)}  */}
                                {t(names.first_name)}
                              </Dropdown.Item>
                            ))
                          }
                        </Dropdown.Menu>
                        : null
                    }


                    {/* <Dropdown.Menu>
                    <Dropdown.Item>
                      <span className="svg-icon svg-icon-xl svg-icon-primary mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-user">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx={12} cy={7} r={4} />
                        </svg>
                      </span>
                      {t('Edit Profile')}
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <span className="svg-icon svg-icon-xl svg-icon-primary mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-power">
                          <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                          <line x1={12} y1={2} x2={12} y2={12} />
                        </svg>
                      </span>
                      {t('Logout')}
                    </Dropdown.Item>
                  </Dropdown.Menu> */}
                  </Dropdown>
                </>
                : null
            }




            <div className="dropdown">
              {/* <div className="topbar-item" data-toggle="dropdown" id="dropdownMenuButton" data-display="static">
                  <div className="btn btn-icon btn-clean btn-dropdown mr-1">
                    <span className="svg-icon svg-icon-xl svg-icon-primary">
                      <svg width="20px" height="20px" viewBox="0 0 16 16" className="bi bi-bell" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2z" />
                        <path fillRule="evenodd" d="M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                      </svg>
                      <div className="lds-ripple">
                        <div />
                        <div />
                      </div>
                    </span>
                    <span className="badge badge-pill badge-primary">5</span>
                  </div>
                </div>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div> */}
              {/* <div className="dropdown-menu p-0 m-0 dropdown-menu-right w-300px">
                  <form>
                    <div className="d-flex flex-column p-3 border-bottom rounded-top">
                      <h4 className="d-flex justify-content-between align-items-center mb-0 rounded-top">
                        <span className="font-size-h5 ">Notifications</span>
                        <a href="#" className="btn btn-sm btn-primary-hover py-1 px-2">
                          Clear
                        </a>
                      </h4>
                    </div>
                    <div className="nav nav-hover scrollbar-1 ">
                      <a href="#" className="nav-item border-bottom">
                        <div className="nav-link">
                          <div className="nav-icon mr-3">
                            <i className="fas fa-cog text-primary" />
                          </div>
                          <div className="nav-text">
                            <div className="font-weight-bold">New report has been received</div>
                            <div className="text-muted">23 hrs ago</div>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="nav-item border-bottom">
                        <div className="nav-link">
                          <div className="nav-icon mr-3">
                            <i className="fas fa-archive text-secondary" />
                          </div>
                          <div className="nav-text">
                            <div className="font-weight-bold">New report has been received</div>
                            <div className="text-muted">23 hrs ago</div>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="nav-item border-bottom">
                        <div className="nav-link">
                          <div className="nav-icon mr-3">
                            <i className="fas fa-plane text-success" />
                          </div>
                          <div className="nav-text">
                            <div className="font-weight-bold">New report has been received</div>
                            <div className="text-muted">23 hrs ago</div>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="nav-item border-bottom">
                        <div className="nav-link">
                          <div className="nav-icon mr-3">
                            <i className="fas fa-plane text-success" />
                          </div>
                          <div className="nav-text">
                            <div className="font-weight-bold">New report has been received</div>
                            <div className="text-muted">23 hrs ago</div>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="nav-item border-bottom">
                        <div className="nav-link">
                          <div className="nav-icon mr-3">
                            <i className="fas fa-plane text-success" />
                          </div>
                          <div className="nav-text">
                            <div className="font-weight-bold">New report has been received</div>
                            <div className="text-muted">23 hrs ago</div>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="nav-item border-bottom">
                        <div className="nav-link">
                          <div className="nav-icon mr-3">
                            <i className="fas fa-plane text-success" />
                          </div>
                          <div className="nav-text">
                            <div className="font-weight-bold">New report has been received</div>
                            <div className="text-muted">23 hrs ago</div>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="nav-item border-bottom">
                        <div className="nav-link">
                          <div className="nav-icon mr-3">
                            <i className="fas fa-plane text-success" />
                          </div>
                          <div className="nav-text">
                            <div className="font-weight-bold">New report has been received</div>
                            <div className="text-muted">23 hrs ago</div>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="nav-item border-bottom">
                        <div className="nav-link">
                          <div className="nav-icon mr-3">
                            <i className="fas fa-plane text-success" />
                          </div>
                          <div className="nav-text">
                            <div className="font-weight-bold">New report has been received</div>
                            <div className="text-muted">23 hrs ago</div>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="nav-item border-bottom">
                        <div className="nav-link">
                          <div className="nav-icon mr-3">
                            <i className="fas fa-daimond text-success" />
                          </div>
                          <div className="nav-text">
                            <div className="font-weight-bold">New report has been received</div>
                            <div className="text-muted">23 hrs ago</div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="d-flex flex-column p-3 rounded-top">
                      <h4 className="d-flex justify-content-center mb-0  rounded-top">
                        <a href="#" className="font-size-base text-primary">View All</a>
                      </h4>
                    </div>
                  </form>
                </div> */}
            </div>
            {/*end::Notifications*/}
            {/*begin::user*/}

            <div style={{ width: '20px' }}>

            </div>


            <Dropdown>
              <Dropdown.Toggle
                className="topbar-item shadows l"
                drop="right"
                variant=""
              >
                <div className="btn btn-icon w-auto btn-clean d-flex align-items-center pr-1 pl-3">
                  <span className="text-dark-50 font-size-base d-none d-md-inline mr-3">
                    {entries.name}</span>
                  <span className="symbol symbol-35 symbol-light-success">
                    <span className="symbol-label font-size-h5 ">
                      <svg width="20px" height="20px" viewBox="0 0 16 16" className="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      </svg>
                    </span>
                  </span>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>

                <Dropdown.Item onClick={(event, data) =>
                  UpdateProfileHandler({
                    e: event,
                    d: data,
                  })}>
                  <span className="svg-icon svg-icon-xl svg-icon-primary mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-user">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx={12} cy={7} r={4} />
                    </svg>
                  </span>
                  {t('Edit Profile')}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => onLogout()}>
                  <span className="svg-icon svg-icon-xl svg-icon-primary mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-power">
                      <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                      <line x1={12} y1={2} x2={12} y2={12} />
                    </svg>
                  </span>
                  {t('Logout')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/*end::user*/}
          </div>
          {/*end::Topbar*/}
        </div>
        {/*end::Container*/}
      </div>

      {/* for response header small screen */}


    </Fragment>
  )
}

export default FixedHeader
