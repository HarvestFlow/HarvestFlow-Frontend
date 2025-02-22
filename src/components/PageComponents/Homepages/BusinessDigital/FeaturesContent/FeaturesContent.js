import React from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';

// data 
import { useData } from '../../../../../context/DataProvider/DataProvider';

// components 
import NioMedia from '../../../../NioMedia/NioMedia';


export default function FeaturesContent() {

  const data = useData();
  const contents = data.tabs.digital.contents;

  return (
    <Tab.Container className='nav-tabs-s1' defaultActiveKey={0}>
      <div className="nav-tabs-s1">
        <Nav className='nav-tabs' >
          {
            contents && contents.nav.map((content, idx) => (
              <Nav.Item key={idx}>
                <Nav.Link eventKey={idx}>
                  <div className="media-group align-items-center">
                    <NioMedia variant={content.variant} rounded icon={content.icon} />
                    <div className="media-text md">
                      <h5 className="title text-capitalize">
                        {content.title}
                      </h5>
                    </div>
                  </div>
                </Nav.Link>
              </Nav.Item>
            ))
          }
        </Nav>

        <Tab.Content className='pt-5 pt-md-7' >
          {
            contents && contents.pane.map((content, idx) => (
              <Tab.Pane eventKey={idx} key={idx}>
                <Row className="justify-content-center">
                  <Col lg={8}>
                    <div className="position-relative overflow-hidden rounded-3">
                      <img src={content?.cover} alt="feature" />
                    </div>
                  </Col>
                </Row>
              </Tab.Pane>
            ))
          }
        </Tab.Content>
      </div>
    </Tab.Container>
  )
}
