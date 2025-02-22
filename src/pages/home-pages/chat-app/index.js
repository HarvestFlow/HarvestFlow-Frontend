import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap';

// layout 
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components
import { NioSection, NioCount, NioButton, NioCard, NioMedia, NioIcon, NioField } from '../../../components';

// section content 
import NioSubscribeField from '../../../components/Forms/NioSubscribeField/NioSubscribeField';

function index() {

  return (
    <AppLayout variant={6} title="Chat App" rootClass="layout-5">

      {/*  Banner Section Start  */}
      <section className="nk-banner nk-banner-live-chat-app">
        <div className="nk-banner-wrap">
          <Container>
            <Row className="align-items-center justify-content-center justify-content-xl-between pb-xxl-8">
              <Col md={10} lg={9} xl={5}>
                <div className="nk-banner-content text-center text-xl-start pb-5 pb-md-7 pb-xl-0">
                  <ul className="nk-list-link horizontal justify-content-center justify-content-xl-start separator mb-3">
                    <li>
                      <span className="fs-14 fw-semibold text-uppercase text-success-alt">live chat</span>
                    </li>
                    <li>
                      <span className="fs-14 fw-semibold text-uppercase text-success-alt">sales</span>
                    </li>
                    <li>
                      <span className="fs-14 fw-semibold text-uppercase text-success-alt">support</span>
                    </li>
                  </ul>
                  <div className="pb-5 pb-xl-7">
                    <h1 className="text-capitalize display-6 mb-2" >
                      <span className="title-shape title-shape-3">Connect</span> with customers<span className="ps-1 text-success-alt">.</span>
                    </h1>
                    <p className="fs-20" >Consectetur transfor how you collbora and brain stor adipiscing elit, sed do eiusmod tempor incididunt.</p>
                  </div>
                  <NioSubscribeField variant="one" />
                  <ul className="nk-list-link d-flex flex-wrap align-items-center align-items-xl-start justify-content-center justify-content-xl-start flex-xl-column gap-3 text-base py-5 py-xl-7">
                    <li className="p-0" >
                      <NioIcon name="check-circle" className="me-1" />
                      <span>Free 14-day trial</span>
                    </li>
                    <li className="p-0" >
                      <NioIcon name="check-circle" className="me-1" />
                      <span>Automation</span>
                    </li>
                    <li className="p-0" >
                      <NioIcon name="check-circle" className="me-1" />
                      <span>Omnichannel messaging</span>
                    </li>
                  </ul>
                  <div className="nk-banner-brands">
                    <h6 className="fs-14 mb-5 mb-xl-3 fw-normal  text-capitalize" > Trusted by <span className="fw-bold text-dark">35,000+</span> companies </h6>
                    <Row className="justify-content-center justify-content-xl-start gap-5 gap-xl-0">
                      <Col xs={4} sm={3} lg={3} >
                        <div className="nk-brand">
                          <Link to="#">
                            <img src="images/brands/a.png" alt="brand" />
                          </Link>
                        </div>
                      </Col>
                      <Col xs={4} sm={3} lg={3} >
                        <div className="nk-brand">
                          <Link to="#">
                            <img src="images/brands/b.png" alt="brand" />
                          </Link>
                        </div>
                      </Col>
                      <Col xs={4} sm={3} lg={3} >
                        <div className="nk-brand">
                          <Link to="#">
                            <img src="images/brands/c.png" alt="brand" />
                          </Link>
                        </div>
                      </Col>
                      <Col xs={4} sm={3} lg={3} >
                        <div className="nk-brand">
                          <Link to="#">
                            <img src="images/brands/d.png" alt="brand" />
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col lg={5} xl={6}>
                <div className="nk-banner-img">
                  <img src="images/chat-app/banner-cover.png" alt="banner-cover" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/*  Banner Section End  */}

      {/*  Support Section Start  */}
      <NioSection className="nk-section-support bg-green-50 overflow-hidden" masks={["shape"]}>
        <NioSection.Head alignX="center">
          <span className="d-inline-block fs-16 text-uppercase text-success-alt fw-semibold mb-2">support multiplatform</span>
          <h2>One platform to <span className="title-shape title-shape-3 title-shape-3_one">connect</span> everywhere.</h2>
          <p className="fs-20"> One platform, limitless connections. Simplify communication and boost productivity across multiple channels with ease. </p>
        </NioSection.Head>
        <div className="nk-platform row justify-content-center">
          <Tab.Container defaultActiveKey="pills-platform-tab-1">
            <Row className="justify-content-center">
              <Col lg={10}>
                <Nav variant="pills" className="nav nav-pills nk-platform-nav justify-content-center pb-5 pb-md-7 text-success-alt">
                  <Nav.Item>
                    <Nav.Link eventKey="pills-platform-tab-1">
                      <NioIcon name="skype" />
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="pills-platform-tab-2">
                      <NioIcon name="twitter" />
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="pills-platform-tab-3">
                      <NioIcon name="snapchat" />
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="pills-platform-tab-4">
                      <NioIcon name="flickr-round" />
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="pills-platform-tab-5">
                      <NioIcon name="telegram" />
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="pills-platform-tab-6">
                      <NioIcon name="layout-alt-fill" />
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              {/* Tab content  */}
              <Col lg={10}>
                <Tab.Content className="nk-platform-tab-content">
                  <div className="bg-masks bg-masks-3 d-none d-lg-block">
                    <img src="images/chat-app/object-3.png" alt="object" />
                  </div>
                  <div className="bg-masks bg-masks-4 d-none d-lg-block">
                    <img src="images/shapes/circle-1.png" alt="object" />
                  </div>
                  <div className="bg-masks bg-masks-5 d-none d-lg-block" >
                    <img src="images/shapes/waves-4.png" alt="object" />
                  </div>
                  <Tab.Pane eventKey="pills-platform-tab-1">
                    <div className="nk-platform-tiles z-1">
                      <img src="images/chat-app/tab-cover-a.jpg" alt="platform-tiles" className="overflow-hidden rounded-3" />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="pills-platform-tab-2">
                    <div className="nk-platform-tiles z-1">
                      <img src="images/chat-app/tab-cover-b.jpg" alt="platform-tiles" className="overflow-hidden rounded-3" />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="pills-platform-tab-3">
                    <div className="nk-platform-tiles z-1">
                      <img src="images/chat-app/tab-cover-c.jpg" alt="platform-tiles" className="overflow-hidden rounded-3" />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="pills-platform-tab-4">
                    <div className="nk-platform-tiles z-1">
                      <img src="images/chat-app/tab-cover-d.jpg" alt="platform-tiles" className="overflow-hidden rounded-3" />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="pills-platform-tab-5">
                    <div className="nk-platform-tiles z-1">
                      <img src="images/chat-app/tab-cover-e.jpg" alt="platform-tiles" className="overflow-hidden rounded-3" />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="pills-platform-tab-6">
                    <div className="nk-platform-tiles z-1">
                      <img src="images/chat-app/tab-cover-f.jpg" alt="platform-tiles" className="overflow-hidden rounded-3" />
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
        <div className="text-center pt-5 pt-lg-7">
          <ul className="nk-btn-group justify-content-center">
            <li>
              <NioButton href="/features" className="btn-success-alt" label="Explore All Features" />
            </li>
            <li>
              <NioButton href="#" className="btn-outline-dark" label="Learn More" />
            </li>
          </ul>
        </div>
      </NioSection>
      {/*  Support Section End  */}

      {/*  Features Section Start  */}
      <NioSection className="nk-section-features py-7 py-lg-120">
        <NioSection.Content className="d-flex flex-column gap-120">
          <Row className="align-items-center flex-lg-row-reverse justify-content-between">
            <Col lg={6} xl={5}>
              <div className="nk-feature-overview-img text-center mb-5 mb-lg-0">
                <img src="images/chat-app/section-cover-1-a.png" alt="cover-fd" className="base" />
                <div className="children children-center w-100 h-100">
                  <img src="images/chat-app/section-cover-1.png" alt="cover-bg" />
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div>
                <div className="nk-section-head pb-5">
                  <span className="d-inline-block fs-16 text-uppercase text-success-alt fw-semibold mb-2">Boost revenue</span>
                  <h2>Capture leads and make buying easy </h2>
                </div>
                <ul className="nk-timeline d-flex flex-column gap-3 gap-md-5">
                  <li className="nk-timeline-item p-0">
                    <div className="nk-timeline-item-inner">
                      <div className="nk-timeline-symbol text-bg-success-alt-soft"></div>
                      <div className="nk-timeline-content mt-n1">
                        <p> Effortlessly capture leads and drive sales with our streamlined lead generation tools.</p>
                      </div>
                    </div>
                  </li>
                  <li className="nk-timeline-item p-0">
                    <div className="nk-timeline-item-inner">
                      <div className="nk-timeline-symbol text-bg-success-alt-soft"></div>
                      <div className="nk-timeline-content mt-n1">
                        <p>Simplify the buying process and increase conversions with our intuitive platform.</p>
                      </div>
                    </div>
                  </li>
                </ul>
                <ul className="nk-btn-group pt-5">
                  <li>
                    <NioButton href="/features" className="btn-success-alt" label="Explore All Features" />
                  </li>
                  <li>
                    <NioButton href="#" className="btn-outline-dark" label="Learn More" />
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-between">
            <Col lg={6} xl={5}>
              <div className="nk-feature-overview-img text-center mb-5 mb-lg-0">
                <img src="images/chat-app/section-cover-2-a.png" alt="cover-bg" className="base" />
                <div className="children children-center w-100 h-100">
                  <img src="images/chat-app/section-cover-2.png" alt="cover-fd" />
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div>
                <div className="nk-section-head pb-5">
                  <span className="d-inline-block fs-16 text-uppercase text-warning fw-semibold mb-2">chatBots</span>
                  <h2>Balance AI automation and the human touch</h2>
                </div>
                <ul className="nk-timeline d-flex flex-column gap-3 gap-md-5">
                  <li className="nk-timeline-item p-0">
                    <div className="nk-timeline-item-inner">
                      <div className="nk-timeline-symbol text-bg-warning-soft"></div>
                      <div className="nk-timeline-content mt-n1">
                        <p> Harmonize AI automation and human touch for optimal customer experiences. </p>
                      </div>
                    </div>
                  </li>
                  <li className="nk-timeline-item p-0">
                    <div className="nk-timeline-item-inner">
                      <div className="nk-timeline-symbol text-bg-warning-soft"></div>
                      <div className="nk-timeline-content mt-n1">
                        <p> Blend technology and human interaction for a perfect customer engagement balance. </p>
                      </div>
                    </div>
                  </li>
                </ul>
                <ul className="nk-btn-group pt-5">
                  <li>
                    <NioButton href="#" className="btn-warning" label="Meet ChatBot" />
                  </li>
                  <li>
                    <NioButton href="#" className="btn-outline-dark" label="Learn More" />
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row className="align-items-center flex-lg-row-reverse justify-content-between">
            <Col lg={6} xl={5}>
              <div className="nk-feature-overview-img text-center mb-5 mb-lg-0">
                <img src="images/chat-app/section-cover-3-a.png" alt="cover-bg" className="base" />
                <div className="children children-center w-100 h-100">
                  <img src="images/chat-app/section-cover-3.png" alt="cover-fd" className="mt-7" />
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div>
                <div className="nk-section-head pb-5">
                  <div className="d-inline-block fs-16 text-uppercase text-danger fw-semibold mb-2">Great user experience</div>
                  <h2>Building blocks of remarkable experience</h2>
                </div>
                <ul className="nk-timeline d-flex flex-column gap-3 gap-md-5">
                  <li className="nk-timeline-item p-0">
                    <div className="nk-timeline-item-inner">
                      <div className="nk-timeline-symbol text-bg-danger-soft"></div>
                      <div className="nk-timeline-content mt-n1">
                        <p>Build remarkable experiences with innovation, personalization, and seamless interactions.</p>
                      </div>
                    </div>
                  </li>
                  <li className="nk-timeline-item p-0">
                    <div className="nk-timeline-item-inner">
                      <div className="nk-timeline-symbol text-bg-danger-soft"></div>
                      <div className="nk-timeline-content mt-n1">
                        <p>Elevate experiences through innovation, personalization, and seamless interactions.</p>
                      </div>
                    </div>
                  </li>
                </ul>
                <ul className="nk-btn-group pt-5">
                  <li>
                    <NioButton href="/features" className="btn-danger text-white" label="Explore All Features" />
                  </li>
                  <li>
                    <NioButton href="#" className="btn-outline-dark" label="Learn More" />
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Features Section End  */}

      {/*  Video Section Start  */}
      <NioSection className="nk-video-section bg-green-50 overflow-hidden">
        <NioSection.Head alignX="center">
          <span className="d-inline-block fs-16 text-uppercase text-warning fw-semibold mb-2">How it works?</span>
          <h2>Take a Tour and See How NioLand
            <span className="title-shape title-shape-3 title-shape-3_one">works?</span>
          </h2>
          <p className="fs-20">Explore NioLand through a guided tour and discover how our platform works to revolutionize your business. </p>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="nk-video nk-video-s1" >
                <div className="nk-video-inner">
                  <div className="nk-video-content">
                    <div className="nk-video-img text-center">
                      <img src="images/chat-app/section-cover-4.jpg" alt="cover" className="rounded-3" />
                    </div>
                    <div className="nk-video-btn">
                      <NioMedia
                        rounded
                        size="lg"
                        icon="play-fill"
                        lightboxSrc="https://www.youtube.com/watch?v=pVE92TNDwUk"
                        className="text-bg-danger text-white shadow-xl animate animate-infinite animate-pulse animate-duration-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Video Section End  */}

      {/*  Funfact Section Start  */}
      <NioSection className="py-7 py-lg-120">
        <NioSection.Content>
          <Row className="gy-5 gy-lg-0 justify-content-lg-around">
            <Col sm={6} lg={3} >
              <div className="position-relative text-center">
                <div className="mb-5">
                  <img src="images/chat-app/icon-feature-1.png" alt="icon" />
                </div>
                <NioCount className="h1 d-inline-block mb-2" end={75} decimals={3} suffix=",000" decimal="," />
                <p className="fs-20">Chats Monthly</p>
              </div>
            </Col>
            <Col sm={6} lg={3} >
              <div className="position-relative text-center">
                <div className="mb-5">
                  <img src="images/chat-app/icon-feature-2.png" alt="icon" />
                </div>
                <NioCount className="h1 d-inline-block mb-2" end={150} suffix="+" />
                <p className="fs-20">Connected Countries</p>
              </div>
            </Col>
            <Col sm={6} lg={3} >
              <div className="position-relative text-center">
                <div className="mb-5">
                  <img src="images/chat-app/icon-feature-3.png" alt="icon" />
                </div>
                <NioCount className="h1 d-inline-block mb-2" end={200} decimals={3} decimal="," />
                <p className="fs-20">Support Report</p>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Funfact Section End  */}

      {/*  Integrate Section Start  */}
      <NioSection py={false} className="nk-section-integrate bg-green-50 overflow-hidden pb-7 pb-lg-0 py-lg-0">
        <NioSection.Content className="position-relative">
          <Row className="justify-content-between">
            <Col lg={5} className="align-self-center">
              <div className="nk-section-head text-center text-lg-start py-7 py-lg-220">
                <span className="d-inline-block fs-16 text-uppercase text-success-alt fw-semibold mb-2">Easy integration</span>
                <div>
                  <h2 className="h1 mb-2">
                    <span className="title-shape title-shape-3 title-shape-3_two">Integrate</span> with 200+ tools.
                  </h2>
                  <p className="fs-20">Connect NioLand with apps you use and love. Chat with your customers, send their details to your CRM, manage orders and accept payments.</p>
                </div>
                <ul className="nk-btn-group justify-content-center justify-content-lg-start pt-5">
                  <li>
                    <NioButton href="/auth/sign-up" className="btn-success-alt" label="Sign Up For Free" />
                  </li>
                  <li>
                    <NioButton href="#" className="btn-outline-dark" label="All Integrations" />
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={6}>
              <div className="infinite-scroll">
                <div className="infinite-scroll-col infinite-scroll-init infinite-scroll-lg-vertical infinite-scroll-horizontal infinite-scroll-duration-12">
                  {
                    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"]?.map((tool, idx) => (
                      <div className="infinite-scroll-card" key={idx}>
                        <img src={`images/tools/tool-${tool}.png`} alt="tool" />
                      </div>
                    ))
                  }
                </div>
                <div className="infinite-scroll-col infinite-scroll-init infinite-scroll-lg-verticalAlternate infinite-scroll-horizontalAlternate infinite-scroll-duration-12">
                  {
                    ["15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"]?.map((tool, idx) => (
                      <div className="infinite-scroll-card" key={idx}>
                        <img src={`images/tools/tool-${tool}.png`} alt="tool" />
                      </div>
                    ))
                  }
                </div>
                <div className="infinite-scroll-col infinite-scroll-init infinite-scroll-lg-vertical infinite-scroll-horizontal infinite-scroll-duration-12">
                  {
                    ["14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"]?.map((tool, idx) => (
                      <div className="infinite-scroll-card" key={idx}>
                        <img src={`images/tools/tool-${tool}.png`} alt="tool" />
                      </div>
                    ))
                  }
                </div>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Integrate Section End  */}

      {/*  Testimonial Section Start  */}
      <NioSection className="nk-section-testimonial py-7 py-lg-120">
        <NioSection.Head alignX="center">
          <span className="d-inline-block fs-16 text-uppercase text-success-alt fw-semibold mb-2">testimonials</span>
          <h2 className="mb-0">Our <span className="title-shape title-shape-3">customers</span> Say <br /> it Best.</h2>
        </NioSection.Head>
        <NioSection.Content>
          <Row>
            <Col lg={4}>
              <div className="card-list gy-4">
                <NioCard >
                  <NioCard.Body>
                    <h5 className="fw-semibold mb-2 mb-md-3">Thank you @NioLand for helping us stay connected to our clients</h5>
                    <p className="small">One way we're continuing to serve clients remotely is using online chat software by NioLand. Clients visiting our website can click the chat to get connected to a Navigator in real time. Thank you @NioLand for helping us stay connected to our clients during this time! pic.twitter.com/4SEjAtQ0AR</p>

                    <div className="media-group align-items-center pt-2">
                      <NioMedia size="md" rounded img="images/avatar/a.jpg" />

                      <div className="media-text">
                        <h6 className="mb-0 fw-semibold">Wade Warren</h6>
                        <span className="small">@cryptomil</span>
                      </div>
                    </div>
                  </NioCard.Body>
                </NioCard>
                <NioCard >
                  <NioCard.Body>
                    <h5 className="fw-semibold mb-2 mb-md-3">Our @NioLand team calls their happiness scores “Chatisfaction”</h5>
                    <p className="small">We use @NioLand and really love the capabilities and UX! Our @NioLand team calls their happiness scores “Chatisfaction” instead of Satisfaction.</p>

                    <div className="media-group align-items-center pt-2">
                      <NioMedia size="md" rounded img="images/avatar/b.jpg" />

                      <div className="media-text">
                        <h6 className="mb-0 fw-semibold">Jesicca Brown</h6>
                        <span className="small">@cryptomil</span>
                      </div>
                    </div>
                  </NioCard.Body>
                </NioCard>
                <NioCard >
                  <NioCard.Body>
                    <h5 className="fw-semibold mb-2 mb-md-3">“Great service by Nadim thank you</h5>
                    <p className="small">This morning we completed our 10,000th @NioLand conversation! But why is that we love NioLand so much?</p>

                    <div className="media-group align-items-center pt-2">
                      <NioMedia size="md" rounded img="images/avatar/c.jpg" />

                      <div className="media-text">
                        <h6 className="mb-0 fw-semibold">Jane Doe</h6>
                        <span className="small">@cryptomil</span>
                      </div>
                    </div>
                  </NioCard.Body>
                </NioCard>
              </div>
            </Col>
            <Col lg={4}>
              <div className="card-list gy-4">
                <NioCard >
                  <NioCard.Body>
                    <h5 className="fw-semibold mb-2 mb-md-3">Really glad to have a call with Dani – super invaluable. </h5>
                    <p className="small">Hey @LiveChat I just wanted to let you know how great your service worked for me during my recent launch. I was able to connect with my potential students in a way I never have been able to before. And I had my best launch ever. #Thanks</p>

                    <div className="media-group align-items-center pt-2">
                      <NioMedia size="md" rounded img="images/avatar/d.jpg" />

                      <div className="media-text">
                        <h6 className="mb-0 fw-semibold">Kevin Martin</h6>
                        <span className="small">@cryptomil</span>
                      </div>
                    </div>
                  </NioCard.Body>
                </NioCard>
                <NioCard >
                  <NioCard.Body>
                    <h5 className="fw-semibold mb-2 mb-md-3">The Services provided are really great, we received a genuine advice and at very reasonable cost.</h5>
                    <p className="small">One of my favorite things in the entire world is randomly jumping into chat on our site (shoutout @NioLand ). It's super nice to just talk to your customers, kind of reminds you why you do what you do. If you have chat and have never been in it, I highly recommend it. #eComTips</p>

                    <div className="media-group align-items-center pt-2">
                      <div className="media media-md media-circle">
                        <img src="images/avatar/e.jpg" alt="avatar" />
                      </div>

                      <div className="media-text">
                        <h6 className="mb-0 fw-semibold">Alex Chance</h6>
                        <span className="small">@cryptomil</span>
                      </div>
                    </div>
                  </NioCard.Body>
                </NioCard>
                <NioCard >
                  <NioCard.Body>
                    <h5 className="fw-semibold mb-2 mb-md-3">Just came back to home and should say that it is definitely a great experience.</h5>
                    <p className="small">I do love your app @NioLand - in less than 24 hours I booked a $250 sale. What can I say? I'm a sucker for a good ROI!</p>

                    <div className="media-group align-items-center pt-2">
                      <div className="media media-md media-circle">
                        <img src="images/avatar/f.jpg" alt="avatar" />
                      </div>
                      <div className="media-text">
                        <h6 className="mb-0 fw-semibold">Jhon Doe</h6>
                        <span className="small">@cryptomil</span>
                      </div>
                    </div>
                  </NioCard.Body>
                </NioCard>
              </div>
            </Col>
            <Col lg={4}>
              <div className="card-list gy-4">
                <NioCard >
                  <NioCard.Body>
                    <h5 className="fw-semibold mb-2 mb-md-3">Hannah helped me cover a lot during a short time!</h5>
                    <p className="small">Thank you @mariuszcieply iam using @NioLand for more than 2 years it's better than any other NioLand products</p>

                    <div className="media-group align-items-center pt-2">
                      <NioMedia size="md" rounded img="images/avatar/g.jpg" />

                      <div className="media-text">
                        <h6 className="mb-0 fw-semibold">Kamran Adil</h6>
                        <span className="small">@cryptomil</span>
                      </div>
                    </div>
                  </NioCard.Body>
                </NioCard>
                <NioCard >
                  <NioCard.Body>
                    <h5 className="fw-semibold mb-2 mb-md-3">I had a great time chatting with Vassilena! </h5>
                    <p className="small">I want to thank @NioLand too!! We have used them for the past 10 years and recently, after an upgrade, had a problem in a magento install, yet they hung in there and the support team worked their magic. Thanks to all!</p>

                    <div className="media-group align-items-center pt-2">
                      <NioMedia size="md" rounded img="images/avatar/h.jpg" />

                      <div className="media-text">
                        <h6 className="mb-0 fw-semibold">Alex Hales</h6>
                        <span className="small">@cryptomil</span>
                      </div>
                    </div>
                  </NioCard.Body>
                </NioCard>
                <NioCard >
                  <NioCard.Body>
                    <h5 className="fw-semibold mb-2 mb-md-3">I tried the Hair mask first and its the best one I've ever tried love it.</h5>
                    <p className="small">One way we're continuing to serve clients remotely is using online chat software by NioLand. Clients visiting our website can click the chat to get connected to a Navigator in real time. Thank you @NioLand for helping us stay connected to our clients during this time! pic.twitter.com/4SEjAtQ0AR</p>

                    <div className="media-group align-items-center pt-2">
                      <NioMedia size="md" rounded img="images/avatar/i.jpg" />

                      <div className="media-text">
                        <h6 className="mb-0 fw-semibold">Mark Hardson</h6>
                        <span className="small">@cryptomil</span>
                      </div>
                    </div>
                  </NioCard.Body>
                </NioCard>
              </div>
            </Col>
          </Row>
          <div className="text-center pt-5">
            <ul className="nk-btn-group justify-content-center">
              <li>
                <NioButton href="/auth/sign-up" className="btn-success-alt" label="Sign Up For Free" />
              </li>
              <li>
                <NioButton href="/auth/login" className="btn-outline-dark" label="Login To Your account" />
              </li>
            </ul>
          </div>
        </NioSection.Content>
      </NioSection>
      {/*  Testimonial Section End  */}

      {/*  Support Section End  */}
      <NioSection py={false} className="bg-green-50 pb-0 pt-7 pt-lg-120">
        <NioSection.Content>
          <Row className="justify-content-center">
            <Col xl={6}>
              <div className="nk-section-head text-center">
                <ul className="rating d-flex align-items-center justify-content-center gap-1 mb-2">
                  <li>
                    <NioIcon name="star-fill" className="text-warning" />
                  </li>
                  <li>
                    <NioIcon name="star-fill" className="text-warning" />
                  </li>
                  <li>
                    <NioIcon name="star-fill" className="text-warning" />
                  </li>
                  <li>
                    <NioIcon name="star-fill" className="text-warning" />
                  </li>
                  <li>
                    <NioIcon name="star-fill" className="text-warning" />
                  </li>
                </ul>
                <div>
                  <h2 className="h1 mb-2">Our Support Heroes Are Here For You 24/7</h2>
                  <p className="fs-20 mb-0">Meet our world famous support team. They are fast, they are smart, and they will help you out any time day or night!</p>
                </div>
                <ul className="nk-btn-group justify-content-center pt-5">
                  <li>
                    <NioButton href="#" className="btn-success-alt" label="Chat With Us" />
                  </li>
                  <li>
                    <NioButton href="/contact-us" className="btn-outline-dark" label="Contact Us" />
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <div className="nk-support-thumb mb-n2" >
            <img src="images/chat-app/section-cover-5.png" alt="thumb" />
          </div>
        </NioSection.Content>
      </NioSection>
      {/*  Support Section End  */}

      {/*  Trial Section Start  */}
      <NioSection className="nk-section-cta bg-warning">
        <Row className="justify-content-center">
          <Col xl={10}>
            <div className="nk-section-head text-center">
              <h2 className="display-6 mb-3" >Start a free LiveChat trial now!</h2>
              <div className="col-md-7 mx-auto" >
                <p className="fs-20 text-dark ">Supercharge your website and social media profiles. Turn visits into sales, customer into fans.</p>
              </div>
            </div>
          </Col>
        </Row>
        <NioSection.Content>
          <Row className="justify-content-center">
            <Col md={10} xl={6}>
              <div>
                <div >

                  <form data-action="form/subscribe.php" className="form-submit-init" method="post">
                    <Row className="form-group nk-newsletter-one">
                      <Col md={8}>
                        <NioField.Input className="mb-4 mb-md-0" childClass="text-base border-dark py-3" placeholder="Enter Your Email" />
                      </Col>
                      <div className="col-md-4 ps-md-0">
                        <input type="submit" className="btn btn-danger btn-block h-100" value="Subscribe" />
                      </div>
                    </Row>
                  </form>
                </div>
                <ul className="d-flex gap-5 flex-wrap align-items-center justify-content-center text-base pt-5">
                  <li className="text-dark" >
                    <NioIcon name="check-circle" className="me-1" />
                    <span>Free 14-day trial</span>
                  </li>
                  <li className="text-dark" >
                    <NioIcon name="check-circle" className="me-1" />
                    <span>Ticketing System</span>
                  </li>
                  <li className="text-dark" >
                    <NioIcon name="check-circle" className="me-1" />
                    <span>Analytics</span>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Trial Section End  */}

      {/*  NewsLetter Section Start   */}
      <NioSection className="nk-section nk-section-nwsletter pb-0 pt-7 pt-lg-120">
        <Row className="justify-content-center justify-content-lg-between align-items-center pb-5 border-bottom border-lighter">
          <Col lg={6} xl={4}>
            <div className="nk-newsletter-content text-center text-lg-start pb-5 pb-lg-0">
              <h4 className="text-capitalize">Subscribe to our newsletter</h4>
              <p className="fs-16">Join the 5000+ People That Uses Softnio Products.</p>
            </div>
          </Col>
          <Col md={10} lg={6} xl={5}>
            <NioSubscribeField variant="one" />
          </Col>
        </Row>
      </NioSection>
      {/*  NewsLetter Section End   */}

    </AppLayout>
  )
}

export default index;