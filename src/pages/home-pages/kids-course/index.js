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
    <AppLayout variant={3} title="HarvestFlow - Empowering Farmers" rootClass="layout-2">

      {/* Banner Section Start */}
      <section className="nk-banner nk-banner-agri">
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
                        alt="farmer"
                        className="border-white"
                        img="images/sunset.jpg"
                      />
                      <NioMedia
                        border
                        rounded
                        size="sm"
                        alt="farmer"
                        className="border-white"
                        img="images/sunset.jpg"
                      />
                      <NioMedia
                        border
                        rounded
                        size="sm"
                        alt="farmer"
                        className="border-white"
                        img="images/sunset.jpg"
                      />
                      <NioMedia
                        border
                        rounded
                        size="sm"
                        alt="farmer"
                        className="border-white"
                        img="images/sunset.jpg"
                      />
                    </div>
                    <p className="fw-bold m-0">
                      <span className="text-success">10k+</span> Farmers Empowered
                    </p>
                  </div>
                  <div>
                    <h1 className="display-6 mb-3">Farm Smarter with HarvestFlow</h1>
                    <p className="fs-20 text-base">Manage crops, connect with markets, and streamline logistics securely from anywhere.</p>
                  </div>
                  <ul className="nk-btn-group justify-content-center justify-content-lg-start pt-5 pt-lg-6 gap gap-3 ms-0">
                    <li className="p-0 m-0">
                      <NioButton
                        href="/auth/sign-up"
                        label="Sign Up Free"
                        className="btn-success"
                      />
                    </li>
                    <li className="p-0 m-0">
                      <div className="d-flex gap-2 align-items-center">
                        <NioMedia
                          size="md"
                          rounded
                          icon="play-fill"
                          variant="green"
                          lightboxSrc="https://www.youtube.com/watch?v=pVE92TNDwUk"
                          className="animate animate-infinite animate-pulse animate-duration-1"
                        />
                        <div className="media-text">
                          <div className="title fw-semibold">Watch Video</div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="pt-5 pt-xxl-6">
                    <h6 className="fs-14 fw-semibold text-base text-capitalize title-shape mb-0">Join thousands of farmers with our secure app</h6>
                    <ul className="d-flex justify-content-center justify-content-lg-start gap-3 pt-3">
                      <li>
                        <Link to="#">
                          <img src="images/sunset.jpg" className="border overflow-hidden rounded-3" alt="app-store" />
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <img src="images/sunset.jpg" className="border overflow-hidden rounded-3" alt="play-store" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col lg={6} className="align-self-end">
                <div className="nk-frame">
                  <img src="images/sunset.jpg" alt="farmer-field" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/* Banner Section End */}

      {/* Crop Monitoring Section Start */}
      <NioSection className="nk-section-crop-monitoring bg-green-50">
        <NioSection.Content>
          <Row className="align-items-end justify-content-between">
            <Col xl={3}>
              <div className="nk-section-head pb-xl-0">
                <span className="fs-14 fw-semibold text-uppercase d-inline-block text-success mb-2">Crop Monitoring</span>
                <h2>Real-Time Crop Insights</h2>
              </div>
            </Col>
            <Col xl={7}>
              <Row className="gy-5 gy-xl-0 g-xl-4">
                <Col sm={6} lg={4}>
                  <NioCard className="border-0">
                    <div className="card-image">
                      <img src="images/sunset.jpg" alt="crop-icon" className="img-fluid" />
                    </div>
                    <NioCard.Body>
                      <h5 className="mb-3 fw-bold text-success">Harvest Tracking</h5>
                      <p className="fs-16 text-base line-clamp-2">Monitor crop progress with detailed historical data and planting calendars.</p>
                    </NioCard.Body>
                  </NioCard>
                </Col>
                <Col sm={6} lg={4}>
                  <NioCard className="border-0">
                    <div className="card-image">
                      <img src="images/sunset.jpg" alt="weather-icon" className="img-fluid" />
                    </div>
                    <NioCard.Body>
                      <h5 className="mb-3 fw-bold text-success">Weather Forecasts</h5>
                      <p className="fs-16 text-base line-clamp-2">Plan with visual weather predictions from trusted APIs.</p>
                    </NioCard.Body>
                  </NioCard>
                </Col>
                <Col sm={6} lg={4}>
                  <NioCard className="border-0">
                    <div className="card-image">
                      <img src="images/sunset.jpg" alt="alert-icon" className="img-fluid" />
                    </div>
                    <NioCard.Body>
                      <h5 className="mb-3 fw-bold text-success">Critical Alerts</h5>
                      <p className="fs-16 text-base line-clamp-2">Stay informed with real-time weather condition notifications.</p>
                    </NioCard.Body>
                  </NioCard>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="justify-content-between align-items-center pt-7 pt-lg-120 pb-0">
            <Col lg={6}>
              <div className="nk-program-img mb-5 mb-md-7 mb-lg-0">
                <img src="images/sunset.jpg" alt="crop-monitoring" />
              </div>
            </Col>
            <Col lg={6} xl={5}>
              <div className="nk-section-head">
                <h2>Boost Your Yields</h2>
                <p className="fs-20">Use data-driven tools to track crops and make smarter farming decisions.</p>
              </div>
              <ul className="d-flex flex-column gap-5">
                <li className="media-group gap-3">
                  <span>
                    <NioIcon name="check-circle-fill" size="md" className="text-success" />
                  </span>
                  <div className="media-text mt-n1 ms-0">
                    <h5 className="text-capitalize">Detailed Records</h5>
                    <p className="text-base">Log crops with an intuitive calendar interface.</p>
                  </div>
                </li>
                <li className="media-group gap-3">
                  <span>
                    <NioIcon name="check-circle-fill" size="md" className="text-success" />
                  </span>
                  <div className="media-text mt-n1 ms-0">
                    <h5 className="text-capitalize">Weather Planning</h5>
                    <p className="text-base">Accurate forecasts for better activity scheduling.</p>
                  </div>
                </li>
                <li className="media-group gap-3">
                  <span>
                    <NioIcon name="check-circle-fill" size="md" className="text-success" />
                  </span>
                  <div className="media-text mt-n1 ms-0">
                    <h5 className="text-capitalize">Proactive Alerts</h5>
                    <p className="text-base">Instant notifications for critical conditions.</p>
                  </div>
                </li>
              </ul>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/* Crop Monitoring Section End */}

      {/* Dashboard Section Start */}
      <NioSection className="nk-section-dashboard pt-7 pt-lg-120">
        <div className="nk-section-head pb-md-7 nk-block-head-between align-items-lg-end flex-column flex-lg-row">
          <div className="text-center text-lg-start pb-5 pb-lg-0">
            <span className="fs-14 fw-semibold text-uppercase d-inline-block text-success mb-2">Our Dashboard</span>
            <h2>
              <span className="d-inline-block d-lg-block">Powerful</span> Insights
            </h2>
          </div>
          <div className="text-center text-lg-start">
            <NioButton href="#" className="btn-success" label="Explore Dashboard" />
          </div>
        </div>
        <NioSection.Content>
          <Row className="gy-5 gy-xl-0">
            <Col md={6} xl={4}>
              <NioCard className="shadow-sm rounded-3">
                <div className="card-image">
                  <img src="images/sunset.jpg" alt="dashboard" className="card-img-top img-fit-cover h-100 rounded-top-3" />
                </div>
                <NioCard.Body>
                  <div className="card-content">
                    <span className="badge text-bg-green-100 text-uppercase py-1 px-3 mb-3">Crop Analytics</span>
                    <h5 className="card-title mb-2">Real-time crop performance</h5>
                    <p className="fs-16 text-base line-clamp-2">Track production, stock, and yield KPIs effortlessly.</p>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} xl={4}>
              <NioCard className="shadow-sm rounded-3">
                <div className="card-image">
                  <img src="images/sunset.jpg" alt="dashboard" className="card-img-top img-fit-cover h-100 rounded-top-3" />
                </div>
                <NioCard.Body>
                  <div className="card-content">
                    <span className="badge text-bg-green-100 text-uppercase py-1 px-3 mb-3">Data Upload</span>
                    <h5 className="card-title mb-2">Import Excel/CSV data</h5>
                    <p className="fs-16 text-base line-clamp-2">Enrich your dashboard with automated data analysis.</p>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} xl={4}>
              <NioCard className="shadow-sm rounded-3">
                <div className="card-image">
                  <img src="images/sunset.jpg" alt="dashboard" className="card-img-top img-fit-cover h-100 rounded-top-3" />
                </div>
                <NioCard.Body>
                  <div className="card-content">
                    <span className="badge text-bg-green-100 text-uppercase py-1 px-3 mb-3">Custom Reports</span>
                    <h5 className="card-title mb-2">Generate detailed reports</h5>
                    <p className="fs-16 text-base line-clamp-2">Export PDF/Excel reports filtered by date or crop.</p>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/* Dashboard Section End */}

      {/* Market Insights Section Start */}
      <NioSection className="nk-section-market-insights bg-green-50">
        <NioSection.Content>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="nk-section-head text-center pb-5">
                <span className="fs-14 fw-semibold text-uppercase d-inline-block text-success mb-2">Market Insights</span>
                <h2>Match Supply with Demand</h2>
                <p className="fs-20">Discover market opportunities and optimize pricing effortlessly.</p>
              </div>
            </Col>
          </Row>
          <Row className="gy-5">
            <Col md={6} lg={4}>
              <NioCard className="position-relative border-0">
                <div className="card-image">
                  <img src="images/sunset.jpg" alt="market" className="card-img-top img-fit-cover h-100" />
                </div>
                <div className="position-absolute top-0 start-0 p-4 text-white bg-dark bg-opacity-50 w-100 h-100 d-flex flex-column">
                  <h5 className="mb-2 fw-bold">Monitor Demand</h5>
                  <p className="fs-16 line-clamp-2">Adapt production with real-time volume and location data.</p>
                </div>
              </NioCard>
            </Col>
            <Col md={6} lg={4}>
              <NioCard className="position-relative border-0">
                <div className="card-image">
                  <img src="images/sunset.jpg" alt="market" className="card-img-top img-fit-cover h-100" />
                </div>
                <div className="position-absolute top-0 start-0 p-4 text-white bg-dark bg-opacity-50 w-100 h-100 d-flex flex-column">
                  <h5 className="mb-2 fw-bold">Showcase Supply</h5>
                  <p className="fs-16 line-clamp-2">Let distributors view your crops by product and volume.</p>
                </div>
              </NioCard>
            </Col>
            <Col md={6} lg={4}>
              <NioCard className="position-relative border-0">
                <div className="card-image">
                  <img src="images/sunset.jpg" alt="market" className="card-img-top img-fit-cover h-100" />
                </div>
                <div className="position-absolute top-0 start-0 p-4 text-white bg-dark bg-opacity-50 w-100 h-100 d-flex flex-column">
                  <h5 className="mb-2 fw-bold">Optimize Pricing</h5>
                  <p className="fs-16 line-clamp-2">Get automated price suggestions based on trends.</p>
                </div>
              </NioCard>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/* Market Insights Section End */}

      {/* Logistics Section Start */}
      <NioSection className="nk-section-logistics pt-7 pt-lg-120">
        <NioSection.Content>
          <Row className="justify-content-between align-items-center">
            <Col lg={6}>
              <div className="nk-section-head">
                <span className="fs-14 fw-semibold text-uppercase d-inline-block text-success mb-2">Logistics</span>
                <h2>Efficient Deliveries</h2>
                <p className="fs-20">Track and optimize your shipments in real time.</p>
              </div>
              <ul className="d-flex flex-column gap-5">
                <li className="media-group gap-3">
                  <span>
                    <NioIcon name="check-circle-fill" size="md" className="text-success" />
                  </span>
                  <div className="media-text mt-n1 ms-0">
                    <h5 className="text-capitalize">Optimized Routes</h5>
                    <p className="text-base">GPS-integrated maps for efficient delivery paths.</p>
                  </div>
                </li>
                <li className="media-group gap-3">
                  <span>
                    <NioIcon name="check-circle-fill" size="md" className="text-success" />
                  </span>
                  <div className="media-text mt-n1 ms-0">
                    <h5 className="text-capitalize">Live Tracking</h5>
                    <p className="text-base">Monitor deliveries with GPS and ETA updates.</p>
                  </div>
                </li>
                <li className="media-group gap-3">
                  <span>
                    <NioIcon name="check-circle-fill" size="md" className="text-success" />
                  </span>
                  <div className="media-text mt-n1 ms-0">
                    <h5 className="text-capitalize">Logistics Alerts</h5>
                    <p className="text-base">Push/email notifications for delivery changes.</p>
                  </div>
                </li>
              </ul>
            </Col>
            <Col lg={6}>
              <div className="nk-program-img mb-5 mb-md-7 mb-lg-0">
                <img src="images/sunset.jpg" alt="logistics" />
              </div>
            </Col>
          </Row>
          <Row className="gy-5 pt-7">
            <Col sm={6} lg={4}>
              <NioCard className="border-0">
                <NioCard.Body className="p-3">
                  <div className="mb-3">
                    <NioIcon name="map" size="lg" className="text-success" />
                  </div>
                  <h6 className="mb-2">Route Optimization</h6>
                  <p className="fs-14 text-base line-clamp-2">Efficient paths with GPS integration.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col sm={6} lg={4}>
              <NioCard className="border-0">
                <NioCard.Body className="p-3">
                  <div className="mb-3">
                    <NioIcon name="gps" size="lg" className="text-success" />
                  </div>
                  <h6 className="mb-2">Real-Time Tracking</h6>
                  <p className="fs-14 text-base line-clamp-2">Live updates on delivery status.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col sm={6} lg={4}>
              <NioCard className="border-0">
                <NioCard.Body className="p-3">
 сути                    <div className="mb-3">
                    <NioIcon name="bell" size="lg" className="text-success" />
                  </div>
                  <h6 className="mb-2">Instant Alerts</h6>
                  <p className="fs-14 text-base line-clamp-2">Notifications for logistics updates.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/* Logistics Section End */}

      {/* ERP Integration Section Start */}
      <NioSection className="nk-section-erp bg-green-50">
        <NioSection.Content>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="nk-section-head text-center pb-5">
                <span className="fs-14 fw-semibold text-uppercase d-inline-block text-success mb-2">ERP Integration</span>
                <h2>Seamless Operations</h2>
                <p className="fs-20">Sync your ERP for streamlined stock and data management.</p>
              </div>
            </Col>
          </Row>
          <Row className="gy-5">
            <Col md={6} lg={4}>
              <NioCard className="border border-success text-center">
                <NioCard.Body className="p-4">
                  <h5 className="mb-2 fw-bold text-success">ERP Sync</h5>
                  <p className="fs-16 text-base line-clamp-2">Connect SAP, Oracle, or Odoo for real-time stock updates.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4}>
              <NioCard className="border border-success text-center">
                <NioCard.Body className="p-4">
                  <h5 className="mb-2 fw-bold text-success">Data Import</h5>
                  <p className="fs-16 text-base line-clamp-2">Upload contracts, prices, and sales with smart parsing.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4}>
              <NioCard className="border border-success text-center">
                <NioCard.Body className="p-4">
                  <h5 className="mb-2 fw-bold text-success">Dashboard Sync</h5>
                  <p className="fs-16 text-base line-clamp-2">View ERP data directly in your dashboard.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/* ERP Integration Section End */}

      {/* How It Works Section Start */}
      <NioSection className="nk-section-how-it-works overflow-hidden" masks={["shape-13 d-none d-md-block"]}>
        <NioSection.Head alignX="center">
          <span className="fs-14 fw-semibold text-uppercase d-inline-block text-success mb-2">How It Works</span>
          <h2>Designed for Farmers</h2>
          <p className="fs-20">Simplify crop management, market connections, and logistics with one platform.</p>
          <ul className="nk-btn-group justify-content-center pt-5">
            <li>
              <NioButton href="/auth/sign-up" className="btn-success" label="Sign Up Free" />
            </li>
            <li>
              <div className="d-flex align-items-center gap-2">
                <NioMedia
                  rounded
                  size="md"
                  icon="play-fill"
                  variant="green"
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
              <div className="nk-course-cta-img position-relative">
                <img src="images/sunset.jpg" alt="farmer-tech" />
              </div>
            </Col>
            <Col md={6}>
              <div className="nk-course-cta-img position-relative">
                <img src="images/sunset.jpg" alt="farmer-field" />
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/* How It Works Section End */}

      {/* Testimonial Section Start */}
      <NioSection className="nk-section-testimonial" masks={["shape-14 d-none d-md-block"]}>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="nk-section-head text-center pb-5">
              <span className="fs-14 fw-semibold text-uppercase d-inline-block text-success mb-2">Our Testimonials</span>
              <h2>What Farmers Say</h2>
              <ul className="nk-btn-group justify-content-center pt-5">
                <li>
                  <NioButton href="#" className="btn-success" label="Explore Features" />
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
      {/* Testimonial Section End */}

      {/* Gallery Section Start */}
      <NioSection className="nk-section-gallery overflow-hidden" masks={["shape-15", "shape-16", "shape-17"]}>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="nk-section-head text-center">
              <span className="fs-14 fw-semibold text-uppercase d-inline-block text-success mb-2">Our Gallery</span>
              <h2>Farming Moments</h2>
              <ul className="nk-btn-group justify-content-center pt-5">
                <li>
                  <NioButton href="/auth/sign-up" className="btn-success text-white" label="Sign Up Free" />
                </li>
                <li>
                  <div className="d-flex gap-2 align-items-center">
                    <NioMedia
                      size="md"
                      rounded
                      icon="play-fill"
                      variant="green"
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
          <div className="nk-gallery-img">
            <img src="images/sunset.jpg" alt="gallery" />
          </div>
        </NioSection.Content>
      </NioSection>
      {/* Gallery Section End */}

      {/* App-Download Section Start */}
      <NioSection className="nk-section-app-dwnld pb-0 bg-green-50 z-1 position-relative overflow-hidden pt-7 pt-lg-120" masks={["shape-18"]} py={false}>
        <NioSection.Content className="position-relative z-1">
          <Row className="align-items-center justify-content-between">
            <Col lg={5}>
              <div className="text-center text-lg-start pb-7 pb-xxl-0">
                <h2>Manage Anywhere</h2>
                <p className="fs-20 text-base mb-0">Our fast, secure, multilingual app (French, English, Arabic) lets you farm smarter on the go.</p>
                <ul className="d-flex justify-content-center justify-content-lg-start gap-3 pt-6">
                  <li>
                    <Link to="#">
                      <img src="images/sunset.jpg" className="border overflow-hidden rounded-3" alt="app-store" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src="images/sunset.jpg" className="border overflow-hidden rounded-3" alt="play-store" />
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={6} className="align-self-end">
              <div className="nk-app-download">
                <img src="images/sunset.jpg" alt="app-preview" />
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/* App-Download Section End */}

      {/* Newsletter Section Start */}
      <NioSection className="nk-section-newsletter pt-7 pt-lg-120 pb-0">
        <Row className="justify-content-center justify-content-lg-between align-items-center pb-5 border-bottom border-lighter">
          <Col lg={6} xl={4}>
            <div className="nk-newsletter-content text-center text-lg-start pb-5 pb-lg-0">
              <h4 className="text-capitalize">Stay Updated</h4>
              <p className="fs-16">Join 10,000+ farmers for farming tips and updates.</p>
            </div>
          </Col>
          <Col md={10} lg={6} xl={5}>
            <NioSubscribeField variant="one" />
          </Col>
        </Row>
      </NioSection>
      {/* Newsletter Section End */}

    </AppLayout>
  );
}

export default index;