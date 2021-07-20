import React, { Fragment, useState, useEffect } from "react";
import MobileHeader from "../../layouts/Header/MobileHeader";
import MainHeaderWithSidebar from "../../layouts/Header/MainHeader";
import Head from "next/head";
import FixedHeader from "../../layouts/Header/FixedHeader";
import Switcher from "../../components/switcher";
import { PieChart } from "react-minimal-pie-chart";
import Piechart from "../charts/pie";
import BarChart from "../charts/bar";
import Bar2 from "../charts/bar2";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_URI } from "../../components/utils/config";
import { getHttp } from "../../actions/config";
import { GET_STAT, GET_STAT_GRAPH } from "../../actions/types";
import Lead from "../lead";
import Link from 'next/link';
function Statistics() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const allStat = useSelector((state) => state.settings.all_stat);

  const allStatGraph = useSelector((state) => state.settings.all_stat_graph);

  useEffect(() => {
    dispatch(getHttp(`${SERVER_URI}api/admin/total-leads?getStatistics=1`))
      .then((response) => {
        console.log("asdasdf", response.data.data);
        //   setData(response.data.data);
        dispatch({
          type: GET_STAT,
          payload: response.data.data,
        });
      })
      .catch(function (error) {
        console.log("error");
      });

    dispatch(getHttp(`${SERVER_URI}api/admin/total-leads?getStatisticsGraph=1`))
      .then((response) => {
        console.log("asdasdf", response.data.data);
        //   setData(response.data.data);
        dispatch({
          type: GET_STAT_GRAPH,
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
                          <Link href="/dashboard">Dashboard</Link> / Statistics
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
                        <div className="card card-custom gutter-b bg-white border-0 pb-5">
                          <div className="card-header align-items-center  border-0">
                            <div className="card-title mb-0">
                              <h3 className="card-label text-body font-weight-bold mb-0">
                                Leads Statistics
                              </h3>
                            </div>
                          </div>
                          {/* <div className="card-body pt-3">
              <div id="chart-4"></div>
            </div> */}
                          {/* <CC/> */}

                          <div className="chart-container">
                            {/* <BarChart/> */}
                            <Bar2 data={allStat} />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-4">
                        <div className="card card-custom gutter-b bg-white border-0">
                          <div className="card-header align-items-center justify-content-center border-0">
                            <div className="card-title mb-0">
                              <h3 className="card-label text-body font-weight-bold mb-0 text-center">
                                Total Leads Chart
                              </h3>
                            </div>
                          </div>
                          {/* <div className="card-body pt-3">
              <div id="chart-4"></div>
            </div> */}
                          {/* <CC/> */}
                          <div className="chart-container">
                            <Piechart data={allStatGraph} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12 col-xl-12">
                        <div className="card card-custom gutter-b bg-white border-0">
                          <div className="card-body">
                            <div>
                              <div className="kt-table-content table-responsive-sm">
                                <Lead file="statistics" />
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

export default Statistics;
