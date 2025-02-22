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
    [`${useRouteMatch("/") ? "nk-footer-landing" : "nk-footer"}`]: true,

    // bg color
    "bg-dark": useRouteMatch(["/index-crypto-profile"]),
    "bg-blue-1700": useRouteMatch(["/index-bs-analytics"]),
    "bg-gray-1200": useRouteMatch(["/index-bs-consulting", "/index-fintech"]),
    "bg-gray-1100": useRouteMatch(["/index-crypto-profile", "/index-coaching-service"]),
    "is-theme": useRouteMatch(["/index-bs-analytics", "/index-coaching-service", "/index-crypto-profile", "/index-bs-consulting", "/index-fintech"])
  });


  const socialIconClasses = classNames({

    // border radius
    "rounded-1": !useRouteMatch(["/index-crypto-profile"]),

    // bg colors
    "text-bg-purple": useRouteMatch(["/index-kids-course"]),
    "text-bg-white": useRouteMatch(["/index-crypto-profile"]),
    "text-bg-success-alt text-white": useRouteMatch(["/index-live-chat-app"]),
    "text-bg-info text-white": useRouteMatch(["/index-bs-management"]),
    "text-bg-info-alt text-white": useRouteMatch(["/index-language-learning"]),
    "text-bg-indigo text-white": useRouteMatch(["/index-collaboration-tool", "/index-bs-solution", "/about-solution", "/features-solution", "/contact-us-solution", "/pricing-solution"]),
    "text-bg-primary-alt text-white": useRouteMatch(["/index-bs-expense-tracker", "/index-saas", "/index-bs-subscription", "/index-data-driven"]),
    "text-bg-success text-white": useRouteMatch(["/index-bs-digital"]),
    "text-bg-primary": !useRouteMatch(["/index-kids-course", "/index-crypto-profile", "/index-live-chat-app", "/index-bs-management", "/index-language-learning", "/index-collaboration-tool", "/index-bs-solution", "/index-bs-expense-tracker", "/index-saas", "/index-bs-subscription", "/index-data-driven", "/index-bs-digital"]),
  });

  const brandLinkClasses = classNames({
    "text-info": useRouteMatch(["/index-bs-management"]),
    "text-success-alt": useRouteMatch(["/index-live-chat-app"]),
    "text-success": useRouteMatch(["/index-bs-digital"]),
    "text-info-alt": useRouteMatch(["/index-language-learning"]),
    "text-purple": useRouteMatch(["/index-kids-course", "/index-crypto-profile"]),
    "text-primary-alt": useRouteMatch(["/index-bs-expense-tracker", "/index-saas", "/index-bs-subscription", "/index-data-driven"]),
    "text-indigo": useRouteMatch(["/index-collaboration-tool", "/index-bs-solution", "/about-solution", "/features-solution", "/contact-us-solution", "/pricing-solution"]),
    "text-primary": !useRouteMatch(["/index-kids-course", "/index-crypto-profile", "/index-live-chat-app", "/index-bs-management", "/index-language-learning", "/index-collaboration-tool", "/index-bs-solution", "/index-bs-expense-tracker", "/index-saas", "/index-bs-subscription", "/index-data-driven", "/index-bs-digital"])
  });


  const footerTextClasses = classNames({
    // typography
    "fs-16": useRouteMatch(["/index-kids-course"]),
    "fw-medium": useRouteMatch(["/index-kids-course"]),
    "text-capitalize": true,

    // colors
    "text-dark": !useRouteMatch(["/index-crypto-profile"]),
  });

  // variants of navbar 
  function filterDataByVariant(variantNumber) {
    return config.filter(item => item.variant === variantNumber);
  }
  const [data] = filterDataByVariant(variant)

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
                        <h2 className="mb-1">Create Better Build Faster</h2>
                        <p className="m-0">Everything you need to create your next unique and professional website, including impressive and ready-made pages.</p>
                        <div className="call-to-action pt-5 pt-lg-7">
                          <Link to="https://themeforest.net/user/softnio/portfolio" target="_blank" className="btn btn-primary mb-1">
                            <NioIcon name="bag-fill" className="me-2" />
                            Purchase NioLand Now
                          </Link>
                          <Link to="https://themeforest.net/user/softnio/portfolio" target="_blank">
                            <img src="/images/icon/envato.png" alt="envato" />
                            <span>Available only on Envato</span>
                          </Link>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
            </div>
            <div className="nk-footer-landing-copyright py-3">
              <Container>
                <p className="mb-0 text-capitalize">
                  Copyright &copy; <span className="text-white">{new Date().getFullYear()}</span> NioLand. Template made by <Link to="https://softnio.com/" target="_blank" className={brandLinkClasses}>Softnio</Link>
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
                        <div className="nk-footer-brand-info mb-4">
                          <div className="nk-footer-logo">
                            <NioBrand logo={data.footer.logo?.name} variant={data.footer.logo?.variant} />
                          </div>
                          <p>Streamline your business operations with our powerful suite of solutions. Boost productivity and drive growth with NioLand.</p>
                        </div>
                        <ul className="nk-footer-social">
                          <li>
                            <Link to="#" className={socialIconClasses}>
                              <NioIcon name="facebook-f" />
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className={socialIconClasses}>
                              <NioIcon name="twitter" />
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className={socialIconClasses}>
                              <NioIcon name="linkedin" />
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className={socialIconClasses}>
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
                                <Link to="/features">Features</Link>
                              </li>
                              <li className="col-6">
                                <Link to="/about">About</Link>
                              </li>
                              <li className="col-6">
                                <Link to="/pricing">Pricing</Link>
                              </li>
                              <li className="col-6">
                                <Link to="/blogs">Blog</Link>
                              </li>
                              <li className="col-6">
                                <Link to="/blog-details">Blog Post</Link>
                              </li>
                              <li className="col-6">
                                <Link to="/customer-testimonials">Customer Reviews</Link>
                              </li>
                              <li className="col-6">
                                <Link to="/help-center">Help Center</Link>
                              </li>
                              <li className="col-6">
                                <Link to="/contact-us">Contact</Link>
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
                                <Link to="/auth/signup">Sign up</Link>
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
                      <p className="nk-footer-copyright-text text-center text-lg-start">&copy; 2011 - <span id="currentYear"> {new Date().getFullYear()} </span>
                        <Link className={brandLinkClasses} to="https://softnio.com/" target="_blank"> Softnio</Link>. All Rights Reserved.
                      </p>
                    </Col>
                    <Col lg={6} className="px-0">
                      <ul className="nk-footer-copyright justify-content-center justify-content-lg-end">
                        <li>
                          <Link className={footerTextClasses} to="#">All Rights</Link>
                        </li>
                        <li>
                          <Link className={footerTextClasses} to="#">Terms & conditions</Link>
                        </li>
                        <li>
                          <Link className={footerTextClasses} to="#">Privacy Policy</Link>
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
    </footer >
  )
}