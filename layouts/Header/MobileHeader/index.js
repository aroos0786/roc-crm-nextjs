import React, { Fragment, useEffect } from "react";
import Link from "next/link";
import $ from 'jquery'

import { useRouter } from "next/router";
import { i18n, useTranslation } from "../../../i18n";
import Head from "next/head";


import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_SIDEBAR } from '../../../actions/types';

const MobileHeader = () => {
  const { t } = useTranslation();
  const toggle_sidebar = useSelector(state => state.general.toggle_sidebar)
  const dispatch = useDispatch();

  const OnClickOne = (e) => {
    e.preventDefault();

    // $('#tc_aside_mobile_toggle').on('click', function () {

    // $('#tc_aside').toggleClass('aside-on');

    // $('.aside-overlay').addClass('active');

    $('#tc_aside').toggleClass('aside-on');
    dispatch({
      type: TOGGLE_SIDEBAR
    });

    //put this when popup opens, to stop body scrolling
    // bodyScrollLock.disableBodyScroll(targetElement);
    // jQuery('html').css('overflow', 'hidden');
    // jQuery('body').css('overflow', 'hidden');
    // });
  }

  const onClickTwo = (e) => {
    e.preventDefault();

    // $('#tc_header_mobile_topbar_toggle').on("click", function(e){
    $('body').toggleClass('topbar-mobile-on');
    // });

  }



  const onClickOverlay = (e) => {
    e.preventDefault();
    // jQuery('.aside-overlay').on('click', function () {
    $('#tc_aside').removeClass('aside-on');
    $('.aside-overlay').removeClass('active');

    dispatch({
      type: TOGGLE_SIDEBAR
    });

    //put this when close popup and show scrollbar in body
    // bodyScrollLock.enableBodyScroll(targetElement);

    // jQuery('html').css('overflow', 'auto');
    // jQuery('body').css('overflow', 'auto');
    // }); 
  }


  return (
    <Fragment>
      <div id="tc_header_mobile" className="header-mobile align-items-center header-mobile-fixed">

        <Link href="/"><a className="brand-logo">
          <span className="brand-text"><img style={{ height: 25 }} alt="Logo" src="/images/misc/logo.png" /></span>
        </a>
        </Link>

        <div className="d-flex align-items-center">
          <button className="btn p-0" id="tc_aside_mobile_toggle" onClick={(e) => OnClickOne(e)}>
            <svg width="20px" height="20px" viewBox="0 0 16 16" className="bi bi-justify-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
            </svg>
          </button>
          <button className="btn p-0 ml-2" id="tc_header_mobile_topbar_toggle" onClick={(e) => onClickTwo(e)}>
            <span className="svg-icon svg-icon-xl">
              <svg width="20px" height="20px" viewBox="0 0 16 16" className="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
            </span>
          </button>
        </div>

      </div>

      <div className="aside" id="tc_aside" >
        <ProSidebar
          // image={image ? sidebarBg : false}
          // rtl={rtl}
          //  collapsed={toggle_sidebar}
          // toggled={toggled}
          breakPoint="md"

        // onToggle={handleToggleSidebar}
        >
          <SidebarHeader>
            {/* <div
              style={{
                padding: "24px",
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: 14,
                letterSpacing: "1px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Kundol
            </div> */}

            <div className="brand flex-column-auto pb-2 pt-3" id="tc_brand">
              {/*begin::Logo*/}
              <Link href="/dashboard" >
                <a className="brand-logo">
                  <img className="brand-image" style={{ height: 25 }} alt="Logo" src='/images/misc/logo.png' />
                  <span className="brand-text"><img style={{ height: 50 }} alt="Logo" src='/images/misc/logo.png' /></span>
                </a>
              </Link>
              {/*end::Logo*/}
            </div>
          </SidebarHeader>

          <SidebarContent className="scroll-maunal">
            <Menu>
              <MenuItem
                icon={
                  <span className="svg-icon nav-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    // className="feather feather-home"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </span>
                }
              >
                <Link href="/dashboard">
                  <a className="nav-item active">
                    <span className="nav-text fontt">{t("Dashboard")}</span>
                  </a>
                </Link>
              </MenuItem>
              <MenuItem
                icon={
                  <span className="svg-icon nav-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 24.093 29.001"
                      fill="currentColor"
                      stroke="currentColor"
                      // strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-home"
                    >
                      <g id="XMLID_2555_" transform="translate(-42.782)">
                        <path id="XMLID_2859_" d="M42.782,180H66.875v2.581H42.782Z" transform="translate(0 -169.675)" fill="#a9b2ba" />
                        <path id="XMLID_2874_" d="M42.782,257.169l9.465,6.624v5.581l5.163-1.434v-4.146l9.465-6.624V255H42.782Z" transform="translate(0 -240.372)" fill="#a9b2ba" />
                        <path id="XMLID_2875_" d="M171.416,5.788a5.206,5.206,0,0,0-1.323-.935,3.012,3.012,0,1,0-4.76,0,5.2,5.2,0,0,0-1.323.935A5.067,5.067,0,0,0,162.536,8.6H172.89a5.067,5.067,0,0,0-1.474-2.816Z" transform="translate(-112.884)" fill="#a9b2ba" />
                      </g>
                    </svg>
                  </span>
                }
              >
                <Link href="/leads">
                  <a className="nav-item active">
                    <span className="nav-text fontt">{t("Leads")}</span>
                  </a>
                </Link>
              </MenuItem>
              {/* <MenuItem
                icon={
                  <span className="svg-icon nav-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 22.019 26.505"
                      fill="currentColor"
                      stroke="currentColor"
                      // strokeWidth={2}
                      // strokeLinecap="round"
                      // strokeLinejoin="round"
                      // className="feather feather-home"
                    >
                      <g id="notebook-of-contacts" transform="translate(-37.4)">
                        <path id="Path_331" data-name="Path 331" d="M41.478,13.252a1.019,1.019,0,0,1-1.019,1.019H38.419A1.019,1.019,0,0,1,37.4,13.252h0a1.019,1.019,0,0,1,1.019-1.019h2.039a1.019,1.019,0,0,1,1.019,1.019Zm0-6.524a1.019,1.019,0,0,0-1.019-1.019H38.419A1.019,1.019,0,0,0,37.4,6.728h0a1.019,1.019,0,0,0,1.019,1.019h2.039a1.019,1.019,0,0,0,1.019-1.019Zm0,13.048a1.019,1.019,0,0,0-1.019-1.019H38.419A1.019,1.019,0,0,0,37.4,19.777h0A1.019,1.019,0,0,0,38.419,20.8h2.039a1.019,1.019,0,0,0,1.019-1.019ZM59.419,3.262v19.98A3.262,3.262,0,0,1,56.157,26.5H41.886a3.262,3.262,0,0,1-3.262-3.262V21.611h1.835a1.835,1.835,0,0,0,0-3.67H38.623V15.087h1.835a1.835,1.835,0,0,0,0-3.67H38.623V8.563h1.835a1.835,1.835,0,0,0,0-3.67H38.623V3.262A3.262,3.262,0,0,1,41.885,0H56.157A3.262,3.262,0,0,1,59.419,3.262ZM46.487,9.67a3.145,3.145,0,1,0,3.145-3.146A3.146,3.146,0,0,0,46.487,9.67Zm8.039,7.689a3.5,3.5,0,0,0-3.495-3.495h-2.8a3.5,3.5,0,0,0-3.5,3.495v1.4h9.786Z" fill="#a9b2ba"/>
                      </g>
                    </svg>
                  </span>
                }
              >
                  <Link href="/contacts">
                    <a className="nav-item active">
                      <span className="nav-text fontt">{t("Contacts")}</span>
                    </a>
                  </Link>
              </MenuItem> */}
              {/* <MenuItem
                icon={
                  <span className="svg-icon nav-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 19.303 25.737"
                      fill="none"
                      stroke="currentColor"
                      // strokeWidth={2}
                      // strokeLinecap="round"
                      // strokeLinejoin="round"
                      className="feather feather-home"
                    >
                      <g id="profit-report" transform="translate(-64)">
                        <g id="Group_642" data-name="Group 642" transform="translate(76.868)">
                          <g id="Group_641" data-name="Group 641">
                            <path id="Path_332" data-name="Path 332" d="M320,0V6.434h6.434Z" transform="translate(-320)" fill="#a9b2ba"/>
                          </g>
                        </g>
                        <g id="Group_644" data-name="Group 644" transform="translate(64)">
                          <g id="Group_643" data-name="Group 643">
                            <path id="Path_333" data-name="Path 333" d="M76.868,8.043A1.611,1.611,0,0,1,75.26,6.434V0H65.609A1.611,1.611,0,0,0,64,1.609v22.52a1.61,1.61,0,0,0,1.609,1.609H81.694A1.609,1.609,0,0,0,83.3,24.128V8.043ZM70.434,22.52H67.217V17.694h3.217Zm4.826,0H72.043V14.477H75.26Zm4.826,0H76.868V11.26h3.217Z" transform="translate(-64)" fill="#a9b2ba"/>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>
                }
              >
                  <Link href="/report">
                    <a className="nav-item active">
                      <span className="nav-text fontt">{t("Reports")}</span>
                    </a>
                  </Link>
              </MenuItem> */}
              <MenuItem
                icon={
                  <span className="svg-icon nav-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 22 24"
                      fill="none"
                      stroke="currentColor"
                      // strokeWidth={2}
                      // strokeLinecap="round"
                      // strokeLinejoin="round"
                      className="feather feather-home"
                    >
                      <g id="statistics" transform="translate(0 0)">
                        <path id="Path_334" data-name="Path 334" d="M33.187,11.664a2.176,2.176,0,0,0,1.514-.615l2.158,1.079a2.142,2.142,0,0,0-.027.265,2.187,2.187,0,0,0,4.374,0,2.16,2.16,0,0,0-.219-.937l2.927-2.927a2.16,2.16,0,0,0,.937.219,2.189,2.189,0,0,0,2.187-2.187,2.154,2.154,0,0,0-.109-.648l2.544-1.907A2.186,2.186,0,1,0,48.5,2.187a2.154,2.154,0,0,0,.109.648L46.062,4.742A2.178,2.178,0,0,0,42.883,7.5l-2.927,2.927a2.149,2.149,0,0,0-2.451.4L35.347,9.742a2.142,2.142,0,0,0,.027-.265,2.187,2.187,0,1,0-2.187,2.187Zm0,0" transform="translate(-29.493)" fill="#a9b2ba" />
                        <path id="Path_335" data-name="Path 335" d="M24.154,166.135h-.778V150.729a.729.729,0,0,0-.729-.729H19.731a.729.729,0,0,0-.729.729v15.406H17.544V155.1a.729.729,0,0,0-.729-.729H13.9a.729.729,0,0,0-.729.729v11.032H11.713v-5.2a.729.729,0,0,0-.729-.729H8.068a.729.729,0,0,0-.729.729v5.2H5.881v-8.116a.729.729,0,0,0-.729-.729H2.236a.729.729,0,0,0-.729.729v8.116H.729a.729.729,0,0,0,0,1.458H24.154a.729.729,0,0,0,0-1.458Zm0,0" transform="translate(0 -142.71)" fill="#a9b2ba" />
                      </g>
                    </svg>
                  </span>
                }
              >
                <Link href="/statistics">
                  <a className="nav-item active">
                    <span className="nav-text fontt">{t("Statistics")}</span>
                  </a>
                </Link>
              </MenuItem>
              <MenuItem
                icon={
                  <span className="svg-icon nav-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 28 20"
                      fill="none"
                      stroke="currentColor"
                      // strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-home"
                    >
                      <g id="search_1_" data-name="search (1)" transform="translate(0 0)">
                        <path id="Path_336" data-name="Path 336" d="M8.384,341.866l-3.08-3.08-5.3,5.3,3.08,3.08Zm0,0" transform="translate(0 -322.388)" fill="#a9b2ba" />
                        <path id="Path_337" data-name="Path 337" d="M219.789,120c-2.067,0-4.081,2.348-4.945,3.626.677.991,2.7,3.635,4.945,3.635,2.067,0,4.081-2.348,4.945-3.626C224.056,122.644,222.038,120,219.789,120Zm0,5.808a2.178,2.178,0,1,1,2.178-2.178A2.181,2.181,0,0,1,219.789,125.808Zm0,0" />
                        <path id="Path_338" data-name="Path 338" d="M302.726,180a.726.726,0,1,0,.726.726A.726.726,0,0,0,302.726,180Zm0,0" transform="translate(-287.382 -171.288)" />
                        <path id="Path_339" data-name="Path 339" d="M131.438,0a9.429,9.429,0,0,0-8.03,14.387l-.984.984,3.081,3.081.984-.984A9.436,9.436,0,1,0,131.438,0Zm6.431,9.811c-.115.192-2.853,4.71-6.431,4.71s-6.317-4.518-6.431-4.71l-.223-.372.223-.372c.115-.192,2.853-4.71,6.431-4.71s6.317,4.518,6.431,4.71l.223.372Zm0,0" transform="translate(-116.095)" fill="#a9b2ba" />
                      </g>
                    </svg>
                  </span>
                }
              >
                <Link href="/insights">
                  <a className="nav-item active">
                    <span className="nav-text fontt">{t("Insights")}</span>
                  </a>
                </Link>
              </MenuItem>
              <MenuItem
                icon={
                  <span className="svg-icon nav-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 27.54 20.978"
                      fill="none"
                      stroke="currentColor"
                      // strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-home"
                    >
                      <g id="megaphone" transform="translate(0 -31.001)">
                        <path id="Path_340" data-name="Path 340" d="M392,61v1.614a4.846,4.846,0,0,1,4.841,4.841h1.614A6.462,6.462,0,0,0,392,61Z" transform="translate(-370.916 -28.386)" fill="#a9b2ba" />
                        <path id="Path_341" data-name="Path 341" d="M393.616,124.228h1.614A3.231,3.231,0,0,0,392,121v1.614A1.616,1.616,0,0,1,393.616,124.228Z" transform="translate(-370.916 -85.159)" fill="#a9b2ba" />
                        <path id="Path_342" data-name="Path 342" d="M392,275.842v1.614A6.462,6.462,0,0,0,398.457,271h-1.614A4.846,4.846,0,0,1,392,275.842Z" transform="translate(-370.916 -227.091)" fill="#a9b2ba" />
                        <path id="Path_343" data-name="Path 343" d="M392,274.228A3.231,3.231,0,0,0,395.229,271h-1.614A1.616,1.616,0,0,1,392,272.615Z" transform="translate(-370.916 -227.091)" fill="#a9b2ba" />
                        <path id="Path_345" data-name="Path 345" d="M.006,126.9A5.878,5.878,0,0,0,5.964,132.3h.491V121H5.648a5.645,5.645,0,0,0-5.642,5.9Z" transform="translate(0 -85.159)" fill="#a9b2ba" />
                        <path id="Path_346" data-name="Path 346" d="M159.792,51.979h1.614V31h-1.614a4.893,4.893,0,0,1-4.895,4.841H150v11.3H154.9A4.893,4.893,0,0,1,159.792,51.979Z" transform="translate(-141.933 0)" fill="#a9b2ba" />
                        <path id="Path_347" data-name="Path 347" d="M392,188.308a2.406,2.406,0,0,0,0-4.544Z" transform="translate(-370.916 -144.546)" fill="#a9b2ba" />
                      </g>
                    </svg>
                  </span>
                }
              >
                <Link href="/campaigns">
                  <a className="nav-item active">
                    <span className="nav-text fontt">{t("Compaigns")}</span>
                  </a>
                </Link>
              </MenuItem>
              <MenuItem
                icon={
                  <span className="svg-icon nav-icon">

                    <svg xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 35.001 35.001"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <g>
                        <path d="M35.001,26.705c0-2.505-1.651-4.636-3.968-5.468c0.535-0.523,0.919-1.312,1.094-2.405c0.234,0.043,0.546-0.201,0.652-0.61
                          c0.111-0.421,0.238-1.128,0-1.189c-0.071-0.019-0.146-0.004-0.219,0.033v-1.17c0.039-1.271-0.136-2.499-1.521-3.031
                          c-0.253-0.521-0.271-0.994-0.271-0.994c-0.623,0.562-2.994,0.79-2.994,0.79l0.027,0.008c-3.004,0.309-2.57,1.389-2.57,3.228v1.17
                          c-0.072-0.037-0.146-0.052-0.219-0.033c-0.24,0.062-0.166,0.743-0.057,1.164c0.107,0.413,0.477,0.685,0.712,0.637
                          c0.181,1.149,0.539,1.917,1.033,2.418c-0.917,0.335-1.722,0.881-2.365,1.565c-0.979-1.071-2.228-1.916-3.647-2.428
                          c0.793-0.773,1.361-1.94,1.623-3.564c0.351,0.062,0.81-0.298,0.967-0.905c0.164-0.624,0.354-1.672-0.002-1.767
                          c-0.104-0.028-0.215-0.007-0.322,0.049v-1.734c0.059-1.886-0.2-3.706-2.258-4.494c-0.375-0.772-0.398-1.475-0.398-1.475
                          c-0.926,0.834-4.44,1.172-4.44,1.172l0.04,0.011c-4.455,0.457-3.812,2.059-3.812,4.786v1.734c-0.109-0.056-0.218-0.077-0.324-0.049
                          c-0.356,0.095-0.248,1.103-0.084,1.728c0.16,0.612,0.707,1.015,1.057,0.942c0.266,1.707,0.798,2.842,1.531,3.585
                          c-1.401,0.513-2.632,1.351-3.601,2.409c-0.652-0.691-1.467-1.243-2.397-1.577c0.535-0.523,0.919-1.312,1.095-2.405
                          c0.235,0.043,0.545-0.201,0.652-0.609c0.111-0.422,0.239-1.128-0.001-1.19c-0.071-0.019-0.145-0.004-0.218,0.033v-1.17
                          c0.04-1.271-0.135-2.499-1.521-3.031c-0.252-0.521-0.27-0.994-0.27-0.994c-0.625,0.562-2.994,0.79-2.994,0.79l0.027,0.008
                          c-3.005,0.309-2.571,1.389-2.571,3.228v1.17c-0.073-0.037-0.147-0.052-0.219-0.033c-0.24,0.062-0.167,0.744-0.056,1.165
                          c0.108,0.413,0.477,0.684,0.712,0.636c0.18,1.15,0.539,1.917,1.033,2.418C1.637,22.097,0,24.218,0,26.711h8.63
                          c-0.128,0.578-0.201,1.177-0.201,1.791H26.57c0-0.614-0.072-1.213-0.2-1.791h8.631V26.705z"/>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                      <g>
                      </g>
                    </svg>
                  </span>
                }
              >
                <Link href="/manageusers">
                  <a className="nav-item active">
                    <span className="nav-text fontt">{t("Manage Users")}</span>
                  </a>
                </Link>
              </MenuItem>

            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>



      <div className="aside-overlay" onClick={(e) => onClickOverlay(e)} />
    </Fragment>
  );
};

export default MobileHeader;
