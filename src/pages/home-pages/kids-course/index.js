import React from 'react';
import { Link } from 'react-router-dom';
import { NioButton, NioCard } from '../../../components';
import { Col, Container, Row } from 'react-bootstrap';

// layouts
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// Components 
import { NioIcon, NioMedia, NioSection, NioSubscribeField } from '../../../components';

// sections content 
import TestimonialContent from '../../../components/PageComponents/Homepages/KidsCourse/TestimonialContent/TestimonialContent';

function index() {

  return (
    <AppLayout variant={3} title="Kids Course" rootClass="layout-2">

      {/*  Banner Section Start   */}
      <section className="nk-banner nk-banner-kd-course">
        <div className="nk-banner-wrap pb-0">
          <Container>
            <Row className="justify-content-between">
              <Col lg={6} xl={5}>
                <div className="nk-banner-content text-center text-lg-start pb-7 pb-xl-0 pt-lg-5">
                  <div className="d-flex flex-wrap justify-content-center justify-content-lg-start align-items-center mb-3">
                    <div className="media-group media-group-overlap flex-grow-0 me-2">
                      <NioMedia
                        border
                        rounded
                        size="sm"

                        alt="avatar"
                        className="border-white"
                        img="images/avatar/a.jpg"
                      />
                      <NioMedia
                        border
                        rounded
                        size="sm"

                        alt="avatar"
                        className="border-white"
                        img="images/avatar/b.jpg"
                      />
                      <NioMedia
                        border
                        rounded
                        size="sm"

                        alt="avatar"
                        className="border-white"
                        img="images/avatar/c.jpg"
                      />
                      <NioMedia
                        border
                        rounded
                        size="sm"

                        alt="avatar"
                        className="border-white"
                        img="images/avatar/d.jpg"
                      />
                    </div>
                    <p className="fw-bold m-0">
                      <span className="text-danger">5k+</span> Enrollment
                    </p>
                  </div>
                  <div>
                    <h1 className="display-6 mb-3" >Better Future For Your Kids.</h1>
                    <p className="fs-20 text-base" >We just don’t give our students only lecture but real life experiment, workshops and enjoyable experience.</p>
                  </div>
                  <ul className="nk-btn-group justify-content-center justify-content-lg-start pt-5 pt-lg-6 gap gap-3 ms-0">
                    <li className="p-0 m-0" >
                      <NioButton
                        href="/auth/sign-up"
                        label="Sign Up Free"
                        className="btn-danger"

                      />
                    </li>
                    <li className="p-0 m-0">
                      <div className="d-flex gap-2 align-items-center">
                        <NioMedia
                          size="md"
                          rounded
                          icon="play-fill"
                          variant="purple"

                          lightboxSrc="https://www.youtube.com/watch?v=pVE92TNDwUk"
                          className="animate animate-infinite animate-pulse animate-duration-1"
                        />
                        <div className="media-text" >
                          <div className="title fw-semibold">Watch Video</div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="pt-5 pt-xxl-6">
                    <h6 className="fs-14 fw-semibold text-base text-capitalize title-shape mb-0" >Join with 5M+ parents by downloading our app</h6>
                    <ul className="d-flex justify-content-center justify-content-lg-start gap-3 pt-3">
                      <li>
                        <Link to="#">
                          <img src="images/apps/app-store.png" srcSet="images/apps/app-store2x.png 2x" className="border overflow-hidden rounded-3" alt="app-store" />
                        </Link>
                      </li>
                      <li>
                        <Link to="#" >
                          <img src="images/apps/play-store.png" srcSet="images/apps/play-store2x.png 2x" className="border overflow-hidden rounded-3" alt="play-store" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col lg={6} className="align-self-end">
                <div className="nk-frame">
                  <img src="images/kids-course/banner-cover-1.png" alt="banner-cover" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/*  Banner Section End   */}

      {/*  Program Section Start   */}
      <NioSection className="nk-section-program bg-red-50">
        <NioSection.Content>
          <Row className="align-items-end justify-content-between">
            <Col xl={3}>
              <div className="nk-section-head pb-xl-0">
                <span className="fs-14 fw-semibold text-uppercase d-inline-block text-danger mb-2">our Program</span>
                <h2>Our Popular Program</h2>
              </div>
            </Col>
            <Col xl={7}>
              <Row className="gy-5 gy-xl-0 g-xl-4">
                <Col sm={6} lg={4} >
                  <div>
                    <div className="mb-3">
                      <img src="images/kids-course/icon-1.png" className="h-40px" alt="program-icon" />
                    </div>
                    <h5 className="mb-3 fw-bold">Creative Thinking</h5>
                    <p className="fs-16 text-base line-clamp-2">
                      Unleash creativity for innovative solutions and fresh perspectives.
                    </p>
                  </div>
                </Col>
                <Col sm={6} lg={4} >
                  <div>
                    <div className="mb-3">
                      <img src="images/kids-course/icon-3.png" className="h-40px" alt="program-icon" />
                    </div>
                    <h5 className="mb-3 fw-bold">Career Planning</h5>
                    <p className="fs-16 text-base line-clamp-2">Master the art of public speaking, captivating audiences with confidence and impactful communication.</p>
                  </div>
                </Col>
                <Col sm={6} lg={4} >
                  <div>
                    <div className="mb-3">
                      <img src="images/kids-course/icon-2.png" className="h-40px" alt="program-icon" />
                    </div>
                    <h5 className="mb-3 fw-bold">Public Speaking</h5>
                    <p className="fs-16 text-base line-clamp-2">Confidently engage audiences with impactful public speaking skills.</p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="justify-content-between align-items-center pt-7 pt-lg-120 pb-0">
            <Col lg={6}>
              <div className="nk-program-img mb-5 mb-md-7 mb-lg-0" >
                <img src="images/kids-course/section-cover-1.png" alt="section-cover" />
              </div>
            </Col>
            <Col lg={6} xl={5}>
              <div className="nk-section-head" >
                <h2>Kids Will Love to Learn</h2>
                <p className="fs-20">Easy secure access to digital learning resources should be the status in the education.</p>
              </div>
              <ul className="d-flex flex-column gap-5">
                <li className="media-group gap-3" >
                  <span>
                    <NioIcon name="check-circle-fill" size="md" className="text-danger" />
                  </span>
                  <div className="media-text mt-n1 ms-0">
                    <h5 className="text-capitalize">Focused Learning</h5>
                    <p className="text-base">Our program engages kids in core subjects like early literacy, reading, writing, language, and math,</p>
                  </div>
                </li>
                <li className="media-group gap-3" >
                  <span>
                    <NioIcon name="check-circle-fill" size="md" className="text-danger" />
                  </span>

                  <div className="media-text mt-n1 ms-0">
                    <h5 className="text-capitalize">Joyful Experience</h5>
                    <p className="text-base">Five whimsical, charming characters—including narrator Kodi Bear guide kids through activities and stories.</p>
                  </div>
                </li>
                <li className="media-group gap-3" >
                  <span>
                    <NioIcon name="check-circle-fill" size="md" className="text-danger" />
                  </span>

                  <div className="media-text mt-n1 ms-0">
                    <h5 className="text-capitalize">Nuture By Experts</h5>
                    <p className="text-base">Nioland was developed in collaboration with learning experts at Stanford and aligned with the Head Start</p>
                  </div>
                </li>
              </ul>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Program Section End   */}

      {/*  Course Section End   */}
      <NioSection className="nk-section-course pt-7 pt-lg-120">
        <div className="nk-section-head pb-md-7 nk-block-head-between align-items-lg-end flex-column flex-lg-row">
          <div className="text-center text-lg-start pb-5 pb-lg-0">
            <span className="fs-14 fw-semibold text-uppercase d-inline-block text-purple mb-2">our Class</span>
            <h2>
              <span className="d-inline-block d-lg-block">Most</span> Demanding Classes
            </h2>
          </div>
          <div className="text-center text-lg-start">
            <NioButton href="#" className="btn-purple" label="Browse All Classes" />
          </div>
        </div>
        <NioSection.Content>
          <Row className="gy-5 gy-xl-0">
            <Col md={6} xl={4} >
              <NioCard>
                <div className="card-image">
                  <img src="images/blog/blog-1.jpg" alt="blog" className="card-img-top img-fit-cover h-100" />
                </div>
                <NioCard.Body>
                  <div className="card-content h-100 d-flex flex-column">
                    <div className="pb-3">
                      <span className="badge text-bg-purple-soft text-uppercase py-1 px-3">Museum &amp; Park</span>
                    </div>
                    <h4 className="card-title">
                      <Link to="#">
                        Virtual museum, national park &amp; Zoo tours
                      </Link>
                    </h4>
                    <Row className="g-3 pt-4">
                      <Col lg={6}>
                        <div className="nk-course-overview-list">
                          <div className="nk-course-overview-media text-purple">
                            <NioIcon name="users" />
                          </div>
                          <div className="nk-course-overview-content">
                            <span className="title">1200+ Students</span>
                          </div>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="nk-course-overview-list">
                          <div className="nk-course-overview-media text-purple">
                            <NioIcon name="star" />
                          </div>
                          <div className="nk-course-overview-content">
                            <span className="title">2812 Ratings</span>
                          </div>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="nk-course-overview-list">
                          <div className="nk-course-overview-media text-purple">
                            <em className="icon ni ni-globe"></em>
                          </div>
                          <div className="nk-course-overview-content">
                            <span className="title">English</span>
                          </div>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="nk-course-overview-list">
                          <div className="nk-course-overview-media text-purple">
                            <em className="icon ni ni-tag-alt"></em>
                          </div>
                          <div className="nk-course-overview-content">
                            <span className="title">Star60</span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <div className="pt-5 mt-auto">
                      <NioButton href="#" className="btn-block btn-danger text-white" label="Join For $11.99 Only" />
                    </div>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} xl={4} >
              <NioCard className="mb-4 mb-xl-0">
                <div className="card-image">
                  <img src="images/blog/blog-2.jpg" alt="blog" className="card-img-top" />
                </div>
                <NioCard.Body>
                  <div className="card-content h-100 d-flex flex-column">
                    <div className="pb-3">
                      <span className="badge text-bg-purple-soft text-uppercase py-1 px-3">Geographic brain</span>
                    </div>
                    <h4 className="card-title">
                      <Link to="#">National geographic kids fun brain</Link>
                    </h4>
                    <Row className="g-3 pt-4">
                      <Col lg={6}>
                        <div className="nk-course-overview-list">
                          <div className="nk-course-overview-media text-purple">
                            <NioIcon name="users" />
                          </div>
                          <div className="nk-course-overview-content">
                            <span className="title">340+ Students</span>
                          </div>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="nk-course-overview-list">
                          <div className="nk-course-overview-media text-purple">
                            <NioIcon name="star" />
                          </div>
                          <div className="nk-course-overview-content">
                            <span className="title">1410 Ratings</span>
                          </div>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="nk-course-overview-list">
                          <div className="nk-course-overview-media text-purple">
                            <NioIcon name="globe" />
                          </div>
                          <div className="nk-course-overview-content">
                            <span className="title">English</span>
                          </div>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="nk-course-overview-list">
                          <div className="nk-course-overview-media text-purple">
                            <NioIcon name="tag-alt" />
                          </div>
                          <div className="nk-course-overview-content">
                            <span className="title">Star60</span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <div className="pt-5 mt-auto">
                      <NioButton href="#" className="btn-block btn-danger text-white" label="Join for $11.99 only" />
                    </div>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} xl={4} >
              <NioCard className="mb-4 mb-xl-0">
                <div className="card-image">
                  <img src="images/blog/blog-3.jpg" alt="blog" className="card-img-top" />
                </div>
                <NioCard.Body>
                  <div className="card-content h-100 d-flex flex-column">
                    <div className="pb-3">
                      <span className="badge text-bg-purple-soft text-uppercase py-1 px-3">Museum &amp; Park</span>
                    </div>
                    <h4 className="card-title">
                      <Link to="#">Fun doodles with mo to learn mathmatics</Link>
                    </h4>
                    <Row className="g-3 pt-4">
                      <Col lg={6}>
                        <div className="nk-course-overview-list">
                          <div className="nk-course-overview-media text-purple">
                            <NioIcon name="users" />
                          </div>
                          <div className="nk-course-overview-content">
                            <span className="title">120+ Students</span>
                          </div>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="nk-course-overview-list">
                          <div className="nk-course-overview-media text-purple">
                            <NioIcon name="star" />
                          </div>
                          <div className="nk-course-overview-content">
                            <span className="title">810 Ratings</span>
                          </div>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="nk-course-overview-list">
                          <div className="nk-course-overview-media text-purple">
                            <NioIcon name="globe" />
                          </div>
                          <div className="nk-course-overview-content">
                            <span className="title">English</span>
                          </div>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="nk-course-overview-list">
                          <div className="nk-course-overview-media text-purple">
                            <NioIcon name="tag-alt" />
                          </div>
                          <div className="nk-course-overview-content">
                            <span className="title">Star60</span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <div className="pt-5 mt-auto">
                      <NioButton href="#" className="btn-block btn-danger text-white" label="Join for $11.99 only" />
                    </div>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
        </NioSection.Content>

      </NioSection >
      {/*  Course Section End   */}

      {/*  Works Section Start   */}
      <NioSection className="overflow-hidden" masks={["shape-13 d-done d-md-block"]}>
        <NioSection.Head alignX="center">
          <span className="fs-14 fw-semibold text-uppercase d-inline-block text-danger mb-2">How it works?</span>
          <h2>Unique for every learner</h2>
          <p className="fs-20">
            Tailored to each individual, our approach ensures a unique learning experience that meets diverse needs.
          </p>
          <ul className="nk-btn-group justify-content-center pt-5">
            <li>
              <NioButton href="/auth/sign-up" className="btn-danger" label="Sign Up Free" />
            </li>
            <li>
              <div className="d-flex align-items-center gap-2">
                <NioMedia
                  rounded
                  size="md"
                  icon="play-fill"
                  variant="purple"
                  lightboxSrc="https://www.youtube.com/watch?v=pVE92TNDwUk"
                  className="shadow-xl animate animate-infinite animate-pulse animate-duration-1"
                />

                <div className="media-text">
                  <div className="title fw-semibold">Watch Video</div>
                </div>
              </div>
            </li>
          </ul>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="gap g-5 g-md-7 overflow-hidden">
            <Col md={6}>
              <div className="nk-course-cta-img position-relative"  >
                <img src="images/kids-course/section-cover-3-a.png" alt="kids-thumb" />
              </div>
            </Col>
            <Col md={6}>
              <div className="nk-course-cta-img position-relative" >
                <img src="images/kids-course/section-cover-3-b.png" alt="kids-thumb" />
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Works Section End   */}

      {/*  Testimonial Section Start    */}
      <NioSection className="nk-section-testimonial" masks={["shape-14 d-none d-md-block"]}>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="nk-section-head text-center pb-5">
              <span className="fs-14 fw-semibold text-uppercase d-inline-block text-danger mb-2">Our testimonials</span>
              <h2 className="mb-0">What Our Parents Say About Us</h2>
              <ul className="nk-btn-group justify-content-center pt-5">
                <li>
                  <NioButton href="#" className="btn-purple" label="Browse All Classes" />
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <NioSection.Content className="overflow-hidden">
          <div className="mx-lg-n9">
            <div className="mx-xl-n9">
              <TestimonialContent />
            </div>
          </div>
        </NioSection.Content>
      </NioSection>
      {/*  Testimonial Section End   */}

      {/*  Gallery Section Start   */}
      <NioSection className="nk-section-gallery overflow-hidden" masks={["shape-15", "shape-16", "shape-17"]}>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="nk-section-head text-center">
              <span className="fs-14 fw-semibold text-uppercase d-inline-block text-danger mb-2">our gallery</span>
              <h2>Few moments with our superkids</h2>
              <ul className="nk-btn-group justify-content-center pt-5">
                <li>
                  <NioButton href="/auth/sign-up" className="btn-danger text-white" label="Sign Up Free" />
                </li>
                <li>
                  <div className="d-flex gap-2 align-items-center">
                    <NioMedia
                      size="md"
                      rounded
                      icon="play-fill"
                      variant="purple"
                      lightboxSrc="https://www.youtube.com/watch?v=pVE92TNDwUk"
                      className="animate animate-infinite animate-pulse animate-duration-1"
                    />
                    <div className="media-text">
                      <div className="title fw-semibold">Watch Video</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <NioSection.Content>
          <div className="nk-gallery-img" >
            <img src="images/kids-course/gallary.png" alt="gallary" />
          </div>
        </NioSection.Content>
      </NioSection>
      {/*  Gallery Section End   */}

      {/*  App-Download Section Start   */}
      <NioSection className="nk-section-app-dwnld pb-0 bg-purple-50 z-1 position-relative overflow-hidden pt-7 pt-lg-120" masks={["shape-18"]} py={false}>
        <NioSection.Content className="position-relative z-1">
          <Row className="align-items-center justify-content-between">
            <Col lg={5}>
              <div className="text-center text-lg-start pb-7 pb-xxl-0">
                <h2>Download Our App To Start Your Class.</h2>
                <p className="fs-20 text-base mb-0">Are you ready to make your children future skilled proof ? Join with 5M+ parents to explore our immersive world.</p>
                <ul className="d-flex justify-content-center justify-content-lg-start gap-3 pt-6">
                  <li>
                    <Link to="#">
                      <img src="images/apps/app-store.png" srcSet="images/apps/app-store2x.png 2x" className="border overflow-hidden rounded-3" alt="app-store" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src="images/apps/play-store.png" srcSet="images/apps/play-store2x.png 2x" className="border overflow-hidden rounded-3" alt="play-store" />
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={6} className="align-self-end">
              <div className="nk-app-download">
                <img src="images/kids-course/app.png" alt="apps" />
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  App-Download Section End   */}


      {/*  NewsLetter Section Start   */}
      <NioSection className="nk-section-nwsletter pt-7 pt-lg-120 pb-0">
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

    </AppLayout >
  )
}

export default index;