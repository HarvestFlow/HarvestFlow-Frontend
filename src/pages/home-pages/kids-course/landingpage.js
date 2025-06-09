import React from 'react';
import { Link } from 'react-router-dom';
import { NioButton, NioCard, NioIcon, NioMedia, NioSection, NioSubscribeField } from '../../../components';
import { Col, Container, Row } from 'react-bootstrap';

// layouts
import AppLayout from '../../../layouts/AppLayout/AppLayout';

const LandingPage = () => {
  return (
    <AppLayout>
      {/* Hero Section */}
      <NioSection className="py-5 py-lg-7">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-center text-lg-start mb-4 mb-lg-0">
              <div className="mb-4">
                <div className="d-flex align-items-center justify-content-center justify-content-lg-start mb-3">
                  <div className="d-flex">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="rounded-circle border border-2 border-white overflow-hidden me-n2" style={{ width: '32px', height: '32px' }}>
                        <img
                          src={`/assets/images/farmer-${i}.jpg`} // Placeholder; replace with actual URLs if provided
                          alt={`Farmer ${i}`}
                          className="w-100 h-100 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="fw-bold ms-3">
                    <span className="text-primary">10k+</span> Farmers Empowered
                  </p>
                </div>
                <h1 className="display-4 fw-bold mb-3">
                  Farm Smarter with HarvestFlow
                </h1>
                <p className="fs-5 text-muted">
                  Manage crops, connect with markets, and streamline logistics securely from anywhere.
                </p>
              </div>
              <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3">
                <Link to="/create-offer">
                  <NioButton
                    label="Sign Up Free"
                    className="btn btn-primary btn-lg"
                  />
                </Link>
                <div className="d-flex align-items-center gap-2">
                  <NioMedia
                    icon="play"
                    variant="primary"
                    size="md"
                    rounded
                    className="cursor-pointer"
                    onClick={() => console.log('Play video')} // Replace with video modal logic
                  />
                  <span className="fw-medium">Watch Video</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="fs-6 fw-semibold mb-3">Join thousands of farmers with our secure app</p>
                <div className="d-flex justify-content-center justify-content-lg-start gap-3">
                  <Link to="#">
                    <img
                      src="/assets/images/app-store-badge.png" // Placeholder; replace with actual badge
                      alt="App Store"
                      className="img-fluid"
                      style={{ height: '48px', width: '128px' }}
                    />
                  </Link>
                  <Link to="#">
                    <img
                      src="/assets/images/play-store-badge.png" // Placeholder; replace with actual badge
                      alt="Play Store"
                      className="img-fluid"
                      style={{ height: '48px', width: '128px' }}
                    />
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="position-relative">
                <img
                  src="https://thumbs.dreamstime.com/b/golden-harvest-witness-breathtaking-k-ultra-hd-image-sunset-against-idyllic-farmland-backdrop-complete-wheat-366815664.jpg?w=768"
                  alt="Golden Harvest Sunset"
                  className="img-fluid rounded-3 shadow"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </NioSection>

      {/* Crop Monitoring Section */}
      <NioSection className="bg-light py-5 py-lg-7">
        <Container>
          <Row>
            <Col lg={3}>
              <span className="fs-6 fw-semibold text-uppercase text-primary">Crop Monitoring</span>
              <h2 className="h3 fw-bold mt-2">Real-Time Crop Insights</h2>
            </Col>
            <Col lg={9}>
              <Row className="g-4">
                {[
                  {
                    title: "Harvest Tracking",
                    desc: "Monitor crop progress with detailed historical data and planting calendars.",
                    img: "https://thumbs.dreamstime.com/b/charming-mouse-perched-stalk-serene-golden-meadow-under-glowing-moon-surrounded-twinkling-stars-captured-beautifully-364557304.jpg?w=768",
                  },
                  {
                    title: "Weather Forecasts",
                    desc: "Plan with visual weather predictions from trusted APIs.",
                    img: "https://thumbs.dreamstime.com/b/little-mouse-perches-atop-wheat-stalk-illuminated-bright-full-moon-starry-night-sky-creating-whimsical-enchanting-364191855.jpg?w=768",
                  },
                  {
                    title: "Critical Alerts",
                    desc: "Stay informed with real-time weather condition notifications.",
                    img: "https://thumbs.dreamstime.com/b/agronomist-corn-field-studies-harvest-sunset-agriculture-agronomy-agriculture-agronomy-farmer-agronomist-259651592.jpg?w=992",
                  },
                ].map((item, i) => (
                  <Col md={4} key={i}>
                    <NioCard className="h-100">
                      <NioCard.Body>
                        <div className="mb-3" style={{ height: '160px', overflow: 'hidden' }}>
                          <img
                            src={item.img}
                            alt={item.title}
                            className="img-fluid w-100 h-100 object-cover"
                            loading="lazy"
                          />
                        </div>
                        <h5 className="fs-5 fw-bold text-primary mb-2">{item.title}</h5>
                        <p className="text-muted">{item.desc}</p>
                      </NioCard.Body>
                    </NioCard>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
          <Row className="align-items-center mt-5">
            <Col lg={6} className="order-lg-2">
              <img
                src="https://thumbs.dreamstime.com/b/agronomist-corn-field-studies-harvest-sunset-agriculture-agronomy-agriculture-agronomy-farmer-agronomist-259651592.jpg?w=992"
                alt="Agronomist in Corn Field"
                className="img-fluid rounded-3 shadow"
                loading="lazy"
              />
            </Col>
            <Col lg={6} className="order-lg-1">
              <h2 className="h3 fw-bold">Boost Your Yields</h2>
              <p className="fs-5 text-muted mt-3">
                Use data-driven tools to track crops and make smarter farming decisions.
              </p>
              <div className="mt-4">
                {[
                  {
                    title: "Detailed Records",
                    desc: "Log crops with an intuitive calendar interface.",
                  },
                  {
                    title: "Weather Planning",
                    desc: "Accurate forecasts for better activity scheduling.",
                  },
                  {
                    title: "Proactive Alerts",
                    desc: "Instant notifications for critical conditions.",
                  },
                ].map((item, i) => (
                  <div key={i} className="d-flex align-items-start mb-3">
                    <NioIcon name="check-circle" className="text-primary me-3" />
                    <div>
                      <h6 className="fw-medium">{item.title}</h6>
                      <p className="text-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </NioSection>

      {/* Dashboard Section */}
      <NioSection className="py-5 py-lg-7">
        <Container>
          <Row className="justify-content-between align-items-center mb-4">
            <Col md={8} className="text-center text-md-start">
              <span className="fs-6 fw-semibold text-uppercase text-primary">Our Dashboard</span>
              <h2 className="h3 fw-bold mt-1">Powerful Insights</h2>
            </Col>
            <Col md={4} className="text-center text-md-end">
              <NioButton
                label="Explore Dashboard"
                className="btn btn-primary"
              />
            </Col>
          </Row>
          <Row className="g-4">
            {[
              {
                title: "Real-time crop performance",
                desc: "Track production, stock, and yield KPIs effortlessly.",
                badge: "Crop Analytics",
                img: "https://thumbs.dreamstime.com/b/charming-mouse-perched-stalk-serene-golden-meadow-under-glowing-moon-surrounded-twinkling-stars-captured-beautifully-364557304.jpg?w=768",
                icon: "pie-chart",
              },
              {
                title: "Import Excel/CSV data",
                desc: "Enrich your dashboard with automated data analysis.",
                badge: "Data Upload",
                img: "https://thumbs.dreamstime.com/b/little-mouse-perches-atop-wheat-stalk-illuminated-bright-full-moon-starry-night-sky-creating-whimsical-enchanting-364191855.jpg?w=768",
                icon: "bar-chart",
              },
              {
                title: "Generate detailed reports",
                desc: "Export PDF/Excel reports filtered by date or crop.",
                badge: "Custom Reports",
                img: "https://thumbs.dreamstime.com/b/golden-harvest-witness-breathtaking-k-ultra-hd-image-sunset-against-idyllic-farmland-backdrop-complete-wheat-366815664.jpg?w=768",
                icon: "file-text",
              },
            ].map((item, i) => (
              <Col md={4} key={i}>
                <NioCard className="h-100">
                  <div className="position-relative" style={{ height: '192px' }}>
                    <img
                      src={item.img}
                      alt={item.title}
                      className="img-fluid w-100 h-100 object-cover"
                      loading="lazy"
                    />
                    <div className="position-absolute top-0 start-0 p-3">
                      <span className="badge bg-primary text-white">{item.badge}</span>
                    </div>
                  </div>
                  <NioCard.Body>
                    <h5 className="fs-5 fw-bold mb-2">{item.title}</h5>
                    <p className="text-muted">{item.desc}</p>
                  </NioCard.Body>
                </NioCard>
              </Col>
            ))}
          </Row>
        </Container>
      </NioSection>

      {/* Market Insights Section */}
      <NioSection className="bg-light py-5 py-lg-7">
        <Container>
          <div className="text-center mb-5">
            <span className="fs-6 fw-semibold text-uppercase text-primary">Market Insights</span>
            <h2 className="h3 fw-bold mt-2">Match Supply with Demand</h2>
            <p className="fs-5 text-muted mx-auto" style={{ maxWidth: '600px' }}>
              Discover market opportunities and optimize pricing effortlessly.
            </p>
          </div>
          <Row className="g-4">
            {[
              {
                title: "Monitor Demand",
                desc: "Adapt production with real-time volume and location data.",
                img: "https://thumbs.dreamstime.com/b/golden-harvest-witness-breathtaking-k-ultra-hd-image-sunset-against-idyllic-farmland-backdrop-complete-wheat-366815664.jpg?w=768",
              },
              {
                title: "Showcase Supply",
                desc: "Let distributors view your crops by product and volume.",
                img: "https://thumbs.dreamstime.com/b/charming-mouse-perched-stalk-serene-golden-meadow-under-glowing-moon-surrounded-twinkling-stars-captured-beautifully-364557304.jpg?w=768",
              },
              {
                title: "Optimize Pricing",
                desc: "Get automated price suggestions based on trends.",
                img: "https://thumbs.dreamstime.com/b/little-mouse-perches-atop-wheat-stalk-illuminated-bright-full-moon-starry-night-sky-creating-whimsical-enchanting-364191855.jpg?w=768",
              },
            ].map((item, i) => (
              <Col md={4} key={i}>
                <div className="position-relative overflow-hidden rounded-3" style={{ height: '288px' }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    className="img-fluid w-100 h-100 object-cover"
                    style={{ transition: 'transform 0.5s' }}
                    loading="lazy"
                  />
                  <div className="position-absolute bottom-0 start-0 end-0 p-4 bg-gradient-to-t from-dark to-transparent">
                    <h3 className="fs-5 fw-bold text-white">{item.title}</h3>
                    <p className="text-white-80">{item.desc}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </NioSection>

      {/* Logistics Section */}
      <NioSection className="py-5 py-lg-7">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <span className="fs-6 fw-semibold text-uppercase text-primary">Logistics</span>
              <h2 className="h3 fw-bold mt-2">Efficient Deliveries</h2>
              <p className="fs-5 text-muted mt-3">
                Track and optimize your shipments in real time.
              </p>
              <div className="mt-4">
                {[
                  {
                    title: "Optimized Routes",
                    desc: "GPS-integrated maps for efficient delivery paths.",
                  },
                  {
                    title: "Live Tracking",
                    desc: "Monitor deliveries with GPS and ETA updates.",
                  },
                  {
                    title: "Logistics Alerts",
                    desc: "Push/email notifications for delivery changes.",
                  },
                ].map((item, i) => (
                  <div key={i} className="d-flex align-items-start mb-3">
                    <NioIcon name="check-circle" className="text-primary me-3" />
                    <div>
                      <h6 className="fw-medium">{item.title}</h6>
                      <p className="text-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
            <Col lg={6}>
              <img
                src="https://thumbs.dreamstime.com/b/agronomist-corn-field-studies-harvest-sunset-agriculture-agronomy-agriculture-agronomy-farmer-agronomist-259651592.jpg?w=992"
                alt="Agronomist in Corn Field"
                className="img-fluid rounded-3 shadow"
                loading="lazy"
              />
            </Col>
          </Row>
          <Row className="g-4 mt-5">
            {[
              {
                title: "Route Optimization",
                desc: "Efficient paths with GPS integration.",
                icon: "map",
              },
              {
                title: "Real-Time Tracking",
                desc: "Live updates on delivery status.",
                icon: "compass",
              },
              {
                title: "Instant Alerts",
                desc: "Notifications for logistics updates.",
                icon: "bell",
              },
            ].map((item, i) => (
              <Col md={4} key={i}>
                <NioCard className="h-100">
                  <NioCard.Body>
                    <NioIcon name={item.icon} className="text-primary mb-3" />
                    <h5 className="fs-6 fw-medium mb-2">{item.title}</h5>
                    <p className="text-muted">{item.desc}</p>
                  </NioCard.Body>
                </NioCard>
              </Col>
            ))}
          </Row>
        </Container>
      </NioSection>

      {/* CTA Section */}
      <NioSection className="py-5 py-lg-7 bg-primary bg-opacity-10">
        <Container>
          <div className="bg-gradient-to-r from-primary to-success rounded-3 overflow-hidden">
            <Row>
              <Col lg={6} className="p-4 p-lg-5 text-white">
                <h2 className="h3 fw-bold mb-3">Join the Global Marketplace</h2>
                <p className="fs-5 text-white-90 mb-4">
                  Connect with buyers and suppliers worldwide. Create your agricultural offer
                  and reach a broader market for your products.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <Link to="/create-offer">
                    <NioButton
                      label="Create an Offer"
                      icon="arrow-right after"
                      className="btn btn-light btn-lg"
                    />
                  </Link>
                  <Link to="#">
                    <NioButton
                      label="View Pricing & Plans"
                      className="btn btn-outline-light"
                    />
                  </Link>
                </div>
              </Col>
              <Col lg={6} className="position-relative">
                <img
                  src="https://thumbs.dreamstime.com/b/golden-harvest-witness-breathtaking-k-ultra-hd-image-sunset-against-idyllic-farmland-backdrop-complete-wheat-366815664.jpg?w=768"
                  alt="Golden Harvest Sunset"
                  className="img-fluid w-100 h-100 object-cover"
                  loading="lazy"
                />
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-r from-success to-transparent opacity-60"></div>
              </Col>
            </Row>
          </div>
        </Container>
      </NioSection>

      {/* Newsletter Section */}
      <NioSection className="py-4 border-top">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-center text-lg-start mb-3 mb-lg-0">
              <h3 className="h4 fw-bold">Stay Updated</h3>
              <p className="text-muted">
                Join 10,000+ farmers for farming tips and updates.
              </p>
            </Col>
            <Col lg={6}>
              <NioSubscribeField
                placeholder="Your email address"
                buttonLabel="Subscribe"
                buttonClass="btn btn-primary"
              />
            </Col>
          </Row>
        </Container>
      </NioSection>
    </AppLayout>
  );
};

export default LandingPage;