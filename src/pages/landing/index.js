/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import  { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';

// layout
import AppLayout from '../../layouts/AppLayout/AppLayout';

// components 
import { NioCount, NioMedia,NioIcon, NioButton, NioSection, NioCard, NioSubscribeField,NioFilterTab} from '../../components';

// section content 
import PreBuiltContent from '../../components/PageComponents/Landing/PreBuiltContent/PreBuiltContent';


function index() {
  const navigate = useNavigate();

  const cards = [
    {
      image: "https://images.pexels.com/photos/27778146/pexels-photo-27778146/free-photo-of-a-train-traveling-through-the-desert-on-a-track.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Train Journey",
      text: "Explore the beauty of desert landscapes by train.",
      path: "/train-journey"
    },
    {
      image: "https://images.pexels.com/photos/4820737/pexels-photo-4820737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "City Night",
      text: "Discover the vibrant nightlife of the city.",
      path: "/city-night"
    },
    {
      image: "https://images.pexels.com/photos/30808038/pexels-photo-30808038/free-photo-of-farmer-sorting-rice-grains-in-eastern-sri-lanka.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Agriculture",
      text: "Learn about traditional rice farming in Sri Lanka.",
      path: "/agriculture"
    }
  ];
  
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
  {/* Overlay pour lisibilité */}
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

  {/* Contenu superposé */}
  <div
    className="nk-banner nk-banner-landing"
    style={{
      position: "absolute",
      top: "50%",
      left: 0,
      right: 0,
      zIndex: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "20px",
      textAlign: "left",
      color: "white",
      transform: "translateY(-50%)",
      overflow: "visible", // Prevent clipping of content
    }}
  >
    <Container>
      <Row className="justify-content-start">
        <Col lg={8} xs={12}>
          <div className="pb-5 pb-lg-7 text-left">
            <div style={{ textAlign: "left", paddingLeft: "20px" }}>
              {/* Texte statique "Be the next" */}
              <div
                style={{
                  fontSize: "clamp(1.5rem, 8vw, 5rem)", // Smaller minimum size for tiny screens
                  color: "white",
                  fontWeight: "200",
                  fontFamily: "Poppins, sans-serif",
                  letterSpacing: "0.1em",
                  textShadow: "1px 1px 5px rgba(0, 0, 0, 0.3)",
                  transition: "transform 0.5s ease-in-out",
                  marginTop: "0", // Remove negative margin to prevent disappearance
                  lineHeight: "1.2", // Ensure readability on small screens
                }}
              >
                Be the next
              </div>

              {/* Animation dynamique */}
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
                  fontSize: "clamp(1rem, 6vw, 3.5rem)", // Smaller minimum size for tiny screens
                  color: "white",
                  fontWeight: "200",
                  display: "inline-block",
                  fontFamily: "Poppins, sans-serif",
                  letterSpacing: "0.1em",
                  textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
                  transition: "transform 1s ease-in-out",
                  marginTop: "10px", // Reduced margin for better spacing
                  lineHeight: "1.2",
                }}
                repeat={Infinity}
                cursor={false}
              />
            </div>

            {/* Boutons */}
            <ul
              className="d-flex flex-wrap align-items-center justify-content-start gap-3 pt-4"
              style={{ flexDirection: "row" }}
            >
              <li>
                <button className="btn btn-primary">En savoir plus</button>
              </li>
              <li>
                <button className="btn btn-outline-light">Contactez-nous</button>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  </div>

  {/* Media Queries pour responsivité */}
  <style jsx>{`
    @media (max-width: 768px) {
      .nk-banner {
        padding: 15px;
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
      /* Extra small screens */
      .nk-banner {
        padding: 5px;
      }
      .nk-banner div div div {
        font-size: clamp(1rem, 7vw, 3rem); /* Even smaller for tiny screens */
        margin-top: 0;
      }
      .nk-banner h1 {
        font-size: clamp(0.875rem, 5vw, 2rem);
        margin-top: 5px;
      }
    }
  `}</style>
