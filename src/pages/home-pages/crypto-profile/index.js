import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

// AppLayout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components 
import { NioButton, NioCount, NioMedia, NioIcon, NioSection, NioCard, NioSubscribeField } from '../../../components';


function index() {

  return (
    <AppLayout variant={10} title="Crypto" rootClass="layout-9">
      {/*  Banner Section Start   */}
      <section className="nk-banner nk-banner-crypto overflow-hidden is-theme">
        <div className="nk-banner-wrap">
          <Container>
            <Row>
              <Col lg={8} xl={6}>
                <div className="nk-section-head text-center text-lg-start">
                  <span className="d-inline-block fs-16 text-uppercase text-purple fw-bold mb-3" >Crypto DeFi App</span>
                  <div>
                    <h1 className="display-6 text-uppercase mb-3" >Buy and Trade cryptos like never before<span className="text-purple">.</span>
                    </h1>
                    <p className="fs-20 opacity-75" > Buy and Trade cryptos likAdipiscing ac at eu dignissim non tincidunt aliquam suscipit adipiscing et sed eu suspendisse sed sit phasellus non. </p>
                  </div>
                  <ul className="nk-btn-group justify-content-center justify-content-lg-start pt-5 pt-lg-7">
                    <li>
                      <NioButton href="#" className="btn-purple border-0 rounded-0" label="Get Started" />
                    </li>
                    <li>
                      <NioButton
                        href="#"
                        label="Learn More"
                        icon="arrow-right after"
                        className="btn-outline-white border-0 rounded-0"
                      />
                    </li>
                  </ul>
                  <div className="pt-5 pt-lg-7">
                    <div className="mb-5 fs-18" > More Than 100,000+ Teams are using Nioland </div>
                    <Row className="justify-content-center justify-content-lg-start gap g-4">
                      {
                        ["b", "c", "d", "a", "e"].map((brand, idx) => (
                          <Col key={idx} xs={4} sm={3} md={2} >
                            <div className="nk-brand">
                              <Link to="#">
                                <img src={`images/brands/${brand}-light.png`} alt="brand" />
                              </Link>
                            </div>
                          </Col>
                        ))
                      }
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          <div className="nk-frame d-none d-lg-block">
            <img src="images/crypto/banner-cover.png" alt="crypto-profile" />
          </div>
        </div>
      </section>
      {/*  Banner Section End   */}

      {/*  Features Section Start   */}
      <NioSection className="is-theme" masks={["blur-9 d-none d-lg-block"]}>
        <NioSection.Head alignX="center">
          <span className="d-inline-block fs-14 text-uppercase text-purple fw-semibold mb-2">Features</span>
          <h2 className="text-uppercase">Simple features to buy, trade and invest in crypto</h2>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="gy-5">
            <Col xs={12} >
              <div className="nk-card bg-dark-alt">
                <Row className="justify-content-lg-between align-items-lg-end">
                  <Col lg={7}>
                    <div className="nk-card-info p-5 p-md-7 p-xl-120 text-center text-lg-start">
                      <div>
                        <h2 className="text-uppercase">Buy 100+ crypto assets fast and secure</h2>
                        <p className="fs-20 text-gray-600 mb-0"> Buy and secure over 100+ cryptocurrencies quickly and securely with our trusted platform. Expand your digital asset portfolio today. </p>
                      </div>
                      <div className="pt-5 pt-lg-7">
                        <NioButton href="#" className="btn-purple border-0 rounded-0" label="Get Started" />
                      </div>
                    </div>
                  </Col>
                  <Col lg={5} >
                    <div className="nk-card-img text-center text-lg-start pe-lg-5 pe-xxl-0 ">
                      <img src="images/crypto/section-cover-3.png" alt="cover" />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg={4} md={6} >
              <NioCard className="bg-dark-alt border-0 rounded-0">
                <NioCard.Body>
                  <div className="card-icon mb-5">
                    <NioIcon name="shield-half" className="fs-60 text-purple" />
                  </div>
                  <div className="card-info">
                    <h5 className="text-uppercase line-clamp-2">Secure & encrypted crypto wallet</h5>
                    <p className="fs-16 text-gray-600 line-clamp-2"> Safely store and protect your cryptocurrencies with our secure and encrypted crypto wallet, ensuring the highest level of security for your digital assets. </p>
                    <NioButton
                      icon="arrow-right after fs-18"
                      label="Learn More"
                      className="btn-link fw-semibold text-purple mt-5" />
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col lg={4} md={6} >
              <NioCard className="bg-dark-alt border-0 rounded-0">
                <NioCard.Body>
                  <div className="card-icon mb-5">
                    <NioIcon name="exchange" className="fs-60 text-purple" />
                  </div>
                  <div className="card-info">
                    <h5 className="text-uppercase line-clamp-2">Send & receive crypto tokens easily</h5>
                    <p className="fs-16 text-gray-600 line-clamp-2"> Effortlessly send and receive crypto tokens with ease, simplifying transactions and ensuring seamless transfers across the blockchain network. </p>
                    <NioButton
                      icon="arrow-right after fs-18"
                      label="Learn More"
                      className="btn-link fw-semibold text-purple mt-5" />
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col lg={4} md={6} >
              <NioCard className="bg-dark-alt border-0 rounded-0">
                <NioCard.Body>
                  <div className="card-icon mb-5">
                    <NioIcon name="growth-fill" className="fs-60 text-purple" />
                  </div>
                  <div className="card-info">
                    <h5 className="text-uppercase line-clamp-2">Watch and analyze charts in real-time.</h5>
                    <p className="fs-16 text-gray-600 line-clamp-2"> Monitor and analyze real-time charts to stay informed and make data-driven decisions with our powerful charting tools. </p>
                    <NioButton
                      icon="arrow-right after fs-18"
                      label="Learn More"
                      className="btn-link fw-semibold text-purple mt-5" />
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col xs={12}>
              <div className="text-center pt-5">
                <NioButton
                  href="/features"
                  className="btn-purple border-0 rounded-0"
                  label="Explore All Features"
                />
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Features Section End   */}

      {/*  Earning Section Start   */}
      <NioSection className="nk-section-earning is-theme" masks={["blur-10"]}>
        <Row className="justify-content-center">
          <Col lg={7}>
            <div className="nk-section-head text-center">
              <span className="d-inline-block fs-14 text-uppercase text-purple fw-semibold mb-2">Start earning</span>
              <h2 className="text-uppercase">Earn up to $7M worth of crypto</h2>
              <p className="fs-20 text-gray-600 mb-0">Buy and Trade cryptos likAdipiscing ac at eu dignissim non tincidunt aliquam suscipit adipiscing et sed eu suspendisse sed sit phasellus non. </p>
            </div>
          </Col>
        </Row>
        <NioSection.Content>
          <div className="table-responsive">
            <table className="table nk-table-crypto bg-dark-alt">
              <thead>
                <tr>
                  <td className="p-5 fw-bold text-nowrap text-white">Name</td>
                  <td className="p-5 fw-bold text-nowrap text-white text-end">Price</td>
                  <td className="p-5 fw-bold text-nowrap text-white text-end">Market Cap</td>
                  <td className="p-5 fw-bold text-nowrap text-white text-end">Market Volume</td>
                  <td className="p-5 fw-bold text-nowrap text-white text-end">Change</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-5">
                    <div className="media-group media-group-overlap flex-grow-0 me-2">
                      <NioMedia
                        size="sm"
                        rounded
                        img="images/icon/bitcoin.png"

                      />
                      <div className="media-text d-flex align-items-center ms-5">
                        <span className="fs-20 lead-text text-uppercase text-nowrap text-white">BitCoin</span>
                        <span className="badge badge-sm text-purple bg-dark-blue-gray px-3 ms-3 fs-14">BTC</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <h5 className="fw-normal text-end">$21,027.86</h5>
                  </td>
                  <td className="p-5">
                    <h5 className="fw-normal text-end">$401.1B</h5>
                  </td>
                  <td className="p-5">
                    <h5 className="fw-normal text-end">$22.4B</h5>
                  </td>
                  <td className="p-5">
                    <h5 className="d-flex align-items-center justify-content-end fw-normal text-end">
                      <em className="icon ni ni-arrow-down-right text-danger me-3"></em> 1.28%
                    </h5>
                  </td>
                </tr>
                <tr>
                  <td className="p-5">
                    <div className="media-group media-group-overlap flex-grow-0 me-2">
                      <NioMedia
                        size="sm"
                        rounded
                        img="images/icon/etherum.png"

                      />
                      <div className="media-text d-flex align-items-center ms-5">
                        <span className="fs-20 lead-text text-uppercase text-nowrap text-white">Ethereum</span>
                        <span className="badge badge-sm text-purple bg-dark-blue-gray px-3 ms-3 fs-14">ETH</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <h5 className="fw-normal text-end">$1,227.52</h5>
                  </td>
                  <td className="p-5">
                    <h5 className="fw-normal text-end">$148.7B</h5>
                  </td>
                  <td className="p-5">
                    <h5 className="fw-normal text-end">$13.7B</h5>
                  </td>
                  <td className="p-5">
                    <h5 className="d-flex align-items-center justify-content-end fw-normal text-end">
                      <em className="icon ni ni-arrow-up-right text-success me-3"></em> 7.78%
                    </h5>
                  </td>
                </tr>
                <tr>
                  <td className="p-5">
                    <div className="media-group media-group-overlap flex-grow-0 me-2">
                      <NioMedia
                        size="sm"
                        rounded
                        img="images/icon/tether.png"

                      />
                      <div className="media-text d-flex align-items-center ms-5">
                        <span className="fs-20 lead-text text-uppercase text-nowrap text-white">tether</span>
                        <span className="badge badge-sm text-purple bg-dark-blue-gray px-3 ms-3 fs-14">USDT</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <h5 className="fw-normal text-end">$1.00</h5>
                  </td>
                  <td className="p-5">
                    <h5 className="fw-normal text-end">$66.8B</h5>
                  </td>
                  <td className="p-5">
                    <h5 className="fw-normal text-end">$66.8B</h5>
                  </td>
                  <td className="p-5">
                    <h5 className="d-flex align-items-center justify-content-end fw-normal text-end">
                      <em className="icon ni ni-arrow-down-right text-danger me-3"></em> 0.03%
                    </h5>
                  </td>
                </tr>
                <tr>
                  <td className="p-5">
                    <div className="media-group media-group-overlap flex-grow-0 me-2">
                      <NioMedia
                        size="sm"
                        rounded
                        img="images/icon/usd.png"

                      />
                      <div className="media-text d-flex align-items-center ms-5">
                        <span className="fs-20 lead-text text-uppercase text-nowrap text-white">USD Coin</span>
                        <span className="badge badge-sm text-purple bg-dark-blue-gray px-3 ms-3 fs-14">USDC</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <h5 className="fw-normal text-end">$1.00</h5>
                  </td>
                  <td className="p-5">
                    <h5 className="fw-normal text-end">$55.8B</h5>
                  </td>
                  <td className="p-5">
                    <h5 className="fw-normal text-end">$4.2B</h5>
                  </td>
                  <td className="p-5">
                    <h5 className="d-flex align-items-center justify-content-end fw-normal text-end">
                      <em className="icon ni ni-arrow-down-right text-danger me-3"></em> 0.02%
                    </h5>
                  </td>
                </tr>
                <tr>
                  <td className="p-5">
                    <div className="media-group media-group-overlap flex-grow-0 me-2">
                      <NioMedia
                        size="sm"
                        rounded
                        img="images/icon/bnb.png"

                      />
                      <div className="media-text d-flex align-items-center ms-5">
                        <span className="fs-20 lead-text text-uppercase text-nowrap text-white">bnb</span>
                        <span className="badge badge-sm text-purple bg-dark-blue-gray px-3 ms-3 fs-14">BNB</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <h5 className="fw-normal text-end">$224.37</h5>
                  </td>
                  <td className="p-5">
                    <h5 className="fw-normal text-end">$36.5B</h5>
                  </td>
                  <td className="p-5">
                    <h5 className="fw-normal text-end">$1.2B</h5>
                  </td>
                  <td className="p-5">
                    <h5 className="d-flex align-items-center justify-content-end fw-normal text-end">
                      <em className="icon ni ni-arrow-down-right text-danger me-3"></em> 0.1%
                    </h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Row>
            <Col xs={12}>
              <div className="text-center pt-5">
                <NioButton href="/features" label="Start Earning" className="btn-purple border-0 rounded-0" />
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Earning Section End   */}

      {/*  Design Section Start   */}
      <NioSection className="nk-section-design is-theme" masks={["blur-9 d-none d-lg-block"]}>
        <NioSection.Content>
          <Row className="gy-5">
            <Col lg={6}>
              <div className="nk-section-head">
                <span className="d-inline-block fs-14 text-uppercase text-purple fw-semibold mb-2">Secure Design</span>
                <h2 className="text-uppercase">Bullet proof security by design</h2>
                <p className="fs-18 mb-0 text-gray-600" >Buy and Trade cryptos likdipiscing ac at eu dignissim non tincidunt aliquam suscipit adipiscing et sed eu suspendisse sed sit phasellus non.</p>
                <ul className="nk-list-link pt-5">
                  <li className="align-items-center" >
                    <NioIcon name="check-circle" className="me-1 text-white" />
                    <span className="text-white fw-bold">Lowest fees in market</span>
                  </li>
                  <li className="align-items-center" >
                    <NioIcon name="check-circle" className="me-1 text-white" />
                    <span className="text-white fw-bold">Fast and secure transactions</span>
                  </li>
                  <li className="align-items-center" >
                    <NioIcon name="check-circle" className="me-1 text-white" />
                    <span className="text-white fw-bold">256-Bit secure encryption</span>
                  </li>
                </ul>
                <div className="d-flex flex-wrap align-items-center pt-5 pt-lg-6">
                  <div className="media-group media-group-overlap flex-grow-0 me-2">
                    {
                      ["a", "b", "c"].map((avatar, idx) => (
                        <NioMedia key={idx} size="sm" rounded img={`/images/avatar/${avatar}.jpg`}
                        />
                      ))
                    }
                  </div>
                  <p className="text-gray-600 fw-semibold fs-14" > TRUSTED BY <span className="text-white fs-18 fw-bold d-block">+ 150,000 users</span>
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={6} >
              <NioCard className="h-100 bg-dark-alt border-0 rounded-0">
                <NioCard.Body className="d-flex flex-column justify-content-center p-lg-7">
                  <div className="card-icon mb-5">
                    <img src="images/crypto/0.png" alt="cover" />
                  </div>
                  <div className="card-info">
                    <h4 className="text-uppercase">Security incidents</h4>
                    <p className="fs-20 text-gray-600 mb-0"> Stay informed about security incidents and take necessary precautions to protect your data and privacy with our robust security measures. </p>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col lg={4} md={6} >
              <NioCard className="bg-dark-alt border-0 rounded-0">
                <NioCard.Body>
                  <div className="card-counter mb-5">
                    <div className="h1">
                      <NioCount end={256} />
                      <span className="text-purple"> .</span>
                    </div>
                  </div>
                  <div className="card-info">
                    <h5 className="text-uppercase">AES encryption</h5>
                    <p className="fs-16 line-clamp-2 text-gray-600"> Protect your sensitive data with AES encryption, ensuring advanced security and confidentiality for your information. </p>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col lg={4} md={6} >
              <NioCard className="bg-dark-alt border-0 rounded-0">
                <NioCard.Body>
                  <div className="card-counter mb-5">
                    <div className="h1">
                      <NioCount end={100} />
                      <span className="text-purple"> %</span></div>
                  </div>
                  <div className="card-info">
                    <h5 className="text-uppercase">Encrypted data</h5>
                    <p className="fs-16 line-clamp-2 text-gray-600"> Ensure the privacy and security of your data with our advanced encryption techniques, keeping your information confidential and protected. </p>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col lg={4} md={6} >
              <NioCard className="bg-dark-alt border-0 rounded-0">
                <NioCard.Body>
                  <div className="card-counter mb-5">
                    <div className="h1">CISA <span className="text-purple">+</span></div>
                  </div>
                  <div className="card-info">
                    <h5 className="text-uppercase">AES encryption</h5>
                    <p className="fs-16 line-clamp-2 text-gray-600"> Ensuring the Highest Level of Data Protection and Compliance with Stringent Security Standards. </p>
                  </div>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Design Section End   */}

      {/*  Works Section Start   */}
      <NioSection className="nk-section-work is-theme" masks={["blur-10 d-none d-lg-block"]}>
        <Row className="justify-content-center">
          <Col lg={8} xl={5}>
            <div className="nk-section-head text-center">
              <span className="d-inline-block fs-14 text-uppercase text-purple fw-semibold mb-2">How It Works?</span>
              <div>
                <h2 className="text-uppercase"> how easy it is to use crypto wallet </h2>
                <p className="fs-20 text-gray-600 mb-0"> Buy and Trade cryptos likAdipiscing ac at eu dignissim non tincidunt aliquam suscipit adipiscing et sed eu suspendisse sed sit phasellus. </p>
              </div>
            </div>
          </Col>
        </Row>
        <NioSection.Content>
          <Row className="justify-content-center">
            <Col xs={12} >
              <div className="nk-video nk-video-s1">
                <div className="nk-video-inner">
                  <div className="nk-video-content">
                    <div className="nk-video-img text-center">
                      <img src="images/crypto/section-cover-1.png" alt="cover" />
                    </div>
                    <div className="nk-video-btn">
                      <NioMedia
                        size="lg"
                        rounded
                        icon="play-fill"
                        lightboxSrc="https://www.youtube.com/watch?v=pVE92TNDwUk"
                        className="text-bg-white shadow-xl animate animate-infinite animate-pulse animate-duration-1"

                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12}>
              <ul className="nk-btn-group align-items-center justify-content-center pt-5 pt-lg-7">
                <li>
                  <NioButton href="#" className="btn-purple border-0 rounded-0" label="Get Started" />
                </li>
                <li>
                  <NioButton
                    href="#"
                    label="Learn More"
                    icon="arrow-right after"
                    className="text-white"
                  />
                </li>
              </ul>
            </Col>
          </Row>
        </NioSection.Content>

      </NioSection>
      {/*  Works Section End   */}

      {/*  Testimonials Section Start   */}
      <NioSection className="nk-section-testimonials overflow-hidden is-theme" masks={["blur-9 d-none d-lg-block"]}>
        <NioSection.Content>
          <Row className="gy-5 gy-lg-7">
            <Col lg={6}>
              <div className="nk-section-head pb-7 pe-lg-5">
                <span className="d-inline-block fs-14 text-uppercase text-purple fw-semibold mb-2">testimonials</span>
                <h2 className="text-uppercase">What our clients say about us.</h2>
                <p className="fs-20 text-gray-600 mb-0"> Buy and Trade cryptos likAdipiscing ac at eu dignissim non tincidunt aliquam suscipit adipiscing et sed eu suspendisse sed sit phasellus non. Id sit congue tellus at venenatis id est e never before. </p>
              </div>
              <NioCard className="bg-dark-alt border-0 rounded-0" >
                <NioCard.Body className="p-lg-7">
                  <div className="card-icon mb-4">
                    <NioIcon name="quote-left" className="fs-80 ms-n2 text-purple" />
                  </div>
                  <div className="card-info">
                    <h4 className="text-uppercase">The Best crypto App</h4>
                    <p className="fs-16 text-gray-600"> Experience the Best-in-Class Platform for Buying, Selling, and Managing Your Digital Assets. Enjoy Advanced Security Measures, Real-Time Market Data, and a User-Friendly Interface, Allowing You to Seamlessly Navigate the Exciting World of Cryptocurrencies and Take Control of Your Financial Future. </p>
                    <div className="d-flex align-items-center pt-5 pt-lg-7">
                      <NioMedia size="md" rounded img="images/avatar/c.jpg" className="me-3" />
                      <div>
                        <h5 className="m-0 text-uppercase fw-bold">Arlene McCoy</h5>
                        <span className="fs-14 text-gray-600">@cryptomil</span>
                      </div>
                    </div>
                  </div>
                </NioCard.Body>
              </NioCard>
              <div className="d-none d-lg-block">
                <ul className="nk-btn-group align-items-center pt-5 pt-lg-7">
                  <li>
                    <NioButton href="#" className="btn-purple border-0 rounded-0" label="Get Started" />
                  </li>
                  <li>
                    <NioButton
                      href="#"
                      label="Learn More"
                      icon="arrow-right after"
                      className="text-white"
                    />
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={6} className="ps-lg-6">
              <div className="d-flex flex-column gap-5 gap-lg-7">
                <NioCard className="bg-dark-alt border-0 rounded-0" >
                  <NioCard.Body className="p-lg-7">
                    <div className="card-icon mb-4">
                      <NioIcon name="quote-left" className="fs-80 ms-n2 text-purple" />
                    </div>
                    <div className="card-info">
                      <h4 className="text-uppercase">Amazing trading experience</h4>
                      <p className="fs-16 text-gray-600"> Seamlessly Execute Trades, Access Real-Time Market Data, and Utilize Advanced Tools to Maximize Your Potential in the Dynamic World of Trading. </p>
                      <div className="d-flex align-items-center pt-5 pt-lg-7">
                        <NioMedia size="md" rounded img="images/avatar/a.jpg" className="me-3" />
                        <div>
                          <h5 className="m-0 text-uppercase fw-bold">Ralph Edwards</h5>
                          <span className="fs-14 text-gray-600">@ralphedward</span>
                        </div>
                      </div>
                    </div>
                  </NioCard.Body>
                </NioCard>
                <NioCard className="bg-dark-alt border-0 rounded-0" >
                  <NioCard.Body className="p-lg-7">
                    <div className="card-icon mb-4">
                      <NioIcon name="quote-left" className="fs-80 ms-n2 text-purple" />
                    </div>
                    <div className="card-info">
                      <h4 className="text-uppercase">Best platform to invest crypto</h4>
                      <p className="fs-16 text-gray-600"> Seamlessly Navigate the Crypto Market, Access a Wide Range of Digital Assets, and Leverage Advanced Tools to Optimize Your Investment Strategy. Take Your Crypto Investments to the Next Level. </p>
                      <div className="d-flex align-items-center pt-5 pt-lg-7">
                        <NioMedia size="md" rounded img="images/avatar/b.jpg" className="me-3" />
                        <div>
                          <h5 className="m-0 text-uppercase fw-bold">Esther Howard</h5>
                          <span className="fs-14 text-gray-600">@eshterhoward</span>
                        </div>
                      </div>
                    </div>
                  </NioCard.Body>
                </NioCard>
              </div>
            </Col>
            <Col className="col-12 d-block d-lg-none">
              <ul className="nk-btn-group align-items-center pt-5">
                <li>
                  <NioButton href="#" className="btn-purple border-0 rounded-0" label="Get Started" />
                </li>
                <li>
                  <NioButton
                    href="#"
                    label="Learn More"
                    icon="arrow-right after"
                    className="text-white"
                  />
                </li>
              </ul>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Testimonials Section End   */}

      {/*  Blog Section Start   */}
      <NioSection className="nk-section-blogs is-theme" masks={["blur-10 d-none d-lg-block"]}>
        <NioSection.Content>
          <Row className="justify-content-between align-items-end pb-5 pb-lg-7">
            <Col lg={5}>
              <div className="nk-section-head pb-0">
                <span className="d-inline-block fs-14 text-uppercase text-purple fw-semibold mb-2">Our Blogs</span>
                <h2 className="text-uppercase"> Our Latest News And Resources </h2>
              </div>
            </Col>
            <Col lg={7}>
              <div className="text-lg-end pt-5 pt-lg-0">
                <NioButton href="#" label="Browse All Articles" className="btn-purple border-0 rounded-0" />
              </div>
            </Col>
          </Row>
          <Row className="gy-5 gy-lg-0">
            <Col lg={4} md={6} >
              <div className="nk-blog-card">
                <Link to="#" className="nk-blog-card-cover card-overlay-bg-1 bg-dark-alt d-inline-block w-100">
                  <img src="images/crypto/blog-cover-3.png" alt="blog-cover" className="w-100" />
                </Link>
                <div className="nk-blog-card-info">
                  <div className="d-flex align-items-center justify-content-between pt-5 pb-3">
                    <Link to="#" className="text-uppercase text-purple fs-14 fw-medium">Resources</Link>
                    <span className="text-uppercase fs-14 fw-medium">3 days ago</span>
                  </div>
                  <h5 className="text-uppercase line-clamp-2">6 great crypto wallets you should try</h5>
                  <div className="pt-4">
                    <NioButton
                      icon="arrow-right after ms-2"
                      label="Learn More"
                      className="btn-link align-items-center text-purple fs-16 fw-bold"
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6} >
              <div className="nk-blog-card">
                <Link to="#" className="nk-blog-card-cover card-overlay-bg-2 bg-dark-alt d-inline-block position-relative w-100">
                  <img src="images/crypto/blog-cover-1.png" alt="blog-cover" className="w-100" />
                </Link>
                <div className="nk-blog-card-info">
                  <div className="d-flex align-items-center justify-content-between pt-5 pb-3">
                    <Link to="#" className="text-uppercase text-purple fs-14 fw-medium">Resources</Link>
                    <span className="text-uppercase fs-14 fw-medium">3 days ago</span>
                  </div>
                  <h5 className="text-uppercase line-clamp-2">What is the best and most secure crypto wallet of 2023?</h5>
                  <div className="pt-4">
                    <NioButton
                      icon="arrow-right after ms-2"
                      label="Learn More"
                      className="btn-link align-items-center text-purple fs-16 fw-bold"
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6} >
              <div className="nk-blog-card">
                <Link to="#" className="nk-blog-card-cover card-overlay-bg-3 bg-dark-alt d-inline-block position-relative w-100">
                  <img src="images/crypto/blog-cover-2.png" alt="blog-cover" className="w-100" />
                </Link>
                <div className="nk-blog-card-info">
                  <div className="d-flex align-items-center justify-content-between pt-5 pb-3">
                    <Link to="#" className="text-uppercase text-purple fs-14 fw-medium">Resources</Link>
                    <span className="text-uppercase fs-14 fw-medium">3 days ago</span>
                  </div>
                  <h5 className="text-uppercase line-clamp-2">5 best web3 / crypto application you should not be missing out </h5>
                  <div className="pt-4">
                    <NioButton
                      icon="arrow-right after ms-2"
                      label="Learn More"
                      className="btn-link align-items-center text-purple fs-16 fw-bold"
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Blog Section End   */}


      {/*  Call To Action Section Start   */}
      <section className="nk-section-cta is-theme py-7 py-xl-120 mt-xl-7">
        <Container>
          <div className="nk-cta-card card-overlay-bg-4 bg-dark-alt" >
            <Row className="flex-row-reverse justify-content-between align-items-center">
              <Col lg={5} xl={6}>
                <div className="nk-cta-card-cover one pb-5 pb-lg-0">
                  <img src="images/crypto/section-cover-2.png" alt="cover" />
                </div>
              </Col>
              <Col lg={7} xl={6}>
                <div className="p-5 p-md-7 p-xl-120 text-center text-lg-start">
                  <h2 className="h1 mb-5 mb-md-7 text-uppercase">Try the crypto wallet of the future, today.</h2>
                  <ul className="nk-btn-group justify-content-center justify-content-lg-start">
                    <li>
                      <NioButton href="#" label="Get Started" className="btn-purple border-0 rounded-0 text-nowrap" />
                    </li>
                    <li>
                      <NioButton
                        href="#"
                        icon="arrow-right after"
                        label="Download App"
                        className="align-items-center text-white text-nowrap border-0 rounded-0"
                      />
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
      {/*  Call To Action Section End   */}

      {/*  NewsLetter Section Start   */}
      <NioSection className="nk-newsletter-section is-theme pb-lg-0 pb-lg-0">
        <Row className="justify-content-center justify-content-lg-between align-items-center pb-5">
          <Col lg={6} xl={4}>
            <div className="nk-newsletter-content pb-5 pb-lg-0">
              <h4 className="mb-1 text-uppercase">Subscribe to our newsletter</h4>
              <p className="fs-16 text-gray-600">Join the 5000+ People That Uses Softnio Products.</p>
            </div>
          </Col>
          <Col lg={6} xl={5}>
            <NioSubscribeField variant="two" />
          </Col>
        </Row>
      </NioSection>
      {/*  NewsLetter Section End   */}

    </AppLayout >
  )
}

export default index;