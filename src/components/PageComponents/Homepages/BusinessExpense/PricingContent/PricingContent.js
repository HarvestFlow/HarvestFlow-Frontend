import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

// data 
import { useData } from '../../../../../context/DataProvider/DataProvider';

// components 
import NioSection from '../../../../NioSection/NioSection';
import NioPricingCard from '../../../../Cards/NioPricingCard/NioPricingCard';

export default function PricingContent() {

  const data = useData()
  const contents = data.pricing.expense.contents;
  const [isMonthly, setIsMonthly] = useState(false);

  const toggleSwitch = () => {
    setIsMonthly(!isMonthly);
  }

  return (
    <>
      <NioSection.Head alignX="center">
        <span className="d-inline-block fs-16 text-uppercase text-primary-alt fw-semibold mb-2">pricing</span>
        <h2>Ready to Get Started?</h2>
        <p className="fs-20 mb-0">Take the first step towards success and get started with our comprehensive solutions today.</p>
      </NioSection.Head>

      <NioSection.Content className="position-relative">
        <div className="nk-pricing-wrap">
          <div className="nk-pricing-action-wrap pb-5 pb-lg-7 text-center">
            <div className="nk-pricing-toggle d-flex justify-content-center">
              <div className="h5 text">Monthly</div>
              <div className="mx-3">
                <div className="form-check form-switch form-check-xl">
                  <input
                    role="switch"
                    type="checkbox"
                    checked={isMonthly}
                    onChange={toggleSwitch}
                    className="form-check-input price-toggle-input text-primary-alt"
                  />
                </div>
              </div>
              <div className="h5 text">Yearly</div>
            </div>
            <div className="discount-badge-wrap d-inline-block mt-3 ms-lg-7">
              <span className="badge text-bg-primary-alt-soft text-uppercase rounded-pill me-2">save 65%</span>
              <img src="images/shapes/a.png" alt="" className="mt-n3" />
            </div>
          </div>
          <Row className="gy-5 gy-xl-0">
            {
              contents && contents.map((content, idx) => (
                <Col key={idx} md={6} xl={4} >
                  <NioPricingCard
                    variant="five"
                    active={content.active}
                    icon={content?.heading.icon}
                    title={content.heading.title}
                    subtitle={content.heading.subtitle}
                    buttonlabel={content?.footer.title}
                    price={!isMonthly ? content.heading.package.month.price : content.heading.package.year.price}
                    priceType={!isMonthly ? content.heading.package.month.title : content.heading.package.year.title}
                    features={content.body}
                    description={content?.heading.description}
                    className="h-100 p-4 p-md-5"
                  />
                </Col>
              ))
            }
          </Row>
        </div>
      </NioSection.Content>
    </>
  )
}
