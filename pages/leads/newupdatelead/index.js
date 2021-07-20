import React, { Fragment, useState, useEffect, useRef, forwardRef } from "react";
import MobileHeader from "../../../layouts/Header/MobileHeader";
import MainHeaderWithSidebar from "../../../layouts/Header/MainHeader";
import Head from "next/head";
import FixedHeader from "../../../layouts/Header/FixedHeader";
import Switcher from "../../../components/switcher";
import Link from 'next/link';
import Additems from '../../components/additem';
import { useDispatch, useSelector } from "react-redux";
import TagsInput from "react-tagsinput";
import {
    getHttp,
    putHttp2,
    postHttp,
    postHttp2,
    removeHttp,
    putHttp,
} from "../../../actions/config";
import cookie from 'js-cookie';
import { SERVER_URI } from "../../../components/utils/config";
import Swal from "sweetalert2";
import { useRouter, withRouter } from "next/router";
import { Tab, Col, Row, Nav, Modal, Button, Table, Form } from "react-bootstrap";
import { method } from "lodash";
import Edit from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const UpdateLeads = (props) => {
    const inputRef = useRef([]);
    const router = useRouter();
    const dispatch = useDispatch();
    const { query } = useRouter();
    const lead_id = query.lead_id;
    const login_user_id = cookie.get('userID')

    console.log("kiii::", query.lead_id)



    const icons = {
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteIcon {...props} ref={ref} />)
    }
    // Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />)



    // states declaration
    const [fullName, setFullName] = useState({
        firstName: "",
        middleName: "",
        lastName: ""
    });
    const [phone, setPhone] = useState({
        phoneBuisness: "",
        phonePersonal: "",
        phoneHome: "",
        phoneFax: ""
    });
    const [sourceDetails, setSourceDetails] = useState({
        source: "",
        sourceCompany: "",
        sourceContact: "",
        sourceEmail: ""
    });
    const [fileIMG, setFileIMG] = useState();
    const [leadID, setLeadID] = useState();
    const [user, setUser] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [addSuccess, setAddSuccess] = useState(false);
    const [requestLoader, setRequestLoader] = useState(false);
    const [company, setCompany] = useState();
    const [leadSource, setLeadSource] = useState();
    const [compaign, setCompaign] = useState({});
    const [entries, setEntries] = useState([]);
    const [limitPage, setLimit] = useState(10);
    const [isLoading, setLoading] = useState(true);
    const [temp, settemp] = useState("");
    const [assignedUserID, setAssignedUserID] = useState("");
    const [removeProduct, setRemoveProduct] = useState(false);
    const [street1, setStreet1] = useState();
    const [editSuccess, setEditSuccess] = useState(false);
    const handleShow = () => setAddDocumentShow(true);
    const [modalShow, setModalShow] = useState(false);
    const [notesModalShow, setNotesModalShow] = useState(false);
    const [errorState, setErrorState] = useState({
        compaign: '',
        // user_id: assignedUserID,
        yearlyRevenue: '',
        firstName: '',
        title: '',
        company: '',
        email: '',
        phonePersonal: '',
        street1: '',
        city: '',
        zip: '',
        country: '',
        address_type_name: "",
        admin: "",
        status: "",
        user_id: '',
        source: ''

    })

    // Address States
    const [updateAddressID, setupdateAddressID] = useState();
    const [addressUpdateModal, setAddressUpdateModal] = useState(false);
    const [leadAddressState, setLeadAddressState] = useState([])
    const [leadAddressID, setLeadAddressID] = useState();
    const [campaigns, setCampaigns] = useState([]);
    const [updateLeadAddressData, setupdateLeadAddressData] = useState({});
    const [addressDetails, setAddressDetails] = useState({
        address_type_name: "",
        city: "",
        country: "",
        street1: "",
        street2: "",
        zip: ""
    });

    // Meeting States
    const [meetings, setMeetings] = useState([]);
    const [agenda, setAgenda] = useState();
    const [meetingDate, setMeetingDate] = useState();
    const [meetingTime, setMeetingTime] = useState();
    const [meetingNotes, setMeetingNotes] = useState();
    const [meetingModalShow, setMeetingModalShow] = useState(false);

    // Document States
    const [documentModalShow, setDocumentModalShow] = useState(false);
    const [document, setDocument] = useState([]);
    const [addDocumentShow, setAddDocumentShow] = useState(false);
    const handleClose = () => {
        // setDocumentFile([])
        // setDocumentImages([])
        // setTags([])
        setAddDocumentShow(false)
    };


    // active userDetails 
    const [activeUser, setActiveUser] = useState([]);
    // Image Handler States
    const [images, setImages] = useState([]);
    const [file, setFile] = useState();
    const [url, setUrl] = useState();
    const [imageChange, setImageChange] = useState(0);

    // GET a lead
    useEffect(() => {
        dispatch(
            getHttp(
                `${SERVER_URI}api/admin/leads/${query.lead_id}`
            )
        )
            .then((response) => {
                setCompaign(response.data.data.compaign);
                setEntries(response.data.data);
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
                    setDocument(response.data.data.document)
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

    const [com, setCom] = useState();

    // get Active Users
    useEffect(() => {
        dispatch(
            getHttp(
                `${SERVER_URI}api/admin/leadHistory/${query.lead_id}?lead_assignment=1`
            )
        )
            .then((response) => {
                setActiveUser(response.data.data.lead_assignment);
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

    // set image method
    const onSelectImage = (e) => {

        setImageChange(1);
        console.log("imageChange", imageChange)
        // alert("inside it");
        if (e.target.files.length !== 0) {
            setEntries((prevValue) => {
                return {
                    ...prevValue,
                    image: e.target.files
                }
            })
            setImages(e.target.files);
            setUrl(e.target.files[0].name);
            setFile(URL.createObjectURL(e.target.files[0]));
        }

    };

    // method implimentation
    const lastNameEvent = (obj) => {
        setEntries((prevValue) => {
            return {
                ...prevValue,
                last_name: obj.target.value
            }
        })
        console.log("lastname:", entries.last_name)
        console.log("onchange", entries.first_name)
    }
    const firstNameEvent = (obj) => {
        setEntries((prevValue) => {
            return {
                ...prevValue,
                first_name: obj.target.value
            }
        })
        console.log("lastname:", entries.last_name)
        console.log("onchange", entries.first_name)
    }
    const setOwnerEvent = (obj) => {
        setEntries((prevValue) => {
            return {
                ...prevValue,
                owner: obj.target.value
            }
        })
    }
    const setWebsiteValue = (obj) => {
        setEntries((prevValue) => {
            return {
                ...prevValue,
                website: obj.target.value
            }
        })
    }
    const setEmailValue = (obj) => {
        setEntries((prevValue) => {
            return {
                ...prevValue,
                email: obj.target.value
            }
        })
        setErrorState((prevValue) => {
            return {
                ...prevValue,
                email: "",
            }
        })

    }
    const setTitleEvent = (obj) => {
        setEntries((prevValue) => {
            return {
                ...prevValue,
                title: obj.target.value
            }
        })
        setErrorState((prevValue) => {
            return {
                ...prevValue,
                title: "",
            }
        })

    }
    const yearlyRevenueEvent = (obj) => {
        setEntries((prevValue) => {
            return {
                ...prevValue,
                YearlyRevenue: obj.target.value
            }
        })
        setErrorState((prevValue) => {
            return {
                ...prevValue,
                yearlyRevenue: "",
            }
        })

    }
    const fundsNeededEvent = (obj) => {
        setEntries((prevValue) => {
            return {
                ...prevValue,
                funds_needed: obj.target.value
            }
        })

    }
    const yearsInBusinessEvent = (obj) => {
        setEntries((prevValue) => {
            return {
                ...prevValue,
                years_in_business: obj.target.value
            }
        })

    }
    const personalPhoneEvent = (obj) => {
        setEntries((prevValue) => {
            return {
                ...prevValue,
                phone_personal: obj.target.value
            }
        })
        console.log("lastname:", entries.last_name)
        console.log("onchange", entries.first_name)
    }
    const businessPhoneEvent = (obj) => {
        setEntries((prevValue) => {
            return {
                ...prevValue,
                phone_business: obj.target.value
            }
        })
        console.log("lastname:", entries.last_name)
        console.log("onchange", entries.first_name)
    }
    const homePhoneEvent = (obj) => {
        setEntries((prevValue) => {
            return {
                ...prevValue,
                phone_home: obj.target.value
            }
        })
        console.log("lastname:", entries.last_name)
        console.log("onchange", entries.first_name)
    }
    const faxPhoneEvent = (obj) => {
        setEntries((prevValue) => {
            return {
                ...prevValue,
                phone_fax: obj.target.value
            }
        })
        console.log("lastname:", entries.last_name)
        console.log("onchange", entries.first_name)
    }
    const setStatusHandler = (obj) => {
        setEntries((prevValue) => {
            return {
                ...prevValue,
                lead_status: obj.target.value
            }
        })
        setErrorState((prevValue) => {
            return {
                ...prevValue,
                status: "",
            }
        })
        console.log("lastname:", entries.last_name)
        console.log("onchange", entries.first_name)
    }
    const sourceCompanyEvent = (obj) => {
        setEntries((prevValue) => {
            return {
                ...prevValue,
                source_company: obj.target.value
            }
        })
        console.log("lastname:", entries.last_name)
        console.log("onchange", entries.first_name)
    }
    const sourceContactEvent = (obj) => {
        setEntries((prevValue) => {
            return {
                ...prevValue,
                source_contact: obj.target.value
            }
        })
        console.log("lastname:", entries.last_name)
        console.log("onchange", entries.first_name)
    }
    const sourceEvent = (obj) => {
        setEntries((prevValue) => {
            return {
                ...prevValue,
                source: obj.target.value
            }
        })
    }
    const sourceEmailEvent = (obj) => {
        setEntries((prevValue) => {
            return {
                ...prevValue,
                source_email: obj.target.value
            }
        })
        console.log("sourceEmail:", entries.source_email)
    }

    // not used methods 

    // const leadSourceEvent = (obj) => {
    //     setEntries((prevValue) => {
    //         return {
    //             ...prevValue,
    //             lead_source: obj.target.value
    //         }
    //     })
    // }
    // const editstreet = (obj) => {
    //     setStreet1(obj.target.value);
    // }
    // const setCompanyValue = (obj) => {
    //     setCompany(obj.target.value);
    // }

    const setUserInfoEvent = (obj) => {
        setAssignedUserID(obj.target.value);
        console.log("edited", assignedUserID)
        setErrorState((prevValue) => {
            return {
                ...prevValue,
                user_id: "",
            }
        })
    }
    const setCompaignEvent = (obj) => {
        setCompaign(obj.target.value);

    }


    // meeting methods commented  

    // const setNotesEvent = (obj) => {
    //     setMeetingNotes(obj.target.value);
    //     console.log("the note::::", note)
    // }
    // const setMeetingTimeEvent = (obj) => {
    //     setMeetingTime(obj.target.value);
    // }
    // const setMeetingDateEvent = (obj) => {
    //     setMeetingDate(obj.target.value);
    // }
    // const setAgendaEvent = (obj) => {
    //     setAgenda(obj.target.value);
    // }
    
    const companyEvent = (obj) => {
        setEntries((prevValue) => {
            return {
                ...prevValue,
                company: obj.target.value
            }
        })
    }

    // update handler  
    const UpdateFieldHandler = (e) => {
        e.preventDefault();
        console.log("updated section working properly")
        setAddSuccess(false);
        setRequestLoader(true);
        console.log("check top entries:::", entries.phone_personal)

        if (entries.lead_status === undefined || entries.lead_status === '' || entries.lead_status === null) {
            console.log("lead status", entries.lead_status)
            setErrorState((prevState) => ({ ...prevState, status: "please enter status" }));
        } else if (entries.first_name === undefined || entries.first_name === '' || entries.first_name === null) {
            console.log("first name", entries.first_name)
            setErrorState((prevState) => ({ ...prevState, firstName: "please enter First Name" }));

        } else if (entries.email === undefined || entries.email === '' || entries.email === null) {
            console.log("email", entries.email)
            setErrorState((prevState) => ({ ...prevState, email: "please enter email!" }));

        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(entries.email)) {
            console.log("email chichumichu", entries.email)
            setErrorState((prevState) => ({ ...prevState, email: "please enter valid email!" }));

        } else if (entries.phone_personal === undefined || entries.phone_personal === '' || entries.phone_personal === null) {
            console.log("personal phune", entries.phone_personal)
            setErrorState((prevState) => ({ ...prevState, phonePersonal: "please enter phone" }));

        } else {

            const formData = new FormData();
            console.log("imageChange", entries.image[0])
            // alert(imageChange);
            if (imageChange === 1) {
                formData.append("file", entries.image[0]);
                setImageChange(0);
            } else {
                // formData.append("file", entries.image);
                setImageChange(0);
            }
            formData.append("years_in_business", entries.years_in_business);
            formData.append("yearly_revenue", entries.YearlyRevenue);
            formData.append("first_name", entries.first_name);
            formData.append("middle_name", entries.middle_name);
            formData.append("last_name", entries.last_name);
            formData.append("title", entries.title);
            formData.append("company", entries.company);
            formData.append("email", entries.email);
            formData.append("owner", entries.owner);
            formData.append("source", entries.source);
            formData.append("lead_source", entries.lead_source);
            formData.append("phone_business", entries.phone_business);
            formData.append("phone_personal", entries.phone_personal);
            formData.append("phone_home", entries.phone_home);
            formData.append("phone_fax", entries.phone_fax);
            formData.append("website", entries.website);
            formData.append("source_company", entries.source_company);
            formData.append("source_contact", entries.source_contact);
            formData.append("source_email", entries.source_email);
            formData.append("funds_needed", entries.funds_needed);
            formData.append("status", entries.lead_status);
            formData.append("_method", "PUT");
            formData.append("compaign_id", compaign.id);
            const body = formData;
            console.log("body ::", body)

            dispatch(postHttp(`${SERVER_URI}api/admin/leadUpdate/${entries.lead_id}`, body))
                .then((res) => {
                    if (res.data.status === "Success") {
                        // router.push("/leads");
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
                        dispatch(
                            getHttp(
                                `${SERVER_URI}api/admin/leads/${query.lead_id}`
                            )
                        )
                            .then((response) => {
                                setCompaign(response.data.data.compaign);
                                setEntries(response.data.data);
                            })

                    }
                    else {
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: res.data.message,
                            showConfirmButton: false,
                            timer: 1500,
                        });

                    }
                })
                .catch((err) => {
                    console.log("error;:", err)
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "The given data was invalid.",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setRequestLoader(false);
                });
        }

        console.log('console-----', errorState)
    };

    // onDelete Handler
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
                dispatch(removeHttp(`${SERVER_URI}api/admin/destroyleadAddress/${data.leadaddresss_id}`))
                    .then((res) => {
                        if (res.data.status === "Success") {
                            Swal.fire("Deleted!", "Your file has been deleted.", "success");
                            setLeadAddressID("");
                            dispatch(
                                getHttp(
                                    `${SERVER_URI}api/admin/showleadAddress/${entries.lead_id}?leadAddress=1`
                                )
                            )
                                .then((response) => {
                                    setLeadAddressID(response.data.data.lead_address[0].leadaddresss_id)
                                    setLeadAddressState(response.data.data.lead_address)
                                    setLoading(false);
                                })
                                .catch(function (error) {
                                });
                            setRemoveProduct(true);
                            setLoading(false);
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
                //   setLoading(true);
            }
        });
    };

    // const onAddAddtionalCounter = (e) => {
    //     e.preventDefault();
    //     setCounter((pre) => [...pre, "abc"])
    // }
    // const onDelAddtionalCounter = (e, index) => {
    //     e.preventDefault();
    //     const arr = counter.filter((i, ind) => ind !== index)
    //     setCounter(arr)
    // }

    // Add Address Modal
    const AddAddress = (props) => {

        const [addressDetails, setAddressDetails] = useState({
            address_type_name: "",
            city: "",
            country: "",
            street1: "",
            street2: "",
            zip: ""
        });
        const addressChangeEvent = (e) => {
            const { name, value } = e.target;
            setAddressDetails({
                ...addressDetails,
                [e.target.name]: e.target.value
            });
        }
        console.log("leadID comming IN", entries.lead_id)
        // Add Address 
        const AddAddressHandler = (e) => {
            e.preventDefault();
            setModalShow(false);
            setAddSuccess(false);
            setRequestLoader(true);

            const body = {
                street1: addressDetails.street1,
                street2: addressDetails.street2,
                city: addressDetails.city,
                country: addressDetails.country,
                zip: addressDetails.zip,
                address_type_name: addressDetails.address_type_name,
                is_default: "1",
            }
            dispatch(postHttp2(`${SERVER_URI}api/admin/storeleadAddress?lead_id=${entries.lead_id}`, body))
                .then((res) => {
                    if (res.data.status === "Success") {
                        setModalShow(false);
                        setRequestLoader(false);
                        setLeadAddressID("");
                        // onClickAddModalClose(e);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: res.data.message,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        // get lead address
                        dispatch(
                            getHttp(
                                `${SERVER_URI}api/admin/showleadAddress/${entries.lead_id}?leadAddress=1`
                            )
                        )
                            .then((response) => {
                                setLeadAddressID(response.data.data.lead_address[0].leadaddresss_id)
                                setLeadAddressState(response.data.data.lead_address)
                                setLoading(false);
                            })
                            .catch(function (error) {
                            });

                        setAddSuccess(true);
                        // var intervalId = setInterval(this.timer, 100);
                        // setInterval(intervalId);
                        // clearInterval(interval);
                        // router.push("/leads");
                    }
                    // else {
                    //     // error handling
                    //     let arr = [];
                    //     let dat = res.data.data.errors
                    //     arr = Object.keys(res.data.data.errors);
                    //     for (let i = 0; i < arr.length; i++) {
                    //         setErrorHandling((prevState) => ({ ...prevState, [arr[i]]: dat[arr[i]] }));
                    //     }
                    //     Swal.fire({
                    //         position: "top-end",
                    //         icon: "error",
                    //         title: res.data.message,
                    //         showConfirmButton: false,
                    //         timer: 1500,
                    //     });
                    //     setRequestLoader(false);
                    // }
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
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-titl e-vcenter"
                centered
            >
                <Modal.Header closeButton className="border-0">
                    <Modal.Title id="contained-modal-title-vcenter" className="text-bold">
                        Add a New Address
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="border-0">
                    <Form>
                        <Form.Group >
                            <Form.Label>Address Title</Form.Label>
                            <Form.Control type='' onChange={(e) => addressChangeEvent(e)} value={addressDetails.address_type_name} name="address_type_name" placeholder="Enter Address Title" />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" onChange={(e) => addressChangeEvent(e)} value={addressDetails.city} name="city" placeholder="Enter City" />
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Label>Country</Form.Label>
                                <Form.Control type="text" onChange={(e) => addressChangeEvent(e)} value={addressDetails.country} name="country" placeholder="Enter Country" />
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control type="text" onChange={(e) => addressChangeEvent(e)} value={addressDetails.zip} name="zip" placeholder="Zip Code Input" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group >
                            <Form.Label>Street Address 1</Form.Label>
                            <Form.Control type='' onChange={(e) => addressChangeEvent(e)} value={addressDetails.street1} name="street1" placeholder="Street1 Address input" />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Street Address 2</Form.Label>
                            <Form.Control type='' onChange={(e) => addressChangeEvent(e)} value={addressDetails.street2} name="street2" placeholder="Street2 Address input" />
                        </Form.Group>
                    </Form>




                    {/* <div className="container">
                        <div className="row">
                            <form className="w-100">
                                <div className="row">
                                    <div class="form-group col-md-12">
                                        <label for="firstName" className="text-bold">Address Title{props.check}<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" onChange={(e) => addressChangeEvent(e)} value={props.addressDetails.address_type_name ? props.addressDetails.address_type_name : ''} name="firstName" placeholder="Enter Address Title" />
                                        <p style={{ color: 'red' }}>{errorState.firstName}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div class="form-group col-md-4">
                                        <label for="firstName" className="text-bold">City</label>
                                        <input type="text" className="form-control" onChange={(e) => addressChangeEvent(e)} value={props.addressDetails.city} id={props.addressDetails.city} name="city" autoFocus placeholder="Enter City" />
                                        <p style={{ color: 'red' }}>{errorState.firstName}</p>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="lastName" className="text-bold">Country</label>
                                        <input type="text" className="form-control" onChange={(e) => addressChangeEvent(e)} value={props.addressDetails.country} name="country" placeholder="Enter Country" />
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="leadOwner" className="text-bold">Zip Code</label>
                                        <input className="lead-input" type="text" onChange={(e) => addressChangeEvent(e)} value={props.addressDetails.zip} name="zip" className="form-control" placeholder="Enter Zip" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div class="form-group col-md-12">
                                        <label for="firstName" className="text-bold">Street Address 1<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" onChange={(e) => { setStreet1(e.target.value) }} value={street1} name="street1" placeholder="Enter First Street 1" />
                                        <p style={{ color: 'red' }}>{errorState.firstName}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div class="form-group col-md-12">
                                        <label for="firstName" className="text-bold">Street Address 2<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" onChange={(e) => addressChangeEvent(e)} value={props.addressDetails.street2} name="street2" placeholder="Enter Street 2" />
                                        <p style={{ color: 'red' }}>{errorState.firstName}</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div> */}
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <Button onClick={(e) => AddAddressHandler(e)} className="py-1 px-3">Add Address</Button>
                    <Button onClick={props.onHide} className="py-1 px-3">Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    // Add Meeting Modal
    const AddMeetingModal = (props) => {

        const [meetingDetails, setMeetingDetails] = useState({
            agenda: "",
            meetingDate: "",
            meetingTime: "",
            meetingNotes: ""
        })

        const meetingChangeEvent = (e) => {
            const { name, value } = e.target;
            setMeetingDetails({
                ...meetingDetails,
                [e.target.name]: e.target.value
            });
            console.log("seen21", value)
        }

        // posting the meeting data to database 
        const AddMeetingHandler = (e) => {
            e.preventDefault();
            setMeetingModalShow(false);
            setAddSuccess(false);
            setRequestLoader(true);

            const body = {
                agenda: meetingDetails.agenda,
                meeting_date: meetingDetails.meetingDate,
                meeting_time: meetingDetails.meetingTime,
                meeting_notes: meetingDetails.meetingNotes,
            }

            dispatch(postHttp2(`${SERVER_URI}api/admin/meetings?lead_id=${entries.lead_id}`, body))
                .then((res) => {
                    if (res.data.status === "Success") {
                        setRequestLoader(false);
                        // onClickAddModalClose(e);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: res.data.message,
                            showConfirmButton: false,
                            timer: 1500,
                        });

                        setAddSuccess(true);
                        dispatch(
                            getHttp(
                                `${SERVER_URI}api/admin/meeting/${entries.lead_id}?meeting=1`
                            )
                        )
                            .then((response) => {
                                setMeetings(response.data.data.meeting)
                                setLoading(false);
                            })
                            .catch(function (error) {
                            });
                    }

                })
                .catch((err) => {
                    setRequestLoader(false);
                });
        };

        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className="border-0">
                    <Modal.Title id="contained-modal-title-vcenter" className="text-bold">
                        Add a New Meeting
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="border-0">

                    <Form>
                        <Form.Group>
                            <Form.Label>Meeting Agenda</Form.Label>
                            <Form.Control type='' onChange={(e) => meetingChangeEvent(e)} value={meetingDetails.agenda} name="agenda" placeholder="Enter Meeting Agenda" />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>Select Date</Form.Label>
                                <Form.Control type="date" onChange={(e) => meetingChangeEvent(e)} value={meetingDetails.meetingDate} name="meetingDate" placeholder="Date" />
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Label>Select Time</Form.Label>
                                <Form.Control type="time" onChange={(e) => meetingChangeEvent(e)} value={meetingDetails.meetingTime} name="meetingTime" placeholder="Enter Time" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group >
                            <Form.Label>Meeting Notes</Form.Label>
                            <Form.Control as="textarea" rows={5} value={meetingDetails.meetingNotes} onChange={(e) => meetingChangeEvent(e)} name="meetingNotes" placeholder="Meeting Notes . . ." />
                        </Form.Group>
                    </Form>

                    {/* <div className="container">
                        <div className="row">
                            <form className="w-100">
                                <div className="row">
                                    <div class="form-group col-md-12">
                                        <label for="firstName" className="text-bold">Meeting Agenda<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" onChange={(e) => setAgendaEvent(e)} value={agenda} name="agenda" placeholder="Enter Meeting Agenda" />
                                        <p style={{ color: 'red' }}>{errorState.firstName}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div class="form-group col-md-6">
                                        <label for="firstName" className="text-bold">Select Date</label>
                                        <input type="date" className="form-control" onChange={(e) => setMeetingDateEvent(e)} value={meetingDate} name="meetingDate" placeholder="" />
                                        <p style={{ color: 'red' }}>{errorState.firstName}</p>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="lastName" className="text-bold">Select Time</label>
                                        <input type="time" className="form-control" onChange={(e) => setMeetingTimeEvent(e)} value={meetingTime} name="meetingTime" placeholder="" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div class="form-group col-md-12">
                                        <label for="firstName" className="text-bold">Meeting Notes<span className="text-danger">*</span></label>
                                        <textarea className="form-control" value={meetingNotes} onChange={(e) => setNotesEvent(e)} name="notes" placeholder="Enter Meeting Notes"></textarea>
                                        <p style={{ color: 'red' }}>{errorState.note}</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div> */}
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <Button onClick={(e) => AddMeetingHandler(e)} className="py-1 px-3">Add Meeting</Button>
                    <Button onClick={props.onHide} className="py-1 px-3">Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    // Add Document Modal
    const AddDocumentModal = (props) => {

        const [documentFile, setDocumentFile] = useState([]);
        const [documentImages, setDocumentImages] = useState([]);
        const [documentText, setDocumentText] = useState();
        const [addDocumentShow, setAddDocumentShow] = useState(false);
        const handleShow = () => setAddDocumentShow(true);
        const [tags, setTags] = useState([]);
        const [uploadComplete, setUploadComplete] = useState(false)
        const [load, setLoad] = useState();

        const OnSubmitDocument = (e) => {

            let data = new FormData();
            e.preventDefault();
            setLoad(false);
            if (documentImages.length > 0) {
                setUploadComplete(true)
                for (var i = 0; i < documentImages.length; i++) {
                    data.append('document_path[' + i + ']', documentImages[i][0]);
                }
                dispatch(postHttp(`${SERVER_URI}api/admin/document?lead_id=${query.lead_id}`, data))
                    .then((res) => {
                        console.log("res", res);
                        if (res.data.status === "Success") {
                            // if (i === (images.length - 1)) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: "Document saved successfully! ",
                                showConfirmButton: false,
                                timer: 1500
                            })
                            handleClose()
                            setUploadComplete(false)
                            setDocumentFile([])
                            setDocumentImages([])
                            setLoad(true)
                            setTags([])
                            dispatch(
                                getHttp(
                                    `${SERVER_URI}api/admin/document/${query.lead_id}?document=1`
                                )
                            )
                                .then((response) => {
                                    setDocument(response.data.data.document)
                                    setLoading(false);
                                })
                                .catch(function (error) {
                                });
                            // }

                        } else {
                            setUploadComplete(false)
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: res.data.message,
                                showConfirmButton: false,
                                timer: 1500
                            })
                            setLoad(false)
                        }
                    })
                    .catch((err) => console.log("err", err));
            }
        };

        const onSelectDocument = (e) => {

            let fileObj = [];
            let fileArray = [];

            fileObj.push(e.target.files)
            console.log(fileObj)
            for (let i = 0; i < fileObj[0].length; i++) {
                fileArray.push(URL.createObjectURL(fileObj[0][i]))
            }

            setDocumentFile(oldArray => [...oldArray.concat(fileArray)]);
            setDocumentImages([...documentImages, e.target.files]);
            setDocumentText(documentText + 1)
        };

        // delete 
        const onDeleteSelecDocument = (url) => {
            let arr = [];
            for (var i = 0; i < documentFile.length; i++) {
                arr = documentFile;
                if (arr[i] === url) {
                    arr.splice(i, 1);
                    i--;
                }
            }
            setDocumentFile(arr)
            setDocumentText(documentText + 1)
        }

        return (
            < Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        <h3
                            className="modal-title"
                            id="myModalLabel1"
                        >
                            Add New Documents Here
                        </h3>
                    </Modal.Title>
                    <button
                        type="button"
                        onClick={() => handleClose()}
                        className="close rounded-pill btn btn-sm btn-icon btn-light btn-hover-primary m-0"
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
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Click or Drop Documents in the Box for Upload.
                    </p>
                    <div className="avatar-upload mb-3">
                        <div className="avatar-edit">
                            <input
                                type="file"
                                id="documentUpload"
                                name="documentImages"
                                onChange={(e) => onSelectDocument(e)}
                                multiple="multiple"
                                accept=""
                            />
                            <label htmlFor="documentUpload">
                                Upload Documents
                            </label>
                        </div>
                        <div className="avatar-preview">
                            <div
                                id="imagePreview"
                                className="rounded"
                                style={{
                                    backgroundImage:
                                        "url(/images/carousel/slide3.jpg )",
                                }}
                            ></div>
                        </div>
                    </div>
                    <div className="form-group multi-preview" >

                        {(documentFile || []).map(documentFile => (
                            <>
                                <div>{documentFile}</div>
                                {/* <img src={documentFile} alt="..." style={{ height: '50px', width: '50px', marginRight: '5px' }} onClick={() => onDeleteSelecDocument(url)} /> */}
                            </>
                        ))}
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        onClick={() => handleClose()}
                        className="btn btn-light"
                        data-dismiss="modal"
                    >
                        <span className>Close</span>
                    </button>
                    <button
                        type="button"
                        onClick={(e) => OnSubmitDocument(e)}
                        className="btn btn-primary ml-1"
                        data-dismiss="modal"
                    >
                        <span className>{uploadComplete ? '...Uploading' : 'Submit'}</span>
                    </button>
                </Modal.Footer>
            </Modal >

        );
    }

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

    // Update Address Modal
    const UpdateAddress = (props) => {

        const [leadAddress, setLeadAddress] = useState({
            city: props.data.city,
            country: props.data.country,
            zip: props.data.zip,
            street1: props.data.street1,
            street2: props.data.street2,
            address_type_name: props.data.address_type_name,
        });


        const updateAddressEvent = (event) => {
            const { name, value } = event.target;
            setLeadAddress({
                ...leadAddress,
                [name]: value
            })

        }

        // update Address Hanler
        const UpdateAddressHandler = (e) => {

            e.preventDefault();
            setAddressUpdateModal(false);
            setAddSuccess(false);
            setRequestLoader(true);
            const body = {
                street1: leadAddress.street1,
                country: leadAddress.country,
                city: leadAddress.city,
                zip: leadAddress.zip,
                street2: leadAddress.street2,
                address_type_name: leadAddress.address_type_name,
                is_default: "1",
            }

            dispatch(putHttp(`${SERVER_URI}api/admin/updateleadAddress?address_id=${props.data.leadaddresss_id}`, body))
                .then((res) => {
                    if (res.data.status === "Success") {

                        setRequestLoader(false);

                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: res.data.message,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        dispatch(
                            getHttp(
                                `${SERVER_URI}api/admin/showleadAddress/${entries.lead_id}?leadAddress=1`
                            )
                        )
                            .then((response) => {
                                setLeadAddressID(response.data.data.lead_address[0].leadaddresss_id)
                                setLeadAddressState(response.data.data.lead_address)
                                setLoading(false);
                            })
                            .catch(function (error) {
                            });
                        setEditSuccess(true);
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
                    console.log(err);
                    setRequestLoader(false);
                });
        };

        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className="border-0">
                    <Modal.Title id="contained-modal-title-vcenter" className="text-bold">
                        Update Address
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="border-0">
                    <div className="container">
                        <div className="row">
                            <form className="w-100">
                                <div className="row">
                                    <div class="form-group col-md-12">
                                        <label for="firstName" className="text-bold">Address Title {props.data.country}<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" onChange={(e) => updateAddressEvent(e)} value={leadAddress.address_type_name} name="address_type_name" placeholder="Enter First Name" />
                                        {/* <p style={{ color: 'red' }}>{errorState.firstName}</p> */}
                                    </div>
                                </div>
                                <div className="row">
                                    <div class="form-group col-md-4">
                                        <label for="firstName" className="text-bold">City</label>
                                        <input type="text" className="form-control" onChange={(e) => updateAddressEvent(e)} value={leadAddress.city} name="city" placeholder="Enter First Name" />
                                        {/* <p style={{ color: 'red' }}>{errorState.firstName}</p> */}
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="lastName" className="text-bold">Country</label>
                                        <input type="text" className="form-control" onChange={(e) => updateAddressEvent(e)} value={leadAddress.country} name="country" placeholder="Enter Last Name" />
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="leadOwner" className="text-bold">Zip Code</label>
                                        <input className="lead-input" type="text" onChange={(e) => updateAddressEvent(e)} value={leadAddress.zip} name="zip" className="form-control" placeholder="Enter Owner" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div class="form-group col-md-12">
                                        <label for="firstName" className="text-bold">Street Address 1<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" onChange={(e) => updateAddressEvent(e)} value={leadAddress.street1} name="street1" placeholder="Enter First Name" />
                                        {/* <p style={{ color: 'red' }}>{errorState.firstName}</p> */}
                                    </div>
                                </div>
                                <div className="row">
                                    <div class="form-group col-md-12">
                                        <label for="firstName" className="text-bold">Street Address 2<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" onChange={(e) => updateAddressEvent(e)} value={leadAddress.street2} name="street2" placeholder="Enter First Name" />
                                        {/* <p style={{ color: 'red' }}>{errorState.firstName}</p> */}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <Button onClick={(e) => UpdateAddressHandler(e)} className="py-1 px-3">Update</Button>
                    <Button onClick={props.onHide} className="py-1 px-3">Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    // assigning/updating the user  
    const updateAssignTo = () => {

        if (assignedUserID === undefined || assignedUserID === '' || assignedUserID === null) {
            console.log("assignuser", assignedUserID)
            setErrorState((prevState) => ({ ...prevState, user_id: "please enter user ID" }));
        } else {
            dispatch(postHttp(`${SERVER_URI}api/admin/updateDefaultUserLead?lead_id=${entries.lead_id}&user_id=${assignedUserID}`))
                .then((res) => {
                    if (res.data.status === "Success") {
                        setRequestLoader(false);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: res.data.message,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        console.log("success if runs");
                        setEditSuccess(true);
                        dispatch(
                            getHttp(
                                `${SERVER_URI}api/admin/leadHistory/${query.lead_id}?lead_assignment=1`
                            )
                        )
                            .then((response) => {
                                setActiveUser(response.data.data.lead_assignment);
                            })
                    }
                })
                .catch((err) => {
                    console.log("update assign::", err)
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "The given data was invalid.",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setRequestLoader(false);
                });
        }


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
                                                    <Link href="/dashboard">Dashboard</Link> / <Link href="/leads">Leads</Link> / Update Lead
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
                                                        <div className="col-lg-4 col-md-4 col-12">
                                                            <div className="row d-flex justify-content-center">
                                                                <div className="col-md-11 col-12">
                                                                    <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={(event) => IMGhandleChange(event)} />
                                                                </div>
                                                                <div className="col-md-11 col-12">


                                                                    <div className="avatar-upload mb-3">

                                                                        <div className="avatar-edit">
                                                                            <input
                                                                                type="file"
                                                                                id="imageUpload"
                                                                                name="images"
                                                                                onChange={(e) => onSelectImage(e)}
                                                                                multiple="multiple"
                                                                                accept=".png, .jpg, .jpeg"
                                                                            />
                                                                            <label htmlFor="imageUpload">
                                                                                Update Image
                                                                            </label>
                                                                        </div>


                                                                        {/* <div className="avatar-edit">
                                                                            <input
                                                                                type="file"
                                                                                id="imageUpload"
                                                                                name="images"
                                                                                onChange={(e) => onSelectImage(e)}
                                                                                multiple="multiple"
                                                                                accept=".png, .jpg, .jpeg"
                                                                            />
                                                                            <label htmlFor="imageUpload">
                                                                                image upload 
                                                                            </label>
                                                                        </div> */}
                                                                        <div className="avatar-preview" style={{ height: "300px" }}>
                                                                            <div
                                                                                id="imagePreview"
                                                                                className="rounded"

                                                                                style={{
                                                                                    backgroundImage: { file }
                                                                                    // "url(/images/carousel/slide3.jpg )",
                                                                                }}
                                                                            >

                                                                                {
                                                                                    imageChange === 1 ?
                                                                                        <img src={file} style={{ height: "300px", width: "inherit" }} className="img-fluid"></img>
                                                                                        : <img src={entries.image} style={{ height: "300px", width: "inherit" }} className="img-fluid"></img>
                                                                                }

                                                                                {/* <img src={entries.image} style={{ height: "300px", width: "inherit" }} className="img-fluid"></img> */}
                                                                            </div>
                                                                        </div>
                                                                    </div>




                                                                    {/* <img src={entries.image} className="img-fluid lead_img" style={{ borderRadius: "30px", height: "295px !important", width: "100%" }} ></img> */}
                                                                </div>
                                                            </div>
                                                            <div className="row d-flex justify-content-center pt-4" >
                                                                <div className="col-md-11 col-0 ">
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
                                                                    <input type="text" class="form-control" id="LeadID" value={entries.lead_id} placeholder="leadid" disabled />
                                                                </div>
                                                                <div class="form-group col-md-3">
                                                                    <label for="LeadID" className="text-bold">Campaign</label>
                                                                    <select class="form-select form-control" onChange={(e) => setCompaignEvent(e)} disabled>
                                                                        <option selected value={compaign.id}>{compaign.id}&nbsp;{compaign.compaign_name}</option>
                                                                        
                                                                    </select>
                                                                    <p style={{ color: 'red' }}>{errorState.compaign}</p>
                                                                </div>
                                                                <div class="form-group col-md-3">
                                                                    <label for="inputEmail4" className="text-bold">Status<span className="text-danger">*</span></label>
                                                                    <select class="form-select form-control" onChange={(e) => setStatusHandler(e)} aria-label="Disabled select example" >
                                                                        <option value={entries.lead_status} selected>{entries.lead_status}</option>
                                                                        <option value="Open">Open</option>
                                                                        <option value="Pending">Pending</option>
                                                                        <option value="Success">Success</option>
                                                                    </select>
                                                                    <p style={{ color: 'red' }}>{errorState.status}</p>
                                                                    {/* 
                                                                    <input type="email" class="form-control" id="inputEmail4" placeholder="Email" /> */}
                                                                </div>
                                                            </div> 
                                                            <div className="row d-flex justify-content-between ">
                                                                <div class="form-group col-md-3">
                                                                    <label for="firstName" className="text-bold">First Name<span className="text-danger">*</span></label>
                                                                    <input type="text" className="form-control" onChange={(e) => firstNameEvent(e)} value={entries.first_name} name="firstName" placeholder="Enter First Name" />
                                                                    <p style={{ color: 'red' }}>{errorState.firstName}</p>
                                                                </div>
                                                                <div class="form-group col-md-3">
                                                                    <label for="lastName" className="text-bold">Last Name</label>
                                                                    <input type="text" className="form-control" onChange={(e) => lastNameEvent(e)} value={entries.last_name} name="lastName" placeholder="Enter Last Name" />
                                                                </div>
                                                                <div class="form-group col-md-3">
                                                                    <label for="leadOwner" className="text-bold">Lead Owner</label>
                                                                    <input className="lead-input" type="text" onChange={(e) => setOwnerEvent(e)} value={entries.owner} name="owner" className="form-control" placeholder="Enter Owner" />
                                                                </div>
                                                            </div>
                                                            <div className="row d-flex justify-content-between ">
                                                                <div class="form-group col-md-3">
                                                                    <label for="website" className="text-bold">Website</label>
                                                                    <input className="lead-input" type="text" onChange={(e) => setWebsiteValue(e)} value={entries.website} name="website" className="form-control" placeholder="Enter Website" />
                                                                </div>
                                                                <div class="form-group col-md-3">
                                                                    <label for="phoneBuisness" className="text-bold">Title</label>
                                                                    <input className="lead-input" type="text" onChange={(e) => setTitleEvent(e)} value={entries.title} name="title" className="form-control" placeholder="Enter Title" />
                                                                    {/* <p style={{ color: 'red' }}>{errorState.title}</p> */}
                                                                </div>
                                                                <div class="form-group col-md-3">
                                                                    <label for="email" className="text-bold">Email<span className="text-danger">*</span></label>
                                                                    <input className="lead-input" type="email" onChange={(e) => setEmailValue(e)} value={entries.email} name="email" className="form-control" placeholder="Enter Email" />
                                                                    <p style={{ color: 'red' }}>{errorState.email}</p>
                                                                </div>
                                                            </div>
                                                            <div className="row d-flex justify-content-between ">
                                                                <div class="form-group col-md-3">
                                                                    <label for="yearlyRevenue" className="text-bold">Yearly Revenue</label>
                                                                    <input className="lead-input" type="number" onChange={(e) => yearlyRevenueEvent(e)} value={entries.YearlyRevenue} name="yearlyRevenue" className="form-control" placeholder="Enter Yearly Revenue" />
                                                                </div>
                                                                <div class="form-group col-md-3">
                                                                    <label for="company" className="text-bold">Company</label>
                                                                    <input className="lead-input" type="text" onChange={(e) => companyEvent(e)} value={entries.company} name="company" className="form-control" placeholder="Enter company" />
                                                                </div>
                                                                <div class="form-group col-md-3">
                                                                    <label for="yearsinBuisness" className="text-bold">Years in Business</label>
                                                                    <input type="number" class="form-control" id="yearsinbusiness" onChange={(e) => yearsInBusinessEvent(e)} value={entries.years_in_business} placeholder="years in business" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 col-md-12 col-12">
                                                            <div className="row d-flex justify-content-between pt-3">
                                                                <div className="col-12 col-md-4">
                                                                    <div className="px-3">
                                                                        <div className="row d-flex justify-content-between pt-3">
                                                                            <div class="form-group col-md-7 col-12 col-sm-12 mb-0">
                                                                                <label for="phonePersonal" className="text-bold">Phone<span className="text-danger">*</span></label>
                                                                                <input className="lead-input" type="number" onChange={(e) => personalPhoneEvent(e)} value={entries.phone_personal} name="phonePersonal" className="form-control" placeholder="Enter Phone" />
                                                                                <p style={{ color: 'red' }}>{errorState.phonePersonal}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row d-flex justify-content-between pt-3">
                                                                            <div class="form-group col-md-7 col-12 col-sm-12">
                                                                                <label for="source" className="text-bold">Source Name<span className="text-danger">*</span></label>
                                                                                <input type="email" class="form-control" onChange={(e) => sourceEvent(e)} value={entries.source} id="source" placeholder="source" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-md-8">
                                                                    <div className="row d-flex justify-content-between pt-3">
                                                                        <div class="form-group col-md-3">
                                                                            <label for="phoneBuisness" className="text-bold">Work Phone</label>
                                                                            <input className="lead-input" type="number" onChange={(e) => businessPhoneEvent(e)} value={entries.phone_business} name="phoneBuisness" className="form-control" placeholder="Enter Business Phone" />
                                                                        </div>
                                                                        <div class="form-group col-md-3">
                                                                            <label for="phoneHome" className="text-bold">Phone Home</label>
                                                                            <input className="lead-input" type="number" onChange={(e) => homePhoneEvent(e)} value={entries.phone_home} name="phoneHome" className="form-control" placeholder="Enter Home Phone" />
                                                                        </div>
                                                                        <div class="form-group col-md-3">
                                                                            <label for="phoneFax" className="text-bold">Phone Fax</label>
                                                                            <input className="lead-input" type="number" onChange={(e) => faxPhoneEvent(e)} value={entries.phone_fax} name="phoneFax" className="form-control" placeholder="Enter Fax Phone" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row d-flex justify-content-between pt-3">
                                                                        <div class="form-group col-md-3">
                                                                            <label for="sourceCompany" className="text-bold">Source Company</label>
                                                                            <input className="lead-input" type="text" onChange={(e) => sourceCompanyEvent(e)} value={entries.source_company} name="sourceCompany" className="form-control" placeholder="Enter Compny Name" />
                                                                        </div>
                                                                        <div class="form-group col-md-3">
                                                                            <label for="sourceEmail" className="text-bold">Source Email</label>
                                                                            <input className="lead-input" type="text" onChange={(e) => sourceEmailEvent(e)} value={entries.source_email} name="sourceEmail" className="form-control" placeholder="Enter Source Email" />
                                                                        </div>
                                                                        <div class="form-group col-md-3">
                                                                            <label for="sourceContact" className="text-bold">Source Contact</label>
                                                                            <input className="lead-input" type="text" onChange={(e) => sourceContactEvent(e)} value={entries.source_contact} name="sourceContact" className="form-control" placeholder="Enter Contact Name" />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className="d-flex col-12 col-md-12 justify-content-end align-items-start mt-3 py-0">
                                                            <div>
                                                                <button className="btn btn-primary px-4 py-2 mr-1" onClick={(e) => UpdateFieldHandler(e)}>Update</button>
                                                                <button className="btn btn-primary px-4 py-2 ml-1" onClick={() => { router.push("/leads") }}>Cancel</button>
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
                                                        <button className="btn btn-primary px-4 py-2 ml-1 float-right" onClick={() => setModalShow(true)}>Add New Address</button>
                                                        <AddAddress
                                                            onChangeEvent={(e) => addressChangeEvent(e)}
                                                            addressDetails={addressDetails}
                                                            setAddressDetails={setAddressDetails}
                                                            show={modalShow}
                                                            onHide={() => setModalShow(false)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
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
                                                                                                                        <div><span><button className="btn" onClick={() => {
                                                                                                                            setupdateLeadAddressData(leadAddress)
                                                                                                                            setupdateAddressID(leadAddress.leadaddresss_id)
                                                                                                                            setAddressUpdateModal(true)
                                                                                                                        }} ><Edit /></button></span>
                                                                                                                            <UpdateAddress
                                                                                                                                id={updateAddressID}
                                                                                                                                data={updateLeadAddressData}
                                                                                                                                setData={setupdateLeadAddressData}
                                                                                                                                show={addressUpdateModal}
                                                                                                                                onHide={() => setAddressUpdateModal(false)}
                                                                                                                            />
                                                                                                                            <span><button className="btn" onClick={(event, data) =>
                                                                                                                                DeleteHandler(leadAddress)}><DeleteIcon /></button></span>
                                                                                                                        </div>
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
                                                                                                                        <p>{leadAddress.street2}</p>
                                                                                                                        {/* <div className="col-3 p-0"></div> */}
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
                                                        <button className="btn btn-primary px-4 py-2 ml-1 float-right" onClick={() => setMeetingModalShow(true)}>Add New Meeting</button>
                                                        <AddMeetingModal
                                                            show={meetingModalShow}
                                                            onHide={() => setMeetingModalShow(false)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col bg-white">
                                                        <div className="card-body px-0" style={{ overflowX: "auto" }}>
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

                                                            {/* <NotesShow
                                                                show={modalShow}
                                                                onHide={() => setModalShow(false)}
                                                            /> */}
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



















                                                        {/* <button
                                                            type="button"
                                                            title="Add New"
                                                            onClick={handleShow}
                                                            className="btn btn-primary white p-2 ml-2"
                                                            data-toggle="modal"
                                                            data-target="#imagepopup"
                                                        >
                                                            Add New
                                                        </button> */}





















                                                        <button className="btn btn-primary px-4 py-2 ml-1 float-right" onClick={handleShow}>Add New Document</button>
                                                        <AddDocumentModal
                                                            show={addDocumentShow}
                                                            onHide={handleClose}
                                                            animation={false}
                                                            className="text-left"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col bg-white">
                                                        <div className="card-body px-0 " style={{ overflowX: "auto" }}>
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

                                                            {/* <NotesShow
                                                                show={modalShow}
                                                                onHide={() => setModalShow(false)}
                                                            /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* section5 Assign To*/}
                                {
                                    login_user_id == 1 ?
                                        <div className="d-flex flex-column-fluid" style={{ padding: "30px 20px" }}>
                                            {/*begin::Container*/}
                                            <div className="container-fluid">
                                                <div className="row">
                                                    <div className="col-sm-12 col-lg-12 col-12 bg-white p-4">
                                                        <div className="row">
                                                            <div className="col-sm-12 col-lg-12 col-12 d-flex justify-content-between align-items-flexend">
                                                                <div className="d-flex align-items-center w-100">
                                                                    <div className="row w-100">
                                                                        <div className="col-md-3 col-lg-3 col-12 d-flex">
                                                                            <div className="w-100 d-flex align-items-center">
                                                                                <h4 className="text-bold text-black my-auto" style={{ width: "150px" }}>Assign To </h4>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 col-lg-6 col-6 d-flex">
                                                                            <select class="form-select form-control" style={{ paddingLeft: "8px", paddingRight: "31px" }} onChange={(e) => setUserInfoEvent(e)} >
                                                                                <option selected >Select A User</option>
                                                                                {
                                                                                    userInfo.map((userInfo) => (
                                                                                        <option selected={assignedUserID == userInfo.user_id ? true : false} value={userInfo.user_id}>{userInfo.user_id}&nbsp;{userInfo.name}</option>
                                                                                    ))
                                                                                }
                                                                            </select>
                                                                            <div className="pl-3">
                                                                                <p style={{ color: 'red', width: "160px" }} className="my-auto">{errorState.user_id}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-3 col-lg-3 col-6 d-flex">
                                                                            <div className="w-100 d-flex align-items-center " style={{ justifyContent: "flex-end" }}>
                                                                                <button className="btn btn-primary px-4 py-2 ml-1 float-right" onClick={(e) => updateAssignTo(e)}>Update</button>
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
                                        : null
                                }
 
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
                                                                {/* <button className="btn btn-primary px-4 py-2 ml-1 float-right" onClick={() => setModalShow(true)}>Add New Address</button> */}
                                                                {/* <AddAddress
                                                            show={modalShow}
                                                            onHide={() => setModalShow(false)}
                                                        /> */}
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
                                                                                        <td>{activeUser.lead_id}</td>
                                                                                        <td>{activeUser.created_at}</td>
                                                                                        <td>{activeUser.assignee}</td>
                                                                                        <td>{activeUser.user_id.user_id}</td>

                                                                                        {/* <td><img src="/images/png/feather-eye.png" onClick={() => {
                                                                                    settemp(meeting.meeting_notes)
                                                                                    setNotesModalShow(true)
                                                                                }} />
                                                                                </td> */}
                                                                                    
                                                                                        {/* <NotesShow
                                                                                    key={key}
                                                                                    show={notesModalShow}
                                                                                    onHide={() => setNotesModalShow(false)}
                                                                                    meetingNotes={temp}
                                                                                /> */}
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
                                        :
                                        null
                                }

                            </div>
                        </div>
                    </div>
                </div>


                {/* <Switcher /> */}
            </body>
        </Fragment>
    );
}

export default UpdateLeads;
