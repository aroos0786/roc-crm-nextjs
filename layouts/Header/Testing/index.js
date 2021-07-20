import React, { Fragment } from 'react'
import $ from 'jquery';
const Testing = () => {
   
  const OnClickOne =(e) =>{
    e.preventDefault();

    // $('#tc_aside_mobile_toggle').on('click', function () {
      
      $('#tc_aside').toggleClass('aside-on');
      $('.aside-overlay').addClass('active');

      //put this when popup opens, to stop body scrolling
      // bodyScrollLock.disableBodyScroll(targetElement);
      // jQuery('html').css('overflow', 'hidden');
      // jQuery('body').css('overflow', 'hidden');
  // });
  }


  const onClickTwo = (e) =>{
    e.preventDefault();

    // $('#tc_header_mobile_topbar_toggle').on("click", function(e){
      $('body').toggleClass('topbar-mobile-on');
  // });

  }


  const onClickOverlay = () =>{
    // jQuery('.aside-overlay').on('click', function () {
        jQuery('#tc_aside').removeClass('aside-on');
        jQuery('.aside-overlay').removeClass('active');
  
        //put this when close popup and show scrollbar in body
        // bodyScrollLock.enableBodyScroll(targetElement);
  
        // jQuery('html').css('overflow', 'auto');
        // jQuery('body').css('overflow', 'auto');
    // }); 
  }
   
    return (
        <Fragment>
            	
  {/*begin::Header Mobile*/}
  <div id="tc_header_mobile" className="header-mobile align-items-center header-mobile-fixed">
    {/*begin::Logo*/}
    <a href="index.html" className="brand-logo">
      <span className="brand-text"><img style={{height: 25}} alt="Logo" src="assets/images/misc/logo.png" /></span>
    </a>
    {/*end::Logo*/}
    {/*begin::Toolbar*/}
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
    {/*end::Toolbar*/}
  </div>
  {/*end::Header Mobile*/}
  {/*begin::Main*/}
  <div className="d-flex flex-column flex-root">
    {/*begin::Page*/}
    <div className="d-flex flex-row flex-column-fluid page">
      <div>
        <div className="aside aside-left aside-fixed d-flex flex-column flex-row-auto" id="tc_aside">
          {/*begin::Brand*/}
          <div className="brand flex-column-auto" id="tc_brand">
            {/*begin::Logo*/}
            <a href="index.html" className="brand-logo">
              <img className="brand-image" style={{height: 25}} alt="Logo" src="assets/images/misc/k.png" />
              <span className="brand-text"><img style={{height: 25}} alt="Logo" src="assets/images/misc/logo.png" /></span>
            </a>
            {/*end::Logo*/}
          </div>
          {/*end::Brand*/}
          {/*begin::Aside Menu*/}
          <div className="aside-menu-wrapper flex-column-fluid overflow-auto h-100" id="tc_aside_menu_wrapper">
            {/*begin::Menu Container*/}
            <div id="tc_aside_menu" className="aside-menu  mb-5" data-menu-vertical={1} data-menu-scroll={1} data-menu-dropdown-timeout={500}>
              {/*begin::Menu Nav*/}
              <div id="accordion">
                <ul className="nav flex-column">
                  <li className="nav-item active">
                    <a href="index.html" className="nav-link">
                      <span className="svg-icon nav-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-home">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                      </span>
                      <span className="nav-text">
                        Dashboard
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="javascript:void(0)" data-target="#media" role="button" aria-expanded="false" aria-controls="media">
                      <span className="svg-icon nav-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-image">
                          <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                      </span>
                      <span className="nav-text">Media</span>
                      <i className="fas fa-chevron-right fa-rotate-90" />
                    </a>
                    <div className="collapse nav-collapse" id="media" data-parent="#accordion">
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <a href="media-manage.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Manage Media</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="media-detail.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Media Detail</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="media-setting.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Media Settings</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="javascript:void(0)" data-target="#catalog" role="button" aria-expanded="false" aria-controls="catalog">
                      <span className="svg-icon nav-icon">
                        <i className="fas fa-boxes font-size-h4" />
                      </span>
                      <span className="nav-text">Catalog</span>
                      <i className="fas fa-chevron-right fa-rotate-90" />
                    </a>
                    <div className="collapse nav-collapse" id="catalog" data-parent="#accordion">
                      <div id="accordion1">
                        <ul className="nav flex-column">
                          <li className="nav-item">
                            <a href="product-units-list.html" className="nav-link sub-nav-link">
                              <span className="svg-icon nav-icon d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                </svg>
                              </span>
                              <span className="nav-text">Product Units</span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="product-variation-list.html" className="nav-link sub-nav-link">
                              <span className="svg-icon nav-icon d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                </svg>
                              </span>
                              <span className="nav-text">Product Variations</span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="product-brands-list.html" className="nav-link sub-nav-link">
                              <span className="svg-icon nav-icon d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                </svg>
                              </span>
                              <span className="nav-text">Product Brands</span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="product-category-list.html" className="nav-link sub-nav-link">
                              <span className="svg-icon nav-icon d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                </svg>
                              </span>
                              <span className="nav-text">Product Categories</span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="product-review.html" className="nav-link sub-nav-link">
                              <span className="svg-icon nav-icon d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                </svg>
                              </span>
                              <span className="nav-text">Product Review</span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="product-barcode.html" className="nav-link sub-nav-link">
                              <span className="svg-icon nav-icon d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                </svg>
                              </span>
                              <span className="nav-text">Product Bar code Label</span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link sub-nav-link" data-toggle="collapse" href="#catalogProduct" role="button" aria-expanded="false" aria-controls="catalogProduct">
                              <span className="svg-icon nav-icon d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                </svg>
                              </span>
                              <span className="nav-text">Products</span>
                              <i className="fas fa-chevron-right fa-rotate-90" />
                            </a>
                            <div className="collapse nav-collapse" id="catalogProduct" data-parent="#accordion1">
                              <ul className="nav flex-column">
                                <li className="nav-item">
                                  <a href="products.html" className="nav-link mini-sub-nav-link">
                                    <span className="nav-text">List</span>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a href="add-product.html" className="nav-link mini-sub-nav-link">
                                    <span className="nav-text">Add Product</span>
                                  </a>
                                </li>
                              </ul>
                            </div>	
                          </li>
                          <li className="nav-item">
                            <a className="nav-link sub-nav-link" data-toggle="collapse" href="#catalogStock" role="button" aria-expanded="false" aria-controls="catalogStock">
                              <span className="svg-icon nav-icon d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                </svg>
                              </span>
                              <span className="nav-text">Product Stock</span>
                              <i className="fas fa-chevron-right fa-rotate-90" />
                            </a>
                            <div className="collapse nav-collapse" id="catalogStock" data-parent="#accordion1">
                              <ul className="nav flex-column">
                                <li className="nav-item">
                                  <a href="stock-add.html" className="nav-link mini-sub-nav-link">
                                    <span className="nav-text">Add Stock</span>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a href="stock-transfer.html" className="nav-link mini-sub-nav-link">
                                    <span className="nav-text">Stock Transfer</span>
                                  </a>
                                </li>
                              </ul>
                            </div>	
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#catalogPurchase" role="button" aria-expanded="false" aria-controls="catalogPurchase">
                      <span className="svg-icon nav-icon">
                        <i className="fas fa-money-check-alt font-size-h4" />
                      </span>
                      <span className="nav-text">Purchase</span>
                      <i className="fas fa-chevron-right fa-rotate-90" />
                    </a>
                    <div className="collapse nav-collapse" id="catalogPurchase" data-parent="#accordion">
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <a href="purchase-list.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">List</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="purchase-add.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Add Purchase</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#order" role="button" aria-expanded="false" aria-controls="order">
                      <span className="svg-icon nav-icon">
                        <i className="fas fa-clipboard-check font-size-h4" />
                      </span>
                      <span className="nav-text">Sell / Orders</span>
                      <i className="fas fa-chevron-right fa-rotate-90" />
                    </a>
                    <div className="collapse nav-collapse" id="order" data-parent="#accordion">
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <a href="order-list.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">List</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="order-detail.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Order Detail</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="add-sale.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Add Sale</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="pos.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">POS</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#Quotations" role="button" aria-expanded="false" aria-controls="Quotations">
                      <span className="svg-icon nav-icon">
                        <i className="fas fa-quote-right font-size-h4" />
                      </span>
                      <span className="nav-text">Quotations</span>
                      <i className="fas fa-chevron-right fa-rotate-90" />
                    </a>
                    <div className="collapse nav-collapse" id="Quotations" data-parent="#accordion">
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <a href="quotations-list.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">All Quotations</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="quotations-add.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Add Quotation</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#Returns" role="button" aria-expanded="false" aria-controls="Returns">
                      <span className="svg-icon nav-icon">
                        <i className="fas fa-undo-alt font-size-h4" />
                      </span>
                      <span className="nav-text">Returns</span>
                      <i className="fas fa-chevron-right fa-rotate-90" />
                    </a>
                    <div className="collapse nav-collapse" id="Returns" data-parent="#accordion">
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <a href="sale-return.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Sale Returns</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="Return-add.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Add Returns</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="purchase-return.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Purchase Returns</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="purchase-return-add.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Add Return Purchase</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#People" role="button" aria-expanded="false" aria-controls="People">
                      <span className="svg-icon nav-icon">
                        <i className="fas fa-user-friends font-size-h4" />
                      </span>
                      <span className="nav-text">People</span>
                      <i className="fas fa-chevron-right fa-rotate-90" />
                    </a>
                    <div className="collapse nav-collapse" id="People" data-parent="#accordion">
                      <div id="accordion2">
                        <ul className="nav flex-column">
                          <li className="nav-item">
                            <a className="nav-link sub-nav-link" data-toggle="collapse" href="#admins" role="button" aria-expanded="false" aria-controls="catalogProduct">
                              <span className="svg-icon nav-icon d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                </svg>
                              </span>
                              <span className="nav-text">Admins</span>
                              <i className="fas fa-chevron-right fa-rotate-90" />
                            </a>
                            <div className="collapse nav-collapse" id="admins" data-parent="#accordion1">
                              <ul className="nav flex-column">
                                <li className="nav-item">
                                  <a href="admin-list.html" className="nav-link mini-sub-nav-link">
                                    <span className="nav-text">List</span>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a href="roles-permission.html" className="nav-link mini-sub-nav-link">
                                    <span className="nav-text">Roles/Permisssions</span>
                                  </a>
                                </li>
                              </ul>
                            </div>	
                          </li>
                          <li className="nav-item">
                            <a href="billers-list.html" className="nav-link sub-nav-link">
                              <span className="svg-icon nav-icon d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                </svg>
                              </span>
                              <span className="nav-text">Billers</span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="supplier-list.html" className="nav-link sub-nav-link">
                              <span className="svg-icon nav-icon d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                </svg>
                              </span>
                              <span className="nav-text">Supplier</span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="customer-list.html" className="nav-link sub-nav-link">
                              <span className="svg-icon nav-icon d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                </svg>
                              </span>
                              <span className="nav-text">Customer</span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="customer-edit.html" className="nav-link sub-nav-link">
                              <span className="svg-icon nav-icon d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                </svg>
                              </span>
                              <span className="nav-text">Customer Edit</span>
                            </a>
                          </li>
                        </ul> 
                      </div>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#account" role="button" aria-expanded="false" aria-controls="account">
                      <span className="svg-icon nav-icon">
                        <i className="fas fa-file-invoice-dollar font-size-h4" />
                      </span>
                      <span className="nav-text">Accounts</span>
                      <i className="fas fa-chevron-right fa-rotate-90" />
                    </a>
                    <div className="collapse nav-collapse" id="account" data-parent="#accordion">
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <a href="accounts-list.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">List</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="accounts-balance-sheet.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Balance Sheet</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="accounts-trial-balance.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Trial Balance</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="accounts-cashFlow.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Cash Flow</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="accounts-payment-report.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Payment Account Report</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#expenses" role="button" aria-expanded="false" aria-controls="expenses">
                      <span className="svg-icon nav-icon">
                        <i className="fas fa-money-bill font-size-h4" />
                      </span>
                      <span className="nav-text">Expenses</span>
                      <i className="fas fa-chevron-right fa-rotate-90" />
                    </a>
                    <div className="collapse nav-collapse" id="expenses" data-parent="#accordion">
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <a href="expenses-list.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">List</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="expenses-type.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Expense Type</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#reports" role="button" aria-expanded="false" aria-controls="reports">
                      <span className="svg-icon nav-icon">
                        <i className="fas fa-chart-line font-size-h4" />
                      </span>
                      <span className="nav-text">Reports</span>
                      <i className="fas fa-chevron-right fa-rotate-90" />
                    </a>
                    <div className="collapse nav-collapse" id="reports" data-parent="#accordion">
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <a href="profit-loss-report.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Profit / Loss</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="purchase-report.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Purchase Report</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="sale-report.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Sale Report</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="supplier-report.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Supplier Report</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="customer-report.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Customer Report</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="stock-report.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Stock Report</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="stock-adjustment-report.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Stock Adjustment Report</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="outOfStock-report.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Out of Stock Report</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="stock-alert-report.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Stock Alert Report</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="expense-report.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Expense Report</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#setting" role="button" aria-expanded="false" aria-controls="setting">
                      <span className="svg-icon nav-icon">
                        <i className="fas fa-cogs font-size-h4" />
                      </span>
                      <span className="nav-text">Settings</span>
                      <i className="fas fa-chevron-right fa-rotate-90" />
                    </a>
                    <div className="collapse nav-collapse" id="setting" data-parent="#accordion">
                      <div id="accordion3">
                        <ul className="nav flex-column">
                          <li className="nav-item">
                            <a className="nav-link sub-nav-link" data-toggle="collapse" href="#settingB" role="button" aria-expanded="false" aria-controls="settingB">
                              <span className="svg-icon nav-icon d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                </svg>
                              </span>
                              <span className="nav-text">Bussiness Setting</span>
                              <i className="fas fa-chevron-right fa-rotate-90" />
                            </a>
                            <div className="collapse nav-collapse" id="settingB" data-parent="#accordion3">
                              <ul className="nav flex-column">
                                <li className="nav-item">
                                  <a href="bussiness-setting.html#general" className="nav-link mini-sub-nav-link">
                                    <span className="nav-text">General</span>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a href="bussiness-setting.html#pos" className="nav-link mini-sub-nav-link">
                                    <span className="nav-text">POS</span>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a href="bussiness-setting.html#email" className="nav-link mini-sub-nav-link">
                                    <span className="nav-text">Email SMTP Settings</span>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a href="bussiness-setting.html#sms" className="nav-link mini-sub-nav-link">
                                    <span className="nav-text">SMS Setting</span>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a href="bussiness-setting.html#emailtemp" className="nav-link mini-sub-nav-link">
                                    <span className="nav-text">Email Templates</span>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a href="bussiness-setting.html#notification" className="nav-link mini-sub-nav-link">
                                    <span className="nav-text">Notifications Setting</span>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a href="bussiness-setting.html#invoice" className="nav-link mini-sub-nav-link">
                                    <span className="nav-text">Inovice Setting</span>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a href="bussiness-setting.html#barcodes" className="nav-link mini-sub-nav-link">
                                    <span className="nav-text">Bar Code Setting</span>
                                  </a>
                                </li>
                              </ul>
                            </div>	
                          </li>
                          <li className="nav-item">
                            <a className="nav-link sub-nav-link" data-toggle="collapse" href="#settingW" role="button" aria-expanded="false" aria-controls="settingW">
                              <span className="svg-icon nav-icon d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                </svg>
                              </span>
                              <span className="nav-text">Website Settings</span>
                              <i className="fas fa-chevron-right fa-rotate-90" />
                            </a>
                            <div className="collapse nav-collapse" id="settingW" data-parent="#accordion3">
                              <ul className="nav flex-column">
                                <li className="nav-item">
                                  <a href="website-setting.html#general" className="nav-link mini-sub-nav-link">
                                    <span className="nav-text">General</span>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a href="website-setting.html#themeColor" className="nav-link mini-sub-nav-link">
                                    <span className="nav-text">Theming / Colors</span>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a href="website-setting.html#SEO" className="nav-link mini-sub-nav-link">
                                    <span className="nav-text">SEO</span>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a href="website-setting.html#log-sign" className="nav-link mini-sub-nav-link">
                                    <span className="nav-text">Login / SignUp</span>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a href="website-setting.html#slider" className="nav-link mini-sub-nav-link">
                                    <span className="nav-text">Slider</span>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a href="Menu-bulider.html" className="nav-link mini-sub-nav-link">
                                    <span className="nav-text">Menu Builder</span>
                                  </a>
                                </li>
                              </ul>
                            </div>	
                          </li>
                          <li className="nav-item">
                            <a className="nav-link sub-nav-link" data-toggle="collapse" href="#settingA" role="button" aria-expanded="false" aria-controls="settingA">
                              <span className="svg-icon nav-icon d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                </svg>
                              </span>
                              <span className="nav-text">App Settings</span>
                              <i className="fas fa-chevron-right fa-rotate-90" />
                            </a>
                            <div className="collapse nav-collapse" id="settingA" data-parent="#accordion3">
                              <ul className="nav flex-column">
                                <li className="nav-item">
                                  <a href="app-setting.html#general" className="nav-link mini-sub-nav-link">
                                    <span className="nav-text">General</span>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a href="app-setting.html#display" className="nav-link mini-sub-nav-link">
                                    <span className="nav-text">Display In Menu/Sidebar</span>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a href="app-setting.html#notificationS" className="nav-link mini-sub-nav-link">
                                    <span className="nav-text">Local Notification</span>
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a href="app-setting.html#log-sign" className="nav-link mini-sub-nav-link">
                                    <span className="nav-text">Login/Signup</span>
                                  </a>
                                </li>
                              </ul>
                            </div>	
                          </li>
                          <li className="nav-item">
                            <a href="warehouse.html" className="nav-link sub-nav-link">
                              <span className="svg-icon nav-icon d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                </svg>
                              </span>
                              <span className="nav-text">Warehouse</span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="language.html" className="nav-link sub-nav-link">
                              <span className="svg-icon nav-icon d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                </svg>
                              </span>
                              <span className="nav-text">Language</span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="currency.html" className="nav-link sub-nav-link">
                              <span className="svg-icon nav-icon d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                </svg>
                              </span>
                              <span className="nav-text">Currency</span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="payment.html" className="nav-link sub-nav-link">
                              <span className="svg-icon nav-icon d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                </svg>
                              </span>
                              <span className="nav-text">Payement Methods</span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="shippingmethods.html" className="nav-link sub-nav-link">
                              <span className="svg-icon nav-icon d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                </svg>
                              </span>
                              <span className="nav-text">Shipping Methods</span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="Tax.html" className="nav-link sub-nav-link">
                              <span className="svg-icon nav-icon d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                </svg>
                              </span>
                              <span className="nav-text">Tax Settings</span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="coupons.html" className="nav-link sub-nav-link">
                              <span className="svg-icon nav-icon d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                </svg>
                              </span>
                              <span className="nav-text">Coupon Settings</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="nav-header mt-3">
                    <span className="nav-text font-size-bold">UI Elements</span>
                    <span className="svg-icon nav-icon text-primary">
                      <svg width="20px" height="20px" viewBox="0 0 16 16" className="bi bi-three-dots" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                      </svg>
                    </span>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link">
                      <span className="svg-icon nav-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-square">
                          <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
                        </svg>
                      </span>
                      <span className="nav-text">Cards</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#components" role="button" aria-expanded="false" aria-controls="components">
                      <span className="svg-icon nav-icon">
                        <svg width="20px" height="20px" viewBox="0 0 16 16" className="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                        </svg>
                      </span>
                      <span className="nav-text">Components</span>
                      <i className="fas fa-chevron-right fa-rotate-90" />
                    </a>
                    <div className="collapse nav-collapse" id="components" data-parent="#accordion">
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <a href="buttons.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Buttons</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="modals.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Modals</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="alerts.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Alerts</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="tabs.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Tabs</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="Carousel.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Carousel</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="switcher.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Switcher</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item mb-5">
                    <a className="nav-link" data-toggle="collapse" href="#basic-input" role="button" aria-expanded="false" aria-controls="basic-input">
                      <span className="svg-icon nav-icon">
                        <svg width="20px" height="20px" viewBox="0 0 16 16" className="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                        </svg>
                      </span>
                      <span className="nav-text">Forms</span>
                      <i className="fas fa-chevron-right fa-rotate-90" />
                    </a>
                    <div className="collapse nav-collapse" id="basic-input" data-parent="#accordion">
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <a href="form-input.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Basic Input</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="form-select.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Select Input</span>
                          </a>
                        </li>
                        <li className="nav-item"> 
                          <a href="form-radio.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Radio Input</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="form-checkbox.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">checkbox Input</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="form-textarea.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Textarea Input</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="form-editor.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Text Editor</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="datepicker.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Date &amp; Time Picker </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="form-validation.html" className="nav-link sub-nav-link">
                            <span className="svg-icon nav-icon d-flex justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              </svg>
                            </span>
                            <span className="nav-text">Form Validation</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              {/*end::Menu Nav*/}
            </div>
            {/*end::Menu Container*/}
          </div>
          {/*end::Aside Menu*/}
        </div>
      </div>
      {/*begin::Aside*/}
    </div></div>

		
			<div className="aside-overlay"></div>
        </Fragment>
    )
}

export default Testing
