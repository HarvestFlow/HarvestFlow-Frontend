import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

// layout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components
import { NioCount, NioMedia, NioButton, NioSection, NioCard, NioSubscribeField } from '../../../components';

// section content
import TestimonialContent from '../../../components/PageComponents/Homepages/CollaborationTool/TestimonialContent/TestimonialContent';

function index() {
  return (

    <AppLayout variant={4} title="Collaboration" rootClass="layout-3">

      {/*  Banner Section Start   */}
      <section className="nk-banner nk-banner-collab">
        <div className="nk-banner-wrap position-relative bg-purple-100">
          <div className="nk-mask"></div>
          <div className="nk-banner-content">
            <Container>
              <Row className="justify-content-center">
                <Col xl={9}>
                  <div className="nk-banner-content text-center">
                    <span className="badge badge-md text-bg-dark rounded-pill text-uppercase mb-3" >Secure team management</span>
                    <div>
                      <h1 className="text-capitalize display-6 mb-2" > Transform your <span className="title-shape title-shape-2 text-indigo">teamwork</span> with a simple <span className="text-danger">collaboration</span> tool </h1>
                      <p className="fs-20 text-base" > Revolutionize teamwork with our simple collaboration tool, empowering seamless communication and boosting productivity for exceptional results. </p>
                    </div>
                    <ul className="nk-btn-group flex-wrap justify-content-center pt-5 pt-lg-7">
                      <li>
                        <NioButton href="/auth/sign-up" className="btn-indigo" label="Create Account" />
                      </li>
                      <li>
                        <NioButton href="#" className="btn-outline-indigo" label="Learn More" />
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <div className="nk-banner-grids container position-relative  px-lg-3">
          <div className="nk-banner-grids-content">
            <div className="left">
              <img src="images/collaboration-tool/grid-cover-1.jpg" alt="grid-img" className="shadow-xl rounded-4 h-400" />
              <img src="images/collaboration-tool/grid-cover-2.jpg" alt="grid-img" className="shadow-xl rounded-4 h-400" />
            </div>
            <div className="right">
              <div className="right-row right-row-one">
                <img src="images/collaboration-tool/grid-cover-3.jpg" alt="grid-img" className="shadow-xl rounded-4 h-500" />
                <img src="images/collaboration-tool/grid-cover-4.jpg" alt="grid-img" className="shadow-xl rounded-4 h-500" />
              </div>
              <div className="right-row right-row-two">
                <img src="images/collaboration-tool/grid-cover-5.jpg" alt="grid-img" className="shadow-xl rounded-4 h-88" />
              </div>
              <div className="right-row right-row-three">
                <img src="images/collaboration-tool/grid-cover-6.jpg" alt="grid-img" className="shadow-xl rounded-4 h-185" />
                <img src="images/collaboration-tool/grid-cover-7.jpg" alt="grid-img" className="shadow-xl rounded-4 h-185" />
              </div>
            </div>
          </div>
          <img src="images/collaboration-tool/grid-cover.png" className="nk-banner-grids-alter" alt="cover-grids" />
        </div>
      </section>
      {/*  Banner Section End   */}

      {/*  Brand Section Start   */}
      <NioSection className="nk-brand-section">
        <NioSection.Content>
          <Row className="justify-content-center">
            <Col lg={10} xl={8}>
              <h6 className="text-center fw-normal text-light mb-5" >More than 100,000+ teams are using NioLand</h6>
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

      {/*  Products Section Start   */}
      <NioSection className="nk-product-section overflow-hidden pb-7 pb-lg-120">
        <NioSection.Content className="d-flex flex-column gap-7 gap-xl-120">
          <Row className="align-items-center flex-row-reverse justify-content-between">
            <Col lg={6}>
              <div className="nk-feature-overview-img mb-5 mb-lg-0" >
                <img src="images/collaboration-tool/section-cover-1.png" alt="cover-bg" className="base" />
                <img src="images/collaboration-tool/section-cover-1-a.png" alt="cover-fd" className="children children-rs children-4 h-240 shadow-xl rounded-3 img-fluid animate animate-shakeY animate-duration-12 " />
              </div>
            </Col>
            <Col lg={6} xl={5}>
              <div>
                <div className="pb-5 pb-lg-7 pb-5">
                  <NioMedia size="lg" variant="indigo text-white" className="mb-5 rounded-3" icon="user-group-fill" />
                  <div>
                    <h2>Collaborate and Ship Designs Faster.</h2>
                    <p className="fs-20">Work on files together in real-time, and review and get feedback without the back and forth.</p>
                  </div>
                </div>
                <ul className="nk-timeline">
                  <li className="nk-timeline-item">
                    <div className="nk-timeline-item-inner">
                      <div className="nk-timeline-symbol text-bg-indigo text-white"></div>
                      <div className="nk-timeline-content mt-n1">
                        <p>Streamline collaboration for faster design iteration and efficient shipping, driving productivity and project success.</p>
                      </div>
                    </div>
                  </li>
                  <li className="nk-timeline-item">
                    <div className="nk-timeline-item-inner">
                      <div className="nk-timeline-symbol text-bg-indigo text-white"></div>
                      <div className="nk-timeline-content mt-n1">
                        <p>Enhance teamwork and accelerate design delivery by leveraging collaborative tools that enable seamless communication and efficient workflow.</p>
                      </div>
                    </div>
                  </li>
                  <li className="nk-timeline-item">
                    <div className="nk-timeline-item-inner">
                      <div className="nk-timeline-symbol text-bg-indigo text-white"></div>
                      <div className="nk-timeline-content mt-n1">
                        <p>Empower your team to work together effectively, ensuring quick design turnaround and timely project completion.</p>
                      </div>
                    </div>
                  </li>
                </ul>
                <ul className="nk-btn-group pt-5">
                  <li>
                    <NioButton href="/auth/sign-up" className="btn-indigo" label="Create Account" />
                  </li>
                  <li>
                    <NioButton href="#" className="btn-outline-indigo" label="Learn More" />
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-between">
            <Col lg={6}>
              <div className="nk-feature-overview-img mb-7 mb-lg-0" >
                <img src="images/collaboration-tool/section-cover-2.png" alt="cover-bg" className="base" />
                <img src="images/collaboration-tool/section-cover-2-a.png" alt="cover-fd" className="children children-rs  children-right-bottom rounded-4 h-400 animate animate-shakeY animate-duration-12 animate-delay-1 " />
              </div>
            </Col>
            <Col lg={6} xl={5}>
              <div>
                <div className="pb-5 pb-lg-7 pb-5">
                  <NioMedia size="lg" variant="danger text-white" className="mb-5 rounded-3" icon="user-group-fill" />
                  <h2>Simplify Workflows, Improve Processes.</h2>
                  <p className="fs-20">Streamline workflows and optimize processes for improved efficiency, productivity, and overall business performance.</p>
                </div>
                <ul className="nk-timeline">
                  <li className="nk-timeline-item">
                    <div className="nk-timeline-item-inner">
                      <div className="nk-timeline-symbol text-bg-danger text-white"></div>
                      <div className="nk-timeline-content mt-n1">
                        <p>Simplify workflows for increased efficiency and productivity, optimizing processes and reducing bottlenecks.</p>
                      </div>
                    </div>
                  </li>
                  <li className="nk-timeline-item">
                    <div className="nk-timeline-item-inner">
                      <div className="nk-timeline-symbol text-bg-danger text-white"></div>
                      <div className="nk-timeline-content mt-n1">
                        <p>Improve business processes by streamlining workflows, eliminating unnecessary steps, and enhancing overall operational efficiency.</p>
                      </div>
                    </div>
                  </li>
                  <li className="nk-timeline-item">
                    <div className="nk-timeline-item-inner">
                      <div className="nk-timeline-symbol text-bg-danger text-white"></div>
                      <div className="nk-timeline-content mt-n1">
                        <p>Enhance productivity and drive success by simplifying workflows, enabling smoother processes and better resource utilization</p>
                      </div>
                    </div>
                  </li>
                </ul>
                <ul className="nk-btn-group pt-5">
                  <li>
                    <NioButton href="/auth/sign-up" className="btn-danger text-white" label="Create Account" />
                  </li>
                  <li>
                    <NioButton href="#" className="btn-outline-danger" label="Learn More" />
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row className="flex-row-reverse align-items-center justify-content-between">
            <Col lg={6}>
              <div className="nk-feature-overview-img mb-5 mb-lg-0" >
                <img src="images/collaboration-tool/section-cover-3.png" alt="cover-bg" className="base" />
                <img src="images/collaboration-tool/section-cover-3-a.png" alt="cover-fd" className="children children-rs  children-left-top h-400 animate animate-shakeY animate-duration-12 animate-delay-2" />
              </div>
            </Col>
            <Col lg={6} xl={5}>
              <div>
                <div className="pb-5 pb-lg-7 pb-5">
                  <NioMedia size="lg" variant="indigo text-white" className="mb-5 rounded-3" icon="user-group-fill" />
                  <h2>Build Impactful Creatives Easily</h2>
                  <p className="fs-20">Create powerful and visually striking creatives effortlessly, even without prior design experience or expertise.</p>
                </div>
                <ul className="nk-timeline">
                  <li className="nk-timeline-item">
                    <div className="nk-timeline-item-inner">
                      <div className="nk-timeline-symbol text-bg-indigo text-white"></div>
                      <div className="nk-timeline-content mt-n1">
                        <p>Easily create impactful and visually stunning creatives, even without extensive design skills or experience.</p>
                      </div>
                    </div>
                  </li>
                  <li className="nk-timeline-item">
                    <div className="nk-timeline-item-inner">
                      <div className="nk-timeline-symbol text-bg-indigo text-white"></div>
                      <div className="nk-timeline-content mt-n1">
                        <p>Build eye-catching and impactful creatives effortlessly with user-friendly tools and intuitive design features.</p>
                      </div>
                    </div>
                  </li>
                  <li className="nk-timeline-item">
                    <div className="nk-timeline-item-inner">
                      <div className="nk-timeline-symbol text-bg-indigo text-white"></div>
                      <div className="nk-timeline-content mt-n1">
                        <p>Empower your creativity with easy-to-use tools that simplify the process of creating impactful and memorable designs.</p>
                      </div>
                    </div>
                  </li>
                </ul>
                <ul className="nk-btn-group pt-5">
                  <li>
                    <NioButton href="/auth/sign-up" className="btn-indigo" label="Create Account" />
                  </li>
                  <li>
                    <NioButton href="#" className="btn-outline-indigo" label="Learn More" />
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Products Section End   */}

      {/*  Feature Section Start   */}
      <NioSection className="nk-feature-section bg-purple-50">
        <NioSection.Head alignX="center">
          <h2>
            <span className="text-indigo">Features</span> That Get You Results
          </h2>
          <p className="fs-20 mb-0">Unlock features that deliver tangible results, driving success, growth, and achieving your desired outcomes.</p>
          <ul className="nk-btn-group justify-content-center pt-5">
            <li>
              <NioButton href="/features" className="btn-indigo" label="Explore All" />
            </li>
            <li>
              <NioButton href="#" className="btn-outline-indigo" label="Learn More" />
            </li>
          </ul>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="gy-5 gy-md-7">
            <Col sm={6} md={4} lg={3} >
              <div className="text-center">
                <NioMedia size="xl" variant="indigo-200" className="mb-5" icon="bar-chart-fill" />
                <h4>Live Collaboration</h4>
              </div>
            </Col>
            <Col sm={6} md={4} lg={3} >
              <div className="text-center">
                <NioMedia size="xl" variant="orange-100" className="mb-5" icon="layout-fill" />
                <h4>1M+ Templates</h4>
              </div>
            </Col>
            <Col sm={6} md={4} lg={3} >
              <div className="text-center">
                <NioMedia size="xl" variant="blue-200" className="mb-5" icon="folder-fill" />
                <h4>Searchable Assets</h4>
              </div>
            </Col>
            <Col sm={6} md={4} lg={3} >
              <div className="text-center">
                <NioMedia size="xl" variant="green-200" className="mb-5" icon="star-fill" />
                <h4>Unlimited Reviews</h4>
              </div>
            </Col>
            <Col sm={6} md={4} lg={3} >
              <div className="text-center">
                <NioMedia size="xl" variant="yellow-200" className="mb-5" icon="bell-fill" />
                <h4>Notifications</h4>
              </div>
            </Col>
            <Col sm={6} md={4} lg={3} >
              <div className="text-center">
                <NioMedia size="xl" variant="purple-200" className="mb-5" icon="heart-fill" />
                <h4>Responsive Design</h4>
              </div>
            </Col>
            <Col sm={6} md={4} lg={3} >
              <div className="text-center">
                <NioMedia size="xl" variant="red-200" className="mb-5" icon="layer-fill" />
                <h4>Media Support</h4>
              </div>
            </Col>
            <Col sm={6} md={4} lg={3} >
              <div className="text-center">
                <NioMedia size="xl" variant="cyan-200" className="mb-5" icon="user-group-fill" />
                <h4>Version History</h4>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Feature Section End   */}

      {/*  Video Section Start   */}
      <NioSection className="nk-section-video bg-green-300 is-theme" masks={["shape-18"]}>
        <NioSection.Content>
          <Row className="flex-row-reverse align-items-center justify-content-center justify-content-xl-between">
            <Col xl={6} >
              <div className="nk-video nk-video-s2 mb-5 mb-lg-7 mb-xl-0">
                <div className="nk-video-content bg-primary">
                  <div className="nk-video-img">
                    <img src="images/peoples/people-group-1.png" alt="video-cover" className="parallax-init" />
                  </div>
                  <div className="nk-video-btn">

                    <NioMedia
                      size="lg"
                      rounded
                      variant="white"
                      icon="play-fill text-indigo"
                      lightboxSrc="https://www.youtube.com/watch?v=pVE92TNDwUk"
                      className="shadow-xl animate animate-infinite animate-pulse animate-duration-1"
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={8} xl={5}>
              <div className="text-center text-xl-start">
                <div className="pb-5 pb-lg-7">
                  <h2 className="h1 mb-3 mb-lg-4" >We believe in the power of teams.</h2>
                  <p className="fs-18 opacity-75" > We're passionate advocates of the incredible potential that teams hold. Through collaboration, shared goals, and diverse talents, we empower teams to make a positive impact, drive innovation, and achieve extraordinary results that surpass individual capabilities. </p>
                </div>

                <div className="media-group align-items-md-center flex-column flex-xl-row justify-content-xl-start align-items-center" >
                  <NioMedia
                    rounded
                    size="xxl"
                    img="images/avatar/a.jpg"
                    className="mb-3 mb-xl-0" />

                  <div className="media-text ps-md-5 m-0">
                    <div className="fs-20 mb-3 fw-bold text-pink-100">“NioLand helps us to organize our work professionally and effectively”</div>
                    <div className="fs-14 text-indigo text-uppercase fw-semibold">Robert Mayar - Founder of Airbnb</div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Video Section Start   */}

      {/*  Testimonial Section Start   */}
      <NioSection className="nk-section-testimonial py-7 py-lg-120">
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="pb-5 pb-lg-7 text-center">
              <h2>Hear What Teams Around The World Saying <span className="text-indigo">About Nioland.</span></h2>
              <p className="fs-20 mb-0">Hear global teams' testimonials about Nioland, as they share the positive impact on collaboration, productivity, and success.</p>
              <ul className="nk-btn-group justify-content-center pt-5">
                <li>
                  <NioButton href="#" className="btn-indigo" label="Read Case Study" />
                </li>
                <li>
                  <NioButton href="/auth/sign-up" className="btn-outline-indigo" label="Create Account" />
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <NioSection.Content>
          <TestimonialContent />
        </NioSection.Content>
      </NioSection>
      {/*  Testimonial Section End   */}

      {/*  Integrate Section Start   */}
      <NioSection className="nk-section-int-tools bg-red-50 has-mask overflow-hidden" masks={["shape-4"]}>
        <NioSection.Head alignX="center">
          <h2 className="mb-0"> Nioland Integrates With All Your <span className="text-danger">Favourite Tools.</span>
          </h2>
        </NioSection.Head>
        <NioSection.Content className="position-relative z-1">
          <div className="nk-integrate-tools text-center gap g-5">
            <div>
              <img src="images/collaboration-tool/tool-1.png" alt="tool-icon" className="tool" />
              <img src="images/collaboration-tool/tool-2.png" alt="tool-icon" className="tool" />
              <img src="images/collaboration-tool/tool-3.png" alt="tool-icon" className="tool" />
              <img src="images/collaboration-tool/tool-4.png" alt="tool-icon" className="tool" />
              <img src="images/collaboration-tool/tool-5.png" alt="tool-icon" className="tool" />
            </div>
            <div>
              <img src="images/collaboration-tool/tool-6.png" alt="tool-icon" className="tool" />
              <img src="images/collaboration-tool/tool-7.png" alt="tool-icon" className="tool" />
              <img src="images/collaboration-tool/tool-8.png" alt="tool-icon" className="tool" />
              <img src="images/collaboration-tool/tool-9.png" alt="tool-icon" className="tool" />
              <img src="images/collaboration-tool/tool-10.png" alt="tool-icon" className="tool" />
              <img src="images/collaboration-tool/tool-11.png" alt="tool-icon" className="tool" />
            </div>
          </div>
          <Row className="justify-content-between align-items-center g-5 pt-5 pt-md-9">
            <Col lg={4}>
              <div className="nk-integrate-video">
                <div className="media-group align-items-center">
                  <div className="nk-video-btn nk-video-btn-s1 text-danger me-4">
                    <NioMedia
                      rounded
                      size="lg"
                      icon="play-fill"
                      variant="danger text-white"
                      lightboxSrc="https://www.youtube.com/watch?v=pVE92TNDwUk"
                      className="animate animate-infinite animate-pulse animate-duration-1"
                    />
                  </div>
                  <div className="media-text">
                    <h4 className="h4">Watch Demo</h4>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <Row className="gy-3 gy-sm-0">
                <Col xs={6} sm={4}>
                  <div className="nk-funfact-item">
                    <NioCount className="d-inline-block h2 mb-2 mb-md-3" end={500} suffix="k+" />
                    <div className="h5 fw-normal text-nowrap">Active Users</div>
                  </div>
                </Col>
                <Col xs={6} sm={4}>
                  <div className="nk-funfact-item">
                    <NioCount className="d-inline-block h2 mb-2 mb-md-3" end={100} suffix="k+" />
                    <div className="h5 fw-normal text-nowrap">Active Teams</div>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="nk-funfact-item">
                    <NioCount className="d-inline-block h2 mb-2 mb-md-3" end={20} suffix="k+" />
                    <div className="h5 fw-normal text-nowrap">Positive Reviews</div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Integrate Section End  */}

      {/*  Blog Section Start   */}
      <NioSection className="nk-section-blog py-7 py-lg-120">
        <NioSection.Head alignX="center">
          <h2>Read Latest <span className="text-indigo">Articles Of NioLand</span></h2>
          <p className="fs-20 mb-0">Maecenas quis integer aenean nisl viverra morbi magna amet viverra sollicitudin posuere scelerisque urna, urna fringilla. </p>
          <NioButton href="/blogs" className="btn-indigo mt-5" label="Browse All Articles" />
        </NioSection.Head>
        <NioSection.Content>
          <Row className="gy-5 gy-xl-0 ">
            <Col md={6} xl={4} >
              <NioCard className="h-100 has-shadow">
                <NioCard.Body>
                  <div className="card-image">
                    <img src="images/blog/blog-6.jpg" alt="blog-cover" className="card-img" />
                  </div>
                  <div className="card-content pt-5">
                    <ul className="pb-3">
                      <li>
                        <Link to="/blog-details" className="badge text-bg-danger-soft text-base text-uppercase fw-semibold">Resources</Link>
                      </li>
                    </ul>
                    <h5 className="card-title">
                      <Link to="/blog-details">Color Schemes of 24 Most Visited Websites (2020)</Link>
                    </h5>
                    <div className="card-divider"></div>
                    <ul className="nk-list-meta">
                      <li>Feb 10, 2022</li>
                      <li>8 min read</li>
                    </ul>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} xl={4} >
              <NioCard className="h-100 has-shadow">
                <NioCard.Body>
                  <div className="card-image">
                    <img src="images/blog/blog-5.jpg" alt="blog-cover" className="card-img" />
                  </div>
                  <div className="card-content pt-5">
                    <ul className="pb-3">
                      <li>
                        <Link to="/blog-details" className="badge text-bg-cyan-soft text-base text-uppercase fw-semibold">TIPS &amp; Tricks</Link>
                      </li>
                    </ul>
                    <h5 className="card-title">
                      <Link to="/blog-details">How to Increase Productivity With Evernote iOS Widgets</Link>
                    </h5>
                    <div className="card-divider"></div>
                    <ul className="nk-list-meta">
                      <li>Feb 10, 2022</li>
                      <li>8 min read</li>
                    </ul>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} xl={4} >
              <NioCard className="h-100 has-shadow">
                <NioCard.Body>
                  <div className="card-image">
                    <img src="images/blog/blog-4.jpg" alt="blog-cover" className="card-img" />
                  </div>
                  <div className="card-content pt-5">
                    <ul className="pb-3">
                      <li>
                        <Link to="/blog-details" className="badge text-bg-purple-soft text-base text-uppercase fw-semibold">Knowledge</Link>
                      </li>
                    </ul>
                    <h5 className="card-title">
                      <Link to="/blog-details">Home at Work, Not Just ‘Work From Home’</Link>
                    </h5>
                    <div className="card-divider"></div>
                    <ul className="nk-list-meta">
                      <li>Feb 10, 2022</li>
                      <li>8 min read</li>
                    </ul>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Blog Section End  */}


      {/*  CTA Section Start   */}
      <section className="position-relative py-7 py-lg-120 overflow-hidden bg-indigo is-theme">
        <div className="bg-masks bg-masks-1 d-none d-lg-block">
          <img src="images/collaboration-tool/object-2-a.png" alt="bg-mask" />
        </div>
        <div className="bg-masks bg-masks-2 d-none d-lg-block">
          <img src="images/collaboration-tool/object-2-b.png" alt="bg-mask" />
        </div>
        <div className="nk-mask shape-5"></div>
        <Container>
          <div className="nk-cta-wrap">
            <Row className="justify-content-center">
              <Col lg={8} xl={6}>
                <div className="pb-5 pb-lg-7 pb-0 text-center">
                  <h2 className="mb-0" >Not convinced you’re the one? We love to take a challenge.</h2>
                  <ul className="nk-btn-group flex-wrap justify-content-center pt-5">
                    <li>
                      <NioButton href="#" className="btn-white text-dark text-indigo" label="Start Your Free Trial" />
                    </li>
                    <li>
                      <NioButton href="/auth/login" className="btn-outline-white" label="Login to Your Account" />
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
      {/*  CTA Section End  */}


      {/*  NewsLetter Section Start   */}
      <NioSection className="nk-section nk-newsletter-section pb-0 pt-7 pt-lg-120">
        <Row className="justify-content-center justify-content-lg-between align-items-center pb-5 border-bottom border-lighter">
          <Col lg={6} xl={4}>
            <div className="nk-newsletter-content text-center text-lg-start pb-5 pb-lg-0">
              <h4 className="text-capitalize">Subscribe to our newsletter</h4>
              <p className="fs-16">Join the 5000+ People That Uses Softnio Products.</p>
            </div>
          </Col>
          <Col md={10} lg={6} xl={4}>
            <NioSubscribeField variant="three" />
          </Col>
        </Row>
      </NioSection>
      {/*  NewsLetter Section End   */}

    </AppLayout >
  )
}

export default index;