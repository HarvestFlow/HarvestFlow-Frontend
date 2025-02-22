import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';


// layout 
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components
import { NioButton, NioIcon, NioSection, NioMedia, NioCard, NioSubscribeField, NioBrand } from '../../../components';

function index() {
  return (
    <AppLayout title="About" rootClass="layout-1">

      {/*  Story Section Start  */}
      <NioSection className="pt-120 pt-lg-160" masks={["blur-1 left center"]}>
        <Row className="justify-content-center">
          <Col lg={6}>
            <div className="nk-section-head text-center">
              <span className="d-inline-block fs-14 text-uppercase text-primary fw-semibold mb-2" >Our Story</span>
              <h2 >The Story Behind NioLand</h2>
              <p className="fs-18 mb-0" >
                Discover the inspiring story behind NioLand - how a vision became a reality, empowering individuals and businesses to thrive in the digital world.
              </p>
              <ul className="nk-btn-group justify-content-center pt-5">
                <li>
                  <NioButton href="/auth/sign-up" className="btn-lg btn-primary rounded-2" label="Join Our Team" />
                </li>
                <li>
                  <NioButton href="#" className="btn-lg btn-outline-primary rounded-2" label="Our Values" />
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <NioSection.Content>
          <Row className="justify-content-center">
            <Col lg={10} xl={8}>
              <div className="nk-video rounded-4 bg-blue-100 " >
                <div className="nk-mask shape-1 rounded-4 overflow-hidden" ></div>
                <div className="nk-video-inner">
                  <div className="nk-video-logo p-4">
                    <NioBrand />
                  </div>
                  <div className="nk-video-content">
                    <div className="nk-video-img">
                      <img src="images/video/e.png" alt="video" />
                    </div>
                    <div className="nk-video-btn">
                      <NioMedia
                        rounded
                        size="xl"
                        icon="play-fill"
                        variant="primary"
                        lightboxSrc="https://www.youtube.com/watch?v=pVE92TNDwUk"
                        className="shadow-xl animate animate-infinite animate-pulse animate-duration-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Story Section End */}

      {/*  Features Section Start  */}
      <NioSection>
        <NioSection.Content>
          <Row className="gy-5">
            <Col md={6} >
              <NioCard>
                <NioCard.Body>
                  <div className="media-group gap-3 gap-md-4 flex-column flex-lg-row align-items-start align-items-lg-center">
                    <div className="media-text">
                      <h1 className="text-primary">240%</h1>
                    </div>
                    <div className="media-text m-0">
                      <h4 className="text-capitalize">Company growth</h4>
                      <p> Unleashing exponential growth through innovation. </p>
                    </div>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} >
              <NioCard>
                <NioCard.Body>
                  <div className="media-group gap-3 gap-md-4 flex-column flex-lg-row align-items-start align-items-lg-center">
                    <div className="media-text">
                      <h1 className="text-warning">175+</h1>
                    </div>
                    <div className="media-text m-0">
                      <h4 className="text-capitalize">Team members</h4>
                      <p> Our talented team members are the driving force behind. </p>
                    </div>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} >
              <NioCard>
                <NioCard.Body>
                  <div className="media-group gap-3 gap-md-4 flex-column flex-lg-row align-items-start align-items-lg-center">
                    <div className="media-text">
                      <h1 className="text-danger">625+</h1>
                    </div>
                    <div className="media-text m-0">
                      <h4 className="text-capitalize">Active projects</h4>
                      <p> We have a diverse range of active projects that are driving. </p>
                    </div>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} >
              <NioCard>
                <NioCard.Body>
                  <div className="media-group gap-3 gap-md-4 flex-column flex-lg-row align-items-start align-items-lg-center">
                    <div className="media-text">
                      <h1 className="text-success">99%</h1>
                    </div>
                    <div className="media-text m-0">
                      <h4 className="text-capitalize">Customer satisfaction</h4>
                      <p> Customer Satisfaction is our top priority. </p>
                    </div>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Features Section End  */}

      {/*  Journey Section Start  */}
      <NioSection>
        <NioSection.Content>
          <Row className="align-items-lg-end justify-content-lg-between gy-5">
            <Col lg={6}>
              <div className="d-flex flex-column" >
                <div className="nk-frame mb-5">
                  <img src="images/cover/cover-37.png" alt="cover-bg" />
                </div>
                <div className="nk-section-head pb-0">
                  <span className="d-inline-block fs-16 text-uppercase text-primary fw-semibold mb-2">The journey</span>
                  <h2>Journey Towards Success</h2>
                  <p className="fs-20"> The journey towards success for NioLand has been a remarkable one. It started with a vision to provide businesses with a comprehensive platform that simplifies collaboration and maximizes productivity. With a dedicated team and a customer-centric approach, NioLand has continuously evolved and improved its offerings to meet the changing needs of businesses. </p>
                  <ul className="nk-btn-group pt-5">
                    <li>
                      <NioButton href="/auth/sign-up" className="btn-primary" label="Join Our Team" />
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col lg={6} xl={5}>
              <div className="d-flex flex-column">
                <div className="nk-frame mb-5 mb-lg-0 order-lg-2 mt-lg-3" >
                  <img src="images/cover/cover-38.png" alt="cover-bg" />
                </div>
                <div className="nk-section-head pb-0">
                  <span className="d-inline-block fs-16 text-uppercase text-primary fw-semibold mb-2">Behind the story</span>
                  <h2>How NioLand Started</h2>
                  <p className="fs-20"> NioLand started with a vision to revolutionize the way businesses connect and collaborate. It was founded by a group of passionate individuals who saw the need for a platform that seamlessly integrates different tools and channels, allowing teams to work together more effectively. </p>
                </div>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Journey Section End  */}

      {/*  Values Section Start  */}
      <NioSection>
        <NioSection.Head alignX="center">
          <span className="d-inline-block fs-16 text-uppercase text-primary fw-semibold mb-2">our values</span>
          <h2>Core Values We Define</h2>
          <p className="fs-20">Innovation, Collaboration, Excellence. These core values guide us as we strive to deliver exceptional solutions and empower businesses.</p>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="gy-5">
            <Col md={6} lg={4} >
              <NioCard>
                <NioCard.Body>
                  <NioMedia
                    rounded
                    size="lg"
                    className="mb-4"
                    variant="primary-soft"
                    icon="file-text-fill"
                  />
                  <h4>Result Matter</h4>
                  <p > At NioLand, we believe that results matter. We are committed to delivering tangible outcomes and measurable impact for our clients. </p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard>
                <NioCard.Body>
                  <NioMedia
                    rounded
                    size="lg"
                    icon="gift"
                    className="mb-4"
                    variant="info-soft"
                  />
                  <h4>Commitment</h4>
                  <p >Commitment is one of our core values at NioLand. We are dedicated to providing exceptional service.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard>
                <NioCard.Body>
                  <NioMedia
                    rounded
                    size="lg"
                    className="mb-4"
                    variant="warning-soft"
                    icon="growth-fill"
                  />
                  <h4>Growth</h4>
                  <p > Growth is a fundamental value at NioLand. We believe in continuously learning, improving, and expanding our capabilities. </p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard>
                <NioCard.Body>
                  <NioMedia
                    rounded
                    size="lg"
                    className="mb-4"
                    icon="users-fill"
                    variant="danger-soft"
                  />
                  <h4>Team Work</h4>
                  <p > Teamwork is a core value at NioLand. We believe in the power of collaboration and synergy that comes from working together. </p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard>
                <NioCard.Body>
                  <NioMedia
                    rounded
                    size="lg"
                    className="mb-4"
                    icon="bulb-fill"
                    variant="primary-soft"
                  />
                  <h4>Innovation</h4>
                  <p > Innovation is at the heart of NioLand. We continuously strive to push boundaries and challenge the status quo. </p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard>
                <NioCard.Body>
                  <NioMedia
                    rounded
                    size="lg"
                    className="mb-4"
                    icon="flag-fill"
                    variant="success-soft"
                  />
                  <h4>Ownership</h4>
                  <p > Ownership is a core value at NioLand. We believe in taking responsibility for our actions, projects, and outcomes. </p>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
        </NioSection.Content>

      </NioSection>
      {/*  Values Section Start  */}

      {/*  Team Section Start  */}
      <NioSection>
        <NioSection.Head alignX="center">
          <span className="d-inline-block fs-16 text-uppercase text-primary fw-semibold mb-2">team members</span>
          <h2>The Team Behind NioLand</h2>
          <p className="fs-20 mb-0">Meet the dedicated team behind NioLand, working tirelessly to bring you the best experience.</p>
          <ul className="nk-btn-group justify-content-center pt-5">
            <li>
              <NioButton href="/auth/sign-up" className="btn-lg btn-primary rounded-2" label="Join Our Team" />
            </li>
            <li>
              <NioButton href="#" className="btn-lg btn-outline-primary rounded-2" label="Learn More" />
            </li>
          </ul>
        </NioSection.Head>

        <NioSection.Content>
          <Row className="gy-5">
            <Col md={6} lg={4} >
              <NioCard className="border-0 bg-purple-50 ">
                <NioCard.Body className="pb-0">
                  <div className="card-title-group align-items-start mb-4">
                    <div className="card-title-group-item">
                      <h4 className="text-capitalize mb-1">John Carter</h4>
                      <p className="fs-16">CEO &amp; Founder</p>
                    </div>
                    <div className="card-title-group-item">
                      <Link to="#" className="text-dark">
                        <NioIcon className="fs-28" name="fedora" />
                      </Link>
                    </div>
                  </div>
                  <div className="card-image text-center">
                    <img src="images/team/a.png" alt="team" />
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="border-0 bg-green-50">
                <NioCard.Body className="pb-0">
                  <div className="card-title-group align-items-start mb-4">
                    <div className="card-title-group-item">
                      <h4 className="text-capitalize mb-1">Sophie Moor</h4>
                      <p className="fs-16"> Manager Of XYZ</p>
                    </div>
                    <div className="card-title-group-item">
                      <Link to="#" className="text-dark">
                        <NioIcon className="fs-28" name="b-si" />
                      </Link>
                    </div>
                  </div>
                  <div className="card-image text-center">
                    <img src="images/team/b.png" alt="team" />
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="border-0 bg-yellow-50">
                <NioCard.Body className="pb-0">
                  <div className="card-title-group align-items-start mb-4">
                    <div className="card-title-group-item">
                      <h4 className="text-capitalize mb-1">Sam Houston</h4>
                      <p className="fs-16">VP of Development</p>
                    </div>
                    <div className="card-title-group-item">
                      <Link to="#" className="text-dark">
                        <NioIcon className="fs-28" name="linkedin-round" />
                      </Link>
                    </div>
                  </div>
                  <div className="card-image text-center">
                    <img src="images/team/c.png" alt="team" />
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
        </NioSection.Content>

      </NioSection>
      {/*  Team Section Start  */}

      {/*  Brands Section Start  */}
      <NioSection>
        <NioSection.Head alignX="center">
          <span className="d-inline-block fs-16 text-uppercase text-primary fw-semibold mb-2">support From</span>
          <h2>Our Investors</h2>
          <p className="fs-20">We are proud to have the support of our valued investors who believe in our vision and contribute to our growth.</p>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="gap g-3 justify-content-xl-center">
            {
              ["a", "b", "c", "d", "e"]?.map((brand, idx) => (
                <Col xs={6} sm={4} lg={3} xl={2} key={idx}>
                  <Link
                    to="#"

                    className="nk-brand bg-gray border border-gray-500 py-3 py-md-4 px-5 px-md-6 rounded-2 text-center d-inline-block w-100 h-100"
                  >
                    <img src={`images/brands/${brand}.png`} alt="brand" className="img-fluid" />
                  </Link>
                </Col>
              ))
            }
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Brands Section Start  */}

      {/*  Blog Section Start  */}
      <NioSection masks={["blur-1 right center"]}>
        <NioSection.Head alignX="center">
          <span className="d-inline-block fs-16 text-uppercase text-primary fw-semibold mb-2">Press &amp; Media</span>
          <h2>NioLand In The News</h2>
          <p className="fs-20">Discover the latest news and updates about NioLand, featured in top publications and media outlets.</p>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="gy-5">
            <Col lg={6}>
              <NioCard className="card-gutter-lg bg-primary is-theme h-100" >
                <NioCard.Body className="p-5 p-md-7">
                  <div className="card-content h-100 d-flex flex-column justify-content-between">
                    <div className="card-image mb-3">
                      <Link to="#">
                        <img src="images/brands/a-light.png" alt="brand" className="h-24px" />
                      </Link>
                    </div>
                    <h3 className="card-title text-capitalize"> NioLand raises $84M in Series C funding </h3>
                    <p> NioLand, a rapidly growing technology company, recently announced the successful completion of its Series C funding round, securing a substantial investment of $84 million. <br /><br /> The funding will be utilized to further enhance and expand NioLand's products and services, solidifying its position as a market leader in the industry. The significant investment highlights the confidence and support from investors in NioLand's vision and potential for continued success. </p>
                    <div>
                      <NioButton
                        label="Read More"
                        href="/blog-details"
                        className="btn-link"
                        icon="arrow-right after"
                      />
                    </div>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col lg={6}>
              <Row className="gy-5">
                <Col xs={12}>
                  <NioCard className="card-gutter-md bg-indigo-alt is-theme" >
                    <NioCard.Body className="p-5">
                      <div className="card-content">
                        <div className="card-image mb-3 mb-md-5 brand">
                          <Link to="#">
                            <img src="images/brands/b.png" alt="brand" className="h-24px" />
                          </Link>
                        </div>
                        <h4 className="card-title text-capitalize mb-3 mb-md-5">
                          <Link to="/blog-details">NioLand claims to be the #1 player in the analytics industry</Link>
                        </h4>
                        <div>
                          <NioButton
                            label="Read More"
                            href="/blog-details"
                            className="btn-link"
                            icon="arrow-right after"
                          />
                        </div>
                      </div>
                    </NioCard.Body>
                  </NioCard>
                </Col>
                <Col xs={12} >
                  <NioCard className="card-gutter-md bg-dark is-theme">
                    <NioCard.Body className="p-5">
                      <div className="card-content">
                        <div className="card-image mb-3 mb-md-5 brand">
                          <Link to="#">
                            <img src="images/brands/c.png" alt="brand" className="h-24px" />
                          </Link>
                        </div>
                        <h4 className="card-title text-capitalize mb-3 mb-md-5">
                          <Link to="/blog-details">NioLand CEO steps-back, new CEO comes in September after the board decisions</Link>
                        </h4>
                        <div>
                          <NioButton
                            label="Read More"
                            href="/blog-details"
                            className="btn-link"
                            icon="arrow-right after"
                          />
                        </div>
                      </div>
                    </NioCard.Body>
                  </NioCard>
                </Col>
              </Row>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Blog Section End  */}

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