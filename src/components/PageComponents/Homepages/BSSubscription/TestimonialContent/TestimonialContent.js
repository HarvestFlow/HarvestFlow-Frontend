import React from 'react'
import { SwiperSlide } from 'swiper/react';
import { Col, Row } from 'react-bootstrap';

// data 
import { useData } from '../../../../../context/DataProvider/DataProvider';

// components 
import NioBadge from '../../../../NioBadge/NioBadge';
import NioMedia from '../../../../NioMedia/NioMedia';
import NioSwiper from '../../../../../components/NioSwiper/NioSwiper';

export default function TestimonialContent() {

  const data = useData();
  const contents = data.testimonials.digital.contents;

  return (
    <NioSwiper
      loop
      navigation
      masks={["shape-quote"]}
      pagination={{ clickable: true }}
      className="text-danger"
      wrapperClass="has-pagination-and-navigation pb-md-8 pb-lg-6 mb-lg-2"
      navClass="swiper-button-group-s1 text-danger w-100 has-bg justify-content-center d-none d-lg-inline-flex mb-md-n1"
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
                        <NioMedia
                          rounded
                          size="md"
                          img={content?.user.cover}
                          className="mx-auto mb-3 w-88 h-88"
                        />
                        <div className="media-text">
                          <h5 className="title mb-2 mb-md-0">{content?.user.name}</h5>
                          <span className="fs-18 font-bold text-base">
                            {content?.user.designation}
                          </span>
                        </div>
                      </div>
                      <NioBadge
                        label="Quotes"
                        className="text-bg-danger-soft fs-12 text-uppercase rounded-pill mb-1 mb-md-4"
                      />
                      <h3>{content?.comments}</h3>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </SwiperSlide>
        ))
      }
    </NioSwiper>
  )
}
