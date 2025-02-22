import React from 'react'
import { SwiperSlide } from 'swiper/react';

// data 
import { useData } from '../../../../../context/DataProvider/DataProvider';

// components 
import { NioSwiper, NioIcon, NioMedia } from '../../../../../components';

export default function TestimonialContent() {

  const data = useData();
  const contents = data.testimonials.bsmanagement.contents;

  return (
    <NioSwiper
      gap={30}
      loop={false}
      autoplay={false}
      duration={1600}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      navClass="d-none d-lg-block"
      wrapperClass="has-pagination"
      className="nk-swiper-s4 pt-5 pt-lg-0"
      breakpoints={{
        "0": { "slidesPerView": 1, "slidesPerGroup": 1 },
        "991": { "slidesPerView": 2, "slidesPerGroup": 1 }
      }}
    >
      {
        contents && contents.map((content, idx) => (
          <SwiperSlide key={idx} className="h-auto">
            <div className="nk-testimonial-card nk-testimonial-card-s3 bg-gray-300 border border-gray-500 shadow-none">
              <div className="nk-testimonial-content">
                <div className="nk-testimonial-icon mb-0">
                  <NioIcon name="quote-left" className="text-primary" />
                </div>
                <p className="m-0 fs-20">
                  {content?.comments}
                </p>
                <div className="media-group align-items-center pt-5">
                  <NioMedia rounded img={content?.cover} />
                  <div className="media-text">
                    <h5 className="mb-0">{content?.name}</h5>
                    <span className="small text fw-medium">{content?.designation}</span>
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
