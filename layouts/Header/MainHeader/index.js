import React, { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { i18n, useTranslation } from "../../../i18n";
import Head from "next/head";
import cookie from "js-cookie";
// import Leads from "/Leads";


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
import { useSelector } from 'react-redux';

const MainHeaderWithSidebar = () => {
  const { t } = useTranslation();
  const toggle_sidebar = useSelector(state => state.general.toggle_sidebar)
  const roleID = cookie.get('roleid');

  console.log("role_id:::", roleID)

  return (
    <Fragment>
      <div className="aside">
        <ProSidebar
          // image={image ? sidebarBg : false}
          // rtl={rtl}
          collapsed={toggle_sidebar}
          // toggled={toggled}
          breakPoint="md"

        // onToggle={handleToggleSidebar}
        >
          <SidebarHeader>

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

              {

                roleID == "1" ?
                  <>

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
                          <span className="nav-text fontt">{t("Campaigns")}</span>
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

                  </>

                  :

                  <>
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
                  </>

              }

            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>

      {/*begin::Aside*/}
      <div className="aside-overlay" />
    </Fragment>
  );
};

export default MainHeaderWithSidebar;
