import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

// layouts 
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components 
import { NioButton, NioMedia, NioSection, NioCard, NioField, NioSubscribeField, NioIcon } from '../../../components';

// sections content 
import FaqContent from '../../../components/PageComponents/InnerPages/HelpCenter/FaqContent/FaqContent';

function index() {
  return (
    <AppLayout title="Help Center" rootClass="layout-1">

      {/*  Support Section Start */}
      <NioSection className="pt-120 pt-lg-160" masks={["blur-1 left center"]}>
        <Row className="row justify-content-center text-center">
          <Col lg={8} xl={6}>
            <div className="nk-section-head text-center">
              <span className="d-inline-block fs-14 text-uppercase text-primary fw-semibold mb-2" >Our support</span>
              <h2 >How can we help?</h2>
              <p className="fs-18 mb-0" >
                We can help you with a wide range of services and solutions to your specific needs. Let us know how we can assist you!
              </p>
            </div>
          </Col>
          <Col lg={8} >
            <div className="nk-filter-wrap pb-7">
              <form action="#">
                <NioField.Input icon="search before" placeholder="Search for questions or topics" />
              </form>
              <ul className="nk-tag justify-content-center pt-4">
                <li>
                  <Link to="#" className="nk-tag-item">all</Link>
                </li>
                <li>
                  <Link to="#" className="nk-tag-item">Growth</Link>
                </li>
                <li>
                  <Link to="#" className="nk-tag-item">Marketing</Link>
                </li>
                <li>
                  <Link to="#" className="nk-tag-item">Tech</Link>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <NioSection.Content>
          <Row className="gy-5">
            <Col lg={6} >
              <NioCard>
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="primary-soft" icon="wallet-fill" className="mb-5" />
                  <h4 className="title text-capitalize mb-3">Billing &amp; Payments</h4>
                  <p className="line-clamp-3"> Our billing and payment system is designed to make your financial transactions smooth and hassle-free. Manage your invoices, track payments, and enjoy a seamless billing experience with us. </p>
                  <div className="pt-2">
                    <NioButton
                      icon="arrow-right after"
                      href="/help-center-details"
                      label="See Pricing Questions"
                      className="btn-link text-primary"
                    />
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col lg={6} >
              <NioCard>
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="info-soft" icon="users-fill" className="mb-5" />
                  <h4 className="title text-capitalize mb-3">Users and Collaboration</h4>
                  <p className="line-clamp-3"> Collaborate seamlessly with your team members, clients, and partners using our user-friendly platform. Manage user access, share files, and work together on projects in real-time, boosting productivity and fostering effective collaboration. </p>
                  <div className="pt-2">
                    <NioButton
                      icon="arrow-right after"
                      label="All Documentations"
                      href="/help-center-details"
                      className="btn-link text-primary"
                    />
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col lg={6} >
              <NioCard>
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="danger-soft" icon="puzzle-fill" className="mb-5" />
                  <h4 className="title text-capitalize mb-3">Features and Integrations</h4>
                  <p className="line-clamp-3"> Unlock a wide range of powerful features and integrations that enhance your workflow and streamline your business processes. From project management and communication tools to data analysis and reporting capabilities, our platform offers comprehensive solutions to meet your specific needs. Integrate with popular third-party apps and services to further extend the functionality of our platform and optimize your business operations. </p>
                  <div className="pt-2">
                    <NioButton
                      icon="arrow-right after"
                      href="/help-center-details"
                      label="Browse Articles"
                      className="btn-link text-primary"
                    />
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col lg={6} >
              <NioCard>
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="success-soft" icon="chat-circle-fill" className="mb-5" />
                  <h4 className="title text-capitalize mb-3">Frequently Asked Questions</h4>
                  <p className="fs-16 line-clamp-3"> Unlock a wide range of powerful features and integrations that enhance your workflow and streamline your business processes. From project management and communication tools to data analysis and reporting capabilities, our platform offers comprehensive solutions to meet your specific needs. Integrate with popular third-party apps and services to further extend the functionality of our platform and optimize your business operations. </p>
                  <div className="pt-2">
                    <NioButton
                      icon="arrow-right after"
                      href="/help-center-details"
                      label="See All Questions"
                      className="btn-link text-primary"
                    />
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Support Section End  */}

      {/*  FAQ Section Start  */}
      <NioSection masks={["blur-1 right top"]}>
        <NioSection.Head alignX="center">
          <span className="d-inline-block fs-16 text-uppercase text-primary fw-bold mb-2">FAQ</span>
          <h2>Frequently Asked Questions</h2>
          <p className="fs-20 mb-0"> Find answers to commonly asked questions about our product or service in our comprehensive FAQ section. </p>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="gy-5 gy-lg-0">
            <Col lg={8}>
              <FaqContent />
            </Col>
            <Col lg={4} >
              <NioCard>
                <NioCard.Body>
                  <NioMedia
                    rounded
                    size="lg"
                    icon="chat-fill"
                    className="mb-4"
                    variant="primary-soft"
                  />
                  <h4>Do you need any support?</h4>
                  <p className="fs-16 mb-3">Lor em ips um dolor sit amet, conse ctet adipis cin g elit. Cons equat aliq uet soll ac.</p>
                  <Link to="#" className="bg-transparent p-0 rounded-0 border-0 btn-link text-primary">
                    <span>support@nioland.com</span>
                    <NioIcon name="arrow-right" />
                  </Link>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  FAQ Section End  */}

      {/*  CTA Section Start  */}
      <NioSection>
        <NioSection.Content>
          <div className="nk-cta-wrap bg-primary-gradient rounded-3 is-theme p-5 p-lg-7" >
            <Row className="g-gs align-items-center">
              <Col lg={8}>
                <div className="media-group flex-column flex-lg-row align-items-center">
                  <NioMedia size="lg" rounded variant="white" icon="chat-fill text-primary" className="mb-2 mb-lg-0" />
                  <div className="text-center text-lg-start ms-lg-5">
                    <h3 className="text-capitalize m-0">Chat with our support team!</h3>
                    <p className="fs-16">Get in touch with our support team if you still can’t find your answer.</p>
                  </div>
                </div>
              </Col>
              <Col lg={4} className="text-center text-lg-end">
                <NioButton href="/contact-us" className="btn-white text-dark" label="Contact Support" />
              </Col>
            </Row>
          </div>
        </NioSection.Content>
      </NioSection>
      {/*  CTA Section End  */}

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

    </AppLayout>
  )
}

export default index;