import React ,{Fragment} from "react";
import MobileHeader from "../../layouts/Header/MobileHeader";
import MainHeaderWithSidebar from "../../layouts/Header/MainHeader";
import Head from "next/head";
import FixedHeader from "../../layouts/Header/FixedHeader";
import Switcher from "../../components/switcher";

const Reports = () => {
    
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
                {/* <div className="subheader py-2 py-lg-6 subheader-solid">
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
                </div> */}
                {/*end::Subheader*/}
                {/*begin::Entry*/}
                <div className="d-flex flex-column-fluid padding-0">
                  {/*begin::Container*/}
                  <div className="container-fluid">
                    
                        <div className="row">
                          <div className="col-lg-12 col-xl-12">
                            <div className="card card-custom gutter-b bg-white border-0">
                              <div className="card-header align-items-center  border-0">
                                <div className="card-title mb-0">
                                  <h3 className="card-label mb-0 font-weight-bold text-body">
                                    Reports
                                  </h3>
                                </div>
                              </div>
                              <div className="card-body">
                                <div>
                                  <div className="kt-table-content table-responsive-sm">
                                    <table id="myTable" className="table ">
                                    <thead>
                                    <tr>
                                      <th>Contact ID</th>
                                      <th>Lead Name</th>
                                      <th>Amount Required</th>
                                      <th>Email</th>
                                      <th>Meeting held</th>
                                      <th>Stage</th>
                                      <th>Phone</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>#12425</td>
                                      <td>Clayton Bates</td>
                                      <td>Clayton Assosiates</td>
                                      <td>Claytonbates@gmail.com</td>
                                      <td>Mill burrows</td>
                                      <td>Cold Call</td>
                                      <td>55-555-555</td>
                                    </tr>
                                    <tr>
                                      <td>#12425</td>
                                      <td>Clayton Bates</td>
                                      <td>Clayton Assosiates</td>
                                      <td>Claytonbates@gmail.com</td>
                                      <td>Mill burrows</td>
                                      <td>Cold Call</td>
                                      <td>55-555-555</td>
                                    </tr>
                                    <tr>
                                      <td>#12425</td>
                                      <td>Clayton Bates</td>
                                      <td>Clayton Assosiates</td>
                                      <td>Claytonbates@gmail.com</td>
                                      <td>Mill burrows</td>
                                      <td>Cold Call</td>
                                      <td>55-555-555</td>
                                    </tr>
                                    <tr>
                                      <td>#12425</td>
                                      <td>Clayton Bates</td>
                                      <td>Clayton Assosiates</td>
                                      <td>Claytonbates@gmail.com</td>
                                      <td>Mill burrows</td>
                                      <td>Cold Call</td>
                                      <td>55-555-555</td>
                                    </tr>
                                    <tr>
                                      <td>#12425</td>
                                      <td>Clayton Bates</td>
                                      <td>Clayton Assosiates</td>
                                      <td>Claytonbates@gmail.com</td>
                                      <td>Mill burrows</td>
                                      <td>Cold Call</td>
                                      <td>55-555-555</td>
                                    </tr>
                                    <tr>
                                      <td>#12425</td>
                                      <td>Clayton Bates</td>
                                      <td>Clayton Assosiates</td>
                                      <td>Claytonbates@gmail.com</td>
                                      <td>Mill burrows</td>
                                      <td>Cold Call</td>
                                      <td>55-555-555</td>
                                    </tr>
                                    <tr>
                                      <td>#12425</td>
                                      <td>Clayton Bates</td>
                                      <td>Clayton Assosiates</td>
                                      <td>Claytonbates@gmail.com</td>
                                      <td>Mill burrows</td>
                                      <td>Cold Call</td>
                                      <td>55-555-555</td>
                                    </tr>
                                    <tr>
                                      <td>#12425</td>
                                      <td>Clayton Bates</td>
                                      <td>Clayton Assosiates</td>
                                      <td>Claytonbates@gmail.com</td>
                                      <td>Mill burrows</td>
                                      <td>Cold Call</td>
                                      <td>55-555-555</td>
                                    </tr>
                                    <tr>
                                      <td>#12425</td>
                                      <td>Clayton Bates</td>
                                      <td>Clayton Assosiates</td>
                                      <td>Claytonbates@gmail.com</td>
                                      <td>Mill burrows</td>
                                      <td>Cold Call</td>
                                      <td>55-555-555</td>
                                    </tr>
                                  </tbody>
                                    </table>
                                  </div>
                                  <div className="page">
                                    <span className="pag">
                                      Showing 1 to 10
                                    </span>
                                    <div class="pagination float-right">
                                    <a href="#">Previous</a>
                                    <a href="#" class="active">1</a>
                                    <a href="#">2</a>
                                    <a href="#">Next</a>
                                  </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <div className="col-lg-6 col-xl-4">
                            <div className="card card-custom gutter-b bg-white border-0">
                              <div className="card-header align-items-center  border-0">
                                <div className="card-title mb-0">
                                  <h3 className="card-label mb-0 font-weight-bold text-body">
                                    Action Needed
                                  </h3>
                                </div>
                                <div className="card-toolbar">
                                  <button
                                    className="btn p-0"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    <span className="svg-icon">
                                      <svg
                                        width="20px"
                                        height="20px"
                                        viewBox="0 0 16 16"
                                        className="bi bi-three-dots text-body"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                                        />
                                      </svg>
                                    </span>
                                  </button>
                                  <div
                                    className="dropdown-menu dropdown-menu-right"
                                    aria-labelledby="dropdownMenuButton"
                                  >
                                    <a className="dropdown-item" href="#">
                                      Action
                                    </a>
                                    <a className="dropdown-item" href="#">
                                      Another action
                                    </a>
                                    <a className="dropdown-item" href="#">
                                      Something else here
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="card-body pt-3">
                                <div id="chart-5"></div>
                                <div className="pt-0">
                                  <p className="text-center font-weight-normal text-body">
                                    Notes: Current sprint requires stakeholders
                                    <br />
                                    to approve newly amended policies
                                  </p>
                                  <a
                                    href="#"
                                    className="btn btn-secondary text-white font-weight-bold w-100 py-3"
                                  >
                                    Generate Report
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div> */}
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

export default Reports;








