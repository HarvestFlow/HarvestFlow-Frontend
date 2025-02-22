import React from 'react'
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

// layout 
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components
import { NioButton, NioSection, NioCount, NioCard, NioMedia, NioSubscribeField } from '../../../components';

// section content 
import TestimonialContent from '../../../components/PageComponents/Homepages/LanguageLearning/TestimonialContent/TestimonialContent';

function index() {
  return (
    <AppLayout variant={14} title="Language Learning" rootClass="layout-13" >

      {/*  Banner Section Start   */}
      <section className="nk-banner nk-banner-language nk-frame nk-frame-four">
        <div className="nk-frame-children nk-frame-children-one">
          <img src="images/language-learning/icon-globe.png" alt="icon" className="animate animate-infinite animate-pulse animate-duration-2" />
        </div>
        <div className="nk-frame-children nk-frame-children-two">
          <img src="images/language-learning/icon-love.png" alt="icon" className="animate animate-infinite animate-pulse animate-duration-3" />
        </div>
        <div className="nk-frame-children nk-frame-children-three">
          <img src="images/language-learning/icon-en.png" alt="icon" className="animate animate-infinite animate-pulse animate-duration-3" />
        </div>
        <div className="nk-frame-children nk-frame-children-four">
          <img src="images/language-learning/icon-cn.png" alt="icon" className="animate animate-infinite animate-pulse animate-duration-2" />
        </div>
        <div className="nk-banner-wrap">
          <Container>
            <Row className="justify-content-center pt-lg-7">
              <Col xl={6}>
                <div className="text-center mb-5 mb-lg-0">
                  <h1 className="display-6 pb-5 mb-0">
                    <span className="bg-white" >NioLand brings</span>
                    <span className="bg-info-alt" >language</span>
                    <span className="bg-white" >learning</span>
                  </h1>
                  <p className="fs-20 text-white opacity-75" > Learn a language right here with hundreds of free language-learning lessons. Get access to compact lessons from the experts and connect with a community of native speakers. </p>
                  <div className="pt-5">
                    <ul className="d-flex justify-content-center flex-wrap gap-3">
                      <li className="media media-md media-middle media-circle d-inline-block bg-white p-1"  >
                        <img
                          alt="flag"
                          src="images/icon/flag-1.png"
                          className="animate animate-pulse animate-infinite animate-duration-1s animate-delay-1"
                        />
                      </li>
                      <li className="media media-md media-middle media-circle d-inline-block bg-white p-1" >
                        <img
                          alt="flag"
                          src="images/icon/flag-2.png"
                          className="animate animate-pulse animate-infinite animate-duration-1s" />
                      </li>
                      <li className="media media-md media-middle media-circle d-inline-block bg-white p-1" >
                        <img
                          alt="flag"
                          src="images/icon/flag-3.png"
                          className="animate animate-pulse animate-infinite animate-duration-1s animate-delay-1" />
                      </li>
                      <li className="media media-md media-middle media-circle d-inline-block bg-white p-1" >
                        <img
                          alt="flag"
                          src="images/icon/flag-4.png"
                          className="animate animate-pulse animate-infinite animate-duration-1s"
                        />
                      </li>
                      <li className="media media-md media-middle media-circle d-inline-block bg-white p-1" >
                        <img
                          alt="flag"
                          src="images/icon/flag-5.png"
                          className="animate animate-pulse animate-infinite animate-duration-1s animate-delay-1" />
                      </li>
                    </ul>
                    <div className="pt-5" >
                      <NioButton href="#" label="Start Learning" className="btn-dark" />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="align-items-center justify-content-center pt-5 pt-lg-7">
              <Col xl={10}>
                <h5 className="text-white text-center fw-normal mb-5" >Over 32K+ Software Business Growing With NioLand.</h5>
                <Row className="gy-2 gap-sm-2 justify-content-center text-center align-items-center">
                  {
                    ["a", "b", "c", "d", "e"].map((brand, idx) => (
                      <Col key={idx} xs={4} sm={3} lg={2} >
                        <Link className="nk-brand" to="#">
                          <img src={`images/brands/${brand}-light.png`} alt="brand" />
                        </Link>
                      </Col>
                    ))
                  }
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/*  Banner Section End   */}

      {/* learn language Section Start */}
      <NioSection className="nk-section-language position-relative pt-7 pt-lg-120">
        <NioSection.Content>
          <Row className="align-items-center justify-content-between">
            <Col lg={6}>
              <div className="text-center mb-5 mb-lg-0" >
                <img src="images/language-learning/section-cover-1.png" alt="section-cover" />
              </div>
            </Col>
            <Col lg={6} xl={5}>
              <div className="nk-section-head pb-0">
                <h2 className="mb-3">The <span className="text-info-alt">world's #1</span> way to learn a language </h2>
                <p className="fs-20"> Learning with us is fun, and research shows that it works! With quick, bite-sized lessons, you’ll earn points and unlock new levels while gaining real-world communication skills. Learn a language right here with hundreds of free language-learning lessons. Get access to compact lessons from the experts. </p>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>

      {/* learn language Section End */}

      {/* Changeing Section Start */}
      <NioSection>
        <NioSection.Head alignX="center">
          <h2>
            <span className="text-indigo-alt">Changing</span> the way people learn new languages
          </h2>
        </NioSection.Head>

        <NioSection.Content>
          <Row className="gy-5">
            <Col md={6} lg={4} >
              <NioCard>
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="info text-white" icon="globe" className="mb-4" />
                  <h5> More than 1000 language combinations so you can learn. </h5>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard>
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="warning text-white" icon="book-read" className="mb-4" />
                  <h5> More than 1000 language combinations so you can learn. </h5>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard>
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="indigo text-white" icon="text2" className="mb-4" />
                  <h5> 36 vocabulary builders to install words fast for constant improvement </h5>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard>
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="danger text-white" icon="chat-circle" className="mb-4" />
                  <h5> 41 real conversations to give you fluency in learning languages </h5>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard>
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="info text-white" icon="todo" className="mb-4" />
                  <h5> Grammar features & conjugation tables to shortcut your progress </h5>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard>
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="success text-white" icon="clock" className="mb-4" />
                  <h5> More than 1000 language combinations so you can learn. </h5>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/* Changeing Section End */}

      {/* Dialect Section Start */}
      <NioSection>
        <NioSection.Content>
          <Row className="flex-lg-row-reverse align-items-center justify-content-between  pb-5 pb-lg-7">
            <Col lg={6}>
              <div className="text-center mb-5 mb-lg-0" >
                <img src="images/language-learning/section-cover-2.png" alt="section-cover" />
              </div>
            </Col>
            <Col lg={5}>
              <div>
                <h2> Boost your learning with <span className="text-info-alt">Dialect</span> plus </h2>
                <p className="fs-20"> Learning with us is fun, and research shows that it works! With quick, bite-sized lessons, you’ll earn points and unlock new levels while gaining real-world communication skills. </p>
                <div className="mt-5">
                  <NioButton href="#" label="Start Learning" className="btn-info-alt" />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="pt-5 pt-lg-7">
            <Col sm={6} lg={3} >
              <div className="text-center mb-5 mb-lg-0">
                <div className="h1 mb-2">
                  <NioCount end={70} suffix="k" />
                  <span className="text-info-alt"> +</span>
                </div>
                <h5>Lessons Taught</h5>
                <p> Engaging and educational lessons for all subjects, tailored to suit individual learning needs. </p>
              </div>
            </Col>
            <Col sm={6} lg={3} >
              <div className="text-center mb-5 mb-lg-0">
                <div className="h1 mb-2">
                  <NioCount end={40} suffix="k" />
                  <span className="text-info-alt"> +</span>
                </div>
                <h5>Students Enrolled</h5>
                <p> Join our student community and unlock a world of knowledge and opportunities for personal growth. </p>
              </div>
            </Col>
            <Col sm={6} lg={3} >
              <div className="text-center mb-5 mb-lg-0">
                <div className="h1 mb-2">
                  <NioCount end={11} />
                  <span className="text-info-alt"> +</span>
                </div>
                <h5>Lessons Taught</h5>
                <p> Explore a diverse range of lessons taught by experts in various fields to enhance your skills and. </p>
              </div>
            </Col>
            <Col sm={6} lg={3} >
              <div className="text-center mb-5 mb-lg-0">
                <div className="h1 mb-2">
                  <NioCount end={15} suffix="k" />
                  <span className="text-info-alt"> +</span>
                </div>
                <h5>5-Star Reviews</h5>
                <p> Discover why our courses have received numerous 5-star reviews from satisfied students who have. </p>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>

      {/* Dialect Section End */}

      {/* testimonial Section Start */}
      <NioSection className="nk-section-testimonials pb-7 pb-lg-120">
        <NioSection.Head alignX="center">
          <h2>
            People love
            <span className="text-info-alt"> Dialect</span>
          </h2>
          <p className="fs-20 mb-0">Learning with us is fun, and research shows that it works! Learning a language on Dialect is completely free.</p>
        </NioSection.Head>
        <NioSection.Content>
          <TestimonialContent />
        </NioSection.Content>
      </NioSection>
      {/* testimonial Section End */}

      {/* CTA Section Start */}
      <NioSection className="nk-section-cta bg-info-alt bg-2">
        <NioSection.Content>
          <Row className="align-items-center justify-content-between position-relative">
            <Col xl={5}>
              <div className="text-center text-xl-start pb-5 pb-lg-7 pb-xl-0">
                <h2>
                  <span className="bg-white d-inline-block p-3 rounded-2 mb-2 mb-lg-4 me-1" >Thinking about</span>
                  <span className="bg-indigo-alt text-white d-inline-block p-3 rounded-2 me-1 text-nowrap" >language learning?</span>
                </h2>
              </div>
            </Col>
            <Col xl={5}>
              <div className="text-center text-xl-start">
                <p className="fs-20 text-dark"> Learn a language right here with hundreds of free language-learning lessons. Get access to compact lessons from the experts and connect with a community of native speakers to help you master words faster. </p>
                <ul className="d-flex flex-wrap justify-content-center justify-content-xl-start gap-3 pt-5">
                  {
                    [1, 2, 3, 4, 5].map((flag, idx) => (
                      <li key={idx} className="media media-md media-middle media-circle d-inline-block bg-white p-1">
                        <img src={`images/icon/flag-${flag}.png`} alt="flag" />
                      </li>
                    ))
                  }
                </ul>
                <div className="pt-5">
                  <NioButton href="#" label="Start Learning" className="btn-dark" />
                </div>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/* CTA Section End */}

      {/* NewsLetter Section Start */}
      <NioSection className="nk-newsletter-section pt-7 pb-lg-0">
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
      {/* NewsLetter Section End */}

    </AppLayout>
  )
}

export default index;