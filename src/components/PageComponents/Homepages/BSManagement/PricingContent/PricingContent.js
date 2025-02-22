import React, { useState } from 'react';

// data
import { useData } from '../../../../../context/DataProvider/DataProvider';

// components
import { NioSection, NioPricingCard } from '../../../../../components';

export default function PricingContent() {

  const data = useData()
  const contents = data.pricing.tracker.contents;

  const [isMonthly, setIsMonthly] = useState(false);
  const toggleSwitch = () => setIsMonthly(!isMonthly);

  return (
    <div className="nk-pricing-wrap nk-pricing-wrap-s1">
      <NioSection.Head alignX="center" className="pb-md-7 pb-lg-120">
        <span className="d-inline-block text-bg-danger text-white fs-14 rounded-pill text-uppercase fw-semibold py-1 px-3 mb-3">Pricing Plan</span>
        <h2>Plans for Everyone</h2>
        <p className="fs-20 mb-0"> Perfect for individuals and small businesses starting out, offering essential features and support at an affordable price. </p>
        <div className="nk-pricing-action-wrap pt-5">
          <div className="nk-pricing-toggle nk-pricing-toggle-s1 text-info">
            <input
              type="radio"
              id="monthly"
              name="duration"
              value="monthly"
              checked={!isMonthly}
              onChange={toggleSwitch}
              className="price-toggle-input"
            />
            <label htmlFor="monthly">Monthly</label>
            <input
              id="yearly"
              type="radio"
              name="duration"
              value="yearly"
              checked={isMonthly}
              onChange={toggleSwitch}
              className="price-toggle-input"
            />
            <label htmlFor="yearly">Yearly</label>
            <span className="switch-highlight"></span>
          </div>
        </div>
      </NioSection.Head>
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
