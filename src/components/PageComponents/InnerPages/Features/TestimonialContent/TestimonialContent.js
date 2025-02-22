import React from 'react';
import { SwiperSlide } from 'swiper/react';

// data 
import { useData } from '../../../../../context/DataProvider/DataProvider';

// components 
import NioMedia from '../../../../NioMedia/NioMedia';
import NioSwiper from '../../../../../components/NioSwiper/NioSwiper';

export default function TestimonialContent() {

  const data = useData();
  const contents = data.testimonials.feature.contents;

  return (
    <NioSwiper
      loop
      autoplay={true}
      duration={2500}
      navigation={true}
      pagination={false}
      breakpoints={{
        "0": {
          "slidesPerView": 1,
          "slidesPerGroup": 1
        }
      }}
      wrapperClass='has-navigation'
      navClass='swiper-button-group-s1 has-bg justify-content-center'
    >
      {
        contents && contents.map((content, idx) => (
          <SwiperSlide key={idx}>
            <div className="nk-testimonial-wrap nk-testimonial-wrap-s4 p-0 px-md-7">
              <div className="nk-testimonial-card nk-testimonial-card-s4 shadow-none">
                <div className="nk-testimonial-content">

                  <div className="media-group media-group-column pb-5">
                    <NioMedia
                      rounded
                      size="md"
                      className="mx-auto"
                      img={content.cover}
                    />

                    <div className="media-text">
                      <h5 className="title mb-1">{content.user.name}</h5>
                      <p className="small opacity-50 fw-normal">
                        {content.user.designation}
                      </p>
                    </div>
                  </div>
                  <p className="h3">
                    {content.user.comments}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))
      }
    </NioSwiper>
  )
}
