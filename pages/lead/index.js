import React, { Fragment, useState, useEffect, useRef } from "react";
import Head from "next/head";
import MainHeaderWithSidebar from "../../layouts/Header/MainHeader";
import MobileHeader from "../../layouts/Header/MobileHeader";
import Switcher from "../../components/switcher";
import FixedHeader from "../../layouts/Header/FixedHeader";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  getHttp,
  postHttp,
  removeHttp,
  putHttp,
} from "../../actions/config";
import { SERVER_URI } from "../../components/utils/config";
import {
  GET_LANGUAGE_SUCCESS,
  GET_SINGLE_UNIT,
  EMPTY_SINGLE_UNIT,
  SET_DEFAULT_LANGUAGE,
} from "../../actions/types";
import { TablePagination } from "@material-ui/core";
import VisibilityOutlinedIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import $ from "jquery";
import { Paper } from "@material-ui/core";
import Swal from "sweetalert2";
import { DelayInput } from "react-delay-input";
import { Tab, Nav } from "react-bootstrap";
import Link from "next/link";
import Cookies from 'js-cookie'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteIcon {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  View: forwardRef((props, ref) => (
    <VisibilityOutlinedIcon {...props} ref={ref} />
  )),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;
// starting main component
const Leads = (props) => {
  const file = props.file;
  const router = useRouter();
  const dispatch = useDispatch();
  const language_list = useSelector(
    (state) => state.settings.language_settings
  );
  const set_default_language = useSelector(
    (state) => state.settings.set_default_language
  );
  const login_user_id = Cookies.get('userID');
  const single_unit = useSelector((state) => state.general.single_unit_detail);
  // column heads in table 
  const columns = [
    { title: "ID", field: "lead_id", customSort: (e) => onSortHandler(e) },
    { title: "CompaignID", field: "compaign.id", customSort: (e) => onSortHandlerCompaign(e) },
    { title: "Name", field: "first_name", customSort: (e) => onSortHandlerName(e) },
    { title: "Email", field: "email", customSort: (e) => onSortHandlerEmail(e) },
    { title: "Phone", field: "phone_personal", customSort: (e) => onSortHandlerPhone(e) },
    { title: "Amount Required", field: "funds_needed", customSort: (e) => onSortHandlerFundsNeeded(e) },
    {
      title: "Status",
      field: "is_active",
      sorting: false,
      render: (rowData) =>
        rowData.lead_status == "Open" ? (
          <span class=" text-warning">Open</span>
        ) : rowData.lead_status == "Pending" ? (
          <span class=" text-danger">Pending</span>
        ) : (
          <span class="mr-0 text-success">Success</span>
        ), customSort: (e) => onSortHandlerStatus(e)
    },
  ];

  // old 
  const tableRef = useRef(null);
  const [page, setpage] = useState("1");
  const [total, setTotal] = useState(0);
  const [limitPage, setLimit] = useState(10);
  const [isLoading, setLoading] = useState(true);
  const [searchParameter, setSearchParameter] = useState("");
  const [removeProduct, setRemoveProduct] = useState(false);
  const [editUnit, setEditUnit] = useState(false);
  const [sort, setSort] = useState("ASC");
  const [editSuccess, setEditSuccess] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [requestLoader, setRequestLoader] = useState(false);
  const [defaultLangauge, setDefaultLanguage] = useState(set_default_language);
  const [catState, setCatState] = useState([]);

  // state for add language
  const [unit, setUnit] = useState({});
  const [unitStatus, setUnitStatus] = useState(0);
  const [leadID, setLeadID] = useState(null);

  //For erro handling
  const [errorMsg, setErrorMsg] = useState("");
  const [entries, setEntries] = useState([{}]);

  // state for add biller
  const [errorHandling, setErrorHandling] = useState({
    name: "",
    language_id: "",
  })

  useEffect(() => {
    tableRef.current.dataManager.changePageSize(limitPage);
    if (searchParameter.length < 1) {
      dispatch(
        getHttp(
          `${SERVER_URI}api/admin/leads?getDetail=1&page=${page}&limit=${limitPage}&sortBy=id&sortType=${sort}`
        )
      )
        .then((response) => {
          console.log("consoled data", response.data.data)
          setEntries(response.data.data);
          setTotal(response.data.meta.total);
          // setpage(response.data.meta.current_page);
          setLoading(false);
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
    } else {
      setLoading(true);
      dispatch(
        getHttp(
          `${SERVER_URI}api/admin/leads?getDetail=1searchParameter=${searchParameter}&limit=${limitPage}&sortBy=id&sortType=${sort}`
        )
      )
        .then((response) => {
          setEntries(response.data.data);
          setTotal(response.data.meta.total);
          setpage(response.data.meta.current_page);
          // console.log(res.locals.user);
          setLoading(false); 0
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
    setLoading(true);

  }, [
    limitPage,
    removeProduct === true,
    editSuccess === true,
    addSuccess === true,
  ]);

  const pageChangeHandler = (p) => {
    setLoading(true);
    dispatch(
      getHttp(
        `${SERVER_URI}api/admin/leads?getDetail=1&page=${p + 1
        }&limit=${limitPage}&sortBy=id&sortType=${sort}&searchParameter=${searchParameter}`
      )
    )
      .then((response) => {
        setEntries(response.data.data);
        setTotal(response.data.meta.total);
        setpage(response.data.meta.current_page);
        setLoading(false);
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
  };
  const onClickAddModalOpen = (e) => {
    e.preventDefault();
    $("#kt_notes_panel").addClass("offcanvas-on");
    setDefaultLanguage(set_default_language);
  };

  const onClickAddModalClose = (e) => {
    e.preventDefault();
    setUnit({});
    setUnitID(null);
    setUnitStatus(0);
    setEditUnit(false);
    setErrorMsg("");
    setRequestLoader(false);
    dispatch({
      type: EMPTY_SINGLE_UNIT,
    });

    setErrorHandling({
      name: '',
      language_id: ''
    });

    $("#kt_notes_panel").removeClass("offcanvas-on");
  };
  // handle the search input field
  const onSearchHandler = (value) => {
    setLoading(true);
    setSearchParameter(value);
    dispatch(
      getHttp(
        `${SERVER_URI}api/admin/leads?searchParameter=${value}&limit=${limitPage}&getDetail=1`
      )
    )
      .then((response) => {
        setEntries(response.data.data);
        console.log("leads search::", response.data.data)
        setTotal(response.data.meta.total);
        setpage(response.data.meta.current_page);
        setLoading(false);
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
    console.log("log123::", entries);
  };

  const onSortHandler = (e) => {
    let index = entries.length - 1;
    setLoading(true);
    if (e.id === entries[index].id) {
      dispatch(
        getHttp(
          `${SERVER_URI}api/admin/leads?getDetail=1&sortBy=id&sortType=${sort === "ASC" ? "DESC" : "ASC"
          }&limit=${limitPage}&searchParameter=${searchParameter}`
        )
      )
        .then((response) => {
          setEntries(response.data.data);
          setTotal(response.data.meta.total);
          setpage(response.data.meta.current_page);
          setLoading(false);
          setSort(sort === "ASC" ? "DESC" : "ASC");
        })
        .catch(function (error) {
          setLoading(false);

          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "server Error Please try again",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  };

  const onSortHandlerName = (e) => {
    let index = entries.length - 1;
    setLoading(true);
    if (e.id === entries[index].id) {
      dispatch(
        getHttp(
          `${SERVER_URI}api/admin/leads?getDetail=1&sortBy=first_name&sortType=${sort === "ASC" ? "DESC" : "ASC"
          }&limit=${limitPage}&searchParameter=${searchParameter}`
        )
      )
        .then((response) => {
          setEntries(response.data.data);
          setTotal(response.data.meta.total);
          setpage(response.data.meta.current_page);
          setLoading(false);
          setSort(sort === "ASC" ? "DESC" : "ASC");
        })
        .catch(function (error) {
          setLoading(false);

          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "server Error Please try again",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  };

  const onSortHandlerCompaign = (e) => {
    let index = entries.length - 1;
    setLoading(true);
    if (e.id === entries[index].id) {
      dispatch(
        getHttp(
          `${SERVER_URI}api/admin/leads?getDetail=1&sortBy=compaign_id&sortType=${sort === "ASC" ? "DESC" : "ASC"
          }&limit=${limitPage}&searchParameter=${searchParameter}`
        )
      )
        .then((response) => {
          setEntries(response.data.data);
          setTotal(response.data.meta.total);
          setpage(response.data.meta.current_page);
          setLoading(false);
          setSort(sort === "ASC" ? "DESC" : "ASC");
        })
        .catch(function (error) {
          setLoading(false);

          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "server Error Please try again",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  };

  const onSortHandlerEmail = (e) => {
    let index = entries.length - 1;
    setLoading(true);
    if (e.id === entries[index].id) {
      dispatch(
        getHttp(
          `${SERVER_URI}api/admin/leads?getDetail=1&sortBy=email&sortType=${sort === "ASC" ? "DESC" : "ASC"
          }&limit=${limitPage}&searchParameter=${searchParameter}`
        )
      )
        .then((response) => {
          setEntries(response.data.data);
          setTotal(response.data.meta.total);
          setpage(response.data.meta.current_page);
          setLoading(false);
          setSort(sort === "ASC" ? "DESC" : "ASC");
        })
        .catch(function (error) {
          setLoading(false);

          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "server Error Please try again",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  };

  const onSortHandlerPhone = (e) => {
    let index = entries.length - 1;
    setLoading(true);
    if (e.id === entries[index].id) {
      dispatch(
        getHttp(
          `${SERVER_URI}api/admin/leads?getDetail=1&sortBy=phone_personal&sortType=${sort === "ASC" ? "DESC" : "ASC"
          }&limit=${limitPage}&searchParameter=${searchParameter}`
        )
      )
        .then((response) => {
          setEntries(response.data.data);
          setTotal(response.data.meta.total);
          setpage(response.data.meta.current_page);
          setLoading(false);
          setSort(sort === "ASC" ? "DESC" : "ASC");
        })
        .catch(function (error) {
          setLoading(false);

          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "server Error Please try again",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  };

  const onSortHandlerFundsNeeded = (e) => {
    let index = entries.length - 1;
    setLoading(true);
    if (e.id === entries[index].id) {
      dispatch(
        getHttp(
          `${SERVER_URI}api/admin/leads?getDetail=1&sortBy=funds_needed&sortType=${sort === "ASC" ? "DESC" : "ASC"
          }&limit=${limitPage}&searchParameter=${searchParameter}`
        )
      )
        .then((response) => {
          setEntries(response.data.data);
          setTotal(response.data.meta.total);
          setpage(response.data.meta.current_page);
          setLoading(false);
          setSort(sort === "ASC" ? "DESC" : "ASC");
        })
        .catch(function (error) {
          setLoading(false);

          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "server Error Please try again",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  };

  const onSortHandlerStatus = (e) => {
    let index = entries.length - 1;
    setLoading(true);
    if (e.id === entries[index].id) {
      dispatch(
        getHttp(
          `${SERVER_URI}api/admin/leads?getDetail=1&sortBy=status&sortType=${sort === "ASC" ? "DESC" : "ASC"
          }&limit=${limitPage}&searchParameter=${searchParameter}`
        )
      )
        .then((response) => {
          setEntries(response.data.data);
          setTotal(response.data.meta.total);
          setpage(response.data.meta.current_page);
          setLoading(false);
          setSort(sort === "ASC" ? "DESC" : "ASC");
        })
        .catch(function (error) {
          setLoading(false);

          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "server Error Please try again",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  };

  const handleChangeRowPerPage = (value) => {
    setLimit(parseInt(value));
    setLoading(true);
    dispatch(
      getHttp(
        `${SERVER_URI}api/admin/leads?getDetail=1&limit=${value}&sortBy=id&sortType=${sort}&searchParameter=${searchParameter}`
      )
    )
      .then((response) => {
        setEntries(response.data.data);
        setTotal(response.data.meta.total);
        setpage(response.data.meta.current_page);
        setLimit(parseInt(response.data.meta.per_page));
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
  };
  // console.log("entries",entries);

  // handle the delete button in actions
  const DeleteHandler = (data) => {
    setRemoveProduct(false);
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
        dispatch(removeHttp(`${SERVER_URI}api/admin/leads/${data.lead_id}`))
          .then((res) => {
            if (res.data.status === "Success") {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              setRemoveProduct(true);
              setLoading(false);
            } else {
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: res.data.msg,
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
  // handles the update button used in actions
  const Updatehandler = (data) => {
    const { e, d } = data;
    setEditUnit(true);
    setEditSuccess(false);
    dispatch(getHttp(`${SERVER_URI}api/admin/leads/${d.lead_id}`))
      .then((response) => {

        if (response.data.status === "Success") {
          router.push({
            pathname: "/leads/newupdatelead",
            query: {
              id: d.lead_id,
              lead_id: response.data.data.lead_id,
            }
          });

          dispatch({
            type: GET_SINGLE_UNIT,
            payload: response.data.data,
          });
          setLoading(false);
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: response.data.msg,
            showConfirmButton: false,
            timer: 1500,
          });
          setLoading(false);
        }
      }).catch((error) => {
        // Swal.fire({
        //   position: "top-end",
        //   icon: "error",
        //   // title: "server Error Please try again",
        //   title: {error},
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
        // setRequestLoader(false);
      });
    // localStorage[data.lead_id] = JSON.stringify(data);
  };

  // Lead View Handler 
  const Viewhandler = (data) => {
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
        console.log(error)
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "server Error Please try again",
          showConfirmButton: false,
          timer: 1500,
        });
        setRequestLoader(false);
      });
  };

  const onChangeRowsPerPage = (e) => {
    setLimit(parseInt(e.target.value));
  };

  const onChangeUnitStatus = (e) => {
    setUnitStatus(e.target.value);
  };
  const AddUnitHandler = (e) => {
    e.preventDefault();
    setAddSuccess(false);
    setRequestLoader(true);
    const uniqueObjects = [
      ...new Map(catState.map((item) => [item.language_id, item])).values(),
    ];

    const body = new FormData();
    for (let i = 0; i < uniqueObjects.length; i++) {
      body.append(`name[${i}]`, uniqueObjects[i].value);
      body.append(`language_id[${i}]`, uniqueObjects[i].language_id);
    }
    body.append(`is_active`, unitStatus);
    dispatch(postHttp(`${SERVER_URI}api/admin/unit`, body))
      .then((res) => {
        if (res.data.status === "Success") {
          setRequestLoader(false);
          onClickAddModalClose(e);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });

          setAddSuccess(true);
        } else {
          // error handling
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
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "The given data was invalid.",
          showConfirmButton: false,
          timer: 1500,
        });
        setRequestLoader(false);
      });
  };

  const triggerChange = (e, id) => {
    const { name, value } = e.target;

    setCatState((oldArray) => [...oldArray, { value: value, language_id: id }]);
  };
  const handleChange = (event, id) => {
    setTimeout(() => triggerChange(event, id), WAIT_INTERVAL);
    setErrorHandling({
      name: '',
      language_id: ''
    })
  };

  const handleKeyDown = (e, id) => {
    if (e.keyCode === ENTER_KEY) {
      triggerChange(e);
    }
  };

  return (
    <Fragment>
      <Head>
        <base />
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
        {/*begin::Entry*/}
        <div className="d-flex flex-column-fluid">
          {/*begin::Container*/}
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-lg-12 col-xl-12">
                    <div className="card card-custom gutter-b bg-transparent shadow-none border-0">
                      <div className="card-header align-items-center  border-bottom-dark p-0">
                        <div className="card-title mb-0">
                          <h3 className="card-label mb-0 font-weight-bold text-body">
                            Leads
                          </h3>
                        </div>
                        <div className="icons d-flex">
                          <Link href={{ pathname: "/leads/newaddleads", query: { file } }}>
                            <btn
                              className="btn ml-2 p-0"
                              id="kt_notes_panel_toggle"
                              // onClick={(e) => onClickAddModalOpen(e)}
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
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 ">
                    <div className="card card-custom gutter-b bg-white border-0">
                      <div className="card-body">
                        <div>
                          <div className=" table-responsive-sm">
                            <MaterialTable
                              tableRef={tableRef}
                              icons={Object.assign(tableIcons, { SortArrow: forwardRef((props, ref) => sort == 'ASC' ? <ArrowUpward {...props} ref={ref} /> : <ArrowDownward {...props} ref={ref} />) })}

                              // icons={tableIcons}
                              title=""
                              columns={columns}
                              data={entries}
                              actions={[
                                {
                                  icon: () => <VisibilityOutlinedIcon />,
                                  tooltip: "View",
                                  onClick: (event, data) =>
                                    Viewhandler({
                                      e: event,
                                      d: data,
                                    }),
                                },
                                {
                                  icon: () => <Edit />,
                                  tooltip: "Edit",
                                  onClick: (event, data) =>
                                    Updatehandler({
                                      e: event,
                                      d: data,
                                    }),
                                },
                                
                                login_user_id == 1 ?
                                { 
                                  icon: () => <DeleteIcon />,
                                  tooltip: "Remove",
                                  onClick: (event, data) =>
                                    DeleteHandler(data),
                                    
                                } : null,
                              ]}
                              onSearchChange={(p) => onSearchHandler(p)}
                              isLoading={isLoading}
                              options={{
                                pageSize: limitPage,
                                pageSizeOptions: [5, 10, 15, 20],
                                actionsColumnIndex: -1,
                                exportButton: true,
                                sorting: true,
                                search: true,
                                paging: true,
                                debounceInterval: 1500,
                                headerStyle: {
                                  fontWeight: "bold",
                                },
                              }}
                              components={{
                                Pagination: (props) => (
                                  <TablePagination
                                    {...props}
                                    rowsPerPage={limitPage}
                                    count={total}
                                    page={page - 1}
                                    onChangePage={(p, pag) =>
                                      pageChangeHandler(pag)
                                    }
                                    onChangeRowsPerPage={(event) => {
                                      onChangeRowsPerPage(event);
                                      handleChangeRowPerPage(
                                        event.target.value
                                      );
                                    }}
                                  />
                                ),

                                OverlayLoading: (props) => (
                                  <div className="custom-loader">
                                    <div className="pre-loader">
                                      <img
                                        className="img-fluid"
                                        src="/images/loadergif.gif"
                                        alt="loading"
                                      />
                                    </div>
                                  </div>
                                ),
                                Container: (props) => (
                                  <Paper {...props} elevation={0} />
                                ),
                              }}
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
        {/* </div> */}
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
        {/* </div> */}
        {/*end::Wrapper*/}
        {/* </div> */}
        {/*end::Page*/}
        {/* </div> */}
        {/*end::Main*/}

        {/* <Switcher /> */}
        <div id="kt_notes_panel" className="offcanvas offcanvas-right kt-color-panel p-5">
          <div className="offcanvas-header d-flex align-items-center justify-content-between pb-3">
            <h4 className="font-size-h4 font-weight-bold m-0">
              {editUnit === true ? "Edit Unit" : "Add Unit"}
            </h4>
            <a
              href="#"
              onClick={(e) => onClickAddModalClose(e)}
              className="btn btn-sm btn-icon btn-light btn-hover-primary"
              id="kt_notes_panel_close"
            >
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 16 16"
                className="bi bi-x"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </a>
          </div>
          <form id="myform">
            <div className="row">
              <div className="col-12">
                <div className="border-dark p-3 mb-3">
                  <Tab.Container
                    activeKey={defaultLangauge}
                    onSelect={(k) => setDefaultLanguage(k)}
                  >
                    <Nav variant="pills" className="nav nav-pills mb-3">
                      {(language_list || [])
                        .sort(function (a, b) {
                          return b.is_default - a.is_default;
                        })
                        .map((item, index) => (
                          <Nav.Item className="nav-item mr-3">
                            <Nav.Link
                              eventKey={item.language_name}
                              className="nav-link btn-light bg-border  shadow-none"
                              key={index}
                            >
                              {item.language_name}
                            </Nav.Link>
                          </Nav.Item>
                        ))}

                    </Nav>
                    <Tab.Content>
                      {(language_list || [])
                        .sort(function (a, b) {
                          return b.is_default - a.is_default;
                        })
                        .map((item, index) => (
                          <Tab.Pane eventKey={item.language_name} key={index}>
                            <div className="form-group">
                              <label className="text-dark">
                                Name ({item.language_name})
                              </label>
                              <DelayInput
                                type="text"
                                className="form-control"
                                name={item.language_name}
                                value={
                                  single_unit.detail !== undefined
                                    ? single_unit.detail.filter(
                                      (i) => i.language.id === item.id
                                    )[0].name
                                    : ""
                                }
                                onChange={(e) => handleChange(e, item.id)}
                                onKeyDown={(e) => handleKeyDown(e, item.id)}
                                placeholder="title"
                              />
                              <p style={{ color: 'red' }} >{errorHandling.name}</p>
                              {/* <p style={{color: 'red'}} >{errorHandling.language_id}</p> */}


                            </div>

                          </Tab.Pane>
                        ))}
                    </Tab.Content>
                  </Tab.Container>
                </div>
                <div className="form-group">
                  <label className="text-dark" htmlFor="exampleInputEmail1">
                    Status
                  </label>

                  <select
                    className="arabic-select w-100 mb-3"
                    name="is_active"
                    onChange={(e) => onChangeUnitStatus(e)}
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option
                      value={1}
                      selected={unitStatus == "1" ? true : false}
                    >
                      Active
                    </option>
                    <option
                      value={0}
                      selected={unitStatus == "0" ? true : false}
                    >
                      Disable
                    </option>
                  </select>
                </div>

                <p className="errorText">{errorMsg}</p>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={
                editUnit === true
                  ? (e) => UnitUpdatehandler(e)
                  : (e) => AddUnitHandler(e)
              }
            >
              {editUnit === true
                ? requestLoader === true
                  ? "...Please wait"
                  : "Edit Unit"
                : requestLoader === true
                  ? "...Please wait"
                  : "Add Unit"}
            </button>
          </form>
        </div>



      </body>
    </Fragment>
  );
};

export default Leads;
