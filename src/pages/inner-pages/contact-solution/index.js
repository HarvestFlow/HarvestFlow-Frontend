import React from 'react';
import { Col, Row } from 'react-bootstrap';

// layouts
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// component 
import { NioButton, NioCard, NioSection, NioMedia, NioBrand, NioSubscribeField, NioIcon } from '../../../components';

// section content  
import ContactForm from '../../../components/PageComponents/SectionComponents/ContactForm/ContactForm';
import { Link } from 'react-router-dom';

function index() {
  return (
    <AppLayout variant={7} title="Contact" rootClass="layout-6">

      {/*  Banner Section Start   */}
      <NioSection py={false} className="nk-banner-wrap nk-banner-business-feature pb-lg-120" masks={["shape-36"]}>
        <NioSection.Head alignX="center">
          <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-indigo text-white fw-bold py-1 px-3 mb-2" >Our Support</span>
          <h2 className="text-white text-capitalize" > How can we <span className="text-indigo">help you</span>? </h2>
          <p className="fs-20 text-white opacity-50 mb-0" >
            We are dedicated to providing exceptional customer support to ensure your needs are met effectively and efficiently. Reach out to us for prompt assistance and personalized solutions.
          </p>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="gy-5">
            <Col md={6} lg={4} >
              <NioCard className="border-0">
                <NioCard.Body className="d-flex flex-column">
                  <NioMedia size="lg" rounded variant="indigo text-white" icon="headphone-fill" className="mb-4" />
                  <h4 className="text-capitalize">Tech Support</h4>
                  <p className="line-clamp-2">Reliable tech support for all your technical needs. Get help from our expert team.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="border-0">
                <NioCard.Body className="d-flex flex-column">
                  <NioMedia size="lg" rounded variant="indigo text-white" icon="bugs-alt-fill" className="mb-4" />
                  <h4 className="text-capitalize">Website Issue</h4>
                  <p className="line-clamp-2">Experiencing website issues? Our tech support team is here to assist you promptly.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="border-0">
                <NioCard.Body className="d-flex flex-column">
                  <NioMedia size="lg" rounded variant="indigo text-white" icon="telegram" className="mb-4" />
                  <h4 className="text-capitalize">Contact Sales</h4>
                  <p className="line-clamp-2">Ready to take your business to the next level? Contact our sales team to discuss your needs and explore the best solutions for your success.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="border-0">
                <NioCard.Body className="d-flex flex-column">
                  <NioMedia size="lg" rounded variant="indigo text-white" icon="chat-msg-fill" className="mb-4" />
                  <h4 className="text-capitalize">Live Chat</h4>
                  <p className="line-clamp-2">Connect with us instantly through our live chat feature to get immediate assistance and support from our dedicated team.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="border-0">
                <NioCard.Body className="d-flex flex-column">
                  <NioMedia size="lg" rounded variant="indigo text-white" icon="users-fill" className="mb-4" />
                  <h4 className="text-capitalize">Affiliate Program</h4>
                  <p className="line-clamp-2">Earn commissions by referring customers to our products and services through our affiliate program. Start monetizing your online presence and maximize your earning potential today.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="border-0">
                <NioCard.Body className="d-flex flex-column">
                  <NioMedia size="lg" rounded variant="indigo text-white" icon="account-setting-fill" className="mb-4" />
                  <h4 className="text-capitalize">Billing &amp; Account</h4>
                  <p className="line-clamp-2">Manage your billing and account details conveniently in one place. Easily access invoices, update payment information, and view subscription details for a seamless experience.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Banner Section End  */}

      {/*  Contact Section Start  */}
      <NioSection className="pt-7 pt-lg-120">
        <NioSection.Head alignX="center">
          <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-indigo text-white fw-bold py-1 px-3 mb-2">Contact US</span>
          <h2>Get in touch</h2>
          <p className="fs-20 text-base"> We'd love to hear from you! Contact us to get more information, ask questions, or share feedback. Our team is ready to assist you. </p>
        </NioSection.Head>
        <NioSection.Content>
          <Row className=" gy-5 justify-content-lg-between">
            <Col lg={8} >
              <ContactForm />
            </Col>
            <Col lg={4}>
              <div className="card-list">
                <NioCard >
                  <NioCard.Body>
                    <NioMedia size="lg" rounded variant="indigo-soft" icon="sign-usd" className="mb-5" />
                    <h4>Plans &amp; Pricing</h4>
                    <p className="line-clamp-2">
                      Choose from our flexible plans and competitive pricing options to find the best fit for your business needs and budget.
                    </p>
                    <Link to="/pricing" className="bg-transparent p-0 rounded-0 border-0 btn-link text-indigo">
                      <span>See Pricing</span>
                      <NioIcon name="arrow-right" />
                    </Link>
                  </NioCard.Body>
                </NioCard>
                <NioCard >
                  <NioCard.Body>
                    <NioMedia size="lg" rounded variant="indigo-soft" icon="question" className="mb-5" />
                    <h4>Frequently Asked Questions</h4>
                    <p className="line-clamp-2">Find answers to commonly asked questions about our product or service in our comprehensive FAQ section.</p>
                    <Link to="#" className="bg-transparent p-0 rounded-0 border-0 btn-link text-indigo">
                      <span>See All Questions</span>
                      <NioIcon name="arrow-right" />
                    </Link>
                  </NioCard.Body>
                </NioCard>
              </div>
              {/*  .card-list  */}
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Contact section end   */}

      {/*  CTA Section Start   */}
      <NioSection>
        <NioSection.Content>
          <div className="position-relative nk-cta-wrap bg-darker rounded-16 is-theme p-4 p-md-7 py-6 py-md-7 overflow-hidden">
            <div className="nk-mask z-1 shape-22"  ></div>
            <Row className="justify-content-center">
              <Col>
                <div className="nk-section-head pb-0 text-center">
                  <NioBrand
                    logo="s2"
                    variant="light"
                    className="mb-3" />
                  <h2 >
                    We Are Trusted By 5k+ Clients.
                    <br className="d-none d-lg-block" />
                    Join Them to Grow Your Business.
                  </h2>
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