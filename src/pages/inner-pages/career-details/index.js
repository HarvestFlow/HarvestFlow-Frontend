import React from 'react';
import { Col, Row } from 'react-bootstrap';

// layout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components
import { NioButton, NioCard, NioIcon, NioMedia, NioSection, NioSubscribeField } from '../../../components';

function index() {
  return (
    <AppLayout title="Job Details" rootClass="layout-1" >

      {/*  Team Section Start   */}
      <NioSection className="pt-120 pt-lg-160">
        <NioSection.Head alignX="center">

          <div className="d-flex gap-2 justify-content-center align-items-center mb-3">
            <p className="d-flex align-items-center gap-1  text-primary mb-0">
              <NioIcon name="map-pin-fill" />
              <span className="fs-14 fw-semibold text-uppercase text-nowrap "> san francisco</span>
            </p> - <p className="d-flex align-items-center gap-1  text-primary mb-0">
              <NioIcon name="clock-fill" />
              <span className="fs-14 fw-semibold text-uppercase text-nowrap ">Full Time</span>
            </p>
          </div>
          <h2>Lead Backend Developer</h2>
          <p className="fs-20">Experienced lead backend developer specializing in building scalable and efficient server-side applications. Expert in various programming languages.</p>

        </NioSection.Head>
        <NioSection.Content>
          {/*  Position-Details Section Start   */}
          <div className="nk-section nk-section-position-details">
            <Row className="gap g-5">
              <Col lg={8}>
                <div className="nk-entry">
                  <div className="mb-5">
                    <h5 className="text-capitalize mb-3">About the job</h5>
                    <p className="fs-16"> A lead backend developer designs, develops, and maintains server-side components, ensuring efficiency and scalability. They provide technical leadership, manage teams, optimize code, and troubleshoot issues. With strong programming skills and problem-solving abilities, they deliver high-quality solutions. Effective collaboration with cross-functional teams, including frontend developers and UX designers, is essential. Their role drives the advancement of software applications. </p>
                    <ul className="ps-4">
                      <li>
                        <p className="fs-16">Design and Develop: A lead backend developer designs and develops server-side components, creating efficient and scalable backend systems.</p>
                      </li>
                      <li>
                        <p className="fs-16">Technical Leadership: They provide technical leadership, guiding and supporting their team members to deliver high-quality solutions.</p>
                      </li>
                      <li>
                        <p className="fs-16">Problem-solving: Lead backend developers possess strong problem-solving skills, enabling them to address complex challenges and troubleshoot issues effectively.</p>
                      </li>
                      <li>
                        <p className="fs-16">Collaboration: Effective collaboration with cross-functional teams, including frontend developers and UX designers, is crucial for successful project delivery and advancing software applications.</p>
                      </li>
                    </ul>
                    <h5 className="text-capitalize mb-3">What to consider when choosing the right tech stack?</h5>
                    <p className="fs-16">At risus viverra adipiscing at in tellus integer feugiat nisl pretium fusce id velit ut tortor sagittis orci a scelerisque purus semper eget at lectus urna duis convallis. porta nibh venenatis cras sed felis eget neque laoreet suspendisse interdum consectetur libero nisl donec pretium vulputate sapien nec sagittis aliquam nunc lobortis mattis aliquam faucibus purus in.</p>
                    <ul className="ps-4">
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
                  <div className="mb-5">
                    <h5 className="text-capitalize mb-3">Job responsibilities</h5>
                    <p className="fs-16"> Job responsibilities of a lead backend developer include designing and developing server-side components, providing technical leadership, managing teams, optimizing code, troubleshooting issues, and collaborating with cross-functional teams to ensure successful project delivery and advancement of software applications. </p>
                  </div>
                  <div className="mb-5">
                    <h5 className="text-capitalize mb-3">Job requirements</h5>
                    <p className="fs-16"> Job requirements for a lead backend developer typically include strong programming skills, expertise in backend technologies, leadership abilities, problem-solving aptitude, and effective communication and collaboration skills. </p>
                  </div>
                </div>
                {/*  .nk-entry  */}
              </Col>
              <Col lg={4}>
                <div className="nk-section-blog-sidebar">
                  <NioCard>
                    <NioCard.Body>
                      <NioMedia rounded size="lg" variant="primary-soft" icon="file-text-fill" className="mb-4" />
                      <h4>Apply Now</h4>
                      <p className="fs-16 mb-5"> If you think the responsibilities and job requirements fits your skills then you can submit you CV by clicking the button below. </p>
                      <NioButton href="#" label="Apply Now" className="btn btn-primary w-100" />
                    </NioCard.Body>
                  </NioCard>
                </div>
              </Col>
            </Row>
          </div>
        </NioSection.Content>
      </NioSection>
      {/* Team Section End */}

      {/* Open - Position Section Start */}
      <NioSection className="nk-section-positions">

        <Row className="align-items-center justify-content-center justify-content-lg-between pb-7">
          <Col lg={6}>
            <h2 className="text-center text-lg-start mb-5 mb-lg-0">More Open Positions</h2>
          </Col>
          <Col lg={6} className="text-center text-lg-end">
            <NioButton href="/careers" icon="arrow-right after" label="Browse All" className="btn btn-outline-primary" />
          </Col>
        </Row>

        <NioSection.Content>
          <Row className="gy-5 gy-xl-0">
            <Col xl={6} >
              <NioCard>
                <NioCard.Body>
                  <div className="pb-5 mb-5 border-bottom">
                    <Row className="align-items-center justify-content-md-between gap-0">
                      <Col md={9} lg={8}>
                        <div>
                          <h5 className="mb-2">Lead Backend Developer</h5>
                          <div className="d-flex gap-2 align-items-center text-primary mb-2">
                            <p className="d-flex align-items-center gap-1 mb-0">
                              <NioIcon name="map-pin-fill" />
                              <span className="fs-14 fw-semibold text-uppercase text-nowrap "> san francisco</span>
                            </p> - <p className="d-flex align-items-center gap-1 mb-0">
                              <NioIcon name="clock-fill" />
                              <span className="fs-14 fw-semibold text-uppercase text-nowrap ">Full Time</span>
                            </p>
                          </div>
                        </div>
                      </Col>
                      <Col md={3} xl={4} className="text-md-end">
                        <NioButton href="#" label="Apply Now" className="btn btn-outline-dark border w-100 mt-4 mt-lg-0" />
                      </Col>
                    </Row>
                  </div>
                  <p className="fs-16 line-clamp-2"> A lead backend developer is responsible for designing, developing, and managing server-side components, leading a team, and ensuring efficient and scalable backend systems. </p>
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col xl={6} >
              <NioCard>
                <NioCard.Body>
                  <div className="pb-5 mb-5 border-bottom">
                    <Row className="align-items-center justify-content-md-between gap-0">
                      <Col md={9} lg={8}>
                        <div>
                          <h5 className="mb-2">Senior Product Designer</h5>
                          <div className="d-flex gap-2 align-items-center text-primary mb-2">
                            <p className="d-flex align-items-center gap-1 mb-0">
                              <NioIcon name="map-pin-fill" />
                              <span className="fs-14 fw-semibold text-uppercase text-nowrap ">san francisco</span>
                            </p> - <p className="d-flex align-items-center gap-1 mb-0">
                              <NioIcon name="clock-fill" />
                              <span className="fs-14 fw-semibold text-uppercase text-nowrap ">Full Time</span>
                            </p>
                          </div>
                        </div>
                      </Col>
                      <Col md={3} xl={4} className="text-md-end">
                        <NioButton href="#" label="Apply Now" className="btn btn-outline-dark border w-100 mt-4 mt-lg-0" />
                      </Col>
                    </Row>
                  </div>
                  <p className="fs-16 line-clamp-2"> A senior product designer is an experienced professional responsible for designing and shaping user-centric product experiences, leading design initiatives, and collaborating with cross-functional teams to deliver exceptional product designs. </p>
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/* Open - Position Section End */}

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