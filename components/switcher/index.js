import React, { Fragment, useState, useEffect } from "react";
import $ from "jquery";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const Switcher = () => {
  const [state, setState] = useState({
    checkedA: true,
    checkedB: false,
  });

  
  useEffect(() =>{
     let themelayout = localStorage.getItem('themelayout');
     let rtlLaylout =  localStorage.getItem('rtlLaylout');
     let themeColor = localStorage.getItem('themeColor');
     if(themelayout == 'light'){
      $("#radio-dark").parent("label").removeClass("active");
      $("body").removeClass("dark");
      $("#radio-light").attr("checked", "checked");
      $("#radio-dark").removeAttr("checked", "");
      $("#radio-light").parent("label").addClass("active");
     }
     if(themelayout == 'dark'){
      $("#radio-light").parent("label").removeClass("active");
      $("body").addClass("dark");
      $("#radio-dark").attr("checked", "checked");
      $("#radio-light").removeAttr("checked", "");
      $("#radio-dark").parent("label").addClass("active");
     }
     if(themeColor == 'blue'){
      $("body").removeClass("color-theme-red");
      $("body").addClass("color-theme-blue");
     }
     if(themeColor == 'red'){
      $("body").removeClass("color-theme-blue");
      $("body").addClass("color-theme-red");
     }
     if(rtlLaylout == 'true'){
      setState({
        checkedB: true
      })
      $(".btn-rtl").addClass("active");
      $("body").addClass("rtl");
      $("#kt_color_panel").removeClass("offcanvas-on");
     }else{
      setState({
        checkedB: false
      })
      $(".btn-rtl").removeClass("active");
      $("body").removeClass("rtl");
      $("#kt_color_panel").removeClass("offcanvas-on");
     }

  }, [])


  const handleChange = (event) => {
    // onClickBtnRTL(event)
    localStorage.setItem('rtlLaylout', event.target.checked )
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  /* View */
  const openSwitcher = (e) => {
    e.preventDefault();
    $("#kt_color_panel").addClass("offcanvas-on");
  };

  /* Close */
  const closeSwitcher = (e) => {
    e.preventDefault();
    $("#kt_color_panel").removeClass("offcanvas-on");
  };

  const OnLightThemeClick = (e) => {
    e.preventDefault();
    // cookie.set('themelayout', 'light')
    localStorage.setItem('themelayout', 'light');
    $("#radio-dark").parent("label").removeClass("active");
    $("body").removeClass("dark");
    $("#radio-light").attr("checked", "checked");
    $("#radio-dark").removeAttr("checked", "");
    $("#radio-light").parent("label").addClass("active");
  };

  const OnClickThemeoDark = (e) => {
    e.preventDefault();
    localStorage.setItem('themelayout', 'dark');

    $("#radio-light").parent("label").removeClass("active");
    $("body").addClass("dark");
    $("#radio-dark").attr("checked", "checked");
    $("#radio-light").removeAttr("checked", "");
    $("#radio-dark").parent("label").addClass("active");
  };

  const onClickBtnRTL = (e) => {
    e.preventDefault();
    // localStorage.setItem('rtlLaylout',  )
    $(".btn-rtl").toggleClass("active");
    $("body").toggleClass("rtl");
    $("#kt_color_panel").removeClass("offcanvas-on");
  };

  const onClickThemeColorBlue = (e) => {
    e.preventDefault();
    localStorage.setItem('themeColor', 'blue')
    $("body").removeClass("color-theme-red");
    $("body").addClass("color-theme-blue");
  };
  const onClickThemeColorRed = (e) => {
    e.preventDefault();
    localStorage.setItem('themeColor', 'red')
    $("body").removeClass("color-theme-blue");
    $("body").addClass("color-theme-red");
  };

  return (
    <Fragment>
      <ul className="sticky-toolbar nav flex-column bg-primary">
        <li
          className="nav-item"
          id="kt_demo_panel_toggle"
          data-toggle="tooltip"
          title
          data-placement="right"
          data-original-title="Check out more demos"
          onClick={(e) => openSwitcher(e)}
        >
          <a className="btn btn-sm btn-icon text-white" href="#">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 16 16"
              className="bi bi-gear fa-spin"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z"
              />
              <path
                fillRule="evenodd"
                d="M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z"
              />
            </svg>
          </a>
        </li>
      </ul>
      <div
        id="kt_color_panel"
        className="offcanvas offcanvas-right kt-color-panel p-5"
      >
        <div className="offcanvas-header d-flex align-items-center justify-content-between pb-3">
          <h4 className="font-size-h4 font-weight-bold m-0">Theme config</h4>
          <a
            href="#"
            className="btn btn-sm btn-icon btn-light btn-hover-primary"
            id="kt_color_panel_close"
            onClick={(e) => closeSwitcher(e)}
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
        <hr />
        <div className="offcanvas-content">
          {/* Theme options starts */}
          <div id="customizer-theme-layout" className="customizer-theme-layout">
            <h5 className="mt-1">Theme Layout</h5>
            <div className="theme-layout">
              <div className="d-flex justify-content-start">
                <div className="my-3">
                  <div className="btn-group btn-group-toggle">
                    <label
                      className="btn btn-primary p-2 active"
                      onClick={(e) => OnLightThemeClick(e)}
                    >
                      <input
                        type="radio"
                        name="layoutOptions"
                        defaultValue="false"
                        id="radio-light"
                        defaultChecked
                      />
                      Light
                    </label>
                    <label
                      className="btn btn-primary p-2"
                      onClick={(e) => OnClickThemeoDark(e)}
                    >
                      <input
                        type="radio"
                        name="layoutOptions"
                        defaultValue="false"
                        id="radio-dark"
                      />
                      Dark
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <h5 className="mt-1">RTL Layout</h5>
            <div className="rtl-layout">
              <div className="d-flex justify-content-start">
                <div className="my-3 btn-rtl">
                <FormControl component="fieldset"  onClick={(e) => onClickBtnRTL(e)}>
                <FormControlLabel
                 control={<Switch
                checked={state.checkedB}
                onChange={handleChange}
                className="colr"
                 name="checkedB"
                 inputProps={{ "aria-label": "primary checkbox" }}
           
          />}
         
          // label="Gilad Gray"
        />
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
          <hr />
          {/* Theme options starts */}
          <div id="customizer-theme-colors" className="customizer-theme-colors">
            <h5>Theme Colors</h5>
            <ul className="list-inline unstyled-list d-flex">
              <li className="color-box mr-2">
                <div
                  id="color-theme-blue"
                  className="d-flex rounded w-20px h-20px"
                  style={{ backgroundColor: "blue" }}
                  onClick={(e) => onClickThemeColorBlue(e)}
                ></div>
              </li>
              <li className="color-box mr-2">
                <div
                  id="color-theme-red"
                  className="d-flex rounded w-20px h-20px"
                  style={{ backgroundColor: "red" }}
                  onClick={(e) => onClickThemeColorRed(e)}
                ></div>
              </li>
            </ul>
            <hr />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Switcher;
