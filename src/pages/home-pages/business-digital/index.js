import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

// layouts
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// component 
import { NioButton, NioIcon, NioMedia, NioCount, NioSection, NioSubscribeField } from '../../../components';

// section content 
import FaqContent from '../../../components/PageComponents/Homepages/BusinessDigital/FaqContent/FaqContent';
import PricingContent from '../../../components/PageComponents/Homepages/BusinessDigital/PricingContent/PricingContent';
import FeaturesContent from '../../../components/PageComponents/Homepages/BusinessDigital/FeaturesContent/FeaturesContent';
import TestimonialContent from '../../../components/PageComponents/Homepages/BusinessDigital/TestimonialContent/TestimonialContent';

function index() {

  return (
    <AppLayout title="Digital Business" variant={9} rootClass="layout-8">

      {/*  Banner Section Start  */}
      <section className="nk-banner nk-banner-dg-business">
        <div className="nk-banner-wrap pb-0">
          <Container>
            <div className="nk-banner-content is-theme px-5 px-md-7 px-lg-0  py-7 py-md-120 position-relative bg-gradient-16 rounded-3 overflow-hidden">
              <div className="nk-mask"  ></div>
              <Row className="align-items-center justify-content-center pb-xl-3">
                <Col lg={8} xl={6}>
                  <div className="text-center">
                    <div className="nk-section-head text-center">
                      <span className="d-inline-block rounded-pill fs-12 py-1 px-3 text-uppercase text-bg-success text-white fw-semibold mb-2" >nioland solutions</span>
                      <h1 className="text-capitalize mb-2" >NioLand Focuses on Customer Satisfaction.</h1>
                      <p className="fs-18 opacity-75" >
                        NioLand is the only saas business platform to run your business on one platform, seamlessly across all digital channels.
                      </p>
                    </div>
                    <div>
                      <NioSubscribeField
                        variant="one"
                        icon="mail before"
                        buttontext="Get Early Access"

                      />
                      <p className="fs-14 mt-4 text-white opacity-75" >
                        Start your free 14-day trial today, no credit card required.
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </section>
      {/*  Banner Section End   */}

      {/*  Brands Section Start  */}
      <NioSection>
        <NioSection.Content>
          <Row className="justify-content-center">
            <Col lg={10} xl={8}>
              <h5 className="fw-normal text-base text-center mb-5" >Over <span className="text-dark">32K+ software</span> business growing with NioLand</h5>
              <Row className="justify-content-center justify-content-lg-between text-center gap g-4">
                {
                  ["a", "b", "c", "d", "e"]?.map((brand, idx) => (
                    <Col key={idx} xs={4} sm={3} lg={2}>
                      <div className="nk-brand" >
                        <Link to="#">
                          <img src={`images/brands/${brand}.png`} alt="feature" />
                        </Link>
                      </div>
                    </Col>
                  ))
                }
              </Row>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Brands Section End  */}

      {/*  Feature Section Start  */}
      <NioSection className="nk-feature-section pb-7 pb-lg-120">
        <NioSection.Head alignX="center">
          <span className="d-inline-block fs-12 rounded-pill py-1 px-3 text-uppercase text-bg-success text-white fw-bold mb-2">Features</span>
          <h2>Gain More Insight Into Features</h2>
          <p className="fs-20"> Explore our features and gain valuable insights into how they can revolutionize your business and drive success. </p>
        </NioSection.Head>
        <NioSection.Content>
          <FeaturesContent />
        </NioSection.Content>
      </NioSection>
      {/*  Feature Section Start  */}

      {/*  Work Section Start  */}
      <NioSection className="overflow-hidden bg-gray">
        <NioSection.Head alignX="center">
          <span className="d-inline-block fs-12 rounded-pill py-1 px-3 text-uppercase text-bg-success text-white fw-bold mb-2">our process</span>
          <h2>Let’s See How it Works</h2>
          <p className="fs-20 mb-0"> Experience the power of our platform firsthand and see how it works to transform your business operations and drive growth. </p>
          <ul className="nk-btn-group justify-content-center pt-5">
            <li>
              <NioButton href="#" className="btn-success" label="More Details" />
            </li>
            <li>
              <NioButton href="/contact-us" className="btn-outline-success" label="Contact Us" />
            </li>
          </ul>
        </NioSection.Head>

        <NioSection.Content>
          <Row className="flex-row-reverse align-items-center justify-content-lg-between">
            <Col lg={5}>
              <div className="nk-video nk-video-s1 mb-5 mb-md-7 mb-lg-0">
                <div className="nk-mask shape-28 d-none d-md-block"  ></div>
                <div className="nk-video-inner" >
                  <div className="nk-video-content">
                    <div className="nk-video-img">
                      <img src="images/business-digital/section-cover-1.jpg" alt="" className="rounded-2 w-100" />
                    </div>
                    <div className="nk-video-btn">
                      <NioMedia
                        rounded
                        size="xl"
                        icon="play-fill"
                        variant="success text-white"
                        lightboxSrc="https://www.youtube.com/watch?v=pVE92TNDwUk"
                        className="shadow-xl animate animate-infinite animate-pulse animate-duration-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} xl={5}>
              <ul className="nk-schedule nk-schedule-s2">
                <li className="nk-schedule-item">
                  <div className="nk-schedule-item-inner">
                    <div className="nk-schedule-symbol">
                      <NioMedia size="md" rounded variant="success-soft" icon="check" />
                    </div>
                    <div className="nk-schedule-content">
                      <span className="d-inline-block fs-14 text-uppercase fw-semibold">step 1</span>
                      <div>
                        <h3>Create Account</h3>
                        <p className="fs-16 ">Sign up and create your account in just a few easy steps. Start exploring and unleashing possibilities today.</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nk-schedule-item">
                  <div className="nk-schedule-item-inner">
                    <div className="nk-schedule-symbol">
                      <NioMedia size="md" rounded variant="success-soft" icon="check" />
                    </div>
                    <div className="nk-schedule-content">
                      <span className="d-inline-block fs-14 text-uppercase fw-semibold">step 2</span>
                      <div>
                        <h3>Collect Ideas</h3>
                        <p className="fs-16 "> Harness the collective creativity of your team and collect brilliant ideas to drive innovation and growth. </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nk-schedule-item">
                  <div className="nk-schedule-item-inner">
                    <div className="nk-schedule-symbol">
                      <NioMedia size="md" rounded variant="success-soft" icon="check" />
                    </div>
                    <div className="nk-schedule-content">
                      <span className="d-inline-block fs-14 text-uppercase fw-semibold">step 3</span>
                      <div>
                        <h3>Data Analysis</h3>
                        <p className="fs-16 ">Unlock the power of data analysis to gain valuable insights and make informed decisions for your business.</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Work Section End  */}

      {/*  Fun-Fact Section Start  */}
      <NioSection className="nk-funfact-section pt-7 pt-lg-120">
        <Row className="g-gs align-items-center justify-content-between text-center text-lg-start">
          <Col lg={4}>
            <div>
              <span className="d-inline-block fs-12 rounded-pill py-1 px-3 text-uppercase text-bg-success text-white fw-bold mb-2">
                our facts
              </span>
              <h2>We Are Proud Of Our works</h2>
            </div>
          </Col>
          <Col lg={8}>
            <Row className="g-gs justify-content-center">
              <Col sm={6} md={4}>
                <div className="nk-funfact-item text-center">
                  <div className="mb-3">
                    <NioIcon size="lg" name="users-fill" className="text-primary" />
                  </div>
                  <NioCount className="h2 mb-1 d-inline-block" end={3472} />
                  <div className="h6 text-light fw-normal">Happy Customers</div>
                </div>
              </Col>
              <Col sm={6} md={4}>
                <div className="nk-funfact-item text-center">
                  <div className="mb-3">
                    <NioIcon size="lg" name="grid-fill-c" className="text-info" />
                  </div>
                  <NioCount className="h2 mb-1 d-inline-block" end={235} decimal="." decimals={3} />
                  <div className="h6 text-light fw-normal">Average Rating</div>
                </div>
              </Col>
              <Col sm={6} md={4}>
                <div className="nk-funfact-item text-center">
                  <div className="mb-3">
                    <NioIcon size="lg" name="user-check-fill" className="text-danger" />
                  </div>
                  <NioCount className="h2 mb-1 d-inline-block" end={2184} />
                  <div className="h6 text-light fw-normal">Active Users</div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </NioSection>
      {/*  Fun-Fact Section End  */}

      {/*  Testimonial Section Start  */}
      <NioSection className="nk-testimonial-section pb-7 pb-lg-120">
        <NioSection.Content>
          <TestimonialContent />
        </NioSection.Content>
      </NioSection>
      {/*  Testimonial Section End  */}

      {/*  Pricing Section Start  */}
      <NioSection className="nk-pricing-section bg-gray">
        <PricingContent />
      </NioSection>
      {/*  Pricing Section End  */}

      {/*  FAQ Section Start  */}
      <NioSection className="nk-faq-section py-7 py-lg-120">
        <NioSection.Head alignX="center">
          <span className="d-inline-block fs-12 rounded-pill py-1 px-3 text-uppercase text-bg-success text-white fw-bold mb-2">faqs</span>
          <h2>Frequently Asked Questions</h2>
          <p className="fs-20"> Find answers to commonly asked questions about our products, services, and policies in our comprehensive FAQ section. </p>
          <ul className="nk-btn-group justify-content-center pt-5">
            <li>
              <NioButton href="#" className="btn-success" icon="arrow-right after" label="Read All Faqs" />
            </li>
          </ul>
        </NioSection.Head>
        <NioSection.Content>
          <FaqContent />
        </NioSection.Content>
      </NioSection>
      {/*  FAQ Section End  */}

      {/*  CTA Section Start  */}
      <NioSection>
        <NioSection.Content className="nk-section-content px-4 px-lg-0 py-7 position-relative bg-darker is-theme rounded-2" masks={["shape-31", "shape-32"]}>
          <Row className="position-relative flex-column align-items-center justify-content-center">
            <Col xl={5}>
              <div className="nk-section-head z-2 text-center pb-5">
                <span className="badge text-bg-success text-white text-uppercase rounded-pill mb-3" >newsletter</span>
                <h2 className="h2" >Subscribe Newsletter</h2>
                <p className="text-white opacity-75">
                  Subscribe to our newsletter for exclusive updates, latest trends, and special offers. Delivered to your inbox within seconds. Join now!
                </p>
              </div>
            </Col>
            <Col lg={6} >
              <NioSubscribeField
                variant="one"
                icon="mail before"
              />
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>

      {/*  CTA Section End  */}

    </AppLayout >
  )
}

export default index;