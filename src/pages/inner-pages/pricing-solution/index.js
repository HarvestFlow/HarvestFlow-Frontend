import React from 'react';
import { Col, Row } from 'react-bootstrap';

// layouts 
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components 
import { NioSection, NioIcon, NioBrand, NioButton, NioSubscribeField } from '../../../components';

// section content 
import FaqContent from '../../../components/PageComponents/InnerPages/PricingSolution/FaqContent/FaqContent';

function index() {
  return (
    <AppLayout variant={7} title="Pricing" rootClass="layout-6">

      {/*  Banner Section Start   */}
      <NioSection py={false} className="nk-banner-wrap nk-banner-business-feature pb-lg-120 is-theme" masks={["shape-36"]}>
        <NioSection.Head alignX="center">
          <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-indigo text-white fw-bold py-1 px-3 mb-2" >pricing</span>
          <h2 className="text-white" > Pricing built to suit <span className="text-indigo d-inline-block d-xl-block">your needs</span>
          </h2>
        </NioSection.Head>
        <NioSection.Content className="position-relative z-1">
          <Row className="align-items-center">
            <Col xs={{ order: 2 }} md={6} xl={{ span: 4, order: 0 }} >
              <div className="card-pricing mb-5 mb-xl-0">
                <div className="card-pricing-heading">
                  <div className="icon">
                    <img src="images/icon/thundar.png" alt="icon" />
                  </div>
                  <div className="info">
                    <h3>Standard</h3>
                    <span className="text-base">For the beginners</span>
                  </div>
                </div>
                <div className="card-pricing-content">
                  <div className="price-tag"> $24 <span className="text-base">/user</span></div>
                  <ul className="card-pricing-info">
                    <li>
                      <p>20 Asset Delivery</p>
                    </li>
                    <li>
                      <p>Unlimited Bandwidth</p>
                    </li>
                    <li>
                      <p className="mute text-base">Support System</p>
                    </li>
                    <li>
                      <p className="mute text-base">120+ Message all Operator</p>
                    </li>
                  </ul>
                  <div className="card-pricing-action">
                    <NioButton href="#" className="btn-outline-indigo w-100" label="Choose Plan" icon="arrow-right after" />
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={{ order: 1 }} xl={{ span: 4, order: 0 }} >
              <div className="card-pricing border border-indigo card-pricing-lg mb-5 mb-xl-0">
                <div className="card-pricing-heading">
                  <div className="icon">
                    <img src="images/icon/crown.png" alt="icon" />
                  </div>
                  <div className="info">
                    <h3>Pro Business</h3>
                    <span className="text-base">For the professionals</span>
                  </div>
                </div>
                <div className="card-pricing-content">
                  <div className="price-tag text-indigo"> $28 <span className="text-base">/user</span></div>
                  <ul className="card-pricing-info">
                    <li>
                      <p>20 Asset Delivery</p>
                    </li>
                    <li>
                      <p>Unlimited Bandwidth</p>
                    </li>
                    <li>
                      <p>Support System</p>
                    </li>
                    <li>
                      <p className="mute text-base">120+ Message all Operator</p>
                    </li>
                  </ul>
                  <div className="card-pricing-action">
                    <NioButton href="#" className="btn-indigo w-100" label="Choose Plan" icon="arrow-right after" />
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={{ order: 3 }} md={6} xl={{ span: 4, order: 0 }} className="col-md-6 col-xl-4 order-3 order-xl-0" >
              <div className="card-pricing mb-5 mb-xl-0">
                <div className="card-pricing-heading">
                  <div className="icon">
                    <img src="images/icon/cup.png" alt="icon" />
                  </div>
                  <div className="info">
                    <h3>Standard</h3>
                    <span className="text-base">For the beginners</span>
                  </div>
                </div>
                <div className="card-pricing-content">
                  <div className="price-tag"> $35 <span className="text-base">/user</span></div>
                  <ul className="card-pricing-info">
                    <li>
                      <p>20 Asset Delivery</p>
                    </li>
                    <li>
                      <p>Unlimited Bandwidth</p>
                    </li>
                    <li>
                      <p>Support System</p>
                    </li>
                    <li>
                      <p>120+ Message all Operator</p>
                    </li>
                  </ul>
                  <div className="card-pricing-action">
                    <NioButton href="#" className="btn-outline-indigo w-100" label="Choose Plan" icon="arrow-right after" />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Banner Section End   */}

      {/*  Pricing Section Start   */}
      <NioSection className="pt-7 pt-lg-120">
        <div className="nk-pricing-wrap">
          <NioSection.Head alignX="center">
            <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-indigo text-white fw-bold py-1 px-3 mb-2">Compare plans</span>
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
                        <NioButton href="#" className="btn-outline-indigo text-nowrap" label=" Get Started" />
                      </div>
                    </th>
                    <th className="nk-compare-col active empty-col center">
                      <div className="nk-compare-content">
                        <div className="overline-title small mb-3 text-light">Growth</div>
                        <div className="amount h3 mb-4">$199</div>
                        <NioButton href="#" className="btn-indigo text-nowrap" label=" Get Started" />
                      </div>
                    </th>
                    <th className="nk-compare-col empty-col center">
                      <div className="nk-compare-content">
                        <div className="overline-title small mb-3 text-light">Enterprise</div>
                        <div className="amount h3 mb-4">$399</div>
                        <NioButton href="#" className="btn-outline-indigo text-nowrap" label=" Get Started" />
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
                        <NioIcon size="md" name="check-circle" className="text-indigo" />
                      </div>
                    </td>
                    <td className="nk-compare-col active center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle-fill" className="text-indigo" />
                      </div>
                    </td>
                    <td className="nk-compare-col center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle" className="text-indigo" />
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
                        <NioIcon size="md" name="check-circle" className="text-indigo" />
                      </div>
                    </td>
                    <td className="nk-compare-col active center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle-fill" className="text-indigo" />
                      </div>
                    </td>
                    <td className="nk-compare-col center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle" className="text-indigo" />
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
                        <NioIcon size="md" name="check-circle-fill" className="text-indigo" />
                      </div>
                    </td>
                    <td className="nk-compare-col center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle" className="text-indigo" />
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
                        <NioIcon size="md" name="check-circle" className="text-indigo" />
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
                        <NioIcon size="md" name="check-circle" className="text-indigo" />
                      </div>
                    </td>
                    <td className="nk-compare-col active center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle-fill" className="text-indigo" />
                      </div>
                    </td>
                    <td className="nk-compare-col center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle" className="text-indigo" />
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
                        <NioIcon size="md" name="check-circle-fill" className="text-indigo" />
                      </div>
                    </td>
                    <td className="nk-compare-col center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle" className="text-indigo" />
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
                        <NioIcon size="md" name="check-circle-fill" className="text-indigo" />
                      </div>
                    </td>
                    <td className="nk-compare-col center">
                      <div className="nk-compare-content">
                        <NioIcon size="md" name="check-circle" className="text-indigo" />
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
                        <NioIcon size="md" name="check-circle-fill" className="text-indigo" />
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
                        <NioIcon size="md" name="check-circle" className="text-indigo" />
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
                        <NioIcon size="md" name="check-circle" className="text-indigo" />
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
                        <NioIcon size="md" name="check-circle" className="text-indigo" />
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
                        <NioIcon size="md" name="check-circle" className="text-indigo" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </NioSection.Content>
        </div>
      </NioSection>
      {/*  Pricing Section End   */}

      {/*  faq Section Start   */}
      <NioSection>
        <NioSection.Content>
          <Row className="justify-content-between align-items-center">
            <Col lg={5} xl={4}>
              <div className="nk-section-head pb-lg-0 mt-xl-n6 text-center text-lg-start">
                <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-indigo text-white fw-bold py-1 px-3 mb-3">FAQs</span>
                <h2 className="mb-3">Frequently Asked Questions</h2>
                <p className="fs-20 mb-0 text-base">Find answers to commonly asked questions about our product or service in our comprehensive FAQ section.</p>
                <ul className="nk-btn-group flex-wrap justify-content-center justify-content-lg-start pt-5 pt-lg-6">
                  <li>
                    <NioButton href="/help-center" className="btn-indigo" label="Go To Support Center" />
                  </li>
                  <li>
                    <NioButton href="/contact-us-solution" className="btn-outline-indigo" label="Contct Us" />
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={7} xl={8}>
              <FaqContent />
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  faq Section End   */}

      {/*  CTA Section Start   */}
      <NioSection>
        <NioSection.Content>
          <div className="position-relative nk-cta-wrap bg-darker rounded-16 is-theme p-4 p-md-7 py-6 py-md-7 overflow-hidden">
            <div className="nk-mask z-1 shape-22"  ></div>
            <Row className="justify-content-center">
              <Col xl={8}>
                <div className="nk-section-head pb-0 text-center">
                  <NioBrand
                    logo="s2"
                    variant="light"
                    className="mb-5 pb-1"
                  />
                  <h2 >We are trusted by 5k+ clients. <br className="d-none d-lg-block" /> Join them to grow your business. </h2>
                  <NioButton href="/auth/sign-up" className="btn-indigo mt-5" label="Join Our Community" />
                </div>
              </Col>
            </Row>
          </div>
        </NioSection.Content>
      </NioSection>
      {/*  CTA Section End   */}

      {/*  Newsletter Section Start  */}
      <NioSection className="nk-newsletter-section pb-lg-0">
        <Row className="justify-content-center justify-content-lg-between align-items-center pb-5 border-1 border-bottom border-gray-500">
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