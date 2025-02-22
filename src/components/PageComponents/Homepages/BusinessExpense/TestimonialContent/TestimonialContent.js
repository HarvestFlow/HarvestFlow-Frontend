import React from 'react'
import { SwiperSlide } from 'swiper/react';

// data 
import { useData } from '../../../../../context/DataProvider/DataProvider';

// components
import NioMedia from '../../../../NioMedia/NioMedia';
import NioSwiper from '../../../../../components/NioSwiper/NioSwiper';

export default function TestimonialContent() {

  const data = useData();
  const contents = data.testimonials.expense.contents;

  return (
    <NioSwiper
      gap={30}
      loop={true}
      navigation={true}
      autoplay={false}
      allowTouchMove={true}
      navClass='swiper-button-group-s1 text-primary-alt justify-content-center pt-4 pt-md-6'
      breakpoints={{
        "0": { "slidesPerView": 1, "slidesPerGroup": 1 },
        "992": { "slidesPerView": 2, "slidesPerGroup": 1 },
        "1024": { "slidesPerView": 3, "slidesPerGroup": 1 }
      }}
    >
      {
        contents && contents.map((content, idx) => (
          <SwiperSlide className='h-auto' key={idx}>
            <div className="nk-testimonial-wrap nk-testimonial-wrap-s1 p-0 h-100">
              <div className="nk-testimonial-card nk-testimonial-card-s1 p-5 bg-darker">
                <div className="nk-testimonial-content d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="mb-3 text-white">
                      {content?.title}
                    </h5>
                    <p className="text-white opacity-50">{content?.description}</p>
                  </div>

                  <div className="media-group align-items-center pt-4">
                    <NioMedia size="md" rounded img={content.user.cover} />
                    <div className="media-text">
                      <h6 className="mb-0 text-white">{content.user.name}</h6>
                      <span className="smaller text text-white opacity-50">{content.user.designation}</span>
                    </div>
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
