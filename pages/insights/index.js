import React, { Fragment, useState, useEffect } from "react";
import MobileHeader from "../../layouts/Header/MobileHeader";
import MainHeaderWithSidebar from "../../layouts/Header/MainHeader";
import Head from "next/head";
import { getHttp } from "../../actions/config";
import { GET_INSIGNTS, GET_INSIGNTS_AVG } from "../../actions/types";
import { SERVER_URI } from "../../components/utils/config";
import FixedHeader from "../../layouts/Header/FixedHeader";
import Switcher from "../../components/switcher";
// import CC from '../charts/CC';
import DoughnutInsightsChart from "../charts/Doughnutinsights";
// import AreaChart from "../charts/AreaChart";
import { useDispatch, useSelector } from "react-redux";
// import Chart from "react-google-charts";
import Link  from 'next/link';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Insights() {
  const columns = [
    {
      type: "number",
      label: "year",
    },
    {
      label: "AttentionSpan",
      type: "number",
    },
  ];

  const rows = [
    [2015, 5],
    [2016, 3],
    [2018, 1],
  ];

  const primaryXAxis = { valueType: 'Category'};
  const data1 = [ {
    name: 'abc',
    uv: 0,
   
  },
  {
    name: 'abc',
    uv: 1,
   
  },];



  const [currentMonth, setCuurent] = useState("");
  const dispatch = useDispatch();
  const allSights = useSelector((state) => state.settings.all_insights);
  const allSightsAvg = useSelector((state) => state.settings.all_insightsAvg);
  useEffect(() => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var d = new Date();
    var n = d.getMonth();
    setCuurent(monthNames[n]);
    dispatch(getHttp(`${SERVER_URI}api/admin/total-leads?getLeadSourceStats=1`))
      .then((response) => {
        console.log("asdasdf", response.data.data);
        //   setData(response.data.data);
        dispatch({
          type: GET_INSIGNTS,
          payload: response.data.data,
        });
      })
      .catch(function (error) {
        console.log("error");
      });
    dispatch(getHttp(`${SERVER_URI}api/admin/total-leads?getLeadSourceAvg=1`))
      .then((response) => {
        console.log("asdasdf", response.data.data);
        //   setData(response.data.data);
        dispatch({
          type: GET_INSIGNTS_AVG,
          payload: response.data.data,
        });
      })
      .catch(function (error) {
        console.log("error");
      });
  }, []);

  return (
    <Fragment>
      <Head>
        <meta charset="utf-8" />
        <title>Admin | Dashboard</title>
        <meta name="description" content="Updates and Insights" />
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
                          <Link href="/dashboard">Dashboard</Link> / Insights
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
                      <div className="col-lg-6 col-xl-8">
                        <div className="card card-custom gutter-b bg-white border-0">
                          <div className="card-header align-items-center  border-0">
                            <div className="card-title mb-0">
                              <h4 className="card-label text-body font-weight-bold mb-0">
                                Lead Source Stats ({currentMonth})
                              </h4>
                            </div>
                          </div>
                          <div className="card-body pb-0 pt-4">
                            <div id="chart-4"></div>
                            <div
                              className="row my-3"
                              style={{
                                display: "flex",
                                flexWrap: "nowrap",
                                overflowX: "auto",
                              }}
                            >
                              {allSights !== undefined && allSights.length > 0
                                ? allSights.map((item, index) => (
                                    <div className="col px-0">
                                      <div className="">
                                        <h2 className="text-center text-primary">
                                          {item.total_leads_currenct_month}
                                        </h2>
                                        <p className="text-center text-black font-weight-bold">
                                          {item.lead_source}
                                        </p>
                                      </div>
                                      <div className="d-flex align-items-center flex-column">
                                        {item.lead_source_type ===
                                        "increase" ? (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="21"
                                            height="21"
                                            viewBox="0 0 24.883 24.883"
                                          >
                                            <g
                                              id="statistics"
                                              transform="translate(0 0)"
                                            >
                                              <path
                                                id="Path_334"
                                                data-name="Path 334"
                                                d="M33.187,11.664a2.176,2.176,0,0,0,1.514-.615l2.158,1.079a2.142,2.142,0,0,0-.027.265,2.187,2.187,0,0,0,4.374,0,2.16,2.16,0,0,0-.219-.937l2.927-2.927a2.16,2.16,0,0,0,.937.219,2.189,2.189,0,0,0,2.187-2.187,2.154,2.154,0,0,0-.109-.648l2.544-1.907A2.186,2.186,0,1,0,48.5,2.187a2.154,2.154,0,0,0,.109.648L46.062,4.742A2.178,2.178,0,0,0,42.883,7.5l-2.927,2.927a2.149,2.149,0,0,0-2.451.4L35.347,9.742a2.142,2.142,0,0,0,.027-.265,2.187,2.187,0,1,0-2.187,2.187Zm0,0"
                                                transform="translate(-29.493)"
                                                fill="#a9b2ba"
                                              />
                                              <path
                                                id="Path_335"
                                                data-name="Path 335"
                                                d="M24.154,166.135h-.778V150.729a.729.729,0,0,0-.729-.729H19.731a.729.729,0,0,0-.729.729v15.406H17.544V155.1a.729.729,0,0,0-.729-.729H13.9a.729.729,0,0,0-.729.729v11.032H11.713v-5.2a.729.729,0,0,0-.729-.729H8.068a.729.729,0,0,0-.729.729v5.2H5.881v-8.116a.729.729,0,0,0-.729-.729H2.236a.729.729,0,0,0-.729.729v8.116H.729a.729.729,0,0,0,0,1.458H24.154a.729.729,0,0,0,0-1.458Zm0,0"
                                                transform="translate(0 -142.71)"
                                                fill="#a9b2ba"
                                              />
                                            </g>
                                          </svg>
                                        ) : item.lead_source_type ==="decrease" ? (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="21"
                                            height="21"
                                            viewBox="0 0 24.883 24.883"
                                          >
                                            <g
                                              id="statistics"
                                              transform="translate(0 0)"
                                            >
                                              <path
                                                id="Path_334"
                                                data-name="Path 334"
                                                d="M33.187,11.664a2.176,2.176,0,0,0,1.514-.615l2.158,1.079a2.142,2.142,0,0,0-.027.265,2.187,2.187,0,0,0,4.374,0,2.16,2.16,0,0,0-.219-.937l2.927-2.927a2.16,2.16,0,0,0,.937.219,2.189,2.189,0,0,0,2.187-2.187,2.154,2.154,0,0,0-.109-.648l2.544-1.907A2.186,2.186,0,1,0,48.5,2.187a2.154,2.154,0,0,0,.109.648L46.062,4.742A2.178,2.178,0,0,0,42.883,7.5l-2.927,2.927a2.149,2.149,0,0,0-2.451.4L35.347,9.742a2.142,2.142,0,0,0,.027-.265,2.187,2.187,0,1,0-2.187,2.187Zm0,0"
                                                transform="translate(-29.493)"
                                                fill="#a9b2ba"
                                              />
                                              <path
                                                id="Path_335"
                                                data-name="Path 335"
                                                d="M24.154,166.135h-.778V150.729a.729.729,0,0,0-.729-.729H19.731a.729.729,0,0,0-.729.729v15.406H17.544V155.1a.729.729,0,0,0-.729-.729H13.9a.729.729,0,0,0-.729.729v11.032H11.713v-5.2a.729.729,0,0,0-.729-.729H8.068a.729.729,0,0,0-.729.729v5.2H5.881v-8.116a.729.729,0,0,0-.729-.729H2.236a.729.729,0,0,0-.729.729v8.116H.729a.729.729,0,0,0,0,1.458H24.154a.729.729,0,0,0,0-1.458Zm0,0"
                                                transform="translate(0 -142.71)"
                                                fill="#a9b2ba"
                                              />
                                            </g>
                                          </svg>
                                        ) : null}
                                        <p className="text-center font-9 ">
                                          {item.lead_source_type}(
                                          {item.lead_source_per}%)
                                        </p>
                                      </div>
                                    </div>
                                  ))
                                : null}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="card card-custom gutter-b bg-white border-0">
                          <div className="card-header align-items-center d-flex border-0">
                            <div className="card-title mb-0">
                              <h4 className="card-label text-body text-center font-weight-bold mb-0">
                                Lead Storage Chart
                              </h4>
                            </div>
                            <div></div>
                          </div>
                          <div className="card-body ins px-0 py-0">
                            <DoughnutInsightsChart data={allSights} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12 col-xl-12">
                        <div className="card card-custom gutter-b bg-white border-0">
                          <div className="card-header align-items-center  border-0">
                            <div className="card-title mb-0">
                              <h4 className="card-label text-body font-weight-bold mb-0">
                                Total Lead Count Based on Source
                              </h4>
                            </div>
                          </div>
                          <div className="card-body pt-0">
                            <div>
                              <div className="kt-table-content table-responsive-sm">
                                <table id="myTable" className="table ">
                                  <thead>
                                    <tr>
                                      <th>Lead Source</th>
                                      <th>Total Count</th>
                                      <th>Count Per Month</th>
                                      <th>Average</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {allSightsAvg !== undefined &&
                                    allSightsAvg.length > 0 ? (
                                      allSightsAvg.map((item, index) => (
                                        <tr>
                                          <td>{item.lead_source}</td>
                                          <td>{item.total_results}</td>
                                          {/* <td><AreaChart data={item.lead_source_data}/></td> */}
                                          <td >
                                            {/* <Chart
                                              chartType="AreaChart"
                                              width="70%"
                                              height="60px"
                                              legendToggle
                                              rows={[item.lead_source_data.map((it) =>  [it.month, it.total_results])]}
                                            //   rows={[
                                            //     [2015, 5],
                                            //     [2016, 3],
                                            //     [2018, 1],
                                            //   ]}
                                              columns={columns}
                                            /> */}
                                               <ResponsiveContainer width="100%" height="100%">
                                                        <AreaChart
                                                        width={200}
                                                        height={60}
                                                        data={item.lead_source_data.map(it => ({ month : it.month, total: it.total_results  }))}
                                                        margin={{
                                                            top: 5,
                                                            right: 0,
                                                            left: 0,
                                                            bottom: 5,
                                                        }}
                                                        >
                                                        <Tooltip />
                                                        <Area  dataKey="total" stroke="#ae69f5" fill="#e7d1fc" />
                                                        <Area  dataKey="month" stroke="#000" fill="#000" />
                                                        </AreaChart>
                                                    </ResponsiveContainer>
                                       
                                          </td>
                                          <td>
                                            {item.total_results /
                                              item.total_month}
                                          </td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>No result found!</tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                              <div className="page"></div>
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

          {/*end::Footer*/}
        </div>
        {/*end::Wrapper*/}
        {/* </div> */}
        {/*end::Page*/}
        {/* </div> */}
        {/*end::Main*/}
      </body>
    </Fragment>
  );
}

export default Insights;
