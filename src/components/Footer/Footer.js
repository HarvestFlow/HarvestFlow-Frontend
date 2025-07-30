import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

// config 
import config from '../../data/layout-config';

// custom hooks
import useRouteMatch from '../../hooks/useRouteMatch';

// components
import { NioBrand, NioIcon } from '..';

export default function Footer({ variant = 1, children }) {
  const compClasses = classNames({
    [`${useRouteMatch("/dashboard") ? "nk-footer-harvest" : "nk-footer"}`]: true,

    // bg color
    "bg-dark": useRouteMatch(["/dashboard/parcelinfo"]),
    "bg-green-700": useRouteMatch(["/dashboard/BuyerOffers"]),
    "bg-gray-1200": useRouteMatch(["/dashboard/trade-wizard", "/dashboard/gestionUser"]),
    "is-theme": useRouteMatch(["/dashboard/parcelinfo", "/dashboard/BuyerOffers", "/dashboard/trade-wizard", "/dashboard/gestionUser"])
  });

  const socialIconClasses = classNames({
    // border radius
    "rounded-1": !useRouteMatch(["/dashboard/parcelinfo"]),

    // bg colors
    "text-bg-green-500 text-white": useRouteMatch(["/dashboard/parcelinfo"]),
    "text-bg-blue-600 text-white": useRouteMatch(["/dashboard/BuyerOffers"]),
    "text-bg-gray-800 text-white": useRouteMatch(["/dashboard/trade-wizard"]),
    "text-bg-primary text-white": useRouteMatch(["/dashboard/gestionUser"]),
    "text-bg-primary": !useRouteMatch(["/dashboard/parcelinfo", "/dashboard/BuyerOffers", "/dashboard/trade-wizard", "/dashboard/gestionUser"]),
  });

  const brandLinkClasses = classNames({
    "text-green-500": useRouteMatch(["/dashboard/parcelinfo"]),
    "text-blue-600": useRouteMatch(["/dashboard/BuyerOffers"]),
    "text-gray-800": useRouteMatch(["/dashboard/trade-wizard"]),
    "text-primary": useRouteMatch(["/dashboard/gestionUser"]),
    "text-primary": !useRouteMatch(["/dashboard/parcelinfo", "/dashboard/BuyerOffers", "/dashboard/trade-wizard", "/dashboard/gestionUser"])
  });

  const footerTextClasses = classNames({
    // typography
    "fs-16": useRouteMatch(["/dashboard/parcelinfo"]),
    "fw-medium": useRouteMatch(["/dashboard/parcelinfo"]),
    "text-capitalize": true,

    // colors
    "text-dark": !useRouteMatch(["/dashboard/parcelinfo"]),
  });

  // variants of footer 
  function filterDataByVariant(variantNumber) {
    return config.filter(item => item.variant === variantNumber);
  }
  const [data] = filterDataByVariant(variant);

  return (
    <footer className={compClasses}>
      {
        data.footer.variant === 1 ?
          <>
            <div className="call-to">
              <div className="nk-mask z-1 blur-6"></div>
              <Container>
                <div className="call-to-content z-1 position-relative is-theme py-7">
                  <Row className="justify-content-center">
                    <Col xl={6}>
                      <div className="call-to-info text-center">
                        
                        <NioBrand className="mb-3" logo={data.footer.logo?.name || "s1"} variant={data.footer.logo?.variant || "dark"} />
                        <h2 className="mb-1">Grow Smarter with Harvest Flow</h2>
                        <p className="m-0">Empower your agricultural business with tools to manage crops, trade, and finances efficiently.</p>
                        <div className="call-to-action pt-5 pt-lg-7">
                          <Link to="/dashboard" className="btn btn-primary mb-1">
                            <NioIcon name="bag-fill" className="me-2" />
                            Get Started with Harvest Flow
                          </Link>
                          <Link to="https://harvestflow.com" target="_blank">
                            <img src="/images/icon/harvestflow.png" alt="harvestflow" />
                            <span>Explore Harvest Flow</span>
                          </Link>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
            </div>
            <div className="nk-footer-harvest-copyright py-3">
              <Container>
                <p className="mb-0 text-capitalize">
                  Copyright © <span className="text-white">{new Date().getFullYear()}</span> Harvest Flow. Made by <Link to="https://harvestflow.com/" target="_blank" className={brandLinkClasses}>Harvest Flow</Link>
                </p>
              </Container>
            </div>
          </>
          :
          data.footer.variant === 2 ?
            <section className={compClasses}>
              <div className="nk-footer-top">
                <Container>
                  <Row className="nk-footer-content justify-content-xl-between">
                    <Col md={8} lg={4} xl={4}>
                      <div className="nk-footer-brand pb-5 pb-lg-0">
                        <div className="nk-footer-logo">
                          <NioBrand logo={data.footer.logo?.name} variant={data.footer.logo?.variant} />
                        </div>
                        <p>Harvest Flow provides innovative solutions for farmers, distributors, and transporters to optimize their agricultural operations.</p>
                        <ul className="nk-footer-social">
                          <li>
                            <Link to="https://facebook.com/harvestflow" className={socialIconClasses} target="_blank">
                              <NioIcon name="facebook-f" />
                            </Link>
                          </li>
                          <li>
                            <Link to="https://twitter.com/harvestflow" className={socialIconClasses} target="_blank">
                              <NioIcon name="twitter" />
                            </Link>
                          </li>
                          <li>
                            <Link to="https://linkedin.com/company/harvestflow" className={socialIconClasses} target="_blank">
                              <NioIcon name="linkedin" />
                            </Link>
                          </li>
                          <li>
                            <Link to="https://telegram.me/harvestflow" className={socialIconClasses} target="_blank">
                              <NioIcon name="telegram" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col lg={8} xl={6}>
                      <Row className="justify-content-between">
                        <Col sm={8} md={7}>
                          <div className="nk-footer-info">
                            <h5 className="title">Pages</h5>
                            <ul className="row gy-1 gy-sm-4">
                              <li className="col-6">
                                <Link to="/dashboard/parcelinfo">Parcel Info</Link>
                              </li>
                              <li className="col-6">
                                <Link to="/dashboard/MapSelector">Map</Link>
                              </li>
                              <li className="col-6">
                                <Link to="/dashboard/StockManagement">Stock Management</Link>
                              </li>
                              <li className="col-6">
                                <Link to="/dashboard/WheatPrediction">Wheat Prediction</Link>
                              </li>
                              <li className="col-6">
                                <Link to="/dashboard/FarmerOffers">Farmer Offers</Link>
                              </li>
                              <li className="col-6">
                                <Link to="/dashboard/recommendations">Recommendations</Link>
                              </li>
                              <li className="col-6">
                                <Link to="/dashboard/trade">Trade Data</Link>
                              </li>
                              <li className="col-6">
                                <Link to="/dashboard/CountryStats">Country Stats</Link>
                              </li>
                              <li className="col-6">
                                <Link to="/dashboard/trade-wizard">Trade Wizard</Link>
                              </li>
                              <li className="col-6">
                                <Link to="/dashboard/financialManagment">Finance Dashboard</Link>
                              </li>
                            </ul>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div className="nk-footer-info">
                            <h5 className="title">Utility Pages</h5>
                            <ul className="row gy-1 gy-sm-4">
                              <li className="col-12">
                                <Link to="/auth/login">Login</Link>
                              </li>
                              <li className="col-12">
                                <Link to="/auth/signup">Sign Up</Link>
                              </li>
                              <li className="col-12">
                                <Link to="/auth/reset-password">Reset Password</Link>
                              </li>
                              <li className="col-12">
                                <Link to="/404">404 Not Found</Link>
                              </li>
                            </ul>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </div>
              <div className="nk-footer-bottom">
                <Container>
                  <Row className="nk-footer-content justify-content-between">
                    <Col lg={6} className="px-0">
                      <p className="nk-footer-copyright-text text-center text-lg-start">
                        © 2011 - <span id="currentYear">{new Date().getFullYear()}</span>
                        <Link className={brandLinkClasses} to="https://harvestflow.com/" target="_blank"> Harvest Flow</Link>. All Rights Reserved.
                      </p>
                    </Col>
                    <Col lg={6} className="px-0">
                      <ul className="nk-footer-copyright justify-content-center justify-content-lg-end">
                        <li>
                          <Link className={footerTextClasses} to="/terms">Terms & Conditions</Link>
                        </li>
                        <li>
                          <Link className={footerTextClasses} to="/privacy">Privacy Policy</Link>
                        </li>
                        <li>
                          <Link className={footerTextClasses} to="/contact">Contact Us</Link>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </Container>
              </div>
            </section>
            :
            <>
              {children}
            </>
      }
    </footer>
  );
}