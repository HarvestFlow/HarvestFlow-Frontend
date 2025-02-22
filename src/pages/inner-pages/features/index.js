import React from 'react';
import { Col, Row } from 'react-bootstrap';

// layout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components 
import { NioSection, NioSubscribeField, NioButton, NioMedia, NioCard } from '../../../components';

// section content 
import TestimonialContent from '../../../components/PageComponents/InnerPages/Features/TestimonialContent/TestimonialContent';

function index() {
  return (
    <AppLayout title="Features" rootClass="layout-1">

      {/*  Discover Section Start  */}
      <NioSection className="pt-120 pt-lg-160 pb-7 pb-lg-120 overflow-hidden" masks={[" blur-1 left top", " blur-1 right bottom"]}>
        <NioSection.Head alignX="center">
          <span className="d-inline-block fs-14 text-uppercase text-primary fw-semibold mb-2" >Discover our features</span>
          <h2 >All The Featuers You Expect, <span className="d-lg-block">Even More.</span>
          </h2>
          <p className="fs-20 mb-0" > NioLand offers all the features you, providing a comprehensive and versatile platform to streamline your business operations. </p>
          <ul className="nk-btn-group justify-content-center pt-5">
            <li>
              <NioButton href="#" className="btn-primary" label="Get Started" />
            </li>
            <li>
              <NioButton href="#" className="btn-outline-primary" label="Learn More" />
            </li>
          </ul>
        </NioSection.Head>
        <NioSection.Content>
          <div className="nk-banner-img nk-banner-features pt-xl-7 mt-xl-3 text-center">
            <div className="nk-banner-features-content" >
              <img src="images/features/banner-cover.png" alt="cover-img" className="nk-banner-features-base" />
              <img src="images/features/banner-cover-a.png" alt="cover-img" className="nk-banner-features-children one h-120" />
              <img src="images/features/banner-cover-b.png" alt="cover-img" className="nk-banner-features-children two h-200  animate animate-shakeY animate-duration-12" />
              <img src="images/features/banner-cover-c.png" alt="cover-img" className="nk-banner-features-children three h-300 animate animate-shakeY animate-duration-12" />
            </div>
          </div>
        </NioSection.Content>
      </NioSection>
      {/*  Discover Section End  */}

      {/*  Features Section Start  */}
      <NioSection className="pb-7 pb-lg-120">
        <NioSection.Content>
          <Row className="gy-5 gy-lg-0 align-items-center">
            <Col sm={6} lg={4} >
              <div className="nk-feature-card-text line-1">
                <div className="nk-feature-card-text-body">
                  <h5 className="title fw-normal">Visualize &amp; break down <span className="fw-semibold d-inline-block d-sm-block">engagement trends</span>
                  </h5>
                </div>
              </div>
            </Col>
            <Col sm={6} lg={4} >
              <div className="nk-feature-card-text line-2">
                <div className="nk-feature-card-text-body">
                  <h5 className="title fw-normal">
                    <span className="fw-semibold d-inline-block d-sm-block">Build funnels &amp; find key</span> retention drivers
                  </h5>
                </div>
              </div>
            </Col>
            <Col sm={6} lg={4} >
              <div className="nk-feature-card-text line-3">
                <div className="nk-feature-card-text-body">
                  <h5 className="title fw-normal">See the impact of <span className="fw-semibold d-inline-block d-sm-block">product launches &amp; experiments</span></h5>
                </div>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Features Section End  */}

      {/*  Testimonial Section Start  */}
      <NioSection className="bg-primary-gradient is-theme">
        <NioSection.Content>
          <TestimonialContent />
        </NioSection.Content>
      </NioSection>
      {/*  Testimonial Section End  */}

      {/*  Story-Line Section Start  */}
      <NioSection className="pb-lg-7 pt-7 pt-lg-120" masks={["blur-1 left center", "blur-1 right bottom"]}>
        <NioSection.Content className="d-flex flex-column gap-7 gap-lg-120">
          <Row className="gy-5 gy-lg-0 flex-row-reverse align-items-center justify-content-lg-between">
            <Col lg={6} >
              <div className="nk-feature-overview-img mb-5 mb-lg-0">
                <img src="images/cover/cover-24.png" alt="cover-bg" className="base" />
                <img src="images/cover/cover-24-a.png" alt="cover-forground" className="children children-1 animate animate-shakeY animate-duration-12" />
              </div>
            </Col>
            <Col lg={6} xl={5}>
              <div className="nk-section-head pb-0">

                <div className="media-group align-items-center mb-5">
                  <NioMedia size="md" rounded variant="primary-soft" icon="activity-round-fill" />

                  <div className="media-text">
                    <span className="d-inline-block fs-14 text-uppercase text-primary fw-semibold mb-2">Insights report</span>
                  </div>
                </div>
                <h2> Analyze Product Usage <span className="d-lg-block"> in Details</span>
                </h2>
                <ul className="nk-timeline pt-4">
                  <li className="nk-timeline-item">
                    <div className="nk-timeline-item-inner">
                      <div className="nk-timeline-symbol text-bg-primary text-white"></div>
                      <div className="nk-timeline-content mt-n1">
                        <p>Slice and dice user behavior trends to explore them from all angles.</p>
                      </div>
                    </div>
                  </li>
                  <li className="nk-timeline-item">
                    <div className="nk-timeline-item-inner">
                      <div className="nk-timeline-symbol text-bg-primary text-white"></div>
                      <div className="nk-timeline-content mt-n1">
                        <p>See how often users perform meaningful actions, monitor growth of key user cohorts, like power users</p>
                      </div>
                    </div>
                  </li>
                  <li className="nk-timeline-item">
                    <div className="nk-timeline-item-inner">
                      <div className="nk-timeline-symbol text-bg-primary text-white"></div>
                      <div className="nk-timeline-content mt-n1">
                        <p>know how current trends compare to previous results.</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row className="gy-5 gy-lg-0 align-items-lg-center justify-content-lg-between">
            <Col lg={6} >
              <div className="nk-feature-overview-img mb-5 mb-lg-0">
                <img src="images/cover/cover-25.png" alt="cover-base" className="base" />
                <img src="images/cover/cover-25-a.png" alt="cover-children" className="children children-2 animate animate-shakeY animate-duration-12" />
              </div>
            </Col>
            <Col lg={6} xl={5}>
              <div className="nk-section-head pb-0">

                <div className="media-group align-items-center mb-5">
                  <NioMedia size="md" rounded variant="danger-soft" icon="filter-fill" />

                  <div className="media-text">
                    <div className="d-inline-block fs-14 text-uppercase text-danger fw-semibold mb-2">Funnel Report</div>
                  </div>
                </div>
                <h2>Know Who Converts and Why</h2>
                <ul className="nk-timeline pt-4">
                  <li className="nk-timeline-item">
                    <div className="nk-timeline-item-inner">
                      <div className="nk-timeline-symbol text-bg-danger text-white"></div>
                      <div className="nk-timeline-content mt-n1">
                        <p>
                          Build funnels on the fly, then break them down by any user attribute or behavior to understand which users convert best.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="nk-timeline-item">
                    <div className="nk-timeline-item-inner">
                      <div className="nk-timeline-symbol text-bg-danger text-white"></div>
                      <div className="nk-timeline-content mt-n1">
                        <p>
                          Locate the funnel steps that cause friction, so you can better engage users before they drop off.
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row className="gy-5 gy-lg-0 flex-row-reverse align-items-lg-center justify-content-lg-between">
            <Col lg={6} >
              <div className="nk-feature-overview-img mb-5 mb-lg-0">
                <img src="images/cover/cover-26.png" alt="cover-base" className="base" />
                <img src="images/cover/cover-26-a.png" alt="cover-children" className="children children-3 animate animate-shakeY animate-duration-12" />
              </div>
            </Col>
            <Col lg={6} xl={5}>
              <div className="nk-section-head pb-0">

                <div className="media-group align-items-center mb-5">
                  <NioMedia size="md" rounded variant="purple-soft" icon="signal" />

                  <div className="media-text">
                    <div className="d-inline-block fs-14 text-uppercase text-indigo fw-semibold mb-2">Signal Report</div>
                  </div>
                </div>
                <h2>Identify Behaviors That Lead Long Term Retention</h2>

                <ul className="nk-timeline pt-4">
                  <li className="nk-timeline-item">
                    <div className="nk-timeline-item-inner">
                      <div className="nk-timeline-symbol text-bg-indigo text-white"></div>
                      <div className="nk-timeline-content mt-n1">
                        <p>
                          Correlate in-product actions with user engagement, retention, or any meaningful event, such as making a purchase.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="nk-timeline-item">
                    <div className="nk-timeline-item-inner">
                      <div className="nk-timeline-symbol text-bg-indigo text-white"></div>
                      <div className="nk-timeline-content mt-n1">
                        <p>
                          Use your findings to nudge users towards the actions that lead them to experience value and stick around.
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Story-Line Section End  */}

      {/*  Values Section Start  */}
      <NioSection masks={["blur-1 left center"]}>
        <NioSection.Head alignX="center">
          <span className="d-inline-block fs-14 text-uppercase text-primary fw-semibold mb-2">our values</span>
          <h2 className="mb-0">Learn About Other NioLand Features</h2>
          <ul className="nk-btn-group justify-content-center pt-5">
            <li>
              <NioButton href="#" className="btn-primary" label="Get Started" />
            </li>
            <li>
              <NioButton href="#" className="btn-outline-primary" label="Learn More" />
            </li>
          </ul>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="gy-5">
            <Col md={6} lg={4} >
              <NioCard>
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="primary-soft" icon="file-text-fill" className="mb-4" />
                  <h4>Retention Report</h4>
                  <p>A retention report provides valuable insights into customer or employee retention rates, helping organizations measure and improve.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard>
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="info-soft" icon="pie-fill" className="mb-4" />
                  <h4>Deliver Impact Results</h4>
                  <p>Our efforts consistently deliver impactful results, making a tangible difference in achieving our goals and objectives.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard>
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="warning-soft" icon="color-palette-fill" className="mb-4" />
                  <h4>A/B Test Variants</h4>
                  <p>A/B test variants are distinct versions of a webpage or element used to compare user engagement and performance.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard>
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="danger-soft" icon="view-grid-wd" className="mb-4" />
                  <h4>Limitless Segmentation</h4>
                  <p>Limitless segmentation allows for the categorization of data without constraints, enabling precise targeting and analysis across.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard>
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="primary-soft" icon="bell-fill" className="mb-4" />
                  <h4>Team Dashboard &amp; Alerts</h4>
                  <p>The team dashboard provides real-time insights and triggers alerts, enhancing collaboration and keeping teams informed for.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard>
                <NioCard.Body>
                  <NioMedia size="lg" rounded variant="success-soft" icon="puzzle-fill" className="mb-4" />
                  <h4>Integration Directory</h4>
                  <p>An integration directory centralizes and organizes connections between various software systems, streamlining data exchange.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Values Section End  */}

      {/*  Device Section Start  */}
      <NioSection masks={["blur-1 right center"]}>
        <NioSection.Head alignX="center">
          <span className="d-inline-block fs-14 text-uppercase text-primary fw-semibold mb-2">responsive on every device</span>
          <h2>Over 250,000 Users love us. They can’t be wrong!</h2>
          <ul className="nk-btn-group justify-content-center pt-5">
            <li>
              <NioButton href="#" className="btn-primary" label="Get Started" />
            </li>
            <li>
              <NioButton href="/customer-testimonials" className="btn-outline-primary" label="Customer Reviews" />
            </li>
          </ul>
        </NioSection.Head>
        <NioSection.Content>
          <div className="nk-responsive-img text-center" >
            <img src="images/thumb/o.png" alt="" className="w-100" />
          </div>
        </NioSection.Content>
      </NioSection>
      {/*  Device Section End  */}

      {/*  Learn-More Section Start  */}
      <NioSection>
        <NioSection.Head alignX="center">
          <span className="d-inline-block fs-14 text-uppercase text-primary fw-semibold mb-2">learn more</span>
          <h2>The World's Most Grossing Analytics Software Service</h2>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="gy-5">
            <Col lg={6} >
              <NioCard className="nk-feature-block overflow-hidden border-0 bg-blue-50 rounded-2 h-100">
                <NioCard.Body>
                  <div className="nk-feature-block-content h-100">
                    <NioMedia size="lg" rounded variant="primary" icon="users-fill" className="mb-3 mb-md-5" />
                    <h4>Get To Know Our Amazing Team</h4>
                    <p className="fs-18 mb-0">
                      Take a closer look at our outstanding team members, their diverse skills, and collective dedication to delivering excellence, driving innovation, and ensuring your satisfaction with our products.
                    </p>
                    <NioButton href="/about" className="btn-link text-primary pt-5" label="About Us" icon="arrow-right after" />
                  </div>
                </NioCard.Body>
                <div className="text-start">
                  <img src="images/features/a.png" alt="feature" className="pe-3 pe-md-7" />
                </div>
              </NioCard>
            </Col>
            <Col lg={6} >
              <NioCard className="nk-feature-block overflow-hidden border-0 bg-blue-50 rounded-2 h-100">
                <NioCard.Body>
                  <div className="nk-feature-block-content h-100">
                    <NioMedia size="lg" rounded variant="danger text-white" icon="help-fill" className="mb-3 mb-md-5" />
                    <h4>Questions? Go to help center for info!</h4>
                    <p className="fs-18 mb-0">
                      For any queries or information, please refer to our Help Center. It offers comprehensive resources to address your questions and provide detailed information about our products and services.
                    </p>
                    <NioButton href="/about" className="btn-link text-primary pt-5" label="Help Center" icon="arrow-right after" />
                  </div>
                </NioCard.Body>
                <div className="text-end">
                  <img src="images/features/b.png" alt="feature" className="ps-3 ps-md-7" />
                </div>
              </NioCard>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Learn-More Section End  */}

      {/*  CTA Section Start  */}
      <NioSection>
        <NioSection.Content>
          <div className="nk-cta-wrap nk-cta-card bg-primary-gradient rounded-3 is-theme position-relative overflow-hidden" >
            <Row className="g-0 align-items-center overflow-hidden">
              <Col xs={{ order: 2 }} lg={{ span: 7, order: 0 }} >
                <div className="nk-block-head-content mb-0">
                  <h2 className="newsletter-heading text-capitalize h1 m-0 mb-4 mb-lg-7">Start tracking your user analytics to boost your business</h2>
                  <ul className="nk-btn-group flex-wrap ps-1">
                    <li>
                      <NioButton href="#" className="btn-lg btn-white text-dark" label="Get Started" />
                    </li>
                    <li>
                      <NioButton href="/pricing" className="btn-lg btn-outline-white" label="Pricing &amp; Plans" />
                    </li>
                  </ul>
                </div>
              </Col>
              <Col xs={{ order: 1 }} lg={{ span: 5, order: 0 }} >
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

export default index;