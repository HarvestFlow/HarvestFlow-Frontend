import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

// layout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components
import { NioSection, NioIcon, NioMedia, NioCount, NioButton, NioCard, NioSubscribeField } from '../../../components';

function index() {
  return (
    <AppLayout title="Customer Testimonial" rootClass="layout-1">

      {/*  Story Section End  */}
      <NioSection className="pt-120 pt-lg-160" masks={["blur-1 left center"]}>
        <NioSection.Head alignX="center">
          <span className="d-inline-block fs-14 text-uppercase text-primary fw-semibold mb-2" >Inside stories</span>
          <h2 className="mb-0" >Hundreds of Sotware Team Trust NioLand</h2>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="gy-5 justify-content-center pb-5 pb-md-7">
            <Col md={6} lg={4} >
              <NioCard className="h-100 border-0 bg-primary is-theme">
                <NioCard.Body>
                  <div className="card-content">
                    <div className="card-image mb-3 mb-md-5 brand">
                      <img className="h-24px" src="images/brands/a-light.png" alt="brand-cover" />
                    </div>
                    <h5 className="card-title mb-3 mb-md-5">
                      <Link to="/blog-details">Nioland claims to be the #1 player in the analytics industry</Link>
                    </h5>
                    <div className="card-video">
                      <NioMedia
                        rounded
                        size="md"
                        icon="play-fill"
                        variant="white"
                        lightboxSrc="https://www.youtube.com/watch?v=pVE92TNDwUk"
                      />
                    </div>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="h-100 border-0 bg-indigo-alt is-theme">
                <NioCard.Body>
                  <div className="card-content">
                    <div className="card-image mb-3 mb-md-5 brand">
                      <img className="h-24px" src="images/brands/b-light.png" alt="brand-cover" />
                    </div>
                    <h5 className="card-title mb-3 mb-md-5">
                      <Link to="/blog-details">NioLand raises $84M in Series C funding</Link>
                    </h5>
                    <div className="card-video">
                      <NioMedia
                        rounded
                        size="md"
                        icon="play-fill"
                        variant="white"
                        lightboxSrc="https://www.youtube.com/watch?v=pVE92TNDwUk"
                      />
                    </div>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="h-100 border-0 bg-dark is-theme">
                <NioCard.Body>
                  <div className="card-content">
                    <div className="card-image mb-3 mb-md-5 brand">
                      <img className="h-24px" src="images/brands/c-light.png" alt="brand-cover" />
                    </div>
                    <h5 className="card-title mb-3 mb-md-5">
                      <Link to="/blog-details">Nioland claims to be the #1 player in the analytics industry</Link>
                    </h5>
                    <div className="card-video">
                      <NioMedia
                        rounded
                        size="md"
                        icon="play-fill"
                        variant="white"
                        lightboxSrc="https://www.youtube.com/watch?v=pVE92TNDwUk"
                      />
                    </div>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="h-100 border-0 bg-blue-400 is-theme">
                <NioCard.Body>
                  <div className="card-content">
                    <div className="card-image mb-3 mb-md-5 brand">
                      <img className="h-24px" src="images/brands/d-light.png" alt="brand-cover" />
                    </div>
                    <h5 className="card-title mb-3 mb-md-5">
                      <Link to="/blog-details">NioLand claims to be the #1 player in the analytics industry. Every small businesses favorites.</Link>
                    </h5>
                    <div className="card-video">
                      <NioMedia
                        rounded
                        size="md"
                        icon="play-fill"
                        variant="white"
                        lightboxSrc="https://www.youtube.com/watch?v=pVE92TNDwUk"
                      />
                    </div>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col lg={8}>
              <NioCard className="h-100 border-0 bg-purple-50 text-center text-lg-start overflow-hidden" >
                <NioCard.Body className="pb-0">
                  <Row className="g-gs justify-content-between align-items-end">
                    <Col lg={7}>
                      <div className="card-content h-100 d-flex flex-column justify-content-between pb-lg-5">
                        <div className="card-image mb-3 mb-md-5 brand">
                          <img className="h-24px" src="images/brands/e.png" alt="brand-cover" />
                        </div>
                        <h4 className="card-title mb-4">
                          <Link to="/blog-details">I know if we stopped using NioLand today, tracking feature requests would be a disaster”</Link>
                        </h4>
                        <div className="media-group align-items-center justify-content-center justify-content-lg-start">
                          <div className="media-text">
                            <div className="h5 mb-0">John Carter</div>
                            <div className="small">CEO &amp; Founder</div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col lg={5}>
                      <img src="images/team/d.png" alt="team-people" className="ms-xl-7" />
                    </Col>
                  </Row>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
          <Row className="justify-content-between align-items-center">
            <Col xl={4}>
              <div className="nk-sectionn-head">
                <h2>Ensuring the best user experience</h2>
              </div>
            </Col>
            <Col xl={7}>
              <Row className="text-xl-end gy-5 gy-lg-0">
                <Col sm={6} lg={4} >
                  <div className="nk-funfact-item">
                    <div className="d-flex justify-content-xl-end align-items-center mb-2">
                      <NioIcon size="md" name="star" className="text-warning me-2" />
                      <div className="h3">
                        <NioCount end={4} suffix=".86" />
                      </div>
                    </div>
                    <div className="h6 text-light fw-normal">User Friendly Interface</div>
                  </div>
                </Col>
                <Col sm={6} lg={4} >
                  <div className="nk-funfact-item">
                    <div className="d-flex justify-content-xl-end align-items-center mb-2">
                      <NioIcon size="md" name="trend-up" className="text-primary me-2" />
                      <div className="h3">
                        <NioCount end={95} suffix="%" />
                      </div>
                    </div>
                    <div className="h6 text-light fw-normal">Data-informed Decisions</div>
                  </div>
                </Col>
                <Col sm={6} lg={4} >
                  <div className="nk-funfact-item">
                    <div className="d-flex justify-content-xl-end align-items-center mb-2">
                      <NioIcon size="md" name="arrow-up" className="text-success me-2" />
                      <div className="h3">
                        <NioCount end={500} suffix="%" />
                      </div>
                    </div>
                    <div className="h6 text-light fw-normal">Business Strategy Results</div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Story Section End  */}

      {/*  Testimonial Section Start  */}
      <NioSection>
        <NioSection.Head alignX="center">
          <span className="d-inline-block fs-14 text-uppercase text-primary fw-semibold mb-2">Customer reviews</span>
          <h2>Don’t take our word for it</h2>
          <p className="fs-20 mb-0">Adipiscing nisi sem gravida enim eu adipiscing sagittis scelerisque augue nulla massa aliquet fringilla nullam eget</p>
          <ul className="nk-btn-group justify-content-center pt-5">
            <li>
              <NioButton href="#" className="btn-primary" label="Get Started" />
            </li>
            <li>
              <NioButton href="/features" className="btn-outline-primary" label="Explore All Features" />
            </li>
          </ul>
        </NioSection.Head>
        <NioSection.Content>
          <Row>
            <Col lg={4}>
              <Col className="card-list gy-4">
                <NioCard className="h-100 rounded-3" >
                  <NioCard.Body className="d-flex flex-column justify-content-between gap g-4">
                    <div>
                      <ul className="d-flex align-items-center gap-1 rating pb-md-2">
                        {
                          [1, 2, 3, 4, 5]?.map((star, idx) => (
                            <li key={idx} className="text-warning">
                              <NioIcon name="star-fill" />
                            </li>
                          ))
                        }
                      </ul>
                      <h6 className="mb-2 fw-bold">“Amazing service! Claire helped me to reduce the shipping price and shipped it immediately after purchasing. ”</h6>
                      <p className="line-clamp-3 fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis magna massa semper tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div>
                      <h6 className="fs-16 m-0 fw-semibold">Guy Hawkins</h6>
                      <span className="fs-14">3 months ago</span>
                    </div>
                  </NioCard.Body>
                </NioCard>
                <NioCard className="h-100 rounded-3" >
                  <NioCard.Body className="d-flex flex-column justify-content-between gap g-4">
                    <div>
                      <ul className="d-flex align-items-center gap-1 rating pb-md-2">
                        {
                          [1, 2, 3, 4, 5]?.map((star, idx) => (
                            <li key={idx} className="text-warning">
                              <NioIcon name="star-fill" />
                            </li>
                          ))
                        }
                      </ul>
                      <h6 className="mb-2 fw-bold">“Just came back to home and should say that it is definitely a great experience.”</h6>
                      <p className="line-clamp-3 fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis magna massa semper tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis magna massa semper tristique.</p>
                    </div>
                    <div>
                      <h6 className="fs-16 m-0 fw-semibold">Savannah Nguyen</h6>
                      <span className="fs-14">3 months ago</span>
                    </div>
                  </NioCard.Body>
                </NioCard>
                <NioCard className="h-100 rounded-3" >
                  <NioCard.Body className="d-flex flex-column justify-content-between gap g-4">
                    <div>
                      <ul className="d-flex align-items-center gap-1 rating pb-md-2">
                        {
                          [1, 2, 3, 4, 5]?.map((star, idx) => (
                            <li key={idx} className="text-warning">
                              <NioIcon name="star-fill" />
                            </li>
                          ))
                        }
                      </ul>
                      <h6 className="mb-2 fw-bold">“I tried the Hair mask first and its the best one I've ever tried love it.”</h6>
                      <p className="line-clamp-3 fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis magna massa semper tristique. Lorem ipsum dolor sit amet.</p>
                    </div>
                    <div>
                      <h6 className="fs-16 m-0 fw-semibold">Guy Hawkins</h6>
                      <span className="fs-14">3 months ago</span>
                    </div>
                  </NioCard.Body>
                </NioCard>
              </Col>
              {/*  .card-list  */}
            </Col>
            <Col lg={4}>
              <div className="card-list gy-4">
                <NioCard className="h-100 rounded-3" >
                  <NioCard.Body className="d-flex flex-column justify-content-between gap g-4">
                    <div>
                      <ul className="d-flex align-items-center gap-1 rating pb-md-2">
                        {
                          [1, 2, 3, 4, 5]?.map((star, idx) => (
                            <li key={idx} className="text-warning">
                              <NioIcon name="star-fill" />
                            </li>
                          ))
                        }
                      </ul>
                      <h6 className="mb-2 fw-bold">“Very quick and easy! Great service, thanks!”</h6>
                      <p className="line-clamp-3 fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis magna massa semper tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis magna massa semper tristique.</p>
                    </div>
                    <div>
                      <h6 className="fs-16 m-0 fw-semibold">Courtney Henry</h6>
                      <span className="fs-14">3 months ago</span>
                    </div>
                  </NioCard.Body>
                </NioCard>
                <NioCard className="h-100 rounded-3" >
                  <NioCard.Body className="d-flex flex-column justify-content-between gap g-4">
                    <div>
                      <ul className="d-flex align-items-center gap-1 rating pb-md-2">
                        {
                          [1, 2, 3, 4, 5]?.map((star, idx) => (
                            <li key={idx} className="text-warning">
                              <NioIcon name="star-fill" />
                            </li>
                          ))
                        }
                      </ul>
                      <h6 className="mb-2 fw-bold">"Really glad to have a call with Dani – super invaluable. Thanks"</h6>
                      <p className="line-clamp-3 fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis magna massa semper tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis magna massa semper tristique.</p>
                    </div>
                    <div>
                      <h6 className="fs-16 m-0 fw-semibold">Brooklyn Simmons</h6>
                      <span className="fs-14">3 months ago</span>
                    </div>
                  </NioCard.Body>
                </NioCard>
                <NioCard className="h-100 rounded-3" >
                  <NioCard.Body className="d-flex flex-column justify-content-between gap g-4">
                    <div>
                      <ul className="d-flex align-items-center gap-1 rating pb-md-2">
                        {
                          [1, 2, 3, 4, 5]?.map((star, idx) => (
                            <li key={idx} className="text-warning">
                              <NioIcon name="star-fill" />
                            </li>
                          ))
                        }
                      </ul>
                      <h6 className="mb-2 fw-bold">“It has been an absolute pleasure dealing with Scan during the lockdown.”</h6>
                      <p className="line-clamp-3 fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis magna massa semper tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis magna massa semper tristique.</p>
                    </div>
                    <div>
                      <h6 className="fs-16 m-0 fw-semibold">Jerome Bell</h6>
                      <span className="fs-14">3 months ago</span>
                    </div>
                  </NioCard.Body>
                </NioCard>
              </div>
              {/*  .card-list  */}
            </Col>
            <Col lg={4}>
              <div className="card-list gy-4">
                <NioCard className="h-100 rounded-3" >
                  <NioCard.Body className="d-flex flex-column justify-content-between gap g-4">
                    <div>
                      <ul className="d-flex align-items-center gap-1 rating pb-md-2">
                        {
                          [1, 2, 3, 4, 5]?.map((star, idx) => (
                            <li key={idx} className="text-warning">
                              <NioIcon name="star-fill" />
                            </li>
                          ))
                        }
                      </ul>
                      <h6 className="mb-2 fw-bold">"Great session! Dani was super helpful."</h6>
                      <p className="line-clamp-3 fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis magna massa semper tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis magna massa semper tristique.</p>
                    </div>
                    <div>
                      <h6 className="fs-16 m-0 fw-semibold">Kristin Watson</h6>
                      <span className="fs-14">3 months ago</span>
                    </div>
                  </NioCard.Body>
                </NioCard>
                <NioCard className="h-100 rounded-3" >
                  <NioCard.Body className="d-flex flex-column justify-content-between gap g-4">
                    <div>
                      <ul className="d-flex align-items-center gap-1 rating pb-md-2">
                        {
                          [1, 2, 3, 4, 5]?.map((star, idx) => (
                            <li key={idx} className="text-warning">
                              <NioIcon name="star-fill" />
                            </li>
                          ))
                        }
                      </ul>
                      <h6 className="mb-2 fw-bold">“I ordered a Balmain T-shirt dress from here and it is fabulous.”</h6>
                      <p className="line-clamp-3 fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis magna massa semper tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis magna massa semper tristique.</p>
                    </div>
                    <div>
                      <h6 className="fs-16 m-0 fw-semibold">Bessie Cooper</h6>
                      <span className="fs-14">3 months ago</span>
                    </div>
                  </NioCard.Body>
                </NioCard>
                <NioCard className="h-100 rounded-3" >
                  <NioCard.Body className="d-flex flex-column justify-content-between gap g-4">
                    <div>
                      <ul className="d-flex align-items-center gap-1 rating pb-md-2">
                        {
                          [1, 2, 3, 4, 5]?.map((star, idx) => (
                            <li key={idx} className="text-warning">
                              <NioIcon name="star-fill" />
                            </li>
                          ))
                        }
                      </ul>
                      <h6 className="mb-2 fw-bold">“The Services provided are really great, we received a genuine advice and at very reasonable cost.”</h6>
                      <p className="line-clamp-3 fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis magna massa semper tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis magna massa semper tristique. Lorem ipsum dolor sit aatis magna massa se.</p>
                    </div>
                    <div>
                      <h6 className="fs-16 m-0 fw-semibold">Jane Cooper</h6>
                      <span className="fs-14">3 months ago</span>
                    </div>
                  </NioCard.Body>
                </NioCard>
              </div>
              {/*  .card-list  */}
            </Col>
          </Row>
        </NioSection.Content >
      </NioSection >
      {/*  Testimonial Section End  */}

      {/*  CTA Section Start  */}
      <NioSection className="nk-cta-section">
        <NioSection.Content>
          <div className="nk-cta-wrap bg-primary-gradient rounded-3 is-theme p-5 p-lg-7" >
            <Row className="g-gs align-items-center">
              <Col lg={8}>

                <div className="media-group flex-column flex-lg-row align-items-center">

                  <div className="media media-lg media-circle media-middle text-bg-white text-primary mb-2 mb-lg-0 me-lg-2">
                    <NioIcon name="chat-fill" />
                  </div>
                  <div className="text-center text-lg-start">
                    <h3 className="text-capitalize m-0">Chat with our support team!</h3>
                    <p className="fs-16 opacity-75">Get in touch with our support team if you still can’t find your answer.</p>
                  </div>
                </div>
              </Col>
              <Col lg={4} className="text-center text-lg-end">
                <NioButton href="/contact-us" className="btn-white text-dark fw-semiBold" label="Contact Support" />
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

export default index;