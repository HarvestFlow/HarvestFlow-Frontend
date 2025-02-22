import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Col, Row } from 'react-bootstrap';

// data 
import { useData } from '../../../../../context/DataProvider/DataProvider';

// components
import NioIcon from '../../../../NioIcon/NioIcon'
import NioMedia from '../../../../NioMedia/NioMedia'

export default function FaqContent() {

  const data = useData()
  const contents = data.faqs.contents;

  return (
    <Row className="g-gs">
      <Col lg={8}>
        <div className="nk-faq">
          <Accordion className="accordion-s1" defaultActiveKey={0}>
            {
              contents && contents.map((content, idx) => (
                <Accordion.Item className="bg-gray border rounded-2 border-gray-500 p-4" eventKey={idx} key={idx}>
                  <Accordion.Header className="mb-0">
                    <h5 className="mb-0 text-capitalize">{content.title}</h5>
                    <NioIcon name="arrow-down-circle" className="accordion-button-icon text-success" />
                  </Accordion.Header>
                  <Accordion.Body>
                    <p className="text-base mb-0">
                      {content.description}
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              ))
            }
          </Accordion>
        </div>
      </Col>
      <Col lg={4} >
        <div className="nk-contact-box bg-gray border rounded-2 border-gray-500">
          <div className="nk-contact-content">
            <NioMedia
              border
              rounded
              size="lg"
              icon="chat-fill text-success"
              className="text-success border-success mb-3 mb-md-5"
            />
            <h5 className="title m-0 mb-1">Do you need any help? Get in touch with our support team.</h5>
            <p className="small mb-0">Lorem ipsum dolor sit amet, consectet adipiscing elit. Consequat aliquet soll ac.</p>
            <Link to="#" className="btn-link text-success pt-3 pt-md-4">
              <span>support@nioland.com</span>
              <NioIcon name="arrow-right" />
            </Link>
          </div>
        </div>
      </Col>
    </Row>
  )
}
