import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

// layouts 
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components 
import { NioSection, NioIcon, NioCount, NioButton, NioCard, NioMedia, NioSubscribeField, NioBrand } from '../../../components';

// section content 
import FaqContent from '../../../components/PageComponents/InnerPages/AboutSolution/FaqContent/FaqContent';
import BannerContent from '../../../components/PageComponents/InnerPages/AboutSolution/BannerContent/BannerContent';

function index() {
  return (
    <AppLayout variant={7} title="About" rootClass="layout-6">

      {/*   Banner Section Start  */}
      <div className="nk-banner">
        <div className="nk-banner-wrap nk-banner-business-feature pb-5 pb-xl-7 overflow-hidden">
          <div className="nk-mask shape-36"></div>
          <Container>
            <div className="nk-section-head text-center is-theme">
              <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-indigo text-white fw-bold py-1 px-3 mb-3" >Meet our company</span>
              <h1 >
                We’re A People <br className="d-none d-md-block " />
                <span className="text-indigo">Focused Organisation.</span>
              </h1>
            </div>
            <div className="nk-banner-slider-content">
              <BannerContent />
            </div>
          </Container>
        </div>
      </div>
      {/*  Banner Section End   */}

      {/*  Features Section Start   */}
      <NioSection className="pt-7 pt-lg-120">
        <NioSection.Content>
          <Row className="gy-5 gy-lg-0 gx-lg-7">
            <Col sm={6} lg={3} >
              <div className="text-center">
                <div className="h2 text-uppercase">
                  <NioCount end={4} suffix="m" />
                  <span className="text-indigo"> +</span>
                </div>
                <h5 className="text-capitalize">Global Customers</h5>
                <p> Serving global customers with tailored solutions for their business. </p>
              </div>
            </Col>
            <Col sm={6} lg={3} >
              <div className="text-center">
                <div className="h2 text-uppercase">
                  <NioCount end={600} />
                  <span className="text-indigo"> %</span>
                </div>
                <h5 className="text-capitalize">Annual Revenue</h5>
                <p> Our annual revenue reflects our success in delivering value.</p>
              </div>
            </Col>
            <Col sm={6} lg={3} >
              <div className="text-center">
                <div className="h2 text-uppercase">
                  <NioCount end={20} />
                  <span className="text-indigo"> k</span>
                </div>
                <h5 className="text-capitalize">5 Star Reviews</h5>
                <p> Our 5-star reviews are a testament to the satisfaction and positive.</p>
              </div>
            </Col>
            <Col sm={6} lg={3} >
              <div className="text-center">
                <div className="h2 text-uppercase">
                  <NioCount end={240} />
                  <span className="text-indigo"> %</span>
                </div>
                <h5 className="text-capitalize">Retun on Investment</h5>
                <p> Our focus on delivering a strong return on investment ensures that our.</p>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Features Section End    */}

      {/*  our-mission Section Start   */}
      <NioSection className="pb-7 pb-lg-120">
        <NioSection.Content>
          <Row className="flex-row-reverse justify-content-between align-items-center">
            <Col lg={5}>
              <div className="nk-frame mb-5 mb-lg-0" >
                <img src="images/peoples/people-5.jpg" alt="mission-cover" className="rounded-16 w-100" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="nk-section-haed pb-0">
                <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-indigo text-white fw-bold py-1 px-3 mb-3">our mission</span>
                <h2>
                  <span className="d-inline-block d-lg-block"> We'll help <span className="text-indigo">Digitally</span>
                  </span> transform your business.
                </h2>
                <p className="fs-20">With our expertise and innovative solutions, we will guide your business through a successful digital transformation journey.</p>
                <Row className="py-5">
                  <Col xs={6} sm={4}>
                    <div className="description-block">
                      <span>
                        <NioIcon name="cpu" className="text-danger" />
                      </span>
                      <div className="info">
                        <h5>2.75x</h5>
                        <p className="fs-16 mb-0">Short Description</p>
                      </div>
                    </div>
                  </Col>
                  <Col xs={6} sm={4}>
                    <div className="description-block">
                      <span>
                        <NioIcon name="cmd" className="text-success" />
                      </span>
                      <div className="info">
                        <h5>80.5%</h5>
                        <p className="fs-16 mb-0">Short Description</p>
                      </div>
                    </div>
                  </Col>
                </Row>
                <ul className="nk-btn-group flex-wrap pt-3">
                  <li>
                    <NioButton href="#" className="btn-indigo" label="Get Started For Free" />
                  </li>
                  <li>
                    <NioButton href="/contact-us-solution" className="btn-outline-indigo" label="Contact Us" />
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  our-mission Section End    */}

      {/*  our-journey Section Start   */}
      <NioSection className="nk-section-journey bg-indigo-50 overflow-hidden" masks={["z-1 shape-37 d-none d-xl-block"]}>
        <NioSection.Head alignX="center">
          <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-indigo text-white fw-bold py-1 px-3 mb-3">timeline</span>
          <h2>Our Journey Defines Us</h2>
          <p className="fs-20">Our journey is a testament to our growth, resilience, and commitment to excellence, defining who we are today.</p>
        </NioSection.Head>
        <NioSection.Content>
          <div className="journey-contents">
            <div className="journey-item h-100" >
              <div className="circle">
                <span className="circle-dot"></span>
              </div>
              <NioCard className="card-journey journey-card">
                <div className="card-journey-content">
                  <div className="d-flex align-items-center mb-2">
                    <h6 className="mb-0">2010</h6>
                    <p className="text-indigo fs-18 text-capitalize fw-semibold ms-1">Company started</p>
                  </div>
                  <blockquote>
                    <p> Our company started with a vision to revolutionize [industry/sector] and has since grown into a thriving business.</p>
                  </blockquote>
                </div>
              </NioCard>
            </div>
            <div className="journey-item h-100" >
              <div className="circle">
                <span className="circle-dot"></span>
              </div>
              <NioCard className="card-journey journey-card">
                <div className="card-journey-content">
                  <div className="d-flex align-items-center mb-2">
                    <h6 className="mb-0">2011</h6>
                    <p className="text-indigo fs-18 text-capitalize fw-semibold ms-1">Our startup goes live</p>
                  </div>
                  <blockquote>
                    <p> Exciting news! Our startup has officially gone live, bringing our innovative [product/service] to the market.</p>
                  </blockquote>
                </div>
              </NioCard>
            </div>
            <div className="journey-item h-100" >
              <div className="circle">
                <span className="circle-dot"></span>
              </div>
              <NioCard className="card-journey journey-card">
                <div className="card-journey-content">
                  <div className="d-flex align-items-center mb-2">
                    <h6 className="mb-0">2012</h6>
                    <p className="text-indigo fs-18 text-capitalize fw-semibold ms-1">Made $2M+ profits</p>
                  </div>
                  <blockquote>
                    <p>We are thrilled to announce that we have achieved over $2 million in profits, a testament to our successful business growth and financial performance.</p>
                  </blockquote>
                </div>
              </NioCard>
            </div>
            <div className="journey-item h-100" >
              <div className="circle">
                <span className="circle-dot"></span>
              </div>
              <NioCard className="card-journey journey-card">
                <div className="card-journey-content">
                  <div className="d-flex align-items-center mb-2">
                    <h6 className="mb-0">2013</h6>
                    <p className="text-indigo fs-18 text-capitalize fw-semibold ms-1">Sold for 20M+</p>
                  </div>
                  <blockquote>
                    <p> Exciting news! We have recently finalized the sale of our company for a remarkable amount of over $20 million, marking a significant milestone in our journey. </p>
                  </blockquote>
                </div>
              </NioCard>
            </div>
          </div>
        </NioSection.Content >
      </NioSection >
      {/*   our-journey Section End    */}

      {/*  experts Section Start  */}
      <NioSection className="pt-7 pt-lg-120">
        <NioSection.Head alignX="center">
          <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-indigo text-white fw-bold py-1 px-3 mb-3">Team members</span>
          <h2>Meet our experts</h2>
          <p className="fs-20">Introducing our team of experts who bring a wealth of knowledge and experience to help you achieve your goals. </p>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="gy-5 gy-xl-0">
            <Col lg={4} md={6} >
              <div className="team-card">
                <div className="team-card-cover">
                  <img src="images/team/e.png" alt="team-member" className="img-fluid" />
                </div>
                <div className="team-card-details">
                  <div className="info">
                    <Link to="#">
                      <h5 className="text-capitalize m-0">Jimy Smith</h5>
                    </Link>
                    <span>Founder</span>
                  </div>
                  <NioMedia href="#" rounded icon="twitter" className="bg-gray-100" />
                </div>
              </div>
            </Col>
            <Col lg={4} md={6} >
              <div className="team-card">
                <div className="team-card-cover">
                  <img src="images/team/f.png" alt="team-member" className="img-fluid" />
                </div>
                <div className="team-card-details">
                  <div className="info">
                    <Link to="#">
                      <h5 className="text-capitalize m-0">Steven Smith</h5>
                    </Link>
                    <span>Co Founder</span>
                  </div>
                  <NioMedia href="#" rounded icon="apple" className="bg-gray-100" />
                </div>
              </div>
            </Col>
            <Col lg={4} md={6} >
              <div className="team-card">
                <div className="team-card-cover">
                  <img src="images/team/g.png" alt="team-member" className="img-fluid" />
                </div>
                <div className="team-card-details">
                  <div className="info">
                    <Link to="#">
                      <h5 className="text-capitalize m-0">James Smith</h5>
                    </Link>
                    <span>Founder</span>
                  </div>
                  <NioMedia href="#" rounded icon="github-circle" className="bg-gray-100" />
                </div>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  experts section end   */}

      {/*  faq Section Start   */}
      <NioSection>
        <NioSection.Content>
          <Row className="justify-content-between align-items-center">
            <Col lg={5} xl={4}>
              <div className="nk-section-head pb-lg-0 mt-xl-n6 text-center text-lg-start">
                <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-indigo text-white fw-bold py-1 px-3 mb-3">FAQs</span>
                <h2>Frequently Asked Questions</h2>
                <p className="fs-20">Find answers to commonly asked questions about our product or service in our comprehensive FAQ section.</p>
                <ul className="nk-btn-group flex-wrap justify-content-center justify-content-lg-start pt-5">
                  <li>
                    <NioButton href="/help-center" className="btn-indigo" label="Go To Support Center" />
                  </li>
                  <li>
                    <NioButton href="/contact-us-solution" className="btn-outline-indigo" label="Contact Us" />
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={7} xl={8}>
              <FaqContent />
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  faq Section End    */}

      {/*  CTA Section Start   */}
      <NioSection>
        <NioSection.Content>
          <div className="position-relative nk-cta-wrap bg-darker rounded-16 is-theme p-4 p-md-7 py-6 py-md-7 overflow-hidden">
            <div className="nk-mask z-1 shape-22"  ></div>
            <Row className="justify-content-center">
              <Col xl={7}>
                <div className="nk-section-head pb-0 text-center">
                  <div className="mb-3">
                    <NioBrand logo="s2" variant="light" />
                  </div>
                  <h2 >We Are Trusted By 5k+ Clients. <br className="d-none d-lg-block" /> Join them To Grow Your Business.</h2>
                  <ul className="nk-btn-group pt-5 justify-content-center" >
                    <li>
                      <NioButton href="/auth/sign-up" className="btn-indigo" label="Join Our Community" />
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        </NioSection.Content>
      </NioSection>
      {/*  CTA Section End   */}

      {/*  Newsletter Section Start  */}
      <NioSection className="nk-newsletter-section pb-lg-0">
        <Row className="justify-content-center justify-content-lg-between align-items-center pb-5 border-bottom border-lighter">
          <Col lg={6} xl={4}>
            <div className="nk-newsletter-content text-center text-lg-start pb-5 pb-lg-0">
              <h4 className="text-capitalize">Subscribe to our newsletter</h4>
              <p className="fs-16">Join the 5000+ People That Uses Softnio Products.</p>
            </div>
          </Col>
          <Col md={10} lg={6} xl={5}>

            <NioSubscribeField variant="one" />
          </Col>
        </Row>
      </NioSection>
      {/*  Newsletter Section End  */}

    </AppLayout >
  )
}

export default index;