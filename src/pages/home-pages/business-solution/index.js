import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

// layouts
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components 
import { NioSection, NioBadge, NioMedia, NioCount, NioBrand, NioButton, NioCard, NioSubscribeField } from '../../../components';

// section content 
import PricingContent from '../../../components/PageComponents/Homepages/BusinessSolution/PricingContent/PricingContent';

function index() {
  return (
    <AppLayout variant={7} title="Business Solution" rootClass="layout-6">

      {/*  Banner Section Start  */}
      <section className="nk-banner nk-banner-business-solution bg-darker has-bg overflow-hidden">
        <div className="nk-mask shape-19"></div>
        <div className="nk-banner-wrap">
          <Container>
            <Row className="align-items-center justify-content-center justify-content-xl-between">
              <Col lg={6}>
                <div className="nk-banner-content text-center text-lg-start pb-7 pb-xl-0">
                  <div className="nk-ribbon mb-3" >
                    <NioBadge size="md" rounded className="text-bg-indigo text-white me-2" label="We're Hiring" />
                    <NioButton href="#" className="fs-12 fw-normal p-0 text-nowrarp" label="Visit Our Career Page" icon="arrow-right after" />
                  </div>
                  <h1 className="mb-3 text-white" >Crafting User Specific <span className="text-indigo">Solutions With Ease.</span></h1>
                  <p className="fs-20 text-white opacity-75" >We’re different. NioLand is the only saas business platform that lets you run your business on one platform.</p>
                  <ul className="nk-btn-group flex-wrap justify-content-center justify-content-lg-start pt-5">
                    <li>
                      <NioButton href="#" className="btn-indigo" label="Request A Demo" />
                    </li>
                    <li>
                      <NioButton href="/auth/sign-up" className="btn-white text-dark" label="Sign Up" />
                    </li>
                  </ul>
                  <Row className="justify-content-center justify-content-lg-start">
                    <div >
                      <div className="pt-5 pt-lg-6">
                        <h6 className="text-base fw-normal mb-3" >Trusted By</h6>
                        <Row className="justify-content-center justify-content-lg-start gap-3 gap-xl-0">
                          <Col xs={4} sm={3}>
                            <div className="nk-brand">
                              <Link to="#">
                                <img src="images/brands/a-light.png" alt="brand-logo" />
                              </Link>
                            </div>
                          </Col>
                          <Col xs={4} sm={3} >
                            <div className="nk-brand">
                              <Link to="#">
                                <img src="images/brands/a-light.png" alt="brand-logo" />
                              </Link>
                            </div>
                          </Col>
                          <Col xs={4} sm={3} >
                            <div className="nk-brand">
                              <Link to="#">
                                <img src="images/brands/a-light.png" alt="brand-logo" />
                              </Link>
                            </div>
                          </Col>
                          <Col xs={4} sm={3} >
                            <div className="nk-brand">
                              <Link to="#">
                                <img src="images/brands/a-light.png" alt="brand-logo" />
                              </Link>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Row>
                </div>
              </Col>
              <Col lg={6} xl={5}>
                <div className="nk-mask shape-20 d-none d-xl-block"></div>
                <div className="nk-banner-form-wrap">
                  <NioCard className="nk-form-card card-gutter-lg">
                    <NioCard.Body className="p-4 p-md-7">
                      <div className="nk-form-card-head text-center pb-5">
                        <div className="mb-3">
                          <a href="/" className="logo-link">
                            <div className="logo-wrap">
                              <img className="logo-img logo-light" src="images/logo-s2.png" srcSet="images/logo-s22x.png 2x" alt="brand-logo" />
                              <img className="logo-img logo-dark" src="images/logo-s2-dark.png" srcSet="images/logo-s2-dark2x.png 2x" alt="brand-logo" />
                            </div>
                          </a>
                        </div>
                        <h3 className="title mb-0">Join our community</h3>
                        <p className="fs-16 ">Already a member? <a href="/auth/login" className="btn-link text-indigo">Login</a>.</p>
                      </div>
                      <form onSubmit={e => e.preventDefault()}>
                        <Row className="gy-4">
                          <Col xs={12}>
                            <div className="form-group">
                              <label className="form-label">Full Name</label>
                              <div className="form-control-wrap">
                                <input type="text" className="form-control" placeholder="John Carter" />
                              </div>
                            </div>
                          </Col>
                          <Col xs={12}>
                            <div className="form-group">
                              <label className="form-label">Email</label>
                              <div className="form-control-wrap">
                                <input type="text" className="form-control" placeholder="example@email.com" />
                              </div>
                            </div>
                          </Col>
                          <Col xs={12}>
                            <div className="form-group">
                              <NioButton className="btn-block btn-indigo" label="Join Community" />
                            </div>
                          </Col>
                        </Row>
                      </form>
                      <div className="pt-4 text-center">
                        <div className="small overline-title-sep"> or Join </div>
                      </div>
                      <div className="pt-4 w-100 text-center">
                        <NioButton href="#" img="images/icon/a.png" className="btn-block border border-lighter text-dark" label="Join With Google" />
                      </div>
                    </NioCard.Body>
                  </NioCard>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/*  Banner Section End   */}

      {/*  Feature Section Start  */}
      <NioSection className="py-7 py-lg-120">

        <NioSection.Head alignX="center">
          <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-indigo text-white fw-bold py-1 px-3 mb-2">Powerful Features</span>
          <h2>Discover Powerful Features</h2>
          <p className="fs-20 mb-0">Unleash the power of our platform with a multitude of powerful features, empowering you to achieve your goals.</p>
          <ul className="nk-btn-group justify-content-center pt-5">
            <li>
              <NioButton href="/features-solution" className="btn-indigo" label="More Details" />
            </li>
            <li>
              <NioButton href="/contact-us-solution" className="btn-outline-indigo" label="Contact Us" />
            </li>
          </ul>
        </NioSection.Head>

        <NioSection.Content>
          <Row className="gy-5 gy-lg-0 align-items-center justify-content-center text-center">
            <Col xs={{ order: 2 }} lg={{ span: 4, order: 0 }}>
              <Row className="nk-feature-list gy-5 gy-lg-7">
                <Col xs={12} >
                  <div className="position-relative text-center">
                    <NioMedia size="lg" rounded variant="blue-soft" className="mb-4" icon="trend-up" />
                    <div>
                      <h4 className="mb-3">Custom analytics</h4>
                    </div>
                    <div>
                      <p className="fs-16 mb-0 line-clamp-2">Get a complete sales dashboard in the cloud. See activity, revenue and social metrics.</p>
                    </div>
                    <NioButton href="/features" className="btn-link pt-4" icon="arrow-right after" label="Learn More" />
                  </div>
                </Col>
                <Col xs={12} >
                  <div className="position-relative text-center">
                    <NioMedia size="lg" rounded variant="success-soft" className="mb-4" icon="emails" />
                    <h4 className="mb-3">Measure your performance</h4>
                    <p className="fs-16 mb-0 line-clamp-2">Stay connected with your team and make quick decisions wherever you are. </p>
                    <NioButton href="/features" className="btn-link pt-4" label="Learn More" icon="arrow-right after" />
                  </div>
                </Col>
                <Col xs={12} >
                  <div className="position-relative text-center">
                    <NioMedia size="lg" rounded variant="warning-soft" className="mb-4" icon="users" />
                    <h4 className="mb-3">Team Management</h4>
                    <p className="fs-16 mb-0 line-clamp-2">Our calendar lets you know what is happening with customer and projects so you</p>
                    <NioButton href="/features" className="btn-link pt-4" label="Learn More" icon="arrow-right after" />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={{ order: 1 }} lg={{ span: 4, order: 0 }}>
              <div className="nk-feature-img nk-feature-mobile-img mb-5 mb-lg-0" >
                <img src="images/business-solution/section-cover-frame.png" alt="section-frame" />
              </div>
            </Col>
            <Col xs={{ order: 3 }} lg={{ span: 4, order: 0 }}>
              <div className="nk-feature-list row gap gy-5 gy-lg-7">
                <Col xs={12} >
                  <div className="position-relative text-center">
                    <NioMedia size="lg" rounded variant="danger-soft" className="mb-4" icon="edit-alt" />
                    <h4 className="mb-3">Build your website</h4>
                    <p className="fs-16 mb-0 line-clamp-2">A tool that lets you build a dream website even if you know nothing about web design.</p>
                    <NioButton href="/features" className="btn-link pt-4" label="Learn More" icon="arrow-right after" />
                  </div>
                </Col>
                <Col xs={12} >
                  <div className="position-relative text-center">
                    <NioMedia size="lg" rounded variant="purple-soft" className="mb-4" icon="view-col" />
                    <h4 className="mb-3">Connect multiple apps</h4>
                    <p className="fs-16 mb-0 line-clamp-2">The first business platform to bring together all of your products from one place.</p>
                    <NioButton href="/features" className="btn-link pt-4" label="Learn More" icon="arrow-right after" />
                  </div>
                </Col>
                <Col xs={12} >
                  <div className="position-relative text-center">
                    <NioMedia size="lg" rounded variant="cyan-soft" className="mb-4" icon="setting" />
                    <h4 className="mb-3">Easy setup</h4>
                    <p className="fs-16 mb-0 line-clamp-2">End to End Business Platform, Sales Management, Marketing Automation, Help Desk</p>
                    <NioButton href="/features" className="btn-link pt-4" label="Learn More" icon="arrow-right after" />
                  </div>
                </Col>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Banner Section End  */}

      {/*  Process Section Start  */}
      <NioSection className="bg-indigo-50">
        <NioSection.Head alignX="center">
          <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-indigo text-white fw-bold py-1 px-3 mb-2">Our process</span>
          <h2>How We Do It?</h2>
          <p className="fs-20"> Uncover our winning formula as we combine innovation, expertise, and technology to deliver exceptional results. </p>
        </NioSection.Head>
        <NioSection.Content>
          <ul className="nk-timeline-group row gy-5 gy-lg-0 has-divider">
            <li className="nk-timeline-group-item col-xl-4" >
              <div className="nk-timeline-group-content text-center">
                <NioMedia rounded size="lg" variant="indigo-700-soft" className="mb-3 mb-md-6 fw-semibold">
                  <span className="h4 text-indigo">1</span>
                </NioMedia>
                <div>
                  <span className="d-inline-block fs-14 fw-semibold text-uppercase">step 1</span>
                  <h3 className="mb-2">Concept</h3>
                  <p className="fs-16  line-clamp-3"> Ignite creativity with dynamic concept development, turning ideas into impactful reality. </p>
                </div>
              </div>
            </li>
            <li className="nk-timeline-group-item col-xl-4" >
              <div className="nk-timeline-group-content text-center">
                <NioMedia rounded size="lg" variant="indigo-700-soft" className="mb-3 mb-md-6 fw-semibold">
                  <span className="h4 text-indigo">2</span>
                </NioMedia>
                <div>
                  <span className="d-inline-block fs-14 fw-semibold text-uppercase">step 2</span>
                  <h3 className="mb-2">Prepare</h3>
                  <p className="fs-16  line-clamp-3">Get ready and prepare for success with our comprehensive and tailored solutions.</p>
                </div>
              </div>
            </li>
            <li className="nk-timeline-group-item col-xl-4" >
              <div className="nk-timeline-group-content text-center">
                <NioMedia rounded size="lg" variant="indigo-700-soft" className="mb-3 mb-md-6 fw-semibold">
                  <span className="h4 text-indigo">3</span>
                </NioMedia>
                <div>
                  <span className="d-inline-block fs-14 fw-semibold text-uppercase">step 3</span>
                  <h3 className="mb-2">Retouch</h3>
                  <p className="fs-16  line-clamp-3">Enhance visuals with expert retouching, elevating quality and aesthetics for captivating results.</p>
                </div>
              </div>
            </li>
            <li className="nk-timeline-group-item col-xl-4" >
              <div className="nk-timeline-group-content text-center">
                <NioMedia rounded size="lg" variant="indigo-700-soft" className="mb-3 mb-md-6 fw-semibold">
                  <span className="h4 text-indigo">4</span>
                </NioMedia>
                <div>
                  <span className="d-inline-block fs-14 fw-semibold text-uppercase">step 4</span>
                  <h3 className="mb-2">Finalize</h3>
                  <p className="fs-16  line-clamp-3">Achieve perfection and finalize your project with our meticulous attention to detail and precise execution.</p>
                </div>
              </div>
            </li>
          </ul>
        </NioSection.Content>
      </NioSection>
      {/*  Process Section End  */}

      {/*  Community Section Start  */}
      <NioSection className="py-7 py-lg-220 overflow-hidden" masks={["shape-21"]}>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="pb-5 pb-lg-7 text-center">
              <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-indigo text-white fw-bold py-1 px-3 mb-2">JOIN OUR COMMUNITY</span>
              <h2>We are trusted by over 5000+ clients. Join them now and grow your business.</h2>
            </div>
          </Col>
        </Row>
        <NioSection.Content>
          <Row className="gy-5 gy-lg-0">
            <Col xs={6} lg={3} >
              <div className="text-center">
                <NioCount className="d-block h1 text-indigo mb-3" end={235} decimals={3} decimal="." />
                <h6 className="fw-normal">Projects completed</h6>
              </div>
            </Col>
            <Col xs={6} lg={3} >
              <div className="text-center">
                <NioCount className="d-block h1 text-indigo mb-3" end={3472} />
                <h6 className="fw-normal">Happy Customers</h6>
              </div>
            </Col>
            <Col xs={6} lg={3} >
              <div className="text-center">
                <NioCount className="d-block h1 text-indigo mb-3" end={2184} />
                <h6 className="fw-normal">Expert Employees</h6>
              </div>
            </Col>
            <Col xs={6} lg={3} >
              <div className="text-center">
                <NioCount className="d-block h1 text-indigo mb-3" end={4523} />
                <h6 className="fw-normal">Awards Won</h6>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Community Section End  */}

      {/*  FAQ Section Start  */}
      <NioSection className="nk-faq-section pt-0 pt-lg-7">
        <Row className="justify-content-between align-items-end pb-7">
          <Col lg={6}>
            <div className="text-center text-lg-start">
              <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-indigo text-white fw-bold py-1 px-3 mb-2">faqs</span>
              <h2>Frequently Asked Questions</h2>
              <p className="fs-20"> NioLand is the only saas business platform that lets you run your business on one platform, seamlessly across all digital channels.</p>
            </div>
          </Col>
          <Col lg={6} xl={5}>
            <ul className="nk-btn-group justify-content-center justify-content-xl-end pt-5">
              <li>
                <NioButton href="/help-center" className="btn-indigo" label="Go To Support Center" />
              </li>
              <li>
                <NioButton href="/contact-us-solution" className="btn-outline-indigo" label="Contact Us" />
              </li>
            </ul>
          </Col>
        </Row>
        <NioSection.Content>
          <Row className="gy-5">
            <Col md={6} xl={4} >
              <NioCard className="h-100">
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="indigo-soft" icon="trend-up" className="mb-2 mb-md-4" />
                  <h4>Is my credit card information kept secure from the back end?</h4>
                  <p className="fs-16  line-clamp-3"> Rest assured, your credit card information is kept secure with our advanced backend encryption and strict data protection measures. </p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} xl={4} >
              <NioCard className="h-100">
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="success-soft" icon="emails" className="mb-2 mb-md-4" />
                  <h4>What payment methods do you accept?</h4>
                  <p className="fs-16  line-clamp-3"> We accept various payment methods, including major credit cards, debit cards, and online payment platforms like PayPal. </p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} xl={4} >
              <NioCard className="h-100">
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="warning-soft" icon="users" className="mb-2 mb-md-4" />
                  <h4>How long does it take to ship my order?</h4>
                  <p className="fs-16  line-clamp-3">The shipping time may vary depending on your location and the shipping method chosen. Please refer to our shipping policy for more details.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} xl={4} >
              <NioCard className="h-100">
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="danger-soft" icon="edit-alt" className="mb-2 mb-md-4" />
                  <h4>Are there any discounts for people in need?</h4>
                  <p className="fs-16  line-clamp-3"> Discounts available for those in need. Contact us for more information. </p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} xl={4} >
              <NioCard className="h-100">
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="indigo-soft" icon="grid" className="mb-2 mb-md-4" />
                  <h4>Do you have any feature for downloading the bill receipt?</h4>
                  <p className="fs-16  line-clamp-3"> Download bill receipts easily from your account or contact our support team for assistance. </p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} xl={4} >
              <NioCard className="h-100">
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="info-soft" icon="setting" className="mb-2 mb-md-4" />
                  <h4>How do I reset my account password to recover my wallet?</h4>
                  <p className="fs-16  line-clamp-3"> Reset your password and recover your wallet by clicking "Forgot Password" on the login page. </p>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  FAQ Section End  */}

      {/*  Pricing Section Start  */}
      <NioSection className="nk-section-pricing">
        <PricingContent />
      </NioSection>
      {/*  Pricing Section End  */}

      {/*  CTA Section Start  */}
      <NioSection className="nk-section-cta" >
        <NioSection.Content className="position-relative overflow-hidden is-theme bg-darker rounded-3 py-5 py-md-7" masks={["shape"]}>
          <Row className="justify-content-center">
            <Col lg={10} xl={7}>
              <div className="text-center">
                <div className="mb-3" >
                  <NioBrand logo="s2" variant="light" />
                </div>
                <h2>
                  We are trusted by 5k+ clients.
                  <span className="d-inline-block d-lg-block">Join Them To Grow Your Business.</span>
                </h2>
                <ul className="nk-btn-group pt-5 justify-content-center" >
                  <li>
                    <NioButton href="/auth/sign-up" className="btn-indigo" label="Join Our Community" />
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  CTA Section Start  */}

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