import React from 'react';
import { Col, Row } from 'react-bootstrap';

// layouts 
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components
import { NioSection, NioBadge, NioButton, NioIcon, NioMedia, NioSubscribeField } from '../../../components';

function index() {
  return (
    <AppLayout title="Pricing" rootClass="layout-1">

      {/*  Pricing Section Start  */}
      <NioSection className="pt-120 pt-lg-160">
        <div className="nk-pricing-wrap">
          <NioSection.Head alignX="center">
            <span className="d-inline-block fs-14 text-uppercase text-primary fw-semibold mb-2" >Pricing &amp; Plans</span>
            <h2 >Choose The Perfect Plan</h2>
            <p className="fs-20 mb-0" >Discover the ideal plan that suits your needs and unlocks all the features and benefits we offer.</p>
            <ul className="nk-btn-group flex-wrap justify-content-center pt-5">
              <li>
                <NioButton href="/features" className="btn-primary" label="Explore All Features" />
              </li>
              <li>
                <NioButton href="/contact-us" className="btn-outline-primary" label="Contact Support" />
              </li>
            </ul>
          </NioSection.Head>
          <NioSection.Content>
            <Row className="gy-5">
              <Col md={6} lg={{ span: 4, order: 2 }} >
                <div className="nk-pricing nk-pricing-s3 mb-5 border p-5 h-100 active">
                  <div className="nk-pricing-head mb-3 mb-md-4">
                    <div className="nk-pricing-title-group mb-2">
                      <h4 className="title mb-0">Growth</h4>
                      <NioBadge
                        rounded
                        size="md"
                        label="Popular"
                        icon="star-fill"
                        className="text-bg-white text-primary" />
                    </div>
                    <p className="fs-18">Growth signifies progress and expansion in various aspects.</p>
                  </div>

                  <div className="nk-pricing-body">
                    <ul className="nk-list-link">
                      <li className="active">
                        <NioIcon name="check-circle-fill me-1" />
                        <span className="fs-18">Everything on Startup plan</span>
                      </li>
                      <li className="active">
                        <NioIcon name="check-circle-fill me-1" />
                        <span className="fs-18">Unlimited saved reports &amp; cohorts</span>
                      </li>
                      <li className="active">
                        <NioIcon name="check-circle-fill me-1" />
                        <span className="fs-18">Impact report with causal inference</span>
                      </li>
                      <li className="active">
                        <NioIcon name="check-circle-fill me-1" />
                        <span className="fs-18">Data modeling</span>
                      </li>
                    </ul>
                    <div className="nk-month-amount amount-wrap pt-4 mt-auto">
                      <span className="amount h3 mb-0">$199.00 USD</span>
                      <span className="amount-text opacity-75">/month</span>
                    </div>

                    <div className="pt-4">
                      <NioButton href="#" className="btn-block btn-outline-primary" label="Get Started" />
                    </div>
                  </div>

                </div>
              </Col>
              <Col md={6} lg={{ span: 4, order: 1 }} >
                <div className="nk-pricing nk-pricing-s3 mb-5 border border-lighter p-5 h-100">
                  <div className="nk-pricing-head mb-3 mb-md-4">
                    <div className="nk-pricing-title-group mb-2">
                      <h4 className="title mb-0">Startup</h4>
                    </div>
                    <p className="fs-18">Launching a new business venture or company.</p>
                  </div>

                  <div className="nk-pricing-body">
                    <ul className="nk-list-link">
                      <li className="active">
                        <NioIcon name="check-circle text-primary" className="me-1" />
                        <span className="fs-18 text-dark">Unlimited data history &amp; seats</span>
                      </li>
                      <li className="active">
                        <NioIcon name="check-circle text-primary" className="me-1" />
                        <span className="fs-18 text-dark">Core reports including Flows</span>
                      </li>
                      <li className="active">
                        <NioIcon name="check-circle text-primary" className="me-1" />
                        <span className="fs-18 text-dark">Data dictionary</span>
                      </li>
                      <li className="active">
                        <NioIcon name="check-circle text-primary" className="me-1" />
                        <span className="fs-18 text-dark">Monitoring &amp; alerts</span>
                      </li>
                    </ul>
                    <div className="nk-month-amount amount-wrap pt-4 mt-auto">
                      <span className="amount h3 mb-0">$99.00 USD</span>
                      <span className="amount-text opacity-75">/month</span>
                    </div>

                    <div className="pt-4">
                      <NioButton href="#" className="btn-block btn-outline-primary" label="Start Now" />
                    </div>
                  </div>

                </div>
              </Col>
              <Col md={6} lg={{ span: 4, order: 3 }} >
                <div className="nk-pricing nk-pricing-s3 mb-5 border border-lighter p-5 h-100">
                  <div className="nk-pricing-head mb-3 mb-md-4">
                    <div className="nk-pricing-title-group mb-2">
                      <h4 className="title mb-0">Enterprise</h4>
                    </div>
                    <p className="fs-18">
                      Enterprise denotes a large-scale organization or business entity.
                    </p>
                  </div>

                  <div className="nk-pricing-body">
                    <ul className="nk-list-link">
                      <li className="active">
                        <NioIcon name="check-circle text-primary" className="me-1" />
                        <span className="fs-18 text-dark">Everything on Growth Plan</span>
                      </li>
                      <li className="active">
                        <NioIcon name="check-circle text-primary" className="me-1" />
                        <span className="fs-18 text-dark">Advanced access controls</span>
                      </li>
                      <li className="active">
                        <NioIcon name="check-circle text-primary" className="me-1" />
                        <span className="fs-18 text-dark">Experiments &amp; Signal reports</span>
                      </li>
                      <li className="active">
                        <NioIcon name="check-circle text-primary" className="me-1" />
                        <span className="fs-18 text-dark">SSO &amp; automated provisioning</span>
                      </li>
                    </ul>
                    <div className="nk-month-amount amount-wrap pt-4 mt-auto">
                      <span className="amount h3 mb-0">$399.00 USD</span>
                      <span className="amount-tex opacity-75">/month</span>
                    </div>

                    <div className="pt-4">
                      <NioButton href="#" className="btn-block btn-outline-primary" label="Contact Sales" />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </NioSection.Content>
        </div>
      </NioSection>
      {/*  Pricing Section Start  */}

      {/*  Compare-Plans Section Start  */}
      <NioSection className="pt-7 pt-lg-120" masks={["blur-1 right bottom"]}>
        <div className="nk-pricing-wrap">
          <NioSection.Head alignX="center">
            <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-primary text-white fw-bold py-1 px-3 mb-2">Compare plans</span>
            <h2>Grow Your Early Stage Startup</h2>
            <p className="fs-20 mb-0 text-base">Unlock the full potential of your early-stage startup with our tailored solutions and expert guidance to drive growth and success.</p>
          </NioSection.Head>
          <NioSection.Content>
            <div className="nk-compare table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th className="nk-compare-col lg empty-col"></th>
                    <th className="nk-compare-col empty-col center">
                      <div className="nk-compare-content">
                        <div className="overline-title small mb-3 text-light">Startup</div>
                        <div className="amount h3 mb-4">$99</div>
                        <NioButton href="#" className="btn-outline-primary text-nowrap" label=" Get Started" />
                      </div>
                    </th>
                    <th className="nk-compare-col active empty-col center">
                      <div className="nk-compare-content">
                        <div className="overline-title small mb-3 text-light">Growth</div>
                        <div className="amount h3 mb-4">$199</div>
                        <NioButton href="#" className="btn-primary text-nowrap" label=" Get Started" />
                      </div>
                    </th>
                    <th className="nk-compare-col empty-col center">
                      <div className="nk-compare-content">
                        <div className="overline-title small mb-3 text-light">Enterprise</div>
                        <div className="amount h3 mb-4">$399</div>
                        <NioButton href="#" className="btn-outline-primary text-nowrap" label=" Get Started" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="nk-compare-col lg">
                      <div className="nk-compare-content">
                        <h4 className="title">Analytics</h4>
                      </div>
                    </td>
                    <td className="nk-compare-col"></td>
                    <td className="nk-compare-col active"></td>
                    <td className="nk-compare-col"></td>
                  </tr>
                  <tr>
                    <td className="nk-compare-col lg">
                      <div className="nk-compare-content">
                        <p className="lead">Real-time analytics</p>
                      </div>
                    </td>
                    <td className="nk-compare-col center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle" className="text-primary" />
                      </div>
                    </td>
                    <td className="nk-compare-col active center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle-fill" className="text-primary" />
                      </div>
                    </td>
                    <td className="nk-compare-col center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle" className="text-primary" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="nk-compare-col lg">
                      <div className="nk-compare-content">
                        <p className="lead">Individual user analytics</p>
                      </div>
                    </td>
                    <td className="nk-compare-col center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle" className="text-primary" />
                      </div>
                    </td>
                    <td className="nk-compare-col active center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle-fill" className="text-primary" />
                      </div>
                    </td>
                    <td className="nk-compare-col center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle" className="text-primary" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="nk-compare-col lg">
                      <div className="nk-compare-content">
                        <p className="lead">Behaviour analytics</p>
                      </div>
                    </td>
                    <td className="nk-compare-col center"></td>
                    <td className="nk-compare-col active center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle-fill" className="text-primary" />
                      </div>
                    </td>
                    <td className="nk-compare-col center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle" className="text-primary" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="nk-compare-col empty-col lg">
                      <div className="nk-compare-content">
                        <p className="lead">Data Predictions</p>
                      </div>
                    </td>
                    <td className="nk-compare-col empty-col center"></td>
                    <td className="nk-compare-col empty-col active center"></td>
                    <td className="nk-compare-col empty-col center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle" className="text-primary" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="nk-compare-col lg">
                      <div className="nk-compare-content">
                        <h4 className="title">Reporting</h4>
                      </div>
                    </td>
                    <td className="nk-compare-col"></td>
                    <td className="nk-compare-col active"></td>
                    <td className="nk-compare-col"></td>
                  </tr>
                  <tr>
                    <td className="nk-compare-col lg">
                      <div className="nk-compare-content">
                        <p className="lead">Daily reports</p>
                      </div>
                    </td>
                    <td className="nk-compare-col center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle" className="text-primary" />
                      </div>
                    </td>
                    <td className="nk-compare-col active center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle-fill" className="text-primary" />
                      </div>
                    </td>
                    <td className="nk-compare-col center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle" className="text-primary" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="nk-compare-col lg">
                      <div className="nk-compare-content">
                        <p className="lead">Weekly reports</p>
                      </div>
                    </td>
                    <td className="nk-compare-col center"></td>
                    <td className="nk-compare-col active center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle-fill" className="text-primary" />
                      </div>
                    </td>
                    <td className="nk-compare-col center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle" className="text-primary" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="nk-compare-col lg">
                      <div className="nk-compare-content">
                        <p className="lead">Monthly reports</p>
                      </div>
                    </td>
                    <td className="nk-compare-col center"></td>
                    <td className="nk-compare-col active center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle-fill" className="text-primary" />
                      </div>
                    </td>
                    <td className="nk-compare-col center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle" className="text-primary" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="nk-compare-col empty-col lg">
                      <div className="nk-compare-content">
                        <p className="lead">Custom reports</p>
                      </div>
                    </td>
                    <td className="nk-compare-col empty-col center"></td>
                    <td className="nk-compare-col empty-col active center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle-fill" className="text-primary" />
                      </div>
                    </td>
                    <td className="nk-compare-col empty-col center"></td>
                  </tr>
                  <tr>
                    <td className="nk-compare-col lg">
                      <div className="nk-compare-content">
                        <h4 className="title">Security &amp; Privacy</h4>
                      </div>
                    </td>
                    <td className="nk-compare-col"></td>
                    <td className="nk-compare-col active"></td>
                    <td className="nk-compare-col"></td>
                  </tr>
                  <tr>
                    <td className="nk-compare-col lg">
                      <div className="nk-compare-content">
                        <p className="lead">Two-Factor authentication</p>
                      </div>
                    </td>
                    <td className="nk-compare-col center"></td>
                    <td className="nk-compare-col active center"></td>
                    <td className="nk-compare-col center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle" className="text-primary" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="nk-compare-col lg">
                      <div className="nk-compare-content">
                        <p className="lead">SAML-based single sign-on SS</p>
                      </div>
                    </td>
                    <td className="nk-compare-col center"></td>
                    <td className="nk-compare-col active center"></td>
                    <td className="nk-compare-col center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle" className="text-primary" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="nk-compare-col lg">
                      <div className="nk-compare-content">
                        <p className="lead">Complience</p>
                      </div>
                    </td>
                    <td className="nk-compare-col center"></td>
                    <td className="nk-compare-col active center"></td>
                    <td className="nk-compare-col center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle" className="text-primary" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="nk-compare-col empty-col lg">
                      <div className="nk-compare-content">
                        <p className="lead">CCPA complient processing</p>
                      </div>
                    </td>
                    <td className="nk-compare-col empty-col center"></td>
                    <td className="nk-compare-col empty-col active center"></td>
                    <td className="nk-compare-col empty-col center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle" className="text-primary" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </NioSection.Content>
        </div>
      </NioSection>
      {/*  Compare-Plans Section End  */}

      {/*  CTA Section Start  */}
      <NioSection>
        <NioSection.Content>
          <div className="nk-cta-wrap bg-primary-gradient rounded-3 is-theme p-5 p-lg-7" >
            <Row className="g-gs align-items-center">
              <Col lg={8}>
                <div className="media-group flex-column flex-lg-row align-items-center ">
                  <NioMedia rounded size="lg" variant="white" icon="bar-chart-fill" className=" text-primary mb-2 mb-lg-0 me-lg-1" />
                  <div className="media-text text-center text-lg-start">
                    <h3 className="m-0">Need A Custom Plan ?</h3>
                    <p className="fs-16">We provide top notch custom solution for businesses to get started.</p>
                  </div>
                </div>
              </Col>
              <Col lg={4} className="text-center text-lg-end">
                <NioButton href="/contact-us" className="btn-white text-dark" label="Contact Support" />
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


    </AppLayout>
  )
}

export default index;