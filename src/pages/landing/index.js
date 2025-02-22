import React from 'react'
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

// layout
import AppLayout from '../../layouts/AppLayout/AppLayout';

// components 
import { NioCount, NioMedia,NioIcon, NioButton, NioSection, NioCard, NioSubscribeField,NioFilterTab} from '../../components';

// section content 
import PreBuiltContent from '../../components/PageComponents/Landing/PreBuiltContent/PreBuiltContent';


function index() {

  return (
    <AppLayout variant={5} title="SaaS & App Landing" rootClass="layout-1">
  <section
  className="banner-section"
  style={{
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: "#000", // Fond noir pour éviter les carreaux en arrière-plan
    backgroundImage: "url('images/capture.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}
>
  {/* Overlay pour améliorer la lisibilité */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0)", // Ajuster l'opacité si nécessaire
      zIndex: 1
    }}
  ></div>

  {/* Contenu superposé */}
  <div
    className="nk-banner nk-banner-landing overflow-hidden"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "white"
    }}
  >
    <Container>
      <Row className="justify-content-center">
        <Col lg={8}>
          <div className="pb-5 pb-lg-7 text-center">
            <h1 className="text-capitalize display-4 mb-3">
              Transformez vos idées en <span style={{ color: "#ffcc00" }}>RÉALITÉ</span>
            </h1>
            <p className="lead">
              Construisez des sites Web performants et captivants avec notre expertise.
            </p>
            <ul className="d-flex flex-wrap align-items-center justify-content-center gap-3 pt-4">
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
              <h6 className="text-center fw-normal text-light mb-5" >More than 100,000+ teams are using TektAI</h6>
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
            <span className="text-indigo">TektAI</span>  the dynamic intersection of industry challenges and data science brilliance! 
          </h2>
          <p className="fs-20 mb-0">Whether you're a forward-thinking company or a passionate data science developer, TektAI is your gateway to a world of innovation, collaboration, and recognition.</p>
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
      <section id='signup'>
      <NioSection className="nk-product-section overflow-hidden pb-7 pb-lg-120">
  <NioSection.Content>
    <div className="text-center pt-7">
      <h2 className="text-capitalize display-6 mb-4">Ready to Dive In? Join <span className="title-shape title-shape-2 text-indigo">TektAI</span> Today!</h2>
    </div>
    <Row className="gy-5">
      <Col lg={6}>
        <NioCard className="border-0 bg-purple-50">
          <NioCard.Body>
            <div className="nk-feature-block-content">
              <NioMedia size="lg" variant="purple-300 text-white" rounded icon="building-fill" className="mb-3 mb-lg-5" />
              <h4>Are You a <span className="text-purple-300">Company</span> </h4>
              <p className="fs-16 mb-4">Forge powerful collaborations with skilled developers from around the globe. Benefit from diverse perspectives and accelerate your company's growth through collaborative problem-solving.</p>
            </div>
            <NioButton href="/Company-form" className="btn-indigo mb-4" label="Create Account" />
          </NioCard.Body>
        </NioCard>
      </Col>
      <Col lg={6}>
        <NioCard className="border-0 bg-purple-50">
          <NioCard.Body>
            <div className="nk-feature-block-content">
              <NioMedia size="lg" variant="red-300 text-white" rounded icon="user-group-fill" className="text-white mb-3 mb-lg-5" />
              <h4>Are You a <span className="text-red-300">Challenger</span> </h4>
              <p className="fs-16 mb-4">Your efforts deserve to be rewarded. Receive tangible rewards for your innovative solutions and stand out in a community that values and celebrates your achievements.</p>
              <NioButton href="/ChallengerForm" className="btn-indigo mb-4" label="Create Account" />
            </div>
          </NioCard.Body>
        </NioCard>
      </Col>
    </Row>
  </NioSection.Content>
</NioSection>

      </section>
      {/*  Video Section Start   */}

      {/*  Testimonial Section Start   */}
      
      <NioSection className="nk-section-testimonial py-7 py-lg-120">
      <div className="nk-banner-cover nk-frame nk-frame-three">
      <Row className="justify-content-center">
          <Col lg={8}>
            <div className="pb-5 pb-lg-7 text-center">
              <h2><span className="text-indigo">Join our community of bright minds</span></h2>
              <p className="fs-20 mb-0">Becoming a TektAI member is more than just a registration; it's an invitation to be a part of something transformative. Join our community today, where collaboration meets innovation, and together, we redefine the boundaries of data science.</p>
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
      <NioSection className="nk-section-int-tools bg-red-50 has-mask overflow-hidden" masks={["shape-4"]}>
        <NioSection.Head alignX="center">
          <h2 className="mb-0">Keep in touch with  <span className="text-red-400">TektAI</span>
          </h2>
        </NioSection.Head>
        <h4>We Promise: One Mail Per Month, Cancel Anytime
At TektAI, we value your time and inbox space. Rest assured, our communication is all about delivering the most important updates without overwhelming you. Here's what you can expect:</h4> 
<ul>
  <li>
<NioIcon name="check-circle text-primary" className="me-1" />
<span className="fs-18 text-dark">Be the first to know about significant developments, platform enhancements, and industry insights.</span>
</li>
<li>
<NioIcon name="check-circle text-primary" className="me-1" />
<span className="fs-18 text-dark">Dive into success stories, case studies, and inspiring journeys from both companies and developers within the TektAI community.</span>
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

      {/*  Blog Section Start   */}
      <NioSection className="nk-section-blog py-7 py-lg-120" masks={["shape-13 d-done d-md-block"]}>
        <NioSection.Head alignX="center">
          <h2>See how  <span className="text-purple-400"> TektAI </span> can help you</h2>
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
                  <p className="fs-16 line-clamp-2 fw-medium">TektAI offers a platform to engage in real-world challenges, providing practical experiences that go beyond traditional learning. Elevate your data science skills and build a robust portfolio with hands-on projectsOur calendar lets you know what is happening with customer and projects so you</p>
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
                  <p className="fs-16 line-clamp-2 fw-medium">Connect with industry leaders, fellow developers, and potential employers. TektAI is not just a platform; it's a vibrant community where networking and collaboration opportunities abound.</p>
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

      {/* Demos Section Start  */}
      <NioSection className="nk-section-demos pt-7" id="demo">
        <NioSection.Head className="pb-5" space={false} alignX="center">
          <h2> Modern <span className="text-primary">Home Demos</span></h2>
          <p className="fs-20"> 10+ modern, hand-made designs to get you going. Select your favorite and begin customizing it for your website. </p>
        </NioSection.Head>
        <NioSection.Content>
          <NioFilterTab />
        </NioSection.Content>
      </NioSection>
      {/* Demos Section End*/}

      {/* Pre-Built Section Start  */}
      <NioSection>
        <NioSection.Head alignX="center">
          <h2> Pre-Built <span className="text-primary">Pages</span></h2>
          <p className="fs-20"> Don’t go by our words, check out our well-crafted demos to experience the most variety of all pages and screens you need. </p>
        </NioSection.Head>
        <NioSection.Content className="nk-prebuilt-content">
          <PreBuiltContent />
        </NioSection.Content>
      </NioSection>
      {/* Pre-Built Section End  */}

      {/* Miscell Section Start  */}
      <NioSection className="nk-section-miscell">
        <NioSection.Content className="nk-miscell-content">
          <Row className="flex-row-reverse align-items-center">
            <Col lg={6}>
              <div className="overflow-hidden rounded-4 border mb-5 mb-lg-7 mb-xl-0">
                <img src="images/landing/section-cover-miscellaneous.jpg" alt="miscellaneous" />
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-5">
                <h2>Miscellaneous <span className="text-primary">Pages</span></h2>
                <p className="fs-20">
                  In NioLand template included all the necessary pages that require in your project. Your can see demo those Pages listed below. </p>
              </div>
              <div className="nk-miscell-include">
                <h4 className="mb-4">Pages Included</h4>
                <ul>
                  <li>
                    <Link to="/404" target="_blank">
                      <NioIcon name="check-circle-fill" className="fs-20 text-primary me-1" />
                      <span className="fs-18"> 404 Error </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms-and-conditions" target="_blank">
                      <NioIcon name="check-circle-fill" className="fs-20 text-primary me-1" />
                      <span className="fs-18"> Terms & Conditions </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/auth/login" target="_blank">
                      <NioIcon name="check-circle-fill" className="fs-20 text-primary me-1" />
                      <span className="fs-18"> Login </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/auth/sign-up" target="_blank">
                      <NioIcon name="check-circle-fill" className="fs-20 text-primary me-1" />
                      <span className="fs-18"> Sign Up </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/auth/forgot-password" target="_blank">
                      <NioIcon name="check-circle-fill" className="fs-20 text-primary me-1" />
                      <span className="fs-18"> Forgot Password </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/auth/reset-password" target="_blank">
                      <NioIcon name="check-circle-fill" className="fs-20 text-primary me-1" />
                      <span className="fs-18"> Reset Password </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/* Miscell Section End  */}

      {/* Features Section Start  */}
      <NioSection className="nk-section-features" id="features" masks={["blur-7 d-none d-lg-block"]}>
        <Row className="justify-content-center">
          <Col xl={7}>
            <div className="pb-5 pb-lg-7 text-center">
              <h2>Impressive <span className="text-primary">Features</span></h2>
              <p className="fs-20">Unique business need a unique landing page with unique styles. And that's where you need to give NioLand a try.</p>
            </div>
          </Col>
        </Row>
        <NioSection.Content className="nk-section-features-content">
          <Row className="gap g-4">
            <Col xs={12}>
              <div className="features-banner shadow-xl">
                <div className="features-banner-info">
                  <NioCard className="border-0 p-0">
                    <NioCard.Body className="d-flex flex-column">
                      <NioMedia rounded size="xl" variant="primary" icon="view-panel-fill" className="mb-3 mb-md-5 rotate-90" />
                      <h3>Responsive & User-Friendly</h3>
                      <p className="fs-20">
                        Responsive and user-friendly design is pivotal in modern web development, as it guarantees adaptability to diverse devices and fosters an intuitive, enjoyable user experience across the board.
                      </p>
                    </NioCard.Body>
                  </NioCard>
                </div>
                <div className="features-banner-cover">
                  <img src="images/landing/section-cover-frame.png" alt="cover-frame" />
                </div>
              </div>
            </Col>
            <Col className="col-md-6 col-xl-7">
              <NioCard className="border-0 h-100 card-overlay p-0 shadow-xl overflow-hidden">
                <NioCard.Body className="d-flex align-items-center">
                  <div className="d-flex flex-column">
                    <NioMedia rounded size="xl" variant="purple" icon="bootstrap" className="text-white mb-3 mb-md-5" />
                    <h3>Bootstrap 5.x</h3>
                    <p className="lead">
                      Bootstrap 5.x is a versatile front-end framework for building responsive, modern web applications with ease and efficiency.
                    </p>
                  </div>
                  <div className="d-none d-lg-block">
                    <img src="images/brands/h.png" alt="brand-bootstrap" className="shrink-0" />
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} xl={5}>
              <NioCard className="border-0 h-100 p-0 shadow-xl">
                <NioCard.Body className="d-flex flex-column">
                  <NioMedia rounded size="xl" variant="danger text-white" icon="headphone-fill" className="text-white mb-3 mb-md-5" />
                  <h3>Premium Support</h3>
                  <p className="lead">We believe in happy customers can make your business happy as it's the number one job of our company.</p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} xl={4}>
              <NioCard className="border-0 h-100 p-0 shadow-xl">
                <NioCard.Body className="d-flex flex-column">
                  <NioMedia rounded size="lg" variant="primary" icon="headphone-fill" className=" text-white mb-3 mb-md-5" />
                  <h4>Quality & Clean Code</h4>
                  <p className="card-text">
                    Quality and clean code ensures efficient, error-free software development, performance, and overall user satisfaction.
                  </p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} xl={4}>
              <NioCard className="border-0 h-100 p-0 shadow-xl">
                <NioCard.Body className="d-flex flex-column">
                  <NioMedia rounded size="lg" variant="primary" icon="layout-fill" className="text-white mb-3 mb-md-5" />
                  <h4>Pre-Built Screens</h4>
                  <p className="card-text">
                    Pre-built screens are ready-made interface templates for faster application development, saving time and effort in design.
                  </p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} xl={4}>
              <NioCard className="border-0 h-100 p-0 shadow-xl">
                <NioCard.Body className="d-flex flex-column">
                  <NioMedia rounded size="lg" variant="primary" icon="layer-fill" className="text-white mb-3 mb-md-5" />
                  <h4>Limitless Components</h4>
                  <p className="card-text">
                    Limitless components offer an extensive selection of versatile building blocks, enabling limitless possibilities for creativity.
                  </p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} xl={4}>
              <NioCard className="border-0 h-100 p-0 shadow-xl">
                <NioCard.Body className="d-flex flex-column">
                  <NioMedia rounded size="lg" variant="primary" icon="repeat-fill" className="mb-3 mb-md-5" />
                  <h4>Continuous Updates</h4>
                  <p className="card-text">
                    Continuous updates provide ongoing enhancements and improvements, ensuring your software or service remains up-to-date.
                  </p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} xl={4}>
              <NioCard className="border-0 h-100 p-0 shadow-xl">
                <NioCard.Body className="d-flex flex-column">
                  <NioMedia rounded size="lg" variant="primary" icon="puzzle-fill" className="\text-white mb-3 mb-md-5" />
                  <h4>Easy Customizable</h4>
                  <p className="card-text">
                    Easy customizable features enable effortless personalization, allowing users to tailor the product to their specific preferences.
                  </p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} xl={4}>
              <NioCard className="border-0 h-100 p-0 shadow-xl">
                <NioCard.Body className="d-flex flex-column">
                  <NioMedia rounded size="lg" variant="primary" icon="b-chrome" className="text-white mb-3 mb-md-5" />
                  <h4>Browser Compatibility</h4>
                  <p className="card-text">
                    Browser compatibility ensures seamless performance and functionality across various web browsers, ensuring a consistent.
                  </p>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/* Features Section End  */}

    </AppLayout >
  )
}

export default index;
