import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Col, Container, Row } from 'react-bootstrap';

export default function NioSection({ id, className, py = true, fluid, masks, children, ...props }) {

  const compClasses = classNames({
    "nk-section": true,
    "py-7 py-lg-120": className && py && className.includes('bg-'),
    [`${className}`]: className
  });

  const maskClasses = classNames({
    "nk-mask": true
  });

  const containerClasses = classNames({
    "px-0": fluid
  });

  // This function will set the background image for elements with the specified selector attribute
  const setBgImage = (selector) => {
    const elements = document.querySelectorAll(`[${selector}]`);
    elements.forEach((element) => {
      const image = element.getAttribute(selector);
      element.style.backgroundImage = `url(images/${image})`;
    });
  };

  // Run the setBgImage function when the component mounts
  useEffect(() => {
    setBgImage('data-bg-image'); // Replace 'data-bg-image' with the actual attribute you want to use
  }, []);

  return (
    <section className={compClasses} id={id} {...props}>
      {/* Only Appear When Section Will Content Any Mask */}
      {
        masks && masks.map((mask, idx) => (
          <div key={idx} className={`${maskClasses} ${mask}`}></div>
        ))
      }

      <Container fluid={fluid} className={containerClasses}>
        {children}
      </Container>

    </section>
  )
};


function sectionHead({ className, space = true, alignX, alignY, children }) {

  const compClasses = classNames({
    "nk-section-head": true,
    "pb-5 pb-md-7": space,
    [`${className}`]: className,
    "text-center": alignX === "center"
  });


  const alignClasses = classNames({
    [`align-items-${alignY}`]: alignY,
    [`justify-content-${alignX}`]: alignX
  });


  return (
    <Row className={alignClasses}>
      <Col lg={8} xl={6}>
        <div className={compClasses}>
          {children}
        </div>
      </Col>
    </Row>
  )

}

function sectionContent({ className, masks, children, ...props }) {

  const compClasses = classNames({
    "nk-section-content": true,
    [`${className}`]: className
  })

  const maskClasses = classNames({
    "nk-mask": true
  });

  return (
    <div className={compClasses} {...props}>
      {/* Only Appear When Section Will Content Any Mask */}
      {
        masks && masks.map((mask, idx) => (
          <div key={idx} className={`${maskClasses} ${mask}`}></div>
        ))
      }
      {children}
    </div>
  );
}
NioSection.Head = sectionHead;
NioSection.Content = sectionContent;

