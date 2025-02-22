import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

// layout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components
import { NioButton, NioMedia, NioBrand, NioCount, NioIcon, NioSection, NioCard } from '../../../components';

// section content 
import NioSubscribeField from '../../../components/Forms/NioSubscribeField/NioSubscribeField';

function index() {

  return (
    <AppLayout variant={2} title="Analytics">

      {/*   Banner Section Start  */}
      <section className="nk-banner nk-banner-analytics overflow-hidden">
        <div className="nk-mask blur-1 left top"></div>
        <div className="nk-mask blur-1 right bottom"></div>
        <div className="nk-banner-wrap pb-0 pb-md-8 overflow-hidden">
          <Container>
            <Row className="justify-content-center">
              <Col lg={10} xl={7}>
                <div className="nk-banner-content text-center">
                  <span className="d-inline-block fs-14 text-uppercase text-primary fw-semibold mb-2" >All in One analytics tool</span>
                  <h1 className="display-6 mb-2 mb-lg-4" >Presenting the next-gen user <span className="title-shape title-shape-1">analytics</span></h1>
                  <p className="fs-20 m-0" > Next-gen user analytics: Gain valuable insights into user behavior and drive data-informed decision-making with our revolutionary platform. </p>
                  <ul className="nk-btn-group justify-content-center pt-4 pt-md-5" >
                    <li>
                      <NioButton href="/index-analytics" className="btn-primary" label="Get Started" />
                    </li>
                    <li>
                      <NioButton href="/index-analytics" className="btn-outline-primary" label="Learn More" />
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs={9} lg={10} xl={9} >
                <div className="pt-6 mt-md-2 pb-7 pb-md-0">
                  <div className="position-relative nk-banner-img nk-banner-img-s1">
                    <img className="thumb-base border rounded-3" src="images/thumb/a.jpg" alt="thumb-content" />
                    <img className="thumb thumb-1 animate animate-shakeY animate-duration-12" src="images/thumb/a-1.png" alt="thumb-content" />
                    <img className="thumb thumb-2 animate animate-shakeY animate-duration-12 animate-delay-1" src="images/thumb/a-2.png" alt="thumb-content" />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/*  Banner Section End  */}

      {/*  Brand Section Start  */}
      <NioSection className="nk-brand-section">
        <NioSection.Content>
          <Row className="justify-content-center">
            <Col lg={10} xl={8}>
              <div className="text-center">
                <h6 className="fw-normal text-light mb-5">Trusted by 10,000+ companies around the world</h6>
                <Row className="gy-2 gy-lg-0 align-items-center justify-content-center">
                  {
                    ["a", "b", "c", "d", "e"]?.map((brand, idx) => (
                      <Col xs={4} sm={3} lg={2} key={idx}>
                        <div className="nk-brand">
                          <Link to="#">
                            <img src={`images/brands/${brand}.png`} alt={`brand-${brand}`} />
                          </Link>
                        </div>
                      </Col>
                    ))
                  }
                </Row>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Brand Section End  */}

      {/*  Feature Section Start  */}
      <NioSection masks={["blur-1 left top", "blur-1 right bottom"]}>
        <NioSection.Head alignX="center">
          <span className="fs-14 text-uppercase text-primary fw-semibold mb-2">Features</span>
          <h2>Discover Powerful Features</h2>
          <p className="fs-20">Unleash the power of our platform with a multitude of powerful features, empowering you to achieve your goals.</p>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="gy-5">
            <Col lg={6} >
              <NioCard className="border-0 bg-blue-50">
                <NioCard.Body>
                  <div className="nk-feature-block-content">
                    <NioMedia size="lg" variant="primary" rounded icon="pie-2-fill" className="mb-3 mb-lg-5" />
                    <h4 >Advance Analytics</h4>
                    <p className="fs-16 mb-0">Experience advanced analytics capabilities that enable you to dive deep into data, uncover meaningful patterns, and derive actionable insights for informed decision-making.</p>
                    <NioButton href="/index-analytics" icon="arrow-right after" className="btn-link mt-2 mt-md-5" label="Learn More" />
                  </div>
                </NioCard.Body>
                <div className="text-start">
                  <img src="images/features/a.png" alt="feature" className="pe-3 pe-md-7" />
                </div>
              </NioCard>
            </Col>
            <Col lg={6} >
              <NioCard className="border-0 bg-blue-50">
                <NioCard.Body>
                  <div className="nk-feature-block-content">
                    <NioMedia size="lg" variant="danger text-white" rounded icon="files-fill" className="text-white mb-3 mb-lg-5" />
                    <h4 >Automated Reports</h4>
                    <p className="fs-16 mb-0">Save time and effort with automated reporting, generating comprehensive and accurate reports automatically, streamlining your data analysis and presentation processes.</p>
                    <NioButton href="/index-analytics" icon="arrow-right after" label="Learn More" className="btn-link mt-2 mt-md-5" />
                  </div>
                </NioCard.Body>
                <div className="text-end"  >
                  <img src="images/features/b.png" alt="feature" className="ps-3 ps-md-7" />
                </div>
              </NioCard>
            </Col>
            <Col md={6} xl={4} >
              <NioCard className="border-0 bg-blue-50">
                <NioCard.Body>
                  <NioMedia size="lg" variant="warning" rounded icon="user-switch-fill" className="text-white mb-3 mb-lg-5" />
                  <h4 >Retention Report</h4>
                  <p className="fs-16">
                    Enhance retention with our report, maximizing customer engagement and loyalty for business excellence.
                  </p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} xl={4} >
              <NioCard className="border-0 bg-blue-50">
                <NioCard.Body>
                  <NioMedia size="lg" variant="danger text-white" rounded icon="tree-structure-fill" className="text-white mb-3 mb-lg-5" />
                  <h4 >A/B Test Variants</h4>
                  <p className="fs-16">Efficiently compare A/B test variants to determine the most effective strategies for optimizing conversion.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} xl={4} >
              <NioCard className="border-0 bg-blue-50">
                <NioCard.Body>
                  <NioMedia size="lg" variant="primary" rounded icon="puzzle-fill" className="mb-3 mb-lg-5" />
                  <h4>Integration Directory</h4>
                  <p className="fs-16">Seamlessly integrate with our directory, maximizing efficiency and unlocking the full potential of your workflow.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
          <div className="text-center pt-7">
            <ul className="nk-btn-group justify-content-center">
              <li>
                <NioButton href="/index-analytics" className="btn-primary" label="Get Started" />
              </li>
              <li>
                <NioButton href="/features" className="btn-outline-primary" label="Explore All Features" />
              </li>
            </ul>
          </div>
        </NioSection.Content>
      </NioSection>
      {/*  Feature Section End  */}

      {/*  Works Section Start  */}
      <NioSection className="nk-section-cta">
        <NioSection.Head alignX="center">
          <span className="fs-14 text-uppercase text-primary fw-semibold mb-2">HOW IT WORKS?</span>
          <h2>Easy Process To Get Started</h2>
          <p className="fs-20">Discover how it works by leveraging advanced algorithms and data analysis techniques.</p>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="align-items-center flex-row-reverse justify-content-between">
            <Col lg={6} >
              <div className="nk-cta-img-wrap bg-primary-gradient rounded-4 px-4 pt-4 mb-7 mb-lg-0 ms-lg-7 overflow-hidden" >
                <img src="images/cta/a.png" alt="thumb" />
              </div>
            </Col>
            <Col lg={6}>
              <ul className="gap gy-5 gy-lg-7">
                <li className="media-group gap-3 gap-md-5 flex-column flex-sm-row" >
                  <NioMedia size="lg" rounded border icon="laptop-fill" />

                  <div className="media-text m-0">
                    <h4 className="text-capitalize mb-2">Create your account</h4>
                    <p>Join us now and create your account to start exploring our platform and unlocking exciting features.</p>
                  </div>
                </li>
                <li className="media-group gap-3 gap-md-5 flex-column flex-sm-row" >
                  <NioMedia size="lg" rounded border icon="google-play-store" />

                  <div className="media-text m-0">
                    <h4 className="text-capitalize mb-2">Install our tracking app</h4>
                    <p>Install our tracking app to effortlessly monitor and manage your activities, gaining valuable insights and optimizing your performance.</p>
                  </div>
                </li>
                <li className="media-group gap-3 gap-md-5 flex-column flex-sm-row" >
                  <NioMedia size="lg" rounded border icon="browser-fill" />

                  <div className="media-text m-0">
                    <h4 className="text-capitalize mb-2">Start tracking your website</h4>
                    <p>Start tracking your website effortlessly to gain valuable insights into visitor behavior, performance metrics, and optimization opportunities.</p>
                  </div>
                </li>
              </ul>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>

      {/*  Works Section End  */}

      {/*  Video Section Start  */}
      <NioSection className="nk-video-section" masks={["blur-1 left top", "blur-1 right bottom"]}>
        <NioSection.Head alignX="center">
          <span className="fs-14 text-uppercase text-primary fw-semibold mb-2">overview</span>
          <h2>All-In-One Analytics Tool</h2>
          <p className="fs-20">Powerful analytics made easy. Make data-driven decisions with our all-in-one tool.</p>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="nk-video rounded-3 bg-blue-50 " >
                <div className="nk-mask shape-1 overflow-hidden rounded-4"  ></div>
                <div className="nk-video-inner">
                  <div className="nk-video-logo p-4 d-none d-sm-block">
                    <NioBrand logo="s1" variant="dark" />
                  </div>
                  <div className="nk-video-content">
                    <div className="nk-video-img overflow-hidden pt-4">
                      <img className="parallax-init mb-n6 mb-sm-n4" data-scale="1.25" data-orientation="down" src="images/video/a.png" alt="" />
                    </div>
                    <div className="nk-video-btn">
                      <NioMedia
                        size="lg"
                        icon="play-fill"
                        rounded variant="primary"
                        lightboxSrc="https://www.youtube.com/watch?v=pVE92TNDwUk"
                        className="shadow-sm animate animate-infinite animate-pulse animate-duration-1" />
                    </div>
                  </div>
                </div>

              </div>

              <div className="text-center pt-5 pt-md-7">
                <ul className="nk-btn-group justify-content-center">
                  <li>
                    <NioButton href="/index-analytics" className="btn-primary" label="Get Started" />
                  </li>
                  <li>
                    <NioButton href="/index-analytics" className="btn-outline-primary" label="Learn More" />
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center justify-content-xxl-between align-items-center pt-5 pt-md-7">
            <Col lg={7} xl={6}>
              <div className="nk-section-head pb-xxl-0 text-center text-xxl-start">
                <h2 className=" mb-0">More Than 1M+ People Around The World Are Already Using</h2>
              </div>
            </Col>
            <Col lg={8} xl={6}>
              <div className="d-flex gap-2 flex-wrap justify-content-center justify-content-lg-between text-xxl-end">
                <div className="mb-2 mb-xl-0 text-center text-lg-end">
                  <h3 className="mb-1">
                    <NioCount end="1" suffix="M+" />
                  </h3>
                  <p className="fs-20">Active Downloads</p>
                </div>
                <div className="mb-2 mb-xl-0 text-center text-lg-end">
                  <h3 className="mb-1">
                    <NioCount end={4} suffix=".86" />
                  </h3>
                  <p className="fs-20">Average Rating</p>
                </div>
                <div className="mb-2 mb-xl-0 text-center text-lg-end">
                  <h3 className="mb-1">
                    <NioCount end={60} suffix="K+" />
                  </h3>
                  <p className="fs-20">Active Users</p>
                </div>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>

      {/*  Video Section End  */}

      {/*  Testimonial Section Start  */}
      <NioSection className="nk-testimonial-section">
        <Row className="justify-content-center">
          <Col lg={8} xl={4}>
            <div className="nk-section-head text-center">
              <span className="fs-14 text-uppercase text-primary fw-semibold mb-2">reviews</span>
              <h2>What Our Customers Are Saying</h2>
            </div>
          </Col>
        </Row>
        <NioSection.Content>
          <Row className="g-gs">
            <Col md={6} lg={4}>
              <NioCard>
                <NioCard.Body>
                  <ul className="d-flex gap-2 align-items-center mb-2">
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
                    <h5 className="mb-3">We’re building a better application now, thanks to NioLand.</h5>
                    <p className="fs-14 line-clamp-3">
                      Our application is undergoing significant improvements with the help of NioLand, resulting in enhanced functionality, improved user experience, and advanced features for a better and more satisfying user journey.
                    </p>
                  </div>
                  <div className="pt-5 media-text">
                    <h6 className="mb-0">Wade Warren</h6>
                    <span className="small">3 months ago</span>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4}>
              <NioCard>
                <NioCard.Body>
                  <ul className="d-flex gap-2 align-items-center mb-2">
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
                    <h5 className="mb-3">Great Service from a expert support system of NioLand.</h5>
                    <p className="fs-14 line-clamp-3">
                      Experience exceptional service and support from NioLand's expert team, dedicated to providing knowledgeable assistance and ensuring a seamless and satisfying user experience.
                    </p>
                  </div>
                  <div className="pt-5 media-text">
                    <h6 className="mb-0">Dianne Russell</h6>
                    <span className="small">3 months ago</span>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4}>
              <NioCard>
                <NioCard.Body>
                  <ul className="d-flex gap-2 align-items-center mb-2">
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
                    <h5 className="mb-3">Pricing is amazing for the small businesses around the world.</h5>
                    <p className="fs-14 line-clamp-3">
                      Our pricing is tailored to suit the needs of small businesses worldwide, offering affordable and competitive rates that provide excellent value for money without compromising on quality or service.
                    </p>
                  </div>
                  <div className="pt-5 media-text">
                    <h6 className="mb-0">Marvin McKinney</h6>
                    <span className="small">3 months ago</span>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
          <div className="text-center pt-5 pt-lg-7">
            <NioButton href="/customer-testimonials" className="btn-outline-primary" label="See All Reviews" />
          </div>
        </NioSection.Content>
      </NioSection>
      {/*  Testimonial Section End  */}

      {/*  Blog Section Start  */}
      <NioSection className="nk-section-blog" masks={["blur-1 left top", "blur-1 right bottom"]}>

        <NioSection.Head alignX="center">
          <span className="fs-14 text-uppercase text-primary fw-semibold mb-2">OUR BLOG</span>
          <h2>Resource Center</h2>
          <p className="fs-20">
            Unlock the potential of our resource center, accessing valuable information and insights for your business growth.
          </p>
        </NioSection.Head>

        <NioSection.Content>
          <Row className="gy-5 gy-lg-0">
            <Col md={6} lg={4} >
              <NioCard className="card-blog">
                <NioCard.Body>
                  <div className="card-image">
                    <img src="images/blog/a.jpg" alt="" className="card-img" />
                  </div>
                  <div className="card-content pt-4">
                    <div className="pb-1">
                      <span className="badge rounded-pill text-bg-primary-soft">Growth</span>
                    </div>
                    <h5 className="card-title">
                      <Link to="/blog-details">Why customer retention is the ultimate growth strategy?</Link>
                    </h5>

                    <div className="media-group pt-4 align-items-center">

                      <div className="media media-sm media-circle">
                        <img src="images/avatar/a.jpg" alt="avatar" />
                      </div>

                      <div className="media-text">
                        <span className="lead-text fw-normal">John Carter</span>
                        <ul className="nk-list-meta smaller">
                          <li>Feb 10, 2022</li>
                          <li>8 min read</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="card-blog">
                <NioCard.Body>
                  <div className="card-image">
                    <img src="images/blog/b.jpg" alt="" className="card-img" />
                  </div>
                  <div className="card-content pt-4">
                    <div className="pb-1">
                      <span className="badge rounded-pill text-bg-primary-soft">Marketing</span>
                    </div>
                    <h5 className="card-title">
                      <Link to="/blog-details">Optimizing your advertising campaigns for higher ROAS</Link>
                    </h5>

                    <div className="media-group pt-4 align-items-center">

                      <div className="media media-sm media-circle">
                        <img src="images/avatar/b.jpg" alt="" />
                      </div>

                      <div className="media-text">
                        <span className="lead-text fw-normal">Annette Black</span>
                        <ul className="nk-list-meta smaller">
                          <li>Feb 10, 2022</li>
                          <li>8 min read</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="card-blog">
                <NioCard.Body>
                  <div className="card-image">
                    <img src="images/blog/c.jpg" alt="" className="card-img" />
                  </div>
                  <div className="card-content pt-4">
                    <div className="pb-1">
                      <span className="badge rounded-pill text-bg-primary-soft">Growth</span>
                    </div>
                    <h5 className="card-title">
                      <Link to="/blog-details">How to build the ultimate tech stack for growth</Link>
                    </h5>

                    <div className="media-group pt-4 align-items-center">

                      <div className="media media-sm media-circle">
                        <img src="images/avatar/c.jpg" alt="" />
                      </div>

                      <div className="media-text">
                        <span className="lead-text fw-normal">Ralph Edwards</span>
                        <ul className="nk-list-meta smaller">
                          <li>Feb 10, 2022</li>
                          <li>8 min read</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
          <div className="text-center pt-5 pt-lg-7">
            <NioButton href="/blogs" className="btn-outline-primary" label="Browse All Articles" />
          </div>
        </NioSection.Content>
      </NioSection>
      {/*  Blog Section End  */}

      {/*  CTA Section Start  */}
      <NioSection>
        <NioSection.Content>
          <div className="nk-cta-wrap nk-cta-card bg-primary-gradient rounded-3 is-theme position-relative overflow-hidden" >
            <Row className="g-0 align-items-center overflow-hidden">
              <Col xs={{ order: 2 }} lg={{ span: 7, order: 0 }}>
                <div className="nk-block-head-content  mb-0">
                  <h2 className="newsletter-heading text-capitalize h1 m-0 mb-4 mb-lg-7">Start tracking your user analytics to boost your business</h2>
                  <ul className="nk-btn-group flex-wrap ps-1">
                    <li>
                      <NioButton href="/index-analytics" className="btn-white text-dark" label="Get Started" />
                    </li>
                    <li>
                      <NioButton href="/pricing" className="btn-outline-white" label="Pricing & Plans" />
                    </li>
                  </ul>
                </div>
              </Col>
              <Col xs={{ order: 1 }} lg={{ span: 5, order: 0 }}>
                <div className="nk-cta-img-wrap text-end  ps-5 pt-7 pt-lg-0 ps-sm-6 ps-lg-0">
                  <img src="images/thumb/c.png" alt="tracking-thumb" className="me-n1" />
                </div>
              </Col>
            </Row>
          </div>
        </NioSection.Content>
      </NioSection>
      {/*  CTA Section End  */}

      {/*  Newsletter Section Start  */}
      <NioSection className="nk-newsletter-section pb-lg-0">
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
      {/*  Newsletter Section End  */}

    </AppLayout >
  )
}

export default index