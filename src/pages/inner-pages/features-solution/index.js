import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

// layouts
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components 
import { NioBrand, NioButton, NioCard, NioMedia, NioSection, NioSubscribeField } from '../../../components';

// section content 
import FaqContent from '../../../components/PageComponents/InnerPages/FeaturesSolution/FaqContent/FaqContent';

function index() {
  return (
    <AppLayout variant={7} title="Features" rootClass="layout-6">

      {/*  Banner Section Start   */}
      <section className="nk-banner-wrap nk-banner-business-feature">
        <div className="nk-mask shape-34"  ></div>
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <div className="nk-banner-business-feature-content text-center is-theme">
                <div className="nk-section-head pb-0">
                  <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-indigo text-white fw-bold py-1 px-3 mb-3" >Features</span>
                  <h2 className="text-capitalize" > Amazing features to Build <br className="d-none d-lg-block" /> Modern
                    <span className="text-indigo"> Business Solutions.</span>
                  </h2>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/*  Banner Section End */}

      {/*  Brand Section Start   */}
      <NioSection py={false} className="bg-gray pb-lg-5">
        <NioSection.Content>
          <Row className="justify-content-center">
            <Col lg={10} xl={8}>
              <div className="nk-block-head text-center sm">
                <h6 className="h6 fw-normal text-light"  >More than 100,000+ teams are using NioLand</h6>
              </div>
              <Row className="justify-content-center justify-content-lg-between text-center gap g-4">
                {
                  ["a", "b", "c", "d", "e"]?.map((brand, idx) => (
                    <Col key={idx} xs={4} sm={3} lg={2}>
                      <div className="nk-brand w-100 h-60">
                        <Link to="#">
                          <img src={`images/brands/${brand}.png`} alt="brand-logo" />
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
      {/*  Brand Section End    */}

      {/*  Analytics Section Start   */}
      <NioSection className="py-7 py-lg-120">
        <NioSection.Content>
          <Row className="justify-content-center justify-content-xl-between align-items-xl-end pb-5 pb-md-7 ">
            <Col md={8} xl={5}>
              <div className="nk-section-head text-center text-xl-start pb-5 pb-xl-0">
                <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-indigo text-white fw-bold py-1 px-3 mb-3">Category 1</span>
                <h2>Custom Analytics</h2>
                <p className="text-base fs-20">Unlock valuable insights and make decisions with our custom analytics solutions to your business needs.</p>
              </div>
            </Col>
            <Col xl={6}>
              <ul className="nk-btn-group justify-content-center justify-content-xl-end">
                <li>
                  <NioButton href="#" className="btn-indigo" label="Request A Demo" />
                </li>
                <li>
                  <NioButton href="/pricing-solution" className="btn-outline-indigo" label="See Pricing" />
                </li>
              </ul>
            </Col>
          </Row>
          <Row className="gy-5 gy-lg-0">
            <Col md={6} lg={4} >
              <div className="nk-feature-block">
                <div className="nk-feature-block-content">
                  <div className="nk-feature-img position-relative overflow-hidden rounded-4 mb-3 mb-md-5 border border-light bg-gray">
                    <img src="images/blog/card-cover-6.png" alt="cover-img" className="img-fluid" />
                  </div>
                  <h4>Automatic Invoice Payment</h4>
                  <p className="text-base">We provide automatic invoice payment service. Set a payment schedule and you're done, it's that easy!</p>
                </div>
              </div>
            </Col>
            <Col md={6} lg={4} >
              <div className="nk-feature-block">
                <div className="nk-feature-block-content">
                  <div className="nk-feature-img position-relative overflow-hidden rounded-4 mb-3 mb-md-5 border border-light bg-gray">
                    <img src="images/blog/card-cover-1.png" alt="" className="img-fluid" />
                  </div>
                  <h4>Clear payment history</h4>
                  <p className="text-base">Still writing manual expenses? Our platform breaks down every expense you log down to the millisecond!</p>
                </div>
              </div>
            </Col>
            <Col md={6} lg={4} >
              <div className="nk-feature-block">
                <div className="nk-feature-block-content">
                  <div className="nk-feature-img position-relative overflow-hidden rounded-4 mb-3 mb-md-5 border border-light bg-gray">
                    <img src="images/blog/card-cover-2.png" alt="" className="img-fluid" />
                  </div>
                  <h4>Use of multi-card payments</h4>
                  <p className="text-base">Our platform is already integrated with many banks around the world, for easier payments!</p>
                </div>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Analytics Section End    */}

      {/*  Performance Section Start   */}
      <NioSection className="bg-gray-200-soft">
        <NioSection.Content>
          <Row className="pb-5 pb-md-7 justify-content-center justify-content-xl-between align-items-xl-end">
            <Col md={8} xl={5}>
              <div className="nk-section-head text-center text-xl-start pb-5 pb-xl-0">
                <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-indigo text-white fw-bold py-1 px-3 mb-3">Category 2</span>
                <h2>Measure Performance</h2>
                <p className="text-base fs-20">Gain visibility into the performance of your business with our comprehensive measurement solutions.</p>
              </div>
            </Col>
            <Col xl={5}>
              <ul className="nk-btn-group justify-content-center justify-content-xl-end">
                <li>
                  <NioButton href="#" className="btn-indigo" label="Request A Demo" />
                </li>
                <li>
                  <NioButton href="/pricing-solution" className="btn-outline-indigo" label="See Pricing" />
                </li>
              </ul>
            </Col>
          </Row>
          <Row className="gy-5 gy-lg-0">
            <Col md={6} lg={4} >
              <div className="nk-feature-block">
                <div className="nk-feature-block-content">
                  <div className="nk-feature-img position-relative overflow-hidden rounded-4 mb-3 border border-light bg-purple-50">
                    <img src="images/blog/card-cover-3.png" alt="cover-bg" className="img-fluid" />
                  </div>
                  <h4>Setup Collaboration Metrics</h4>
                  <p className="text-base">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa just.</p>
                </div>
              </div>
            </Col>
            <Col md={6} lg={4} >
              <div className="nk-feature-block">
                <div className="nk-feature-block-content">
                  <div className="nk-feature-img position-relative overflow-hidden rounded-4 mb-3 border border-light bg-purple-50">
                    <img src="images/blog/card-cover-4.png" alt="cover-bg" className="img-fluid" />
                  </div>
                  <h4>Track Development Progress</h4>
                  <p className="text-base">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa just.</p>
                </div>
              </div>
            </Col>
            <Col md={6} lg={4} >
              <div className="nk-feature-block">
                <div className="nk-feature-block-content">
                  <div className="nk-feature-img position-relative overflow-hidden rounded-4 mb-3 border border-light bg-purple-50">
                    <img src="images/blog/card-cover-5.png" alt="cover-bg" className="img-fluid" />
                  </div>
                  <h4>Identify Project Backlog</h4>
                  <p className="text-base">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa just.</p>
                </div>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Performance Section End    */}

      {/*  Tools Section Start   */}
      <NioSection className="overflow-hidden bg-indigo-200-soft" masks={["shape-35 d-none d-xl-block"]}>
        <NioSection.Head alignX="center">
          <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-indigo text-white fw-bold py-1 px-3 mb-3">More features</span>
          <h2 className="mb-0">All the tools you need to grow your business</h2>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="gy-5">
            <Col md={6} lg={4} >
              <NioCard className="border-0 h-100">
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="info text-white" icon="files-fill" className="mb-3 mb-md-5" />
                  <h4>Organize Information</h4>
                  <p className="text-base mb-0"> Efficiently organize and manage your information with our intuitive tools, helping you streamline workflows, improve collaboration. </p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="border-0 h-100">
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="warning text-white" icon="clock" className="mb-3 mb-md-5" />
                  <h4>Reduce Work Hours</h4>
                  <p className="text-base mb-0"> Optimize your work hours and boost productivity with our streamlined processes and automation tools, enabling you to accomplish more in. </p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="border-0 h-100">
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="primary-alt text-white" icon="sign-mxn" className="mb-3 mb-md-5" />
                  <h4>Save Expenses</h4>
                  <p className="mb-0">Reduce your expenses and save money with our cost-effective solutions and strategies. From optimizing your budget.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="border-0 h-100">
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="danger text-white" icon="users" className="mb-3 mb-md-5" />
                  <h4>Team Communication</h4>
                  <p className="text-base mb-0"> Enhance collaboration and streamline communication within your team with our advanced tools and platforms.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="border-0 h-100">
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="info-alt text-white" icon="laptop" className="mb-3 mb-md-5" />
                  <h4>Remote Flexibility</h4>
                  <p className="mb-0">
                    Remote flexibility allows employees to work from different locations, fostering work-life balance and adapting to changing work environments.
                  </p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="border-0 h-100">
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="success text-white" icon="layer" className="mb-3 mb-md-5" />
                  <h4>Simple User Interface</h4>
                  <p className="mb-0">A simple user interface offers an intuitive and uncomplicated design, enhancing user experience by making interactions and navigation.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="border-0 h-100">
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="blue-600 text-white" icon="shield-check" className="mb-3 mb-md-5" />
                  <h4>Data Security</h4>
                  <p className="mb-0">We prioritize the security of your data. With robust encryption protocols, regular backups, and strict access controls</p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="border-transparent border-0 h-100 rounded-3" >
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="purple" icon="growth" className="mb-3 mb-md-5" />
                  <h4>Progress Tracking</h4>
                  <p className="text-base mb-0"> Track your progress with ease. Our platform provides comprehensive tools and features to monitor your performance, set goals, and track.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="border-transparent border-0 h-100 rounded-3" >
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="blue-800 text-white" icon="headphone-fill" className="mb-3 mb-md-5" />
                  <h4>Customer Support</h4>
                  <p className="mb-0">
                    We prioritize exceptional customer support. Our dedicated team is available 24/7 to assist you with any inquiries, technical issues.
                  </p>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Tools Section End    */}

      {/*  faq Section Start   */}
      <NioSection className="pt-7 pt-lg-120">
        <NioSection.Content>
          <Row className="justify-content-between align-items-center">
            <Col lg={5} xl={4}>
              <div className="nk-section-head pb-lg-0 mt-xl-n6 text-center text-lg-start">
                <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-indigo text-white fw-bold py-1 px-3 mb-3">FAQs</span>
                <h2 className="mb-3">Frequently Asked Questions</h2>
                <p className="fs-20 text-base mb-0">Find answers to commonly asked questions about our product or service in our comprehensive FAQ section.</p>
                <ul className="nk-btn-group flex-wrap justify-content-center justify-content-lg-start pt-5 pt-lg-6">
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
              <Col>
                <div className="nk-section-head pb-0 text-center">
                  <NioBrand variant="light" logo="s2" className="mb-5 pb-1" />
                  <h2 >We are trusted by 5k+ clients. <br className="d-none d-lg-block" /> Join them to grow your business. </h2>
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
        <Row className="justify-content-center justify-content-lg-between align-items-center pb-5 border-1 border-bottom border-gray-500">
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