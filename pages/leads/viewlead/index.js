import React, { Fragment, useState, useEffect } from "react";
import MobileHeader from "../../../layouts/Header/MobileHeader";
import MainHeaderWithSidebar from "../../../layouts/Header/MainHeader";
import Head from "next/head";
import FixedHeader from "../../../layouts/Header/FixedHeader";
import Link from 'next/link';
import { useDispatch, useSelector } from "react-redux";
import {
    getHttp,
} from "../../../actions/config";
import cookie from 'js-cookie';
import { SERVER_URI } from "../../../components/utils/config";
import { useRouter } from "next/router";
import { Tab, Col, Row, Nav, Modal, Button, Table } from "react-bootstrap";

const ViewLead = (props) => {

    const dispatch = useDispatch();
    const { query } = useRouter();
    const login_user_id = cookie.get('userID')

    console.log("kiii::", query.lead_id)

    // states declaration
    const [fileIMG, setFileIMG] = useState();
    const [leadID, setLeadID] = useState();
    const [user, setUser] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [compaign, setCompaign] = useState();
    const [entries, setEntries] = useState([]);
    const [limitPage, setLimit] = useState(10);
    const [isLoading, setLoading] = useState(true);
    const [temp, settemp] = useState("");
    const [notesModalShow, setNotesModalShow] = useState(false);
    console.log("conleadid", query.lead_id)

    // Address States
    const [leadAddressState, setLeadAddressState] = useState([])
    const [leadAddressID, setLeadAddressID] = useState();

    // Meeting States
    const [meetings, setMeetings] = useState([]);

    // Document States
    const [document, setDocument] = useState([]);
    const [addDocumentShow, setAddDocumentShow] = useState(false);

    // active userDetails 
    const [activeUser, setActiveUser] = useState([]);


    // GET leads
    useEffect(() => {
        dispatch(
            getHttp(
                `${SERVER_URI}api/admin/leads/${query.lead_id}`
            )
        )
            .then((response) => {
                setCompaign(response.data.data.compaign);
                setEntries(response.data.data);
                setEndDate(response.data.data.end_date);
                setTotal(response.data.meta.total);
                setpage(response.data.meta.current_page);
            })
            .catch(function (error) {
            });
        setLoading(true);
    }, [
        limitPage,
    ]);

    // get leadAddress
    useEffect(() => {
        if (query.lead_id) {
            dispatch(
                getHttp(
                    `${SERVER_URI}api/admin/showleadAddress/${query.lead_id}?leadAddress=1`
                )
            )
                .then((response) => {
                    setLeadAddressID(response.data.data.lead_address[0].leadaddresss_id)
                    setLeadAddressState(response.data.data.lead_address)
                    setLoading(false);
                })
                .catch(function (error) {
                })
        }
        setLoading(true)
    }, [
        limitPage,
    ]);
    console.log("entries::", entries)
    // get meetings 
    useEffect(() => {
        console.log("useEfect")
        if (query.lead_id) {
            dispatch(
                getHttp(
                    `${SERVER_URI}api/admin/meeting/${query.lead_id}?meeting=1`
                )
            )
                .then((response) => {
                    setMeetings(response.data.data.meeting)
                    setLoading(false);
                })
                .catch(function (error) {
                });
        }
        setLoading(true);
    }, [
        limitPage,
        // removeProduct === true,
        // editSuccess === true,
        // addSuccess === true,
    ]);

    // get Documents 
    useEffect(() => {
        console.log("useEfect")
        if (query.lead_id) {
            dispatch(
                getHttp(
                    `${SERVER_URI}api/admin/document/${query.lead_id}?document=1`
                )
            )
                .then((response) => {
                    setDocument(response.data.data.document);
                    setLoading(false);
                })
                .catch(function (error) {
                });
        }
        setLoading(true);
    }, [
        limitPage
    ]);

    // get Active Users
    useEffect(() => {
        dispatch(
            getHttp(
                `${SERVER_URI}api/admin/getActiveUser?id=${query.lead_id}`
            )
        )
            .then((response) => {
                setActiveUser(response.data.data);
            })
            .catch(function (error) {
            });
        setLoading(true);
    }, [
        limitPage,
    ]);

    // get total users
    useEffect(() => {
        dispatch(
            getHttp(
                `${SERVER_URI}api/admin/user`
            )
        )
            .then((response) => {
                setUserInfo(response.data.data);
                setTotal(response.data.meta.total);
                setpage(response.data.meta.current_page);
                setLoading(false);
            })
            .catch(function (error) {
            });

    }, []);

    // get user id
    useEffect(() => {
        dispatch(
            getHttp(
                `${SERVER_URI}api/admin/user/${login_user_id}`
            )
        )
            .then((response) => {
                setUser(response.data.data.u_id);
                setTotal(response.data.meta.total);
                setpage(response.data.meta.current_page);
                setLoading(false);
            })
            .catch(function (error) {
            });

    }, []);

    // Notes Show Modal
    const NotesShow = (props) => {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className="border-0">
                    <Modal.Title id="contained-modal-title-vcenter" className="text-bold">
                        Meeting Notes
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="border-0">
                    <div className="container">
                        <div className="row">
                            <div className="col modal-text-expand" style={{ backgroundColor: "#f6f7f8" }}>
                                {props.meetingNotes}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <Button onClick={props.onHide} className="py-1 px-3">Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const IMGhandleChange = (event) => {
        setFileIMG(URL.createObjectURL(event.target.files[0]))
    }

    // this is end of end
    return (

        <Fragment>
            <Head>
                <meta charset="utf-8" />
                <title>Admin | Update Lead</title>
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
                                                    <Link href="/dashboard">Dashboard</Link> / <Link href="/leads">Leads</Link> / View Lead
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                                {/*end::Subheader*/}
                                {/*begin::Entry*/}
                                <div className="d-flex flex-column-fluid" style={{ padding: "30px 20px" }}>
                                    {/*begin::Container*/}
                                    <div className="container-fluid">
                                        <div className="row ">
                                            <form className="w-100">
                                                <div className="form-row bg-white justify-content-center">
                                                    <div className="row w-100 py-4 px-2">
                                                        <div className="col-lg-4 col-md-4 col-12 ">
                                                            <div className="row d-flex justify-content-center">
                                                                <div className="col-11">
                                                                    <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={(event) => IMGhandleChange(event)} />
                                                                </div>
                                                                <div className="col-md-11 col-12">


                                                                    <div className="avatar-upload mb-3">

                                                                        <div className="avatar-preview" style={{ height: "300px" }}>
                                                                            <div
                                                                                id="imagePreview"
                                                                                className="rounded"
                                                                            >
                                                                                <img src={entries.image} style={{ height: "300px", width: "inherit" }} className="img-fluid"></img>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row d-flex justify-content-center pt-4" >
                                                                <div className="col-11 ">
                                                                    <div className="bg-primary px-1 py-3 text-center" style={{ borderRadius: "20px" }}>
                                                                        <h5 className="text-white">Amount Required</h5>
                                                                        <h2 className="text-white text-bold">{entries.funds_needed}</h2>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-8 col-md-8 col-12">
                                                            <div className="row">
                                                                <div className="col">
                                                                    <h2 className="text-primary text-bold m-0">{entries.first_name} {entries.last_name}</h2>
                                                                    <h5 className="text-black">{entries.company}</h5>
                                                                </div>
                                                            </div>
                                                            <div className="row d-flex justify-content-between pt-5">
                                                                <div class="form-group col-md-3">
                                                                    <label for="LeadID" className="text-bold">Lead ID</label>
                                                                    <p>{entries.lead_id}</p>
                                                                </div>
                                                                <div class="form-group col-md-3">
                                                                    <label for="inputEmail4" className="text-bold">Lead Source</label>
                                                                    <p>{entries.lead_source}</p>
                                                                </div>
                                                                <div class="form-group col-md-3">
                                                                    <label for="inputEmail4" className="text-bold">Lead Status</label>
                                                                    <p>{entries.lead_status}</p>
                                                                </div>
                                                            </div>
                                                            <div className="row d-flex justify-content-between ">
                                                                <div class="form-group col-md-3">
                                                                    <label for="firstName" className="text-bold">First Name<span className="text-danger">*</span></label>
                                                                    {
                                                                        entries.first_name === undefined || entries.first_name === "" || entries.first_name == null || entries.first_name == "undefined" ?
                                                                            <p>NA</p>
                                                                            :
                                                                            <p>{entries.first_name}</p>
                                                                    }

                                                                </div>
                                                                <div class="form-group col-md-3">
                                                                    <label for="lastName" className="text-bold">Last Name</label>
                                                                    {
                                                                        entries.last_name === undefined || entries.last_name === "" || entries.last_name == null || entries.last_name == "undefined" ?
                                                                            <p>NA</p>
                                                                            :
                                                                            <p>{entries.last_name}</p>
                                                                    }

                                                                </div>
                                                                <div class="form-group col-md-3">
                                                                    <label for="leadOwner" className="text-bold">Lead Owner</label>
                                                                    {
                                                                        entries.owner === undefined || entries.owner === "" || entries.owner == null || entries.owner == "undefined" ?
                                                                            <p>NA</p>
                                                                            :
                                                                            <p>{entries.owner}</p>
                                                                    }

                                                                </div>
                                                            </div>
                                                            <div className="row d-flex justify-content-between ">
                                                                <div class="form-group col-md-3">
                                                                    <label for="website" className="text-bold">Website</label>
                                                                    {
                                                                        entries.website === undefined || entries.website === "" || entries.website == null || entries.website == "undefined" ?
                                                                            <p>NA</p>
                                                                            :
                                                                            <p>{entries.website}</p>
                                                                    }

                                                                </div>
                                                                <div class="form-group col-md-3">
                                                                    <label for="phoneBuisness" className="text-bold">Title<span className="text-danger">*</span></label>
                                                                    {
                                                                        entries.title === undefined || entries.title === "" || entries.title == null || entries.title == "undefined" ?
                                                                            <p>NA</p>
                                                                            :
                                                                            <p>{entries.title}</p>
                                                                    }

                                                                </div>
                                                                <div class="form-group col-md-3">
                                                                    <label for="email" className="text-bold">Email</label>
                                                                    {
                                                                        entries.email === undefined || entries.email === "" || entries.email == null || entries.email == "undefined" ?
                                                                            <p>NA</p>
                                                                            :
                                                                            <p>{entries.email}</p>
                                                                    }

                                                                </div>
                                                            </div>
                                                            <div className="row d-flex justify-content-between ">
                                                                <div class="form-group col-md-3">
                                                                    <label for="yearlyRevenue" className="text-bold">Yearly Revenue<span className="text-danger">*</span></label>
                                                                    {
                                                                        entries.YearlyRevenue === undefined || entries.YearlyRevenue === "" || entries.YearlyRevenue == null || entries.YearlyRevenue == "undefined" ?
                                                                            <p>NA</p>
                                                                            :
                                                                            <p>{entries.YearlyRevenue}</p>
                                                                    }


                                                                </div>
                                                                <div class="form-group col-md-3">
                                                                    <label for="fundsNeeded" className="text-bold">Funds Needed</label>
                                                                    {
                                                                        entries.funds_needed === undefined || entries.funds_needed === "" || entries.funds_needed == null || entries.funds_needed == "undefined" ?
                                                                            <p>NA</p>
                                                                            :
                                                                            <p>{entries.funds_needed}</p>
                                                                    }


                                                                </div>
                                                                <div class="form-group col-md-3">
                                                                    <label for="yearsinBuisness" className="text-bold">Years in Business</label>
                                                                    {
                                                                        entries.years_in_business === undefined || entries.years_in_business === "" || entries.years_in_business == null || entries.years_in_business == "undefined" ?
                                                                            <p>NA</p>
                                                                            :
                                                                            <p>{entries.years_in_business}</p>
                                                                    }


                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 col-md-12 col-12">
                                                            <div className="row d-flex justify-content-between pt-3">
                                                                <div className="col-12 col-md-4">
                                                                    <div className="px-3">
                                                                        <div className="row d-flex justify-content-between pt-3">
                                                                            <div class="form-group col-md-7 mb-0">
                                                                                <label for="phonePersonal" className="text-bold">Phone<span className="text-danger">*</span></label>
                                                                                {
                                                                                    entries.phone_personal === undefined || entries.phone_personal === "" || entries.phone_personal == null || entries.phone_personal == "undefined" ?
                                                                                        <p>NA</p>
                                                                                        :
                                                                                        <p>{entries.phone_personal}</p>
                                                                                }


                                                                            </div>
                                                                        </div>
                                                                        <div className="row d-flex justify-content-between pt-3">
                                                                            <div class="form-group col-md-7">
                                                                                <label for="source" className="text-bold">Source</label>
                                                                                {
                                                                                    entries.source === undefined || entries.source === "" || entries.source == null || entries.source == "undefined" ?
                                                                                        <p>NA</p>
                                                                                        :
                                                                                        <p>{entries.source}</p>
                                                                                }


                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-md-8">
                                                                    <div className="row d-flex justify-content-between pt-3">
                                                                        <div class="form-group col-md-3">
                                                                            <label for="phoneBuisness" className="text-bold">Work Phone</label>
                                                                            {
                                                                                entries.phone_business === undefined || entries.phone_business === "" || entries.phone_business == null || entries.phone_business == "undefined" ?
                                                                                    <p>NA</p>
                                                                                    :
                                                                                    <p>{entries.phone_business}</p>
                                                                            }

                                                                        </div>
                                                                        <div class="form-group col-md-3">
                                                                            <label for="phoneHome" className="text-bold">Phone Home</label>
                                                                            {
                                                                                entries.phone_home === undefined || entries.phone_home === "" || entries.phone_home == null || entries.phone_home == "undefined" ?
                                                                                    <p>NA</p>
                                                                                    :
                                                                                    <p>{entries.phone_home}</p>
                                                                            }

                                                                        </div>
                                                                        <div class="form-group col-md-3">
                                                                            <label for="phoneFax" className="text-bold">Phone Fax</label>
                                                                            {
                                                                                entries.phone_fax === undefined || entries.phone_fax === "" || entries.phone_fax == null || entries.phone_fax == "undefined" ?
                                                                                    <p>NA</p>
                                                                                    :
                                                                                    <p>{entries.phone_fax}</p>
                                                                            }

                                                                        </div>
                                                                    </div>
                                                                    <div className="row d-flex justify-content-between pt-3">
                                                                        <div class="form-group col-md-3">
                                                                            <label for="sourceCompany" className="text-bold">Source Company</label>
                                                                            {
                                                                                entries.source_company === undefined || entries.source_company === "" || entries.source_company == null || entries.source_company == "undefined" ?
                                                                                    <p>NA</p>
                                                                                    :
                                                                                    <p>{entries.source_company}</p>
                                                                            }

                                                                        </div>
                                                                        <div class="form-group col-md-3">
                                                                            <label for="sourceEmail" className="text-bold">Source Email</label>
                                                                            {
                                                                                entries.source_email === undefined || entries.source_email === "" || entries.source_email == null || entries.source_email == "undefined" ?
                                                                                    <p>NA</p>
                                                                                    :
                                                                                    <p>{entries.source_email}</p>
                                                                            }

                                                                        </div>
                                                                        <div class="form-group col-md-3">
                                                                            <label for="sourceContact" className="text-bold">Source Contact</label>
                                                                            {
                                                                                entries.source_contact === undefined || entries.source_contact === "" || entries.source_contact == null || entries.source_contact == "undefined" ?
                                                                                    <p>NA</p>
                                                                                    :
                                                                                    <p>{entries.source_contact}</p>
                                                                            }

                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                {/* // section2 AddressBook */}
                                <div className="d-flex flex-column-fluid" style={{ padding: "30px 20px" }}>
                                    {/*begin::Container*/}
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col bg-white p-4">
                                                <div className="row">
                                                    <div className="col d-flex justify-content-between align-items-end">
                                                        <h4 className="text-bold text-black">Address Book</h4>
                                                    </div>
                                                </div>
                                                <div className="row" style={{ height: "263px" }}>
                                                    <div className="col bg-white">
                                                        <div className="card-body">
                                                            {console.log("the uper tab", leadAddressID)}
                                                            {
                                                                leadAddressID ?

                                                                    <Tab.Container
                                                                        id="left-tabs-example"
                                                                        defaultActiveKey={leadAddressID}
                                                                    >
                                                                        <Row>
                                                                            <Col sm={3} className="pl-0 addressbook_tabs">
                                                                                <Nav variant="pills" className="flex-column">
                                                                                    <Nav.Item>
                                                                                        {
                                                                                            leadAddressState.map(leadAddress => (
                                                                                                <Nav.Link eventKey={leadAddress.leadaddresss_id}>
                                                                                                    {leadAddress.address_type_name}
                                                                                                </Nav.Link>
                                                                                            ))
                                                                                        }
                                                                                    </Nav.Item>
                                                                                </Nav>
                                                                            </Col>
                                                                            <Col sm={9}>
                                                                                <Tab.Content>
                                                                                    {
                                                                                        leadAddressState.map(leadAddress => (
                                                                                            <Tab.Pane eventKey={leadAddress.leadaddresss_id}>
                                                                                                <div className="container-fluid">
                                                                                                    <div className="row">
                                                                                                        <div className="col p-0">
                                                                                                            <div className="p-4" style={{ backgroundColor: "#f6f7f8" }}>
                                                                                                                <div className="row">
                                                                                                                    <div className="col-12 col-md-12 d-flex justify-content-between">
                                                                                                                        <h5 className="text-bold text-black">Permanent Address</h5>
                                                                                                                        {/* edit and delete */}
                                                                                                                        {/* <div><span><button className="btn" onClick={() => {
                                                                                                                            setupdateLeadAddressData(leadAddress)
                                                                                                                            setupdateAddressID(leadAddress.leadaddresss_id)
                                                                                                                            setAddressUpdateModal(true)
                                                                                                                        }} ><i class="fas fa-edit px-3"></i></button></span>
                                                                                                                            <UpdateAddress
                                                                                                                                id={updateAddressID}
                                                                                                                                data={updateLeadAddressData}
                                                                                                                                setData={setupdateLeadAddressData}
                                                                                                                                show={addressUpdateModal}
                                                                                                                                onHide={() => setAddressUpdateModal(false)}
                                                                                                                            />
                                                                                                                            <span><button className="btn" onClick={(event, data) =>
                                                                                                                                DeleteHandler(leadAddress)}><i class="fas fa-trash-alt"></i></button></span>
                                                                                                                        </div> */}
                                                                                                                    </div>
                                                                                                                    <div className="col-12 col-md-12 d-flex justify-content-between pt-4">
                                                                                                                        <p>Country</p>
                                                                                                                        <p>{leadAddress.country}</p>
                                                                                                                    </div>
                                                                                                                    <div className="col-12 col-md-12 d-flex justify-content-between">
                                                                                                                        <p>City</p>
                                                                                                                        <p>{leadAddress.city}</p>
                                                                                                                    </div>
                                                                                                                    <div className="col-12 col-md-12 d-flex justify-content-between">
                                                                                                                        <p>Zip Code</p>
                                                                                                                        <p>{leadAddress.zip}</p>
                                                                                                                    </div>
                                                                                                                    <div className="col-12 col-md-12 d-flex justify-content-between">
                                                                                                                        <p>Street 1</p>
                                                                                                                        <p>{leadAddress.street1}</p>
                                                                                                                    </div>
                                                                                                                    <div className="col-12 col-md-12 d-flex justify-content-between">
                                                                                                                        <p>Street 2</p>
                                                                                                                        <div className="col-3 p-0"><p>{leadAddress.street2}</p></div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </Tab.Pane>

                                                                                        ))
                                                                                    }
                                                                                </Tab.Content>
                                                                            </Col>
                                                                        </Row>
                                                                    </Tab.Container>
                                                                    : null}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* section3 Meeting Notes*/}
                                <div className="d-flex flex-column-fluid" style={{ padding: "30px 20px" }}>
                                    {/*begin::Container*/}
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col bg-white p-4">
                                                <div className="row">
                                                    <div className="col d-flex justify-content-between align-items-end">
                                                        <h4 className="text-bold text-black">Meeting Notes</h4>

                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col bg-white">
                                                        <div className="card-body px-0 " style={{ overflowX: "auto" }}>
                                                            <Table striped bordered hover>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Meeting ID</th>
                                                                        <th>User ID</th>
                                                                        <th>Date & Time</th>
                                                                        <th>Meeting Agenda</th>
                                                                        <th colSpan="2" className="text-center" style={{ width: "34%" }}>Notes</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        meetings.map((meeting, key) => (
                                                                            <tr>
                                                                                <td>{meeting.meeting_id}</td>
                                                                                <td>{meeting.user_id}</td>
                                                                                <td>{meeting.meeting_date} {meeting.meeting_time}</td>
                                                                                <td>{meeting.agenda}</td>
                                                                                <td><p className="text-expand">{meeting.meeting_notes}</p></td>
                                                                                <td><img src="/images/png/feather-eye.png" onClick={() => {
                                                                                    settemp(meeting.meeting_notes)
                                                                                    setNotesModalShow(true)
                                                                                }} />
                                                                                </td>
                                                                                {console.log(meeting.meeting_notes)}
                                                                                <NotesShow
                                                                                    key={key}
                                                                                    show={notesModalShow}
                                                                                    onHide={() => setNotesModalShow(false)}
                                                                                    meetingNotes={temp}
                                                                                />
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            </Table>


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* section4 document Details */}
                                <div className="d-flex flex-column-fluid" style={{ padding: "30px 20px" }}>
                                    {/*begin::Container*/}
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col bg-white p-4">
                                                <div className="row">
                                                    <div className="col d-flex justify-content-between align-items-end">
                                                        <h4 className="text-bold text-black">Document Notes</h4>

                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col bg-white">
                                                        <div className="card-body px-0" style={{ overflowX: "auto" }}>
                                                            <Table striped bordered hover>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Document ID</th>
                                                                        <th>User ID</th>
                                                                        <th>Lead ID</th>
                                                                        <th colSpan="2">Document Path</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        document.map((document, key) => (
                                                                            <tr>
                                                                                <td>{document.document_id}</td>
                                                                                <td>{document.user_id}</td>
                                                                                <td>{document.lead_id}</td>
                                                                                <td>{document.document_path}</td>
                                                                                <td><a href={SERVER_URI + document.document_path.split(",", 1)} target="_blank" download><img src="/images/png/download.png" height="22px" width="22px" /></a>
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            </Table>



                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* section6 Lead Assign History */}

                                {
                                    login_user_id == 1 ?
                                        <div className="d-flex flex-column-fluid" style={{ padding: "30px 20px" }}>
                                            {/*begin::Container*/}
                                            <div className="container-fluid">
                                                <div className="row">
                                                    <div className="col bg-white p-4">
                                                        <div className="row">
                                                            <div className="col d-flex justify-content-between align-items-end">
                                                                <h4 className="text-bold text-black">Lead Assign History</h4>

                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col bg-white">
                                                                <div className="card-body px-0" style={{ overflowX: "auto" }}>
                                                                    <Table striped bordered hover>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>ID Number</th>
                                                                                <th>Date & Time</th>
                                                                                <th>Assignee</th>
                                                                                <th>User ID</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                activeUser.map((activeUser, key) => (
                                                                                    <tr>
                                                                                        <td>{activeUser.lead_assignment_id}</td>
                                                                                        <td>{activeUser.created_at}</td>
                                                                                        <td>{activeUser.assignee}</td>
                                                                                        <td>{activeUser.user_id}</td>
                                                                                    </tr>
                                                                                ))
                                                                            }
                                                                        </tbody>
                                                                    </Table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </Fragment>
    );
}

export default ViewLead;
