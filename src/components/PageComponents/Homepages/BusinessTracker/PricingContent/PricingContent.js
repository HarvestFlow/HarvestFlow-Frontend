import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

// data
import { useData } from '../../../../../context/DataProvider/DataProvider';

// components
import { NioSection, NioPricingCard } from "../../../../../components";

export default function PricingContent() {

  const data = useData()
  const contents = data.pricing.tracker.contents;
  const [isMonthly, setIsMonthly] = useState(false);

  const toggleSwitch = () => {
    setIsMonthly(!isMonthly);
  }

  return (
    <div className="nk-pricing-wrap nk-pricing-wrap-s1">
      <Row className="justify-content-center text-center">
        <Col xl={7}>
          <div className="nk-section-head mb-xl-7">
            <span className="d-inline-block fs-16 text-uppercase text-primary-alt fw-bold mb-2">Pricing Plan</span>
            <div>
              <h2>Plans for Everyone</h2>
              <p className="fs-20">
                Pricing plans for everyone, offering affordability and value for individuals and businesses alike.
              </p>
            </div>
            <div className="nk-pricing-action-wrap pt-5">
              <div className="nk-pricing-toggle nk-pricing-toggle-s1 text-primary-alt">
                <input
                  className="price-toggle-input"
                  type="radio"
                  name="duration"
                  value="monthly"
                  id="monthly"
                  checked={!isMonthly}
                  onChange={toggleSwitch}
                />
                <label htmlFor="monthly">Monthly</label>
                <input
                  className="price-toggle-input"
                  type="radio"
                  name="duration"
                  value="yearly"
                  id="yearly"
                  checked={isMonthly}
                  onChange={toggleSwitch}
                />
                <label htmlFor="yearly">Yearly</label>
                <span className="switch-highlight"></span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <NioSection.Content>
        <div className="nk-pricing-group">
          {
            contents && contents.map((content, idx) => (
              <NioPricingCard
                key={idx}
                variant="one"
                active={content.active}
                features={content.body}
                price={!isMonthly ? content.heading.package.month.price : content.heading.package.year.price}
                priceType={!isMonthly ? content.heading.package.month.title : content.heading.package.year.title}
                title={content?.heading.title}
                subtitle={content?.heading.subtitle}
              />
            ))
          }
        </div>
      </NioSection.Content>
    </div>
  )
}
