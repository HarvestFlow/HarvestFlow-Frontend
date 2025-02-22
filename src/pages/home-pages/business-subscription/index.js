import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

// layout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components 
import { NioButton, NioCount, NioIcon, NioMedia, NioSection, NioCard, NioSubscribeField } from '../../../components';

// section content 
import FaqContent from '../../../components/PageComponents/Homepages/BSSubscription/FaqContent/FaqContent';
import PricingContent from '../../../components/PageComponents/Homepages/BSSubscription/PricingContent/PricingContent';
import TestimonialContent from '../../../components/PageComponents/Homepages/BSSubscription/TestimonialContent/TestimonialContent';

function index() {
  return (
    <AppLayout variant={12} title="Subscriptions" rootClass="layout-11">

      {/*  Banner Section Start   */}
      <section className="nk-banner nk-banner-bs-subscription  is-theme is-theme-bg">
        <div className="nk-banner-wrap">
          <Container>
            <Row className="align-items-center justify-content-lg-between position-relative">
              <Col lg={6} >
                <div className="nk-section-head text-center text-lg-start pb-5 pb-sm-7 pb-lg-0">
                  <span className="d-inline-block fs-16 fw-semibold text-danger text-uppercase mb-2" >Nioland solutions</span>
                  <h1 className="display-6 mb-md-5" >Grow Your <br className="d-none d-lg-block" /> Business With <span className="d-lg-block"> Our Subscriptions.</span></h1>
                  <p className="fs-20 opacity-75 mb-0" >
                    NioLand is the only saas business platform to run your business on one platform, seamlessly across all digital channels.
                  </p>
                  <ul className="nk-btn-group justify-content-center justify-content-lg-start pt-5 pt-lg-6">
                    <li>
                      <NioButton href="#" label="Request A Demo" className="btn btn-danger text-nowrap" />
                    </li>
                    <li>
                      <NioButton href="/auth/sign-up" label="Sign Up" className="btn btn-white text-dark text-nowrap" />
                    </li>
                  </ul>
                  <Row className="justify-content-center justify-content-lg-start pt-5 pt-lg-7">
                    <Col md={10} lg={12}>
                      <div>
                        <h5 className="mb-2 fw-medium" >Trusted by</h5>
                        <Row className="justify-content-center justify-content-lg-start gy-2 gy-md-0">
                          <Col xs={4} sm={3} >
                            <Link to="#" className="nk-brand">
                              <img src="images/brands/a-light.png" alt="brand" className="opacity-75" />
                            </Link>
                          </Col>
                          <Col xs={4} sm={3} >
                            <Link to="#" className="nk-brand">
                              <img src="images/brands/b-light.png" alt="brand" className="opacity-75" />
                            </Link>
                          </Col>
                          <Col xs={4} sm={3} >
                            <Link to="#" className="nk-brand">
                              <img src="images/brands/c-light.png" alt="brand" className="opacity-75" />
                            </Link>
                          </Col>
                          <Col xs={4} sm={3} >
                            <Link to="#" className="nk-brand">
                              <img src="images/brands/d-light.png" alt="brand" className="opacity-75" />
                            </Link>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col lg={5}>
                <div className="nk-banner-cover nk-frame nk-frame-three">
                  <img src="images/business-subscription/banner-cover-1.jpg" alt="banner-cover" className="rounded-5 overflow-hidden" />
                  <div className="nk-frame-children nk-frame-children-one">
                    <img src="images/business-subscription/mask-circle-1.png" alt="mask-circle" />
                  </div>
                  <div className="nk-frame-children nk-frame-children-two">
                    <img src="images/business-subscription/mask-dot-1.png" className="animate animate-shakeY animate-duration-12" alt="mask-circle" />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/*  Banner Section End   */}

      {/* features Section Start */}
      <NioSection className="nk-section-features py-7 py-lg-120">
        <NioSection.Head alignX="center">
          <span className="d-inline-block fs-14 fw-bold text-uppercase text-primary-alt mb-2">powerfull features</span>
          <h2>Discover Powerful Features</h2>
          <p className="fs-20 mb-0"> Unlock a range of powerful features designed to enhance your experience and maximize productivity. Explore now! </p>
          <ul className="nk-btn-group justify-content-center pt-5">
            <li>
              <NioButton href="#" label="More Details" className="btn-primary-alt text-nowrap" />
            </li>
            <li>
              <NioButton href="#" label="Contact Us" className="btn-outline-primary-alt text-nowrap" />
            </li>
          </ul>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="gy-5 gy-lg-7">
            <Col md={6} lg={4}>
              <NioCard className="text-center bg-transparent border-0" >
                <NioCard.Body className="p-0">
                  <NioMedia size="lg" rounded icon="trend-up" variant="primary-alt-soft" className="mb-4" />
                  <div className="mb-4">
                    <h4>Custom analytics</h4>
                    <p className="fs-16  line-clamp-2">Get a complete sales dashboard in the cloud. See activity, revenue and social metrics all in one.</p>
                  </div>
                  <Link to="#" className="btn-link ">
                    <span>Learn More</span>
                    <NioIcon name="arrow-right" />
                  </Link>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4}>
              <NioCard className="text-center bg-transparent border-0" >
                <NioCard.Body className="p-0">
                  <NioMedia size="lg" rounded icon="emails" variant="success-soft" className="mb-4" />
                  <div className="mb-4">
                    <h4>Measure your performance</h4>
                    <p className="fs-16  line-clamp-2"> Stay connected with your team and make quick decisions wherever you are. </p>
                  </div>
                  <Link to="#" className="btn-link ">
                    <span>Learn More</span>
                    <NioIcon name="arrow-right" />
                  </Link>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4}>
              <NioCard className="text-center bg-transparent border-0" >
                <NioCard.Body className="p-0">
                  <NioMedia size="lg" rounded icon="users" variant="warning-soft" className="mb-4" />
                  <div className="mb-4">
                    <h4>Team Management</h4>
                    <p className="fs-16  line-clamp-2"> Our calendar lets you know what is happening with customer and projects so you. </p>
                  </div>
                  <Link to="#" className="btn-link ">
                    <span>Learn More</span>
                    <NioIcon name="arrow-right" />
                  </Link>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4}>
              <NioCard className="text-center bg-transparent border-0" >
                <NioCard.Body className="p-0">
                  <NioMedia size="lg" rounded icon="edit-alt" variant="danger-soft" className="mb-4" />
                  <div className="mb-4">
                    <h4>Build your website</h4>
                    <p className="fs-16  line-clamp-2">A tool that lets you build a dream website even if you know nothing about web design.</p>
                  </div>
                  <Link to="#" className="btn-link ">
                    <span>Learn More</span>
                    <NioIcon name="arrow-right" />
                  </Link>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4}>
              <NioCard className="text-center bg-transparent border-0" >
                <NioCard.Body className="p-0">
                  <NioMedia size="lg" rounded icon="grid" variant="purple-soft" className="mb-4" />
                  <div className="mb-4">
                    <h4>Connect multiple apps</h4>
                    <p className="fs-16  line-clamp-2"> The first business platform to bring together all of your products from one place. </p>
                  </div>
                  <Link to="#" className="btn-link ">
                    <span>Learn More</span>
                    <NioIcon name="arrow-right" />
                  </Link>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4}>
              <NioCard className="text-center bg-transparent border-0" >
                <NioCard.Body className="p-0">
                  <NioMedia size="lg" rounded icon="setting-alt" variant="cyan-soft" className="mb-4" />
                  <h4>Easy Setups</h4>
                  <p className="fs-16  line-clamp-2">End to End Business Platform, Sales Management, Marketing Automation, Help Desk</p>
                  <Link to="#" className="btn-link ">
                    <span>Learn More</span>
                    <NioIcon name="arrow-right" />
                  </Link>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/* features Section End */}

      {/* Process Section Start */}
      <NioSection className="nk-how-it-work-section bg-gray overflow-hidden">
        <Row className="justify-content-center">
          <Col lg={8} xl={7}>
            <div className="nk-section-head text-center pb-7">
              <span className="d-inline-block fs-14 fw-bold text-uppercase text-danger mb-2">our process</span>
              <h2>Let’s See How it Works</h2>
              <p className="fs-20 mb-0">
                Get a firsthand look at how our platform works and discover its intuitive interface and seamless functionality. Dive in now!
              </p>
              <ul className="nk-btn-group justify-content-center pt-5">
                <li>
                  <NioButton href="#" className="btn-danger text-white" label="More Details" />
                </li>
                <li>
                  <NioButton href="/contact-us" className="btn-outline-danger" label="Contact Us" />
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <NioSection.Content>
          <Row className="flex-row-reverse align-items-center justify-content-between">
            <Col lg={5} >
              <div className="nk-video nk-video-s1 mb-5 mb-md-7 mb-lg-0 ">
                <div className="nk-mask shape-28 d-none d-md-block"></div>
                <div className="nk-video-inner">
                  <div className="nk-video-content">
                    <div className="nk-video-img">
                      <img src="images/business-digital/section-cover-1.jpg" alt="" className="rounded-2 w-100" />
                    </div>
                    <div className="nk-video-btn">
                      <NioMedia
                        size="lg"
                        rounded
                        icon="play-fill text-white"
                        lightboxSrc="https://www.youtube.com/watch?v=pVE92TNDwUk"
                        className="text-bg-danger shadow-xl animate animate-infinite animate-pulse animate-duration-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} xl={5}>
              <ul className="nk-schedule d-flex flex-column gap-5 nk-schedule-s2">
                <li className="nk-schedule-item p-0">
                  <div className="nk-schedule-item-inner">
                    <div className="nk-schedule-symbol">
                      <NioMedia size="md" rounded icon="check" variant="danger-soft" />
                    </div>
                    <div className="nk-schedule-content">
                      <span className="fs-14 fw-semibold text-uppercase  mb-3">step 1</span>
                      <div>
                        <h3 className="mb-2">Create Account</h3>
                        <p className="fs-16 "> Sign up and create your account in just a few easy steps. Join our platform and unlock a world of possibilities today. </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nk-schedule-item p-0">
                  <div className="nk-schedule-item-inner">
                    <div className="nk-schedule-symbol">
                      <NioMedia size="md" rounded icon="check" variant="danger-soft" />
                    </div>
                    <div className="nk-schedule-content">
                      <span className="fs-14 fw-semibold text-uppercase  mb-3">step 2</span>
                      <div>
                        <h3 className="mb-2">Collect Ideas</h3>
                        <p className="fs-16 "> Capture, organize, and collaborate on ideas seamlessly with our intuitive platform. Empower your team's creativity and drive innovation with ease. </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nk-schedule-item p-0">
                  <div className="nk-schedule-item-inner">
                    <div className="nk-schedule-symbol">
                      <NioMedia size="md" rounded icon="check" variant="danger-soft" />
                    </div>
                    <div className="nk-schedule-content">
                      <span className="fs-14 fw-semibold text-uppercase  mb-3">step 3</span>
                      <div>
                        <h3 className="mb-2">Data Analysis</h3>
                        <p className="fs-16 "> Uncover valuable insights and make data-driven decisions with our advanced data analysis tools. </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/* Process Section End */}

      {/* funfact Section Start */}
      <NioSection className="nk-funfact-section pt-7 pt-lg-120">
        <NioSection.Content>
          <Row className="align-items-center justify-content-between text-center text-lg-start">
            <Col lg={4}>
              <div className="nk-section-head pb-7 pb-lg-0">
                <span className="d-inline-block fs-14 fw-bold text-uppercase text-danger mb-2">our facts</span>
                <h2>We are proud of our works</h2>
              </div>
            </Col>
            <Col lg={8}>
              <Row className="gy-5 gy-md-0 justify-content-center">
                <Col sm={6} md={4} >
                  <div className="text-center">
                    <div className="mb-3">
                      <NioIcon size="lg" name="users-fill" className="text-primary" />
                    </div>
                    <div>
                      <NioCount className="h2 d-block" end={3472} />
                      <p className="fs-18 ">Happy Customers</p>
                    </div>
                  </div>
                </Col>
                <Col sm={6} md={4} >
                  <div className="text-center">
                    <div className="mb-3">
                      <NioIcon size="lg" name="grid-fill-c" className="text-info" />
                    </div>
                    <div>
                      <NioCount className="h2 d-block" end={235} decimals={2} decimal="." />
                      <p className="fs-18 ">Average Rating</p>
                    </div>
                  </div>
                </Col>
                <Col sm={6} md={4} >
                  <div className="text-center">
                    <div className="mb-3">
                      <NioIcon size="lg" name="user-check-fill" className="text-warning" />
                    </div>
                    <div>
                      <NioCount className="h2 d-block" end={2184} />
                      <p className="fs-18 ">Active Users</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/* funfact Section Start */}

      {/* Customer Testimonials Section Start */}
      <NioSection>
        <NioSection.Content>
          <TestimonialContent />
        </NioSection.Content>
      </NioSection>
      {/* Customer Testimonials Section End */}

      {/* Faqs Section Start */}
      <NioSection className="nk-section-faq">
        <Row className="justify-content-between">
          <Col xl={4}>
            <div className="nk-section-head pb-5 pb-xl-0">
              <span className="d-inline-block fs-14 fw-bold text-uppercase text-primary-alt mb-2">FAQS</span>
              <h2>Frequently Asked Questions</h2>
              <p className="fs-20 mb-0"> Get quick answers to common queries about our service, pricing, security, and account management in our FAQ section. </p>
              <ul className="nk-btn-group pt-5">
                <li>
                  <NioButton href="/help-center" label="Go to support center" className="btn-primary-alt text-nowrap" />
                </li>
                <li>
                  <NioButton href="/contact" label="Contact Us" className="btn-primary-alt-soft" />
                </li>
              </ul>
            </div>
          </Col>
          <Col xl={8} >
            <FaqContent />
          </Col>
        </Row>
      </NioSection>
      {/* Faqs Section End */}

      {/* Pricing Plans Section Start */}
      <NioSection className="nk-section-pricing bg-blue-50">
        <PricingContent />
      </NioSection>
      {/* Pricing Plans Section End */}

      {/* Cta Section Start */}
      <NioSection className="nk-section-cta pt-7 pt-lg-120">
        <NioSection.Content className="nk-cta-card card-mask card-mask-one bg-primary-alt p-5 px-md-5 py-md-7 p-lg-7 rounded-3">
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="nk-section-head pb-5 text-center">
                <h2 className="text-white">Get Voucher Discount Up To 50%</h2>
                <p className="fs-20 text-white opacity-75">Put your email address and get started</p>
              </div>
            </Col>
            <Col lg={8} xl={6}>
              <NioSubscribeField
                icon="mail before"
                variant="one"
                buttontext="Get Voucher"
              />
              <ul className="d-flex flex-wrap justify-content-center gap g-3 mt-5 mt-lg-7">
                <li className="m-0">
                  <Link className="d-inline-flex rounded-2 overflow-hidden h-60" to="#">
                    <img src="images/apps/app-store.png" srcSet="images/apps/app-store2x.png 2x" className="img-fluid" alt="app-store" />
                  </Link>
                </li>
                <li className="m-0">
                  <Link className="d-inline-flex rounded-2 overflow-hidden h-60" to="#">
                    <img src="images/apps/play-store.png" srcSet="images/apps/play-store2x.png 2x" className="img-fluid" alt="play-store" />
                  </Link>
                </li>
              </ul>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/* Cta Section End */}

    </AppLayout >
  )
}

export default index;