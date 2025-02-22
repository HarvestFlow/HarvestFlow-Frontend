import React from 'react';
import { SwiperSlide } from 'swiper/react'

// data 
import { useData } from '../../../../../context/DataProvider/DataProvider';

// components 
import { NioIcon, NioMedia, NioSwiper } from "../../../../../components";


export default function TestimonialContent() {

  const data = useData();
  const contents = data.testimonials.tracker.contents;

  return (
    <NioSwiper
      gap={30}
      autoplay
      loop={false}
      duration={1600}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      navClass="d-none d-lg-block"
      wrapperClass="has-pagination"
      className="nk-swiper-s4 text-primary-alt pt-5 pt-lg-0"
      breakpoints={{
        "0": { "slidesPerView": 1, "slidesPerGroup": 1 },
        "991": { "slidesPerView": 2, "slidesPerGroup": 1 }
      }}
    >
      {
        contents && contents.map((content, idx) => (
          <SwiperSlide className='h-auto' key={idx}>
            <div className="nk-testimonial-card nk-testimonial-card-s3 bg-white shadow-none">
              <div className="nk-testimonial-content">
                <div className="nk-testimonial-icon mb-0">
                  <NioIcon name="quote-left" />
                </div>
                <p className="lead">
                  {content?.comments}
                </p>

                <div className="media-group align-items-center pt-4">
                  <NioMedia rounded img={`images/avatar/${content?.cover}`} alt={content?.name} />

                  <div className="media-text">
                    <h5 className="mb-0">
                      {content?.name}
                    </h5>
                    <span className="small text fw-medium">
                      {content?.designation}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))
      }

    </NioSwiper>
  )
}
