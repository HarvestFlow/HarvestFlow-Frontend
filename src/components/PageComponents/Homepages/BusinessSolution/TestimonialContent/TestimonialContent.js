import React from 'react'
import { SwiperSlide } from 'swiper/react';
import { Col, Row } from 'react-bootstrap';

// data 
import { useData } from '../../../../../context/DataProvider/DataProvider';

// components 
import { NioBadge, NioMedia, NioSection, NioSwiper } from "../../../../../components"

export default function TestimonialContent() {

  const data = useData();
  const contents = data.homepage.businessSolution.testimonials.contents;

  // bg-dark is-theme is-theme-bg 
  return (
    <NioSection space='lg' className="nk-section-testimonial text-center mb-n7 mb-xl-1" >
      <NioSwiper
        loop
        navigation
        pagination={{
          clickable: true,
        }}
        duration={2400}
        masks={["shape-29 d-none d-lg-block"]}
        wrapperClass='has-pagination-and-navigation pb-md-8 pb-lg-6 mb-lg-2'
        navClass='swiper-button-group-s1 w-100 has-bg justify-content-center d-none d-lg-inline-flex mb-md-n1'
        breakpoints={{
          "0": { "slidesPerView": 1, "slidesPerGroup": 1 }
        }}
      >

        {
          contents && contents.map((content, idx) => (
            <SwiperSlide key={idx}>
              <div className="nk-testimonial-wrap nk-testimonial-wrap-s4 pt-0 pb-6 pb-md-7">
                <div className="nk-testimonial-card nk-testimonial-card-s4">
                  <Row className="justify-content-center">
                    <Col lg={8}>
                      <div className="nk-testimonial-content">

                        <div className="media-group media-group-column pb-5 pb-md-7">
                          <NioMedia type='circle' size='xl' className='mx-auto mb-3 w-88 h-88' >
                            <img src="images/avatar/a.jpg" alt="cover" />
                          </NioMedia>

                          <div className="media-text">
                            <h5 className="title mb-2 mb-md-0">{content.user.name}</h5>
                            <span className="small font-bold opacity-75">
                              {content.user.designation}
                            </span>
                          </div>
                        </div>
                        <NioBadge rounded label='quotes' className=' text-darker text-uppercase mb-1 mb-md-4' />
                        <h3>{content.comments}</h3>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </SwiperSlide>
          ))
        }
      </NioSwiper>
    </NioSection >
  )
}
