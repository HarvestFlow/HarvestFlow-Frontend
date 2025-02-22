import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

// layout 
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components
import { NioSection, NioMedia, NioIcon, NioCard, NioBadge, NioSubscribeField } from '../../../components';

function index() {
  return (
    <AppLayout title="Blog Post" rootClass="layout-1">

      {/*  Tech Section Start  */}
      <NioSection className="pt-120 pt-lg-160" masks={["blur-1 left top"]}>
        <Row className="justify-content-center text-center ">
          <Col lg={8}>
            <div className="nk-section-head">
              <span className="d-inline-block fs-14 text-uppercase text-primary fw-semibold mb-2" >tech</span>
              <h2 >Enhanced refresh with REST API is now generally available for the free plan</h2>
              <ul className="nk-list-meta justify-content-center pt-1" >
                <li>Feb 10, 2022</li>
                <li>8 min read</li>
              </ul>
            </div>
          </Col>
        </Row>
        <NioSection.Content>
          <Row className="justify-content-center">
            <Col lg={8} >
              <div className="nk-head-img pb-5 pb-md-7">
                <img src="images/blog/single-a.jpg" alt="blog-cover" className="overflow-hidden rounded-3 img-fluid" />
              </div>
            </Col>
          </Row>
          <div className="nk-section-blog-content">
            <Row className="gap g-5">
              <Col lg={8}>
                <div className="nk-entry">
                  <div className="mb-3 mb-md-5">
                    <h5 className="text-capitalize mb-3">Building the right tech stack is key</h5>
                    <p className="fs-16">Lorem ipsum dolor sit amet, consectetur adipiscing elit lobortis arcu enim urna adipiscing praesent velit viverra sit semper lorem eu cursus vel hendrerit elementum morbi curabitur etiam nibh justo, lorem aliquet donec sed sit mi dignissim at ante massa mattis.</p>
                    <ul className="ps-3">
                      <li>
                        <p className="fs-16">Neque sodales ut etiam sit amet nisl purus non tellus orci ac auctor</p>
                      </li>
                      <li>
                        <p className="fs-16">Adipiscing elit ut aliquam purus sit amet viverra suspendisse potent</p>
                      </li>
                      <li>
                        <p className="fs-16">Mauris commodo quis imperdiet massa tincidunt nunc pulvinar</p>
                      </li>
                      <li>
                        <p className="fs-16"> Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia </p>
                      </li>
                    </ul>
                  </div>
                  <div className="mb-3 mb-md-5">
                    <h5 className="text-capitalize mb-3">How to choose the right tech stack for your company?</h5>
                    <p className="fs-16">Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices cursus sit amet dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere praesent tristique magna sit amet purus gravida quis blandit turpis.</p>
                    <img src="images/blog/single-b.jpg" alt="blog-cover" />
                    <h5 className="text-capitalize mb-3">What to consider when choosing the right tech stack?</h5>
                    <p className="fs-16">At risus viverra adipiscing at in tellus integer feugiat nisl pretium fusce id velit ut tortor sagittis orci a scelerisque purus semper eget at lectus urna duis convallis. porta nibh venenatis cras sed felis eget neque laoreet suspendisse interdum consectetur libero nisl donec pretium vulputate sapien nec sagittis aliquam nunc lobortis mattis aliquam faucibus purus in.</p>
                    <ul className="ps-3">
                      <li>
                        <p className="fs-16">Neque sodales ut etiam sit amet nisl purus non tellus orci ac auctor</p>
                      </li>
                      <li>
                        <p className="fs-16">Adipiscing elit ut aliquam purus sit amet viverra suspendisse potent</p>
                      </li>
                      <li>
                        <p className="fs-16">Mauris commodo quis imperdiet massa tincidunt nunc pulvinar</p>
                      </li>
                      <li>
                        <p className="fs-16"> Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia </p>
                      </li>
                    </ul>
                  </div>
                  <div className="mb-3 mb-md-5">
                    <h5 className="text-capitalize mb-3">What are the most relevant factors to consider?</h5>
                    <p className="fs-16">Nisi quis eleifend quam adipiscing vitae aliquet bibendum enim facilisis gravida neque. Velit euismod in pellentesque massa placerat volutpat lacus laoreet non curabitur gravida odio aenean sed adipiscing diam donec adipiscing tristique risus. amet est placerat in egestas erat imperdiet sed euismod nisi.</p>
                  </div>
                </div>
                {/*  .nk-entry  */}
              </Col>
              <Col lg={4}>
                <div className="nk-section-blog-sidebar">
                  <NioCard className="rounded-2 ">
                    <NioCard.Body>

                      <div className="media-group pb-4 align-items-center">
                        <NioMedia size="lg" rounded img="images/avatar/a.jpg" />
                        <div className="media-text">
                          <h4 className="mb-1 mb-md-0">John Carter</h4>
                          <span className="overline-title small text-light">CEO &amp; Founder</span>
                        </div>
                      </div>
                      <p className="fs-16">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.</p>
                      <ul className="social-links pt-1 active-color">
                        <li>
                          <Link to="#">
                            <NioIcon size="md" name="facebook-circle" />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <NioIcon size="md" name="twitter" />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <NioIcon size="md" name="linkedin-round" />
                          </Link>
                        </li>
                      </ul>
                    </NioCard.Body>
                  </NioCard>
                </div>
              </Col>
            </Row>
          </div>
        </NioSection.Content>
      </NioSection>
      {/*  Tech Section End  */}

      {/*  Newsletter Section End  */}
      <NioSection className="nk-newsletter-section newsletter-content-two">
        <NioSection.Content>
          <div className="nk-newsletter-wrap bg-primary-gradient rounded-3 is-theme p-4 p-md-6">
            <Row className="g-gs align-items-center text-center text-xl-start">
              <Col xl={8}>
                <div className="media-group flex-column flex-xl-row align-items-center justify-content-center justify-content-xl-start">
                  <NioMedia rounded variant="white" icon="mail-fill" className="text-primary mb-3 mb-lg-0 me-lg-1" />
                  <div className="media-text ms-0 ms-lg-2 text-center text-xl-start">
                    <h3 className="m-0">Subscribe to our newsletter</h3>
                    <p className="fs-16">Highly curated content and updates directly to your inbox.</p>
                  </div>
                </div>
              </Col>
              <Col xl={4}>
                <form className="form-submit-init" onSubmit={e => e.preventDefault()} >
                  <div className="form-group nk-newsletter-three">
                    <div className="form-control-wrap bg-white rounded-1">
                      <input type="email" name="email" className="form-control p-3" placeholder="Enter Your Email" required="" />
                      <button type="submit" className="btn btn-primary">Subscribe</button>
                    </div>
                  </div>
                </form>
              </Col>
            </Row>
          </div>
        </NioSection.Content>
      </NioSection>

      {/*  Newsletter Section End  */}

      {/*  Blogs Section Start  */}
      <NioSection masks={["blur-1 right center"]}>
        <NioSection.Head space={false} className="pb-5">
          <h2>Related Articles</h2>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="gy-5 gy-lg-0">
            <Col md={6} lg={4} >
              <NioCard className="h-100">
                <NioCard.Body>
                  <div className="card-image">
                    <img src="images/blog/a.jpg" alt="blog-cover" className="card-img" />
                  </div>
                  <div className="card-content pt-4">
                    <NioBadge
                      rounded
                      label="Growth"
                      className="text-bg-primary-soft mb-2 mb-md-3" />
                    <h5 className="card-title">
                      <Link to="/blog-details">Why customer retention is the ultimate growth strategy?</Link>
                    </h5>

                    <div className="media-group pt-4 align-items-center">
                      <NioMedia size="sm" rounded img="images/avatar/a.jpg" />

                      <div className="media-text">
                        <span className="lead-text fw-normal">John Carter</span>
                        <ul className="nk-list-meta smaller">
                          <li>Feb 10, 2022</li>
                          <li>8 min read</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="h-100">
                <NioCard.Body>
                  <div className="card-image">
                    <img src="images/blog/b.jpg" alt="blog-cover" className="card-img" />
                  </div>
                  <div className="card-content pt-4">
                    <NioBadge
                      rounded
                      label="Growth"
                      className="text-bg-primary-soft mb-2 mb-md-3" />
                    <h5 className="card-title">
                      <Link to="/blog-details">Optimizing your advertising campaigns for higher ROAS</Link>
                    </h5>

                    <div className="media-group pt-4 align-items-center">
                      <NioMedia size="sm" rounded img="images/avatar/b.jpg" />

                      <div className="media-text">
                        <span className="lead-text fw-normal">Annette Black</span>
                        <ul className="nk-list-meta smaller">
                          <li>Feb 10, 2022</li>
                          <li>8 min read</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="h-100">
                <NioCard.Body>
                  <div className="card-image">
                    <img src="images/blog/c.jpg" alt="blog-cover" className="card-img" />
                  </div>
                  <div className="card-content pt-4">
                    <NioBadge
                      rounded
                      label="Growth"
                      className="text-bg-primary-soft mb-2 mb-md-3" />
                    <h5 className="card-title">
                      <Link to="/blog-details">How to build the ultimate tech stack for growth</Link>
                    </h5>

                    <div className="media-group pt-4 align-items-center">
                      <NioMedia size="sm" rounded img="images/avatar/c.jpg" />

                      <div className="media-text">
                        <span className="lead-text fw-normal">Ralph Edwards</span>
                        <ul className="nk-list-meta smaller">
                          <li>Feb 10, 2022</li>
                          <li>8 min read</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Blogs Section End  */}

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