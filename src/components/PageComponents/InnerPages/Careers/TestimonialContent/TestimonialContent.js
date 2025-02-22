import React from 'react'
import { SwiperSlide } from 'swiper/react';

// data 
import { useData } from '../../../../../context/DataProvider/DataProvider';

// components 
import NioSwiper from '../../../../NioSwiper/NioSwiper';

export default function TestimonialContent() {

  const data = useData();
  const contents = data.testimonials.careers.contents;

  return (
    <NioSwiper
      gap={30}
      loop={true}
      autoplay={true}
      duration={1600}
      freeMode={true}
      centeredSlides={true}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      breakpoints={{
        "0": { "slidesPerView": 2, "spaceBetween": 0 },
        "1200": { "slidesPerView": 3, "spaceBetween": 0 }
      }}
    >
      {
        contents && contents.map((content, idx) => (
          <SwiperSlide key={idx} className="h-auto">
            <div>
              <img src={content?.cover} alt="banner-cover" className="w-100 rounded-2" />
            </div>
          </SwiperSlide>
        ))
      }
    </NioSwiper>
  )
}
