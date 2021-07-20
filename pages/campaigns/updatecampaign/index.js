import React, { Fragment, useState, useEffect } from "react";
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
import { useRouter, withRouter } from "next/router";

const UpdateCampaign = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { query } = useRouter();
  const [limitPage, setLimit] = useState(10);
  const [isLoading, setLoading] = useState(true);
  const [addSuccess, setAddSuccess] = useState(false);
  const [requestLoader, setRequestLoader] = useState(false);
  const [entries, setEntries] = useState([]);
  const [compaignPlatform, setCompaignPlatform] = useState(entries.compaign_platform);
  const [compaignName, setCompaignName] = useState(entries.compaign_name);
  const [compaignCost, setCompaignCost] = useState(entries.compaign_cost);
  const [startDate, setStartDate] = useState(entries.start_date);
  const [endDate, setEndDate] = useState(entries.end_date);

  const id = query.id;
  useEffect(() => {
    dispatch(getHttp(`${SERVER_URI}api/admin/compaigns/${id}`))
      .then((response) => {
        setEntries(response.data.data);
        setCompaignName(response.data.data.compaign_name);
        setCompaignCost(response.data.data.compaign_cost);
        setCompaignPlatform(response.data.data.compaign_platform);
        setStartDate(response.data.data.start_date);
        setEndDate(response.data.data.end_date);
        // console.log("id: ",query.id);
        dispatch({
          type: GET_SINGLE_UNIT,
          payload: response.data.data,
        });
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
    // removeProduct === true,
    // editSuccess === true,
    // addSuccess === true,
  ]);

  // method implimentation
  const setCompaignNameEvent = (obj) => {
    setCompaignName(obj.target.value);
  }
  const setCompaignPlatformEvent = (obj) => {
    setCompaignPlatform(obj.target.value);
  }
  const setCompaignCostEvent = (obj) => {
    setCompaignCost(obj.target.value);
  }
  const setStartDateEvent = (obj) => {
    setStartDate(obj.target.value);
  }
  const setEndDateEvent = (obj) => {
    setEndDate(obj.target.value);
  }

  // this is start of start 
  const UpdateFieldHandler = (e) => {
    e.preventDefault();
    setAddSuccess(false);
    setRequestLoader(true);
    const body = {
      compaign_cost: compaignCost,
      compaign_name: compaignName,
      compaign_platform: compaignPlatform,
      start_date: startDate,
      end_date: endDate,
    }

    dispatch(putHttp(`${SERVER_URI}api/admin/compaigns/${id}`, body))
      .then((res) => {
        if (res.data.status === "Success") {
          router.push("/campaigns");
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
        } else {
          setRequestLoader(false);
          // error handling
          console.log("it also works");
          let arr = [];
          let dat = res.data.data.errors
          arr = Object.keys(res.data.data.errors);
          for (let i = 0; i < arr.length; i++) {
            setErrorHandling((prevState) => ({ ...prevState, [arr[i]]: dat[arr[i]] }));
          }
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          setRequestLoader(false);
        }
      })
      .catch((err) => {
        // Swal.fire({
        //   position: "top-end",
        //   icon: "error",
        //   title: "The given data was invalid.",
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
        console.log(err);
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
                {/* begin::Subheader */}
                <div className="subheader py-2 py-lg-6 subheader-solid">
                  <div className="container-fluid">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb bg-white mb-0 px-0 py-2">
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          <Link href="/dashboard">Dashboard</Link> / <Link href="/campaigns">Campaigns</Link> / Update Campaign
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
                {/*begin::Entry*/}
                <div className="d-flex flex-column-fluid pt-5">
                  {/*begin::Container*/}
                  <div className="container-fluid">

                    <div className="row">
                      <div className="col-lg-12 col-xl-12">
                        <div className="card card-custom gutter-b bg-white border-0">
                          <div className="card-header align-items-center  border-0">
                            <div className="card-title mb-0">
                              <h3 className="card-label mb-0 font-weight-bold text-body page">
                                Update Campaign
                                  </h3>
                            </div>

                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-8 m-auto">
                                <div className="form">

                                  <div className="form-group row">
                                    <div className="col-4 text-left my-auto">
                                      <label>Compaign Name<span>*</span></label>
                                    </div>
                                    <div className="col-8">
                                      <input type="text" className="form-control" onChange={(e) => setCompaignNameEvent(e)} value={compaignName} name="compaignName" placeholder="Enter Name" />
                                    </div>
                                  </div>
                                  <div className="form-group row">
                                    <div className="col-4 text-left my-auto">
                                      <label>Campaign Platform</label>
                                    </div>
                                    <div className="col-8">
                                      <select class="form-select form-control" onChange={(e) => setCompaignPlatformEvent(e)} name="compaignPlatform" value={compaignPlatform} aria-label="Disabled select example" >
                                        <option selected>Open to select Platform</option>
                                        <option value="Facebook">Facebook</option>
                                        <option value="Instagram">Instagram</option>
                                        <option value="Whatsapp">Whatsapp</option>
                                        <option value="Linkedin">Linkedin</option>
                                        <option value="Pinterest">Pinterest</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="form-group row">
                                    <div className="col-4 text-left my-auto">
                                      <label>Campaign Cost</label>
                                    </div>
                                    <div className="col-8">
                                      <input className="lead-input" type="number" onChange={(e) => setCompaignCostEvent(e)} value={compaignCost} name="compaignCost" className="form-control" placeholder="Enter Cost" />
                                    </div>
                                  </div>
                                  <div className="form-group row">
                                    <div className="col-4 text-left my-auto">
                                      <label>Start Date</label>
                                    </div>
                                    <div className="col-8">
                                      <input className="lead-input" type="date" onChange={(e) => setStartDateEvent(e)} value={startDate} name="startDate" className="form-control" placeholder="Enter Start Date" />
                                    </div>
                                  </div>
                                  <div className="form-group row">
                                    <div className="col-4 text-left my-auto">
                                      <label>End Date</label>
                                    </div>
                                    <div className="col-8">
                                      <input className="lead-input" type="date" onChange={(e) => setEndDateEvent(e)} value={endDate} name="endDate" className="form-control" placeholder="Enter End Date" />
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
              <button className="btn btn-primary mx-1" onClick={(e) => UpdateFieldHandler(e)}>Update Campaign</button>

              <button className="btn btn-primary mx-1" onClick={() => { router.push("/campaigns") }}>Cancel</button>
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

export default UpdateCampaign;
