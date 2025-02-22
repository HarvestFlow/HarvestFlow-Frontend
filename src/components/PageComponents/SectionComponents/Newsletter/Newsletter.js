import React from 'react';
import { Col, Row } from 'react-bootstrap';

// components
import classNames from 'classnames';
import NioSection from '../../../NioSection/NioSection';
import NioSubscribeField from '../../../Forms/NioSubscribeField/NioSubscribeField';

export default function Newsletter({ className, title, description, space, variant = "one" }) {

  const compClasses = classNames({
    "nk-newsletter-section": true,
    [`${className}`]: className
  });

  return (
    <NioSection className={compClasses}>
      <NioSection.Content>
        <Row className="justify-content-center justify-content-lg-between align-items-center pb-5 border-bottom border-lighter">
          <Col lg={6} xl={4}>
            <div className="nk-newsletter-content text-center text-lg-start pb-5 pb-lg-0">
              <h4 className="text-capitalize">
                {title || "Subscribe to our newsletter"}
              </h4>
              <p className="fs-16">
                {description || "Join the 5000+ People That Uses Softnio Products."}
              </p>
            </div>
          </Col>
          <Col md={10} lg={6} xl={5}>
            <NioSubscribeField variant="one" />
          </Col>
        </Row>
      </NioSection.Content>
    </NioSection>
  )
}