</section>


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
<NioSection className="nk-brand-section">
        <NioSection.Content>
          <Row className="justify-content-center">
            <Col lg={10} xl={8}>
              <h6 className="text-center fw-normal text-light mb-5" >More than 100,000+ teams are using HarvestFlow</h6>
              <Row className="justify-content-center justify-content-lg-between text-center g-gs">
                {
                  ["a", "b", "c", "d", "e"]?.map((brand, idx) => (
                    <Col xs={4} sm={3} lg={2} key={idx}>
                      <Link to="#" className="nk-brand" >
                        <img src={`images/brands/${brand}.png`} alt="tool" className="w-auto h-24px" />
                      </Link>
                    </Col>
                  ))
                }
              </Row>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Brand Section End   */}


      {/*  Feature Section Start   */}
      <NioSection className="nk-feature-section bg-purple-50">
        <NioSection.Head alignX="center">
          <h2>
            <span className="text-indigo">HarvestFlow</span>  the dynamic intersection of industry challenges and data science brilliance! 
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
          <Row className="gy-5 gy-md-7">
            
          </Row>
        </NioSection.Content>
              </NioSection>
      {/*  Feature Section End   */}

      {/*  Products Section Start   */}
   

      {/*  Video Section Start   */}

      {/*  Testimonial Section Start   */}
      
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
                  <div className="nk-frame-children nk-frame-children-three">
                  </div>
                </div>
        <NioSection.Content>
        </NioSection.Content>
      </NioSection>
      {/*  Testimonial Section End   */}

      {/*  Integrate Section Start   */}
      <NioSection className="nk-section-int-tools bg-green-50 has-mask overflow-hidden" masks={["shape-4"]}>
        <NioSection.Head alignX="center">
          <h2 className="mb-0">Keep in touch with  <span className="text-green-400">HarvestFlow</span>
          </h2>
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
      {/*  Integrate Section End  */}
      <NioSection 
  className="nk-section-farm-efficiency py-7 py-lg-120" 
  style={{ 
    backgroundImage: `url('https://images.pexels.com/photos/8846150/pexels-photo-8846150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    minHeight: '70vh',
    position: 'relative'
  }}
>
  {/* Div superposé pour le fond semi-transparent */}
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Fond semi-transparent appliqué ici
    zIndex: 1
  }} />
  <NioSection.Content style={{ position: 'relative', zIndex: 2 }}>
    <Row className="align-items-center">
      <Col lg={6}>
        <div style={{ padding: '20px' }}>
          <h2 style={{ 
            color: '#fff', 
            fontSize: '3rem', 
            fontFamily: "'Poppins', sans-serif", 
            fontWeight: '700', 
            textTransform: 'uppercase',
            lineHeight: '1.2',
            marginBottom: '20px'
          }}>
            Boost Farm Efficiency with Expertise and Technology
          </h2>
          <p style={{ 
            color: '#fff', 
            fontSize: '1.1rem', 
            fontFamily: "'Poppins', sans-serif", 
            fontWeight: '400', 
            lineHeight: '1.6',
            maxWidth: '80%'
          }}>
            Find the ideal solution now with expert operators and the latest technology for a more efficient and productive farm.
          </p>
        </div>
      </Col>
      <Col lg={6}>
        <Row className="gap g-4">
          <Col sm={6}>
            <div style={{ 
              position: 'relative', 
              borderRadius: '15px', 
              overflow: 'hidden', 
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
              height: '300px'
            }}>
              <img 
                src="https://diplomatist.com/wp-content/uploads/2020/04/Precision-Farming_footer_07.15.19-1-scaled.jpg" 
                alt="precision farming" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  position: 'absolute',
                  top: 0,
                  left: 0
                }} 
              />
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                padding: '20px'
              }}>
                <h4 style={{ 
                  color: '#fff', 
                  fontSize: '1.2rem', 
                  fontWeight: '600', 
                  marginBottom: '10px' 
                }}>
                  Rent Now, Pay Later!
                </h4>
                <p style={{ 
                  color: '#fff', 
                  fontSize: '0.9rem', 
                  fontFamily: "'Poppins', sans-serif", 
                  marginBottom: '15px' 
                }}>
                  Easy application with low interest rates and any collateral.
                </p>
                <a 
                  href="#" 
                  style={{ 
                    color: '#28a745', 
                    fontWeight: '500', 
                    textDecoration: 'none', 
                    display: 'inline-flex', 
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    padding: '8px 15px',
                    borderRadius: '5px'
                  }}
                >
                  Learn More <span style={{ marginLeft: '5px' }}>→</span>
                </a>
              </div>
            </div>
          </Col>
          <Col sm={6}>
            <div style={{ 
              position: 'relative', 
              borderRadius: '15px', 
              overflow: 'hidden', 
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
              height: '300px'
            }}>
              <img 
                src="https://agssbd.org/wp-content/uploads/2021/02/Smart-farming-LetsNurture.jpg" 
                alt="smart farming" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  position: 'absolute',
                  top: 0,
                  left: 0
                }} 
              />
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                background: 'rgba(0, 0, 0, 0.5)', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                padding: '20px'
              }}>
                <h4 style={{ 
                  color: '#fff', 
                  fontSize: '1.2rem', 
                  fontWeight: '600', 
                  marginBottom: '10px' 
                }}>
                  Sell Your Commodities!
                </h4>
                <p style={{ 
                  color: '#fff', 
                  fontSize: '0.9rem', 
                  fontFamily: "'Poppins', sans-serif", 
                  marginBottom: '15px' 
                }}>
                  Discover a transparent marketplace, straight to the core!
                </p>
                <a 
                  href="#" 
                  style={{ 
                    color: '#28a745', 
                    fontWeight: '500', 
                    textDecoration: 'none', 
                    display: 'inline-flex', 
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    padding: '8px 15px',
                    borderRadius: '5px'
                  }}
                >
                  Learn More <span style={{ marginLeft: '5px' }}>→</span>
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  </NioSection.Content>
</NioSection>
      {/*  Blog Section Start   */}
      <NioSection className="nk-section-blog py-7 py-lg-120" masks={["shape-13 d-done d-md-block"]}>
        <NioSection.Head alignX="center">
          <h2>See how  <span className="text-purple-400"> HarvestFlow </span> can help you</h2>
        </NioSection.Head>
        <NioSection.Content>
        <div className="nk-banner-cover nk-frame nk-frame-three">
        <Row className="gap g-4">
            <Col sm={6} lg={4} >
            <NioCard className="h-100">
            <NioCard.Body>
              <div className="text-center">
                <div className="mb-3 mb-md-5">
                </div>
                <div className="mb-4">
                  <h4 className="text-capitalize">Accelerate Innovation</h4>
                  <p className="fs-16 line-clamp-2 fw-medium">Empower your organization with a pool of talented data science developers ready to tackle your real-world challenges. Accelerate innovation by leveraging diverse perspectives and cutting-edge solutions tailored to your industry.</p>
                </div>
              </div>
              </NioCard.Body>
              </NioCard>
            </Col>
            <Col sm={6} lg={4} >
            <NioCard className="h-100">
            <NioCard.Body>
              <div className="text-center">
                <div className="mb-3 mb-md-5">
                </div>
                <div className="mb-4">
                  <h4 className="text-capitalize">Real-World Learning Opportunities</h4>
                  <p className="fs-16 line-clamp-2 fw-medium">HarvestFlow offers a platform to engage in real-world challenges, providing practical experiences that go beyond traditional learning. Elevate your data science skills and build a robust portfolio with hands-on projectsOur calendar lets you know what is happening with customer and projects so you</p>
                </div>
              </div>
              </NioCard.Body>
              </NioCard>
            </Col>
            <Col sm={6} lg={4} >
            <NioCard className="h-100">
            <NioCard.Body>
              <div className="text-center">
                <div className="mb-3 mb-md-5">
                </div>
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
                  <div className="nk-frame-children nk-frame-children-three">
                  </div>
                </div>
        </NioSection.Content>
      </NioSection>
      {/* Banner Section End */}
      <NioSection  className="nk-section-int-tools bg-green-100 has-mask overflow-hidden" masks={["shape-4"]}>
  <div className="nk-section-head pb-md-7 nk-block-head-between align-items-lg-end flex-column flex-lg-row">
    <div className="text-center text-lg-start pb-5 pb-lg-0">
      <span className="fs-14 fw-semibold text-uppercase d-inline-block text-purple mb-2">
        Our Class
      </span>
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
        <Col md={6} xl={4}>
        <div 
    onClick={() => {
      localStorage.setItem('role', 'transporter');
      console.log('Role stored:', localStorage.getItem('role')); // Log the stored role
      navigate("/farmerform");
    }} 
    style={{ cursor: "pointer" }}
  >            <NioCard className="position-relative overflow-hidden" style={{ width: '350px', height: '500px' }}>
              <div className="card-image position-relative"style={{ height: '100%' }}>
                <img 
                  src="https://images.pexels.com/photos/27778146/pexels-photo-27778146/free-photo-of-a-train-traveling-through-the-desert-on-a-track.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Train Journey" 
                  className="card-img-top img-fit-cover h-100" 
                />
                <div className="overlay d-flex align-items-center justify-content-center">
                  <p className="text-white fw-bold m-0">Explore the beauty of desert landscapes by train.</p>
                </div>
              </div>
              <NioCard.Body />
            </NioCard>
          </div>
        </Col>

        <Col md={6} xl={4}>
        <div 
    onClick={() => {
      localStorage.setItem('role', 'distributor');
      console.log('Role stored:', localStorage.getItem('role')); // Log the stored role
      navigate("/farmerform");
    }} 
    style={{ cursor: "pointer" }}
  >            <NioCard className="position-relative overflow-hidden" style={{ width: '350px', height: '500px' }}>
              <div className="card-image position-relative" style={{ height: '100%' }}>
                <img 
                  src="https://images.pexels.com/photos/4820737/pexels-photo-4820737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="City Night" 
                  className="card-img-top" 
                />
                <div className="overlay d-flex align-items-center justify-content-center">
                  <p className="text-white fw-bold m-0">Discover the vibrant nightlife of the city.</p>
                </div>
              </div>
              <NioCard.Body />
            </NioCard>
          </div>
        </Col>

        <Col md={6} xl={4}>
        <div 
    onClick={() => {
      localStorage.setItem('role', 'farmer');
      console.log('Role stored:', localStorage.getItem('role')); // Log the stored role
      navigate("/farmerform");
    }} 
    style={{ cursor: "pointer" }}
  >            <NioCard className="position-relative overflow-hidden"style={{ width: '350px', height: '500px' }}>
              <div className="card-image position-relative" style={{ height: '100%' }}>
                <img 
                  src="https://images.pexels.com/photos/30808038/pexels-photo-30808038/free-photo-of-farmer-sorting-rice-grains-in-eastern-sri-lanka.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Agriculture" 
                  className="card-img-top" 
                />
                <div className="overlay d-flex align-items-center justify-content-center">
                  <p className="text-white fw-bold m-0">Learn about traditional rice farming in Sri Lanka.</p>
                </div>
              </div>
              <NioCard.Body />
            </NioCard>
          </div>
        </Col>
      </Row>
    </NioSection.Content>

  <style>
    {`
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 10px;
    }

    .card-image:hover .overlay {
      opacity: 1;
    }

    .card-img-top {
      transition: transform 0.3s ease-in-out;
    }

    .card-image:hover .card-img-top {
      transform: scale(1.05);
    }
    `}
  </style>
</NioSection>

      {/* Demos Section Start  */}
      
      {/* Demos Section End*/}

      {/* Pre-Built Section Start  */}
      <NioSection masks={["green-1 right center"]}>
        <NioSection.Head alignX="center">
          <span className="d-inline-block fs-16 text-uppercase text-green fw-semibold mb-2">Press &amp; Media</span>
          <h2>NioLand In The News</h2>
          <p className="fs-20">Discover the latest news and updates about NioLand, featured in top publications and media outlets.</p>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="gy-5">
            <Col lg={6}>
              <NioCard className="card-gutter-lg bg-green-300 is-theme h-100" >
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

      {/* Features Section Start  */}
      
      {/* Features Section End  */}

    </AppLayout >
  )
}

export default index;
