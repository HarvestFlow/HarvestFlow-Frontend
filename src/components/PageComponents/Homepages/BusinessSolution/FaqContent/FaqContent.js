import React from 'react'
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

// data 
import { useData } from '../../../../../context/DataProvider/DataProvider';

// components
import NioMedia from '../../../../NioMedia/NioMedia';
import NioCard from '../../../../Cards/NioCard/NioCard';
import NioSection from '../../../../NioSection/NioSection';

export default function FaqContent() {

  const data = useData();
  const contents = data.homepage.businessSolution.faqs.contents;

  return (
    <NioSection space='sm' className="nk-faq-section section-space section-space-bottom">
      <div className="nk-block-head">
        <Row className="align-items-end pb-5 pb-xl-0">
          <Col xl={7}>
            <div className="nk-block-head-content text-center text-xl-start m-0">
              <span className="overline-title small  mb-2 mb-md-3">faqs</span>
              <h2 className="mb-2 mb-md-0">Frequently Asked Questions</h2>
              <p className="nk-block-text lead mx-auto ms-xl-0 "> NioLand is the only saas business platform that lets you run your business on one platform, seamlessly across all digital channels.</p>
            </div>
          </Col>
          <Col xl={5}>
            <ul className="nk-btn-group justify-content-center justify-content-xl-end pt-5 pt-xl-0 ">
              <li>
                <Link to="/help-center" className="btn-primary">Go to Support Center</Link>
              </li>
              <li>
                <Link to="/contact-business-solution" className="btn-outline-primary">Contact Us</Link>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
      <Row className="gap g-4">
        {
          contents && contents.map((content, idx) => (
            <Col md={6} lg={4} key={idx}>
              <NioCard className="border-1 border-light" >
                <NioCard.Body>
                  <NioMedia
                    size='lg'
                    type='circle'
                    icon={content.icon}
                    variant={content.variant}
                    className='mb-2 mb-md-4'
                  />
                  <h5 className="mb-2 mb-md-1">{content.title}</h5>
                  <p className="text">
                    {content.description}
                  </p>
                </NioCard.Body>
              </NioCard>
            </Col>
          ))
        }
      </Row>
    </NioSection>
  )
}
