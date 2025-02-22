import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';


// layout 
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// component 
import { NioButton, NioSection, NioSubscribeField, NioMedia } from '../../../components';

// section content 
import DetailsContent from '../../../components/PageComponents/InnerPages/HelpCenterDetails/DetailsContent/DetailsContent';

function index() {
  return (
    <AppLayout title="Help Center" rootClass="layout-1">

      {/* Help-Center Section Start */}
      <NioSection className="pt-120 pt-lg-180" masks={["blur-1 left top", "blur-1 right bottom"]}>
        <div className="nk-section-head">
          <nav>
            <ol className="breadcrumb mb-3 mb-md-4">
              <li className="breadcrumb-item">
                <Link to="/help-center">Help Center</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">Billing &amp; Payments</li>
            </ol>
          </nav>
          <h2>Billing &amp; Payments</h2>
          <hr className="mt-5 mb-0" />
        </div>
        <NioSection.Content>
          <DetailsContent />
        </NioSection.Content>
      </NioSection>
      {/* Help-Center Section End */}

      {/* CTA Section Start */}
      <NioSection className="nk-cta-section py-5 py-lg-7">
        <NioSection.Content>
          <div className="nk-cta-wrap bg-primary-gradient rounded-3 is-theme p-5 p-lg-7" >
            <Row className="g-gs align-items-center">
              <Col lg={8}>

                <div className="media-group flex-column flex-lg-row align-items-center">
                  <NioMedia size="lg" rounded variant="white" icon="chat-fill" className="text-primary mb-2 mb-lg-0 me-lg-2" />
                  <div className="text-center text-lg-start ms-lg-2">
                    <h3 className="text-capitalize">Chat with our support team!</h3>
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
      {/* CTA Section End */}

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