import React, { Fragment, useEffect, useState, useRef } from "react";
import MobileHeader from "../../layouts/Header/MobileHeader";
import MainHeaderWithSidebar from "../../layouts/Header/MainHeader";
import Head from "next/head";
import FixedHeader from "../../layouts/Header/FixedHeader";
import Edit from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from 'react-bootstrap/Button';
import Switcher from "../../components/switcher";
import { useDispatch, useSelector } from "react-redux";
import {
  getHttp,
  postHttp,
  removeHttp,
  putHttp,
} from "../../actions/config";
import { SERVER_URI } from "../../components/utils/config";
import Swal from "sweetalert2";
import { useRouter, withRouter } from "next/router";
import Link from 'next/link';
const Campaigns = () => {

  var button = {
    padding: 5,
    borderRadius: 50
  }

  const { query } = useRouter();
  const dispatch = useDispatch();
  const router = useRouter();
  const tableRef = useRef(null);
  const [limitPage, setLimit] = useState(10);
  const [isLoading, setLoading] = useState(true);
  const [compaignName, setCompaignName] = useState("");
  const [compaignData, setCompaignData] = useState([]);
  const [entries, setEntries] = useState([]);
  const [startDate, setStartDate] = useState(entries.start_date);
  const [endDate, setEndDate] = useState([]);
  const [remainingDays, setRemainingDays] = useState();
  const [editUnit, setEditUnit] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [requestLoader, setRequestLoader] = useState(false);


  useEffect(() => {
    // tableRef.current.dataManager.changePageSize(limitPage);
    // if (searchParameter.length < 1) {
    dispatch(
      getHttp(
        `${SERVER_URI}api/admin/compaigns?getAverage=1`
      )
    )
      .then((response) => {
        setEntries(response.data.data);
        setEndDate(response.data.data.end_date);
        setLoading(false);
        // setCompaignName(response.data.data.compaign_name);
      })
      .catch(function (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "server Error Please try again",
          showConfirmButton: false,
          timer: 1500,
        });
      });

    setLoading(true);
  }, [
    limitPage,
    // removeProduct === true,
    // editSuccess === true,
    // addSuccess === true,
  ]);

  const [presentdatenow, setpresentdatenow] = useState();
  const [removeProduct, setRemoveProduct] = useState(false);



  const Updatehandler = (data) => {
    const { e, d } = data;
    setEditUnit(true);
    setEditSuccess(false);
    router.push({
      pathname: "/campaigns/updatecampaign",
      query: {
        id: d.id,
      }
    });
    console.log("di: ", d.id);
    // localStorage[data.lead_id] = JSON.stringify(data);
  };

  // delete handler
  const DeleteHandler = (data) => {
    setRemoveProduct(false);
    // alert(data.id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeHttp(`${SERVER_URI}api/admin/compaigns/${data.id}`))
          .then((res) => {
            if (res.data.status === "Success") {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              setRemoveProduct(true);
              setLoading(false);
              dispatch(
                getHttp(
                  `${SERVER_URI}api/admin/compaigns?getAverage=1`
                )
              )
                .then((response) => {
                  setEntries(response.data.data);
                  setEndDate(response.data.data.end_date);
                  setCompaignName(response.data.data.compaign_name);
                })
            } else {
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: res.data.message,
                showConfirmButton: false,
                timer: 1500,
              });
              setLoading(false);
            }
          })
          .catch(function (error) {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "server Error Please try again",
              showConfirmButton: false,
              timer: 1500,
            });
            setLoading(false);
          });
      }
    });
  };

  var current_date = new Date();


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
                className="content d-flex flex-column flex-column-fluid padding-0"
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
                          <Link href="/dashboard">Dashboard</Link> / Campaigns
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
                {/*end::Subheader*/}
                {/*begin::Entry*/}
                <div className="d-flex flex-column-fluid pt-5">
                  {/*begin::Container*/}
                  <div className="container-fluid">

                    <div className="row">
                      <div className="col-lg-12 col-xl-12">
                        <div className="card card-custom gutter-b bg-white border-0">
                          <div className="card-header align-items-center border-0 px-4">
                            <div className="card-title mb-0">
                              <h3 className="card-label mb-0 font-weight-bold text-body">
                                Campaigns
                              </h3>
                            </div>
                            <div className="icons d-flex">
                              <btn
                                className="btn ml-2 p-0"
                                onClick={() => { router.push("/campaigns/addcampaign") }}
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
                            </div>
                          </div>
                          <div className="card-body col-12 pt-0">
                            {entries.map((entries) => (

                              <div className="row my-2">
                                <div className="col-12 col-lg-12 col-sm-12 col-md-12 col-xl-12">
                                  <div className="row">
                                    {/* {    console.log("inner",entries)} */}
                                    <div className="col-lg-2 col-12 social-icon">
                                      <div className="text-center mx-auto" style={{ width: "85px", height: "85px" }} >
                                        {entries.compaign_platform === "Facebook" ?
                                          <img src="/images/png/facebook.png" alt="ths is image" className="facebook-cover m-0 " width="100%" style={{ width: "100%", height: "100%" }} ></img>
                                          : entries.compaign_platform === "Instagram" ?
                                            <img src="/images/png/instagram.png" className="instagram-cover m-0 " alt="ths is image" width="100%" style={{ width: "100%", height: "100%" }}></img>
                                            : entries.compaign_platform === "Whatsapp" ?
                                              <img src="/images/png/whatsapp.png" className="whatsapp-cover m-0 " alt="ths is image" width="100%" style={{ width: "100%", height: "100%" }}></img>
                                              : entries.compaign_platform === "Pinterest" ?
                                                <img src="/images/png/pinterest.png" className="pintrest-cover m-0 " alt="ths is image" width="100%" style={{ width: "100%", height: "100%" }}></img>
                                                : entries.compaign_platform === "Linkedin" ?
                                                  <img src="/images/png/linkedin.png" className="linkedin-cover m-0 " alt="ths is image" width="100%" style={{ width: "100%", height: "100%" }}></img>
                                                  : null}
                                      </div>
                                    </div>

                                    <div className="col-lg-3 col-12 d-flex flex-column mobile-center justify-content-center ">
                                      <h4 className=" m-0">{entries.compaign_name}</h4>
                                      <p className="m-0">Campaign ID: {entries.id}</p>
                                      <p className="m-0">Created on {entries.start_date}</p>
                                      <p>End on {entries.end_date}</p>

                                    </div>
                                    <div className="col-lg-3 col-6 d-flex flex-column justify-content-center align-items-center">
                                      <h5 className="m-0">Leads: <span className="text-bold">{entries.total_leads}</span></h5>
                                      <p><span>Organic: {entries.total_organic_percentage}%</span> <span>Paid: {entries.total_paid_percentage}%</span></p>
                                    </div>
                                    <div className="col-lg-2 col-6 d-flex align-items-center justify-content-center">
                                      <p className="font-15">Days Remaining: <span className="text-bold">{Math.round(parseInt(Math.abs(Date.parse(entries.end_date) - current_date)) / (1000 * 3600 * 24)) + " Days"}</span></p>
                                    </div>
                                    <div className="col-lg-2 col-12 mobile-center text-center align-items-center d-flex">
                                      <Button variant="outline-dark" style={button} onClick={(event, data) => Updatehandler({ e: event, d: entries })}><Edit /></Button>
                                      &nbsp; &nbsp;
                                      <Button variant="outline-dark" style={button} onClick={(event, data) => DeleteHandler(entries)}><DeleteIcon /></Button>
                                      {/* <Edit/> */}
                                      {/* <DeleteIcon/> */}
                                    </div>

                                  </div>
                                </div>
                              </div>

                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*end::Footer*/}
        </div>
        {/*end::Wrapper*/}
        {/* </div> */}
        {/*end::Page*/}
        {/* </div> */}
        {/*end::Main*/}


      </body>
    </Fragment>);
}

export default Campaigns;








