import React from 'react';
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap';

// components 
import NioIcon from '../../../../NioIcon/NioIcon';
import NioButton from '../../../../NioButton/NioButton';

export default function PlatformContent() {
  return (
    <section className="nk-feature-section section-space-top section-space-bottom has-mask bg-blue-100 position-relative overflow-hidden">
      <div className="nk-mask shape-8"></div>
      <div className="nk-mask shape-39 d-none d-lg-block"></div>
      <div className="nk-mask shape-40 d-none d-lg-block"></div>
      <Container>
        <Row className="justify-content-center">
          <Col xl={7}>
            <div className="nk-block-head text-center mb-0">
              <div className="nk-block-head-content mb-md-5 pb-md-4">
                <span className="overline-title small text-primary fw-semibold mb-2">support multiplatform</span>
                <h2 className="h1 mb-2">One platform to <span className="title-shape title-shape-3 title-shape-3_one">connect</span> everywhere.</h2>
                <p className="nk-block-text lead my-0">Consectetur transfor how you collbora and brain stor adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
              </div>
            </div>
          </Col>
        </Row>
        <Tab.Container defaultActiveKey="first">
          <Row className="nk-platform justify-content-center">
            {/* Tabs  */}
            <Col lg={10}>
              <Nav variant='pills' className="nk-platform-nav justify-content-center">
                <Nav.Item >
                  <Nav.Link eventKey="first">
                    <NioIcon name="skype" />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item >
                  <Nav.Link eventKey="second">
                    <NioIcon name="twitter" />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item >
                  <Nav.Link eventKey="third">
                    <NioIcon name="snapchat" />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item >
                  <Nav.Link eventKey="four">
                    <NioIcon name="flickr-round" />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item >
                  <Nav.Link eventKey="five">
                    <NioIcon name="telegram" />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item >
                  <Nav.Link eventKey="six">
                    <NioIcon name="layout-alt-fill" />
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            {/* Tab content  */}
            <Col lg={10}>
              <Tab.Content className="nk-platform-tab-content" >
                <div className="bg-masks bg-masks-3 d-none d-lg-block">
                  <img src="images/inside-pages/objects/object-3.png" alt="object" />
                </div>
                <div className="bg-masks bg-masks-4 d-none d-lg-block">
                  <img src="images/inside-pages/shapes/circle-1.png" alt="object" />
                </div>
                <div className="bg-masks bg-masks-5 d-none d-lg-block" >
                  <img src="images/inside-pages/shapes/waves-4.png" alt="object" />
                </div>
                <Tab.Pane eventKey='first'>
                  <div className="nk-platform-tiles">
                    <img src="images/inside-pages/chat-app/cover/tab-cover-a.png" alt="platform-tiles" />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey='second'>
                  <div className="nk-platform-tiles">
                    <img src="images/inside-pages/chat-app/cover/tab-cover-b.png" alt="platform-tiles" />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey='third'>
                  <div className="nk-platform-tiles">
                    <img src="images/inside-pages/chat-app/cover/tab-cover-c.png" alt="platform-tiles" />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey='four'>
                  <div className="nk-platform-tiles">
                    <img src="images/inside-pages/chat-app/cover/tab-cover-d.png" alt="platform-tiles" />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey='five'>
                  <div className="nk-platform-tiles">
                    <img src="images/inside-pages/chat-app/cover/tab-cover-e.png" alt="platform-tiles" />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey='six'>
                  <div className="nk-platform-tiles">
                    <img src="images/inside-pages/chat-app/cover/tab-cover-f.png" alt="platform-tiles" />
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        <div className="text-center pt-5 pt-md-7">
          <ul className="nk-btn-group justify-content-center">
            <li>
              <NioButton href="/features" className="btn-primary" label="Explore All Features" />
            </li>
            <li>
              <NioButton href="#" className="btn-outline-dark" label="Learn More" />
            </li>
          </ul>
        </div>
      </Container >
    </section >
  )
}
