import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';

// layout
import AppLayout from '../../layouts/AppLayout/AppLayout';

// components 
import { NioCount, NioMedia, NioButton, NioSection, NioCard, NioSubscribeField, NioFilterTab, NioIcon } from '../../components';

// section content 
import PreBuiltContent from '../../components/PageComponents/Landing/PreBuiltContent/PreBuiltContent';
import LottieAnimation from './LottieAnimation';
import NioSectionSignUp from './NioSectionSignUp';

function Index() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#signup') {
      const signupSection = document.getElementById('signup-section');
      if (signupSection) {
        signupSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <AppLayout variant={4} title="Business Expenses" rootClass="layout-10">
      <section
        className="banner-section"
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#000",
          backgroundImage: "url('images/sunset.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay for readability */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            zIndex: 1,
          }}
        ></div>

        {/* Centered content */}
        <div
          className="nk-banner nk-banner-landing"
          style={{
            position: "absolute",
            top: "10%",
            left: 0,
            right: 0,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "20px",
            textAlign: "center",
            color: "white",
            overflow: "visible",
          }}
        >
          <Container>
            <Row className="justify-content-center">
              <Col lg={8} xs={12}>
                <div className="pb-5 text-center">
                  <div
                    style={{
                      fontSize: "clamp(1.5rem, 8vw, 5rem)",
                      color: "white",
                      fontWeight: "200",
                      fontFamily: "Poppins, sans-serif",
                      letterSpacing: "0.1em",
                      textShadow: "1px 1px 5px rgba(0, 0, 0, 0.3)",
                      transition: "transform 0.5s ease-in-out",
                      lineHeight: "1.2",
                      marginTop: "90px",
                    }}
                  >
                    Be the next
                  </div>
                  <TypeAnimation
                    sequence={[
                      "Agricultural innovator",
                      2500,
                      "Farming solution provider",
                      2500,
                      "agri-tech game changer",
                      2500,
                      "Digital farming revolution",
                      2500,
                      "Farming trendsetter",
                      2500,
                      "Agricultural powerhouse",
                      2500,
                      "Farming tech unicorn",
                      2500,
                      "Global agriculture brand",
                      2500,
                      "Household name in farming",
                      2500,
                      "Farming tech trailblazer",
                      2500,
                    ]}
                    wrapper="h1"
                    speed={70}
                    style={{
                      fontSize: "clamp(1rem, 6vw, 3.5rem)",
                      color: "white",
                      fontWeight: "200",
                      display: "inline-block",
                      fontFamily: "Poppins, sans-serif",
                      letterSpacing: "0.1em",
                      textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
                      transition: "transform 1s ease-in-out",
                      marginTop: "10px",
                      lineHeight: "1.2",
                    }}
                    repeat={Infinity}
                    cursor={false}
                  />
                </div>
                <ul
                  className="d-flex flex-wrap align-items-center justify-content-center gap-3 pt-4"
                  style={{ flexDirection: "row" }}
                >
                  <li>
                    <button
                      className="btn btn-primary green-gradient"
                      style={{ padding: "10px 20px" }}
                      onClick={() => {
                        const signupSection = document.getElementById("signup-section");
                        if (signupSection) {
                          signupSection.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      aria-label="Scroll to signup section"
                    >
                      let's start now
                    </button>
                    <style jsx>{`
                      .green-gradient {
                        background: linear-gradient(90deg, #28a745, #34d058);
                        border: none;
                        color: white;
                      }
                      .green-gradient:hover {
                        background: linear-gradient(90deg, #218838, #2ecc71);
                      }
                    `}</style>
                  </li>
                  <li>
                    <button
                      className="btn btn-outline-light"
                      style={{ padding: "10px 20px" }}
                    >
                      Contactez-nous
                    </button>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>

        <style jsx>{`
          @media (max-width: 768px) {
            .nk-banner {
              padding: 15px;
              top: 5%;
            }
            .nk-banner ul {
              flex-direction: column;
              gap: 15px;
            }
            .nk-banner ul li {
              width: 100%;
            }
            .nk-banner ul li button {
              width: 100%;
              font-size: 1rem;
            }
          }

          @media (max-width: 480px) {
            .nk-banner {
              padding: 10px;
            }
            .nk-banner ul {
              gap: 10px;
            }
            .nk-banner ul li button {
              padding: 8px 12px;
            }
          }

          @media (max-width: 360px) {
            .nk-banner {
              padding: 5px;
              top: 2%;
            }
            .nk-banner div div div {
              fontSize: clamp(1rem, 7vw, 3rem);
            }
            .nk-banner h1 {
              fontSize: clamp(0.875rem, 5vw, 2rem);
              marginTop: 5px;
            }
          }
        `}</style>
      </section>

      <section className="nk-banner nk-banner-business-expance-tracker bg-primary-gradient-soft">
        <div className="nk-banner-wrap">
          <Container>
            <Row className="flex-row-reverse align-items-center justify-content-between">
              <Col lg={6}>
                <div className="nk-banner-img mb-4 mb-lg-0" style={{ maxWidth: "80%", margin: "0 auto" }}>
                  <img 
                    src="https://www.arsilac.com/data/medias/30548/style/emailing_visuel/arsilac-agilor-financement-credit-service-2.jpeg" 
                    alt="banner-cover" 
                    style={{ borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} 
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="nk-banner-content">
                  <div className="logo-card" style={{ width: "100%", maxWidth: "none", textAlign: "center" }}>
                    <img 
                      src="images/logo-s1-dark2x.png" 
                      alt="logo" 
                      style={{ width: "70%", height: "auto", maxWidth: "none", marginTop: "-70px" }} 
                    />
                  </div>
                  <h4 className="display-8 mb-2 mt-20">Agriculture Connectée et Rentable</h4>   
                  <p className="fs-18 mb-0">Analysez vos données, alignez production et demande, et optimisez vos récoltes avec notre technologie.</p>
                  <ul className="nk-btn-group pt-4 pt-lg-5">
                    <li>
                      <NioButton href="#" className="btn-primary-alt" label="Démo Gratuite" />
                    </li>
                    <li>
                      <NioButton href="#" className="btn-outline-primary-alt" label="Découvrir" />
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <NioSection className="nk-process-section py-7 py-lg-120">
        <Row className="justify-content-center">
          <Col lg={8} xl={6}>
            <div className="nk-section-head pb-7 pb-lg-120 text-center">
              <span className="d-inline-block fs-16 text-uppercase text-primary-alt fw-bold mb-2">L’Idée Générale</span>
              <h2>Une Solution pour l’Agriculture de Demain</h2>
              <p className="fs-20 mb-0">
                HarvestFlow digitalise l’agriculture en connectant les producteurs, transporteurs et distributeurs. Grâce à l’importation de vos données commerciales (Trade Data Upload) et à une mise en relation intelligente entre l’offre et la demande (Demand-Supply Matching), notre plateforme optimise vos récoltes, réduit les pertes et maximise vos profits.
              </p>
              <ul className="nk-btn-group justify-content-center pt-5">
                <li>
                  <NioButton href="/about" className="btn-primary-alt" label="En savoir plus sur notre vision" />
                </li>
                <li>
                  <NioButton href="/contact-us" className="btn-outline-primary-alt" label="Contact Us" />
                </li>
              </ul>
            </div>
          </Col>
        </Row>

        <NioSection.Content>
          <ul className="nk-schedule d-flex flex-column gap-3 gap-md-5 gap-lg-60 nk-schedule-s1">
            <li className="nk-schedule-item p-0">
              <div className="nk-schedule-item-inner">
                <div className="nk-schedule-symbol">
                  <NioMedia size="lg" rounded variant="primary-soft" className="fw-bold">
                    1
                  </NioMedia>
                </div>
                <div className="nk-schedule-content">
                  <Row className="flex-row-reverse justify-content-between">
                    <Col lg={4}>
                      <div className="nk-feature-overview-img text-lg-end mb-n2 mb-lg-n0 mt-lg-n9">
                        <img src="/images/image-removebg-preview (7).png" alt="agriculture-background" style={{ maxWidth: '75%' }} />
                      </div>
                    </Col>
                    <Col lg={5}>
                      <div className="nk-section-head">
                        <h3 className="text-capitalize mb-3">Importez vos <span className="text-primary-alt">Données</span></h3>
                        <p className="fs-20 text-base">
                          Importez vos historiques de ventes (CSV, Excel) et transformez-les en analyses prédictives pour mieux négocier et planifier.
                        </p>
                        <ul className="nk-btn-group pt-3 pt-md-5">
                          <li>
                            <NioButton href="#" className="btn-outline-primary-alt" icon="arrow-right after" label="Learn More" />
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </li>

            <li className="nk-schedule-item p-0">
              <div className="nk-schedule-item-inner">
                <div className="nk-schedule-symbol">
                  <NioMedia size="lg" rounded variant="warning-soft" className="fw-bold">
                    2
                  </NioMedia>
                </div>
                <div className="nk-schedule-content">
                  <Row className="flex-row-reverse justify-content-between">
                    <Col lg={4}>
                      <div className="nk-feature-overview-img text-lg-end mb-4 mb-sm-0 mb-sm-n3 mb-lg-n0 mt-lg-n9">
                        <img src="/images/image-removebg-preview (8).png" alt="agriculture-background" style={{ maxWidth: '75%' }} />
                      </div>
                    </Col>
                    <Col lg={5}>
                      <div className="nk-section-head">
                        <h3 className="text-capitalize mb-3">Connectez Offre et <span className="text-warning">Demande</span></h3>
                        <p className="fs-20 text-base">
                          Notre algorithme relie vos récoltes aux besoins des distributeurs locaux, en temps réel, pour vendre au meilleur moment.
                        </p>
                        <ul className="nk-btn-group pt-3 pt-md-5">
                          <li>
                            <NioButton href="#" className="btn-outline-warning" icon="arrow-right after" label="Learn More" />
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </li>

            <li className="nk-schedule-item p-0">
              <div className="nk-schedule-item-inner p-0">
                <div className="nk-schedule-symbol">
                  <NioMedia size="lg" rounded variant="danger-soft" className="fw-bold">
                    3
                  </NioMedia>
                </div>
                <div className="nk-schedule-content">
                  <Row className="flex-row-reverse justify-content-between">
                    <Col lg={4}>
                      <div className="nk-feature-overview-img text-lg-end mb-4 mb-sm-0 mb-sm-n3 mb-lg-n0 mt-30">
                        <img src="/images/image-removebg-preview (9).png" alt="agriculture-background" style={{ maxWidth: '75%' }} />
                      </div>
                    </Col>
                    <Col lg={5}>
                      <div className="nk-section-head">
                        <h3 className="text-capitalize mb-3">Boostez Votre <span className="text-danger">Agriculture</span></h3>
                        <p className="fs-20 text-base">
                          Optimisez vos récoltes, réduisez les pertes et maximisez vos profits grâce à une plateforme pensée pour l’agriculture de demain.
                        </p>
                        <ul className="nk-btn-group pt-3 pt-md-5">
                          <li>
                            <NioButton href="#" className="btn-outline-danger" icon="arrow-right after" label="Learn More" />
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </li>
          </ul>
        </NioSection.Content>
      </NioSection>

      <NioSection className="nk-section-features py-7 py-lg-120">
        <NioSection.Head alignX="center">
          <h2>Des Outils Puissants au Service de <span className="text-indigo">Votre Réussite</span></h2>
          <p className="fs-20 mb-0">Boostez votre activité agricole grâce à des solutions innovantes qui transforment vos données en opportunités concrètes.</p>
          <NioButton href="/signup" className="btn-indigo mt-5" label="Testez ces outils dès aujourd’hui" />
        </NioSection.Head>
        <NioSection.Content>
          <Row className="gy-5 gy-xl-0">
            <Col md={6} xl={4}>
              <NioCard className="h-100 has-shadow">
                <NioCard.Body>
                  <div className="card-image">
                    <img src="https://img.freepik.com/vecteurs-premium/telecharger-fichier-icone-xls-etiquette-ecran-ordinateur-portable-telechargement-du-concept-document_545399-1854.jpg" alt="trade-data-visual" className="card-img" />
                  </div>
                  <div className="card-content pt-5">
                    <ul className="pb-3">
                      <li>
                        <Link to="/features-details" className="badge text-bg-danger-soft text-base text-uppercase fw-semibold">Trade Data Upload</Link>
                      </li>
                    </ul>
                    <h5 className="card-title">
                      <Link to="/features-details">Valorisez Votre Passé</Link>
                    </h5>
                    <p className="fs-16">Importez vos historiques de ventes (CSV, Excel) et transformez-les en analyses prédictives pour mieux négocier et planifier.</p>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} xl={4}>
              <NioCard className="h-100 has-shadow">
                <NioCard.Body>
                  <div className="card-image">
                    <img src="https://acci-cavie.org/wp-content/uploads/2024/01/cover-image.jpg" alt="matching-visual" className="card-img" />
                  </div>
                  <div className="card-content pt-5">
                    <ul className="pb-3">
                      <li>
                        <Link to="/features-details" className="badge text-bg-cyan-soft text-base text-uppercase fw-semibold">Demand-Supply Matching</Link>
                      </li>
                    </ul>
                    <h5 className="card-title">
                      <Link to="/features-details">La Rencontre Parfaite</Link>
                    </h5>
                    <p className="fs-16">Notre algorithme relie vos récoltes aux besoins des distributeurs locaux, en temps réel, pour vendre au meilleur moment.</p>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} xl={4}>
              <NioCard className="h-100 has-shadow">
                <NioCard.Body>
                  <div className="card-image">
                    <img src="https://static.vecteezy.com/ti/vecteur-libre/t2/37329459-du-quotidien-temps-prevoir-telephone-app-dans-3d-papier-couper-style-climat-et-atmosphere-widget-modele-pour-telephone-intelligent-meteo-etat-ui-vecteur-ensemble-vectoriel.jpg" alt="dashboard-visual" className="card-img" />
                  </div>
                  <div className="card-content pt-5">
                    <ul className="pb-3">
                      <li>
                        <Link to="/features-details" className="badge text-bg-purple-soft text-base text-uppercase fw-semibold">Agriculture Optimisée</Link>
                      </li>
                    </ul>
                    <h5 className="card-title">
                      <Link to="/features-details">De la Graine au Profit</Link>
                    </h5>
                    <p className="fs-16">Suivez vos cultures, anticipez la météo et coordonnez la logistique pour une gestion sans faille.</p>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>

      <LottieAnimation />

      <section className="banner-section" style={{ width: "100%", height: "100vh", overflow: "hidden", position: "relative" }}>
        <div className="image-slider"></div>
      </section>

      <style>
        {`
          .image-slider {
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            animation: slideImages 2s infinite alternate;
          }

          @keyframes slideImages {
            0% { background-image: url('images/5a69e13698e54300016dcee7_bck_04_A.jpg'); }
            100% { background-image: url('images/5a69e13698e54300016dcee4_bck_04_B.jpg'); }
          }
        `}
      </style>

      <NioSection className="nk-feature-section bg-purple-50">
        <NioSection.Head alignX="center">
          <h2>
            <span className="text-indigo">HarvestFlow</span> the dynamic intersection of industry challenges and data science brilliance!
          </h2>
          <p className="fs-20 mb-0">Whether you're a forward-thinking company or a passionate data science developer, HarvestFlow is your gateway to a world of innovation, collaboration, and recognition.</p>
          <ul className="nk-btn-group justify-content-center pt-5">
            <li>
              <NioButton href="#" className="btn-indigo" label="Let's Start" />
            </li>
            <li>
              <NioButton href="#" className="btn-outline-indigo" label="Learn More" />
            </li>
          </ul>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="gy-5 gy-md-7"></Row>
        </NioSection.Content>
      </NioSection>

      <NioSection className="nk-section-testimonial py-7 py-lg-120">
        <div className="nk-banner-cover nk-frame nk-frame-three">
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="pb-5 pb-lg-7 text-center">
                <h2><span className="text-indigo">Join our community of bright minds</span></h2>
                <p className="fs-20 mb-0">Becoming a HarvestFlow member is more than just a registration; it's an invitation to be a part of something transformative. Join our community today, where collaboration meets innovation, and together, we redefine the boundaries of data science.</p>
                <ul className="nk-btn-group justify-content-center pt-5">
                  <li>
                    <NioButton href="/about-solution" className="btn-indigo" label="Explore" />
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <div className="nk-frame-children nk-frame-children-one">
            <img src="images/business-subscription/mask-circle-1.png" className="animate animate-shake animate-duration-10" alt="mask-circle" />
          </div>
          <div className="nk-frame-children nk-frame-children-two">
            <img src="images/business-subscription/mask-dot-1.png" className="animate animate-shakeY animate-duration-12" alt="mask-circle" />
          </div>
          <div className="nk-frame-children nk-frame-children-three"></div>
        </div>
        <NioSection.Content></NioSection.Content>
      </NioSection>

      <NioSection className="nk-section-int-tools bg-green-50 has-mask overflow-hidden" masks={["shape-4"]}>
        <NioSection.Head alignX="center">
          <h2 className="mb-0">Keep in touch with <span className="text-green-400">HarvestFlow</span></h2>
        </NioSection.Head>
        <h4>We Promise: One Mail Per Month, Cancel Anytime
          At HarvestFlow, we value your time and inbox space. Rest assured, our communication is all about delivering the most important updates without overwhelming you. Here's what you can expect:</h4> 
        <ul>
          <li>
            <NioIcon name="check-circle text-primary" className="me-1" />
            <span className="fs-18 text-dark">Be the first to know about significant developments, platform enhancements, and industry insights.</span>
          </li>
          <li>
            <NioIcon name="check-circle text-primary" className="me-1" />
            <span className="fs-18 text-dark">Dive into success stories, case studies, and inspiring journeys from both companies and developers within the HarvestFlow community.</span>
          </li>
          <li>
            <NioIcon name="check-circle text-primary" className="me-1" />
            <span className="fs-18 text-dark">Stay informed about upcoming events, challenges, and exclusive opportunities tailored for our dynamic community.</span>
          </li>
        </ul>
        <NioSection.Content className="position-relative z-1">
          <Row className="justify-content-between align-items-center g-5 pt-5 pt-md-9">
            <NioSection.Content className="position-relative z-1">
              <NioSection.Head alignX="center">
                <NioSubscribeField variant="three" />
              </NioSection.Head>
            </NioSection.Content>
          </Row>
        </NioSection.Content>
      </NioSection>

      <NioSection className="nk-section-blog py-7 py-lg-120" masks={["shape-13 d-done d-md-block"]}>
        <NioSection.Head alignX="center">
          <h2>See how <span className="text-purple-400">HarvestFlow</span> can help you</h2>
        </NioSection.Head>
        <NioSection.Content>
          <div className="nk-banner-cover nk-frame nk-frame-three">
            <Row className="gap g-4">
              <Col sm={6} lg={4}>
                <NioCard className="h-100">
                  <NioCard.Body>
                    <div className="text-center">
                      <div className="mb-3 mb-md-5"></div>
                      <div className="mb-4">
                        <h4 className="text-capitalize">Accelerate Innovation</h4>
                        <p className="fs-16 line-clamp-2 fw-medium">Empower your organization with a pool of talented data science developers ready to tackle your real-world challenges. Accelerate innovation by leveraging diverse perspectives and cutting-edge solutions tailored to your industry.</p>
                      </div>
                    </div>
                  </NioCard.Body>
                </NioCard>
              </Col>
              <Col sm={6} lg={4}>
                <NioCard className="h-100">
                  <NioCard.Body>
                    <div className="text-center">
                      <div className="mb-3 mb-md-5"></div>
                      <div className="mb-4">
                        <h4 className="text-capitalize">Real-World Learning Opportunities</h4>
                        <p className="fs-16 line-clamp-2 fw-medium">HarvestFlow offers a platform to engage in real-world challenges, providing practical experiences that go beyond traditional learning. Elevate your data science skills and build a robust portfolio with hands-on projects.</p>
                      </div>
                    </div>
                  </NioCard.Body>
                </NioCard>
              </Col>
              <Col sm={6} lg={4}>
                <NioCard className="h-100">
                  <NioCard.Body>
                    <div className="text-center">
                      <div className="mb-3 mb-md-5"></div>
                      <div className="mb-4">
                        <h4 className="text-capitalize">Networking and Collaboration</h4>
                        <p className="fs-16 line-clamp-2 fw-medium">Connect with industry leaders, fellow developers, and potential employers. HarvestFlow is not just a platform; it's a vibrant community where networking and collaboration opportunities abound.</p>
                      </div>
                    </div>
                  </NioCard.Body>
                </NioCard>
              </Col>
            </Row>
            <div className="nk-frame-children nk-frame-children-two">
              <img src="images/business-subscription/mask-dot-1.png" className="animate animate-shakeY animate-duration-12" alt="mask-circle" />
            </div>
            <div className="nk-frame-children nk-frame-children-three"></div>
          </div>
        </NioSection.Content>
      </NioSection>

      <NioSection id="signup-section">
        <NioSectionSignUp />
      </NioSection>
    </AppLayout>
  );
}

export default Index;