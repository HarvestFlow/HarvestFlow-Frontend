import React from 'react'
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

// data 
import { useData } from '../../../../../context/DataProvider/DataProvider';

// components 
import { NioSection, NioButton, NioMedia, NioIcon } from "../../../../../components";

export default function ProcessContent() {

  const data = useData();
  const heading = data.homepage.businessTracker.process.heading;
  const contents = data.homepage.businessTracker.process.contents;

  return (
    <NioSection space='lg' className="nk-process-section">
      <NioSection.Heading
        xl={7}
        title={heading.title}
        subtitle={heading.subtitle}
        description={heading.description}
      >
        <ul className="nk-btn-group justify-content-center pt-5">
          <li>
            <NioButton as="link" variant='primary' label='More Details' />
          </li>
          <li>
            <NioButton as="link" to='/contact-us' outline='primary' label='Contact Us' />
          </li>
        </ul>
      </NioSection.Heading>
      <ul className="nk-schedule nk-schedule-s1">
        {
          contents && contents.map((content, idx) => (
            <li className="nk-schedule-item py-5 py-lg-7" key={idx}>
              <div className="nk-schedule-item-inner p-0 ">
                <div className="nk-schedule-symbol">
                  <NioMedia size='lg' type='circle' variant={`${content.variant}-soft`} className='fw-bold'>
                    {idx + 1}
                  </NioMedia>
                </div>
                <div className="nk-schedule-content">
                  <Row className="justify-content-between">
                    <Col xs={{ order: 2 }} lg={{ span: 5, order: 0 }}>
                      <div className="nk-block-head-content">
                        <h3 className="mb-2 mb-md-3">{content.title}
                          {
                            content.highlight &&
                            <span className={`text-${content.variant}`}>
                              {content.highlight}
                            </span>
                          }
                        </h3>
                        <p className="text-base opacity-75 ms-0">
                          {
                            content.description
                          }
                        </p>
                        <ul className="nk-btn-group pt-3 pt-md-4 ps-1">
                          <li>
                            <Link to="#" className={`btn btn-outline-${content.variant}`}>
                              <span>Learn More</span>
                              <NioIcon name='arrow-right' />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col xs={{ order: 1 }} lg={{ span: 7, order: 0 }}>
                      <div className="nk-feature-overview-img text-lg-end mb-n2 mb-lg-n0 mt-lg-n9">
                        <img src={content.cover.bg} alt="cover-bg" />
                        <img src={content.cover.fd} alt="cover-fd" className="children children-center" />
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
    </NioSection >
  )
}
