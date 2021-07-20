import React, { Fragment, useState, useEffect, useRef } from "react";
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
import cookie from 'js-cookie';
import { SERVER_URI } from "../../../components/utils/config";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const AddLeads = (props) => {
    const inputRef = useRef([]);

    const router = useRouter();
    const dispatch = useDispatch();
    const { query } = useRouter();
    console.log(query.file);
    const login_user_id = cookie.get('userID');
    const [fullName, setFullName] = useState([{
        firstName: "",
        middleName: "",
        lastName: ""
    }]);
    const [fName, setFName] = useState("");
    const [phone, setPhone] = useState([{
        phoneBuisness: "",
        phonePersonal: "",
        phoneHome: "",
        phoneFax: ""
    }]);
    const [sourceDetails, setSourceDetails] = useState([{
        source: "",
        sourceCompany: "",
        sourceContact: "",
        sourceEmail: ""
    }]);
    const [addSuccess, setAddSuccess] = useState(false);
    const [requestLoader, setRequestLoader] = useState(false);
    const [leadTitle, setLeadTitle] = useState("");
    const [leadSource, setLeadSource] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [owner, setOwner] = useState("");
    const [website, setWebsite] = useState("");
    const [compaign, setCompaign] = useState("");
    const [fundsNeeded, setFundsNeeded] = useState("");
    const [interval, setInterval] = useState("");
    const [trafficSource, setTrafficSource] = useState();
    const [notes, setNotes] = useState("");
    const [entries, setEntries] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [limitPage, setLimit] = useState(10);
    const [isLoading, setLoading] = useState(true);
    const [userID, setUserID] = useState("");
    const [leadStatus, setLeadStatus] = useState();
    // const [source, setSource] = useState("");
    const [yearlyRevenue, setYearlyRevenue] = useState("");
    const [userInfo, setUserInfo] = useState([]);
    const [yearsInBusiness, setYearsInBusiness] = useState();
    const [counter, setCounter] = useState(["abc"])
    const [errorState, setErrorState] = useState({
        compaign: "",
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
        leadStatus: "",
        user_id: '',
        leadSource: '',
        fundsNeeded:""
    })
    // method implimentation
    const inputEvent = (event) => {
        const { name, value } = event.target;
        console.log('name', name)
        console.log('value', value)
        setErrorState((prevValue) => {
            return {
                ...prevValue,
                [name]: "",
            }
        })
        setFullName((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            }
        })
        setPhone((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            }
        })
        setSourceDetails((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            }

        })
        setAddressDetails((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            }
        })
    }

    const setEmailValue = (obj) => {
        setEmail(obj.target.value);
        setErrorState((prevValue) => {
            return {
                ...prevValue,
                email: "",
            }
        })
    }
    const setWebsiteValue = (obj) => {
        setWebsite(obj.target.value);
    }
    const setCompaignEvent = (obj) => {
        setCompaign(obj.target.value);
        setErrorState((prevValue) => {
            return {
                ...prevValue,
                compaign: "",
            }
        })

        console.log("coomp", compaign);
    }
    const setUserInfoEvent = (obj) => {
        setUserID(obj.target.value);
        console.log("edited", userID)
        setErrorState((prevValue) => {
            return {
                ...prevValue,
                user_id: "",
            }
        })
    }
    const setOwnerEvent = (obj) => {
        setOwner(obj.target.value);
    }
    const leadSourceEvent = (obj) => {
        setLeadSource(obj.target.value);
    }
    const setTitleEvent = (obj) => {
        setLeadTitle(obj.target.value);
        console.log("title", leadTitle)
        setErrorState((prevValue) => {
            return {
                ...prevValue,
                title: "",
            }
        })
    }


    const onAddAddtionalCounter = (e) => {
        e.preventDefault();
        setCounter((pre) => [...pre, "abc"])
    }

    const onDelAddtionalCounter = (e, index) => {
        e.preventDefault();
        const arr = counter.filter((i, ind) => ind !== index)
        setCounter(arr)
    }

    const setTrafficSourceEvent = (obj) => {
        setTrafficSource(obj.target.value);
    }
    const setNotesEvent = (obj) => {
        setNotes(obj.target.value);
    }
    const setLeadStatusHandler = (obj) => {
        setLeadStatus(obj.target.value);
        setErrorState((prevValue) => {
            return {
                ...prevValue,
                leadStatus: "",
            }
        })
    }
    const companyEvent = (obj) => {
        setCompany(obj.target.value);
    }
    const yearlyRevenueEvent = (obj) => {
        setYearlyRevenue(obj.target.value);
        setErrorState((prevValue) => {
            return {
                ...prevValue,
                yearlyRevenue: "",
            }
        })
    }
    const fundsNeededEvent = (obj) => {
        setFundsNeeded(obj.target.value);
        setErrorState((prevValue) => {
            return {
                ...prevValue,
                fundsNeeded: "",
            }
        })
    }
    const CancelEvent = () => {
        if (query.file === "dashboard") {
            router.push("/dashboard");
        } else if (query.file === "statistics") {
            router.push("/statistics");
        } else {
            router.push("/leads");
        }
    }
    const yearsInBusinessEvent = (obj) => {
        setYearsInBusiness(obj.target.value);
    }
    // console.log(company);

    // getting campaign id 
    useEffect(() => {
        dispatch(
            getHttp(
                `${SERVER_URI}api/admin/compaigns`
            )
        )
            .then((response) => {
                setCampaigns(response.data.data);
                setTotal(response.data.meta.total);
                setpage(response.data.meta.current_page);
                setLoading(false);
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
    // imges we get
    const [images, setImages] = useState();
    const [file, setFile] = useState();
    const [url, setUrl] = useState();

    const onSelectImage = (e) => {

        if (e.target.files.length !== 0) {
            setImages(e.target.files);
            setUrl(e.target.files[0].name);
            setFile(URL.createObjectURL(e.target.files[0]));
        }
        console.log("file+url::: ", file + url)
        console.log("file::: ", file)
        console.log("images::: ", url)
        // let data = URL.createObjectURL(e.target.files[0]);
        // let fileObj = [];
        // let fileArray = [];

        // fileObj.push(e.target.files)
        // // fileArray[0].push(URL.createObjectURL(fileObj))

        // for (let i = 0; i < fileObj[0].length; i++) {
        //     fileArray.push(URL.createObjectURL(fileObj[0][i]))
        // }

        // setFile(data);
        // // setFile(oldArray => [...oldArray.concat(fileArray)]);
        // setImages(e.target.files[0]);
        // setText(text + 1)
        // console.log("check::", file)
        // console.log("image::", images[0])
    };
    // console.log("image::", images)
    // console.log("this is file", file)
    // console.log("see", images)


    // get method for user_id
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
    }, [])

    // Add Field Handler 
    const AddFieldHandler = (e) => {
        e.preventDefault();
        setAddSuccess(false);
        setRequestLoader(true);

        // if (userID === undefined || userID === '' || userID === null) {
        //     setErrorState((prevState) => ({ ...prevState, user_id: "please enter user ID" }));
        //     console.log("userid")

        // } else 
        if (compaign === undefined || compaign === '' || compaign === null) {
            setErrorState((prevState) => ({ ...prevState, compaign: "please enter compaign" }));
            console.log("campaign")

        }
        else if (leadStatus === undefined || leadStatus === '' || leadStatus === null) {
            setErrorState((prevState) => ({ ...prevState, leadStatus: "please enter status" }));
            console.log("leadstatus", leadStatus)

        }
        // else if (leadSource === undefined || leadSource === '' || leadSource === null) {
        //     setErrorState((prevState) => ({ ...prevState, leadSource: "please enter lead source" }));
        //     console.log("lead source")

        // }
        else if (fullName.firstName === undefined || fullName.firstName === '' || fullName.firstName === null) {
            setErrorState((prevState) => ({ ...prevState, firstName: "please enter First Name" }));
            console.log("name dif")

        } 
        // else if (leadTitle === undefined || leadTitle === '' || leadTitle === null) {
        //     setErrorState((prevState) => ({ ...prevState, title: "please enter title" }));
        //     console.log("title")

        // }
         else if (email === undefined || email === '' || email === null) {
            setErrorState((prevState) => ({ ...prevState, email: "please enter email!" }));
            console.log("email")

        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            setErrorState((prevState) => ({ ...prevState, email: "please enter valid email!" }));
            console.log("email123")

        }
        else if (phone.phonePersonal === undefined || phone.phonePersonal === '' || phone.phonePersonal === null) {
            setErrorState((prevState) => ({ ...prevState, phonePersonal: "please enter phone" }));
            console.log("phone personal")

        }

        // else if(addressDetails.street1 === undefined || addressDetails.street1 === '' || addressDetails.street1 === null){
        //   setErrorState((prevState) => ({ ...prevState, street1: "please enter street" }));

        // }else if(addressDetails.city === undefined || addressDetails.city === '' || addressDetails.city === null){
        //   setErrorState((prevState) => ({ ...prevState, city: "please enter city" }));

        // }else if(addressDetails.zip === undefined || addressDetails.zip === '' || addressDetails.zip === null){
        //   setErrorState((prevState) => ({ ...prevState, zip: "please enter zip" }));

        // }

        else if (fundsNeeded === undefined || fundsNeeded === '' || fundsNeeded === null) {
            setErrorState((prevState) => ({ ...prevState, fundsNeeded: "please enter fundsNeeded" }));
            console.log("yearly")

        }
        // else if( addressDetails.country === undefined ||  addressDetails.country === '' ||  addressDetails.country === null){
        //   setErrorState((prevState) => ({ ...prevState, country: "please enter country" }));

        // }

        else {

            console.log("com::", sourceDetails.source)

            const formData = new FormData();

            if (images === undefined || images === '' || images === null) {
                console.log("westindides", setSourceDetails.source)
                formData.append("compaign_id", compaign);
                formData.append("years_in_business", yearsInBusiness);
                formData.append("yearly_revenue", yearlyRevenue);
                formData.append("first_name", fullName.firstName);
                formData.append("middle_name", fullName.middleName);
                formData.append("last_name", fullName.lastName);
                formData.append("title", leadTitle);
                formData.append("company", company);
                formData.append("email", email);
                formData.append("owner", owner);
                formData.append("source", sourceDetails.source);
                // lead_source",sourceDetails.source),
                formData.append("lead_source", leadSource);
                formData.append("phone_business", phone.phoneBuisness);
                formData.append("phone_personal", phone.phonePersonal);
                formData.append("phone_home", phone.phoneHome);
                formData.append("phone_fax", phone.phoneFax);
                formData.append("website", website);
                formData.append("source_company", sourceDetails.sourceCompany);
                formData.append("source_contact", sourceDetails.sourceContact);
                formData.append("source_email", sourceDetails.sourceEmail);
                formData.append("additional_info", 'test');
                formData.append("admin", "admin1");
                formData.append("funds_needed", fundsNeeded);
                formData.append("status", leadStatus);
                formData.append("lead_note", notes);

            }
            else {
                formData.append("file", images[0]);
                formData.append("compaign_id", compaign);
                formData.append("years_in_business", yearsInBusiness);
                formData.append("yearly_revenue", yearlyRevenue);
                formData.append("first_name", fullName.firstName);
                formData.append("middle_name", fullName.middleName);
                formData.append("last_name", fullName.lastName);
                formData.append("title", leadTitle);
                formData.append("company", company);
                formData.append("email", email);
                formData.append("owner", owner);
                formData.append("source", sourceDetails.source);
                // lead_source",sourceDetails.source),
                formData.append("lead_source", leadSource);
                formData.append("phone_business", phone.phoneBuisness);
                formData.append("phone_personal", phone.phonePersonal);
                formData.append("phone_home", phone.phoneHome);
                formData.append("phone_fax", phone.phoneFax);
                formData.append("website", website);
                formData.append("source_company", sourceDetails.sourceCompany);
                formData.append("source_contact", sourceDetails.sourceContact);
                formData.append("source_email", sourceDetails.sourceEmail);
                formData.append("additional_info", 'test');
                formData.append("admin", "admin1");
                formData.append("funds_needed", fundsNeeded);
                formData.append("status", leadStatus);
                formData.append("lead_note", notes);
            }

            const body = formData;

            dispatch(postHttp2(`${SERVER_URI}api/admin/leadStore?`, body))
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

                        // var intervalId = setInterval(this.timer, 100);
                        // setInterval(intervalId);
                        // clearInterval(interval);
                        // router.push("/leads");
                    } else {
                        // error handling
                        let arr = [];
                        let dat = res.data.data.errors
                        arr = Object.keys(res.data.data.errors);
                        for (let i = 0; i < arr.length; i++) {
                            setErrorHandling((prevState) => ({ ...prevState, [arr[i]]: dat[arr[i]] }));
                        }
                        console.log("this is error from else", res.data.message)
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
                    console.log("this is error from catch", err)
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
                                                    <Link href="/dashboard">Dashboard</Link> / <Link href="/leads">Leads</Link> / Add Lead

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
                                        <div className="row">
                                            <form className="w-100">
                                                <div className="form-row bg-white justify-content-center">
                                                    <div className="row w-100 py-4 px-2">
                                                        <div className="col-12 col-sm-4 col-lg-4 col-xl-4 ">
                                                            <div className="row d-flex justify-content-center">
                                                                <div className="col-md-11 col-12 ">





                                                                    <div className="avatar-upload mb-3">
                                                                        {
                                                                            file ?
                                                                                <>
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
                                                                                            image upload
                                                                                        </label>
                                                                                    </div>
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    <div className="avatar-edit no-img">
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
                                                                                    </div>
                                                                                </>
                                                                        }
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
                                                                                <img src={file} style={{ height: "300px", width: "inherit" }} className="img-fluid"></img>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {/* <div className="form-group multi-preview" >

                                                                        {(file || []).map(url => (
                                                                            <img src={url} alt="..." style={{ height: '50px', width: '50px', marginRight: '5px' }} onClick={() => onDeleteSelecImage(url)} />
                                                                        ))}
                                                                    </div> */}









                                                                    {/* <img src={file} style={{ height: "300px" }} className="img-fluid"></img> */}
                                                                </div>
                                                            </div>
                                                            {/* <div className="row d-flex justify-content-center pt-4" >
                                                                <div className="col-11 ">
                                                                    <div className="bg-primary border-radius-10px px-1 py-3 text-center">
                                                                        <h5 className="text-white">Amount Required</h5>
                                                                        <h2 className="text-white text-bold">{fundsNeeded}</h2>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                         */}
                                                        </div>
                                                        <div className="col-12 col-lg-8 col-sm-8 col-xl-8">
                                                            {/* <div className="row">
                                                                <div className="col">
                                                                    <h2 className="text-primary text-bold m-0">Clayton Bates</h2>
                                                                    <h5 className="text-black">Clayton Assosiates</h5>
                                                                </div>
                                                            </div> */}
                                                            <div className="row d-flex justify-content-between">
                                                                <div class="form-group col-md-3">
                                                                    <label for="LeadID" className="text-bold">Campaign<span className="text-danger">*</span></label>
                                                                    <select class="form-select form-control" onChange={(e) => setCompaignEvent(e)} >
                                                                        <option selected>Select Campaign</option>
                                                                        {
                                                                            campaigns.map((compaign) => (
                                                                                <option value={compaign.id}>{compaign.id}&nbsp;{compaign.compaign_name}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                    <p style={{ color: 'red' }}>{errorState.compaign}</p>
                                                                </div>
                                                                <div class="form-group col-md-3">
                                                                    <label for="company" className="text-bold">Company</label>
                                                                    <input className="lead-input" type="text" onChange={(e) => companyEvent(e)} value={company} name="company" className="form-control" placeholder="Enter company" />
                                                                </div>
                                                                <div class="form-group col-md-3">
                                                                    <label for="status" className="text-bold">Status<span className="text-danger">*</span></label>
                                                                    <select class="form-select form-control" onChange={(e) => setLeadStatusHandler(e)} name="status" aria-label="Disabled select example" >
                                                                        <option selected value={leadStatus}>Select Status</option>
                                                                        <option value="Open">Open</option>
                                                                        <option value="Pending">Pending</option>
                                                                        <option value="Success">Success</option>
                                                                    </select>
                                                                    <p style={{ color: 'red' }}>{errorState.leadStatus}</p>
                                                                    {/* 
                                                                    <input type="email" class="form-control" id="inputEmail4" placeholder="Email" /> */}
                                                                </div>
                                                            </div>
                                                            <div className="row d-flex justify-content-between ">
                                                                <div class="form-group col-md-3">
                                                                    <label for="firstName" className="text-bold">First Name<span className="text-danger">*</span></label>
                                                                    <input type="text" className="form-control" onChange={(e) => inputEvent(e)} value={fullName.firstName} name="firstName" placeholder="Enter First Name" />
                                                                    <p style={{ color: 'red' }}>{errorState.firstName}</p>
                                                                </div>
                                                                <div class="form-group col-md-3">
                                                                    <label for="lastName" className="text-bold">Last Name</label>
                                                                    <input type="text" className="form-control" onChange={(e) => inputEvent(e)} value={fullName.lastName} name="lastName" placeholder="Enter Last Name" />
                                                                </div>
                                                                <div class="form-group col-md-3">
                                                                    <label for="leadOwner" className="text-bold">Lead Owner</label>
                                                                    <input className="lead-input" type="text" onChange={(e) => setOwnerEvent(e)} value={owner} name="owner" className="form-control" placeholder="Enter Owner" />
                                                                </div>
                                                            </div>
                                                            <div className="row d-flex justify-content-between ">
                                                                <div class="form-group col-md-3">
                                                                    <label for="website" className="text-bold">Website</label>
                                                                    <input className="lead-input" type="text" onChange={(e) => setWebsiteValue(e)} value={website} name="website" className="form-control" placeholder="Enter Website" />
                                                                </div>
                                                                <div class="form-group col-md-3">
                                                                    <label for="phoneBuisness" className="text-bold">Title</label>
                                                                    <input className="lead-input" type="text" onChange={(e) => setTitleEvent(e)} value={leadTitle} name="title" className="form-control" placeholder="Enter Title" />
                                                                    {/* <p style={{ color: 'red' }}>{errorState.title}</p> */}
                                                                </div>
                                                                <div class="form-group col-md-3">
                                                                    <label for="email" className="text-bold">Email<span className="text-danger">*</span></label>
                                                                    <input className="lead-input" type="email" onChange={(e) => setEmailValue(e)} value={email} name="email" className="form-control" placeholder="Enter Email" />
                                                                    <p style={{ color: 'red' }}>{errorState.email}</p>
                                                                </div>
                                                            </div>
                                                            <div className="row d-flex justify-content-between ">
                                                                <div class="form-group col-md-3">
                                                                    <label for="yearlyRevenue" className="text-bold">Yearly Revenue</label>
                                                                    <input className="lead-input" type="number" onChange={(e) => yearlyRevenueEvent(e)} value={yearlyRevenue} name="yearlyRevenue" className="form-control" placeholder="Enter Yearly Revenue" />
                                                                    {/* <p style={{ color: 'red' }}>{errorState.yearlyRevenue}</p> */}
                                                                </div>
                                                                <div class="form-group col-md-3">
                                                                    <label for="fundsNeeded" className="text-bold">Funds Needed<span className="text-danger">*</span></label>
                                                                    <input className="lead-input" type="number" onChange={(e) => fundsNeededEvent(e)} value={fundsNeeded} name="fundsNeeded" className="form-control" placeholder="Enter Needed Funds" />
                                                                    <p style={{ color: 'red' }}>{errorState.fundsNeeded}</p>
                                                                </div>
                                                                <div class="form-group col-md-3">
                                                                    <label for="yearsinBuisness" className="text-bold">Years in Business</label>
                                                                    <input type="number" class="form-control" id="yearsinbusiness" onChange={(e) => yearsInBusinessEvent(e)} value={yearsInBusiness} placeholder="years in business" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="row d-flex justify-content-between pt-3">
                                                                <div className="col-12 col-md-4">
                                                                    <div className="px-3">
                                                                        <div className="row d-flex justify-content-between pt-3">
                                                                            <div class="form-group col-md-7 mb-0">
                                                                                <label for="phonePersonal" className="text-bold">Personal Phone<span className="text-danger">*</span></label>
                                                                                <input className="lead-input" type="number" onChange={(e) => inputEvent(e)} value={phone.phonePersonal} name="phonePersonal" className="form-control" placeholder="Enter Phone" />
                                                                                <p style={{ color: 'red' }}>{errorState.phonePersonal}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row d-flex justify-content-between pt-3">
                                                                            <div class="form-group col-md-7">
                                                                                <label for="source" className="text-bold">Source Name</label>
                                                                                <input type="text" class="form-control" onChange={(e) => inputEvent(e)} value={sourceDetails.source} name="source" placeholder="source" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-md-8">
                                                                    <div className="row d-flex justify-content-between pt-3">
                                                                        <div class="form-group col-md-3">
                                                                            <label for="phoneBuisness" className="text-bold">Work Phone</label>
                                                                            <input className="lead-input" type="number" onChange={(e) => inputEvent(e)} value={phone.phoneBuisness} name="phoneBuisness" className="form-control" placeholder="Enter Business Phone" />
                                                                        </div>
                                                                        <div class="form-group col-md-3">
                                                                            <label for="phoneHome" className="text-bold">Phone Home</label>
                                                                            <input className="lead-input" type="number" onChange={(e) => inputEvent(e)} value={phone.phoneHome} name="phoneHome" className="form-control" placeholder="Enter Home Phone" />
                                                                        </div>
                                                                        <div class="form-group col-md-3">
                                                                            <label for="phoneFax" className="text-bold">Phone Fax</label>
                                                                            <input className="lead-input" type="text" onChange={(e) => inputEvent(e)} value={phone.phoneFax} name="phoneFax" className="form-control" placeholder="Enter Fax Phone" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row d-flex justify-content-between pt-3">
                                                                        <div class="form-group col-md-3">
                                                                            <label for="sourceCompany" className="text-bold">Source Company</label>
                                                                            <input className="lead-input" type="text" onChange={(e) => inputEvent(e)} value={sourceDetails.sourceCompany} name="sourceCompany" className="form-control" placeholder="Enter Compny Name" />
                                                                        </div>
                                                                        <div class="form-group col-md-3">
                                                                            <label for="sourceEmail" className="text-bold">Source Email</label>
                                                                            <input className="lead-input" type="text" onChange={(e) => inputEvent(e)} value={sourceDetails.sourceEmail} name="sourceEmail" className="form-control" placeholder="Enter Source Email" />
                                                                        </div>
                                                                        <div class="form-group col-md-3">
                                                                            <label for="sourceContact" className="text-bold">Source Contact</label>
                                                                            <input className="lead-input" type="text" onChange={(e) => inputEvent(e)} value={sourceDetails.sourceContact} name="sourceContact" className="form-control" placeholder="Enter Contact Name" />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className="d-flex col-12 col-md-12 justify-content-end align-items-start mt-3 py-0">
                                                            <div>
                                                                <button className="btn btn-primary px-4 py-2 mr-1" onClick={(e) => AddFieldHandler(e)}>Add Lead</button>
                                                                <button className="btn btn-primary px-4 py-2 ml-1" onClick={(e) => CancelEvent(e)}>Cancel</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
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
                    {/* </div> */}
                    {/*end::Page*/}
                    {/* </div> */}
                    {/*end::Main*/}


                    {/* <Switcher /> */}
                </div>
            </body>
        </Fragment>);
}

export default AddLeads;
