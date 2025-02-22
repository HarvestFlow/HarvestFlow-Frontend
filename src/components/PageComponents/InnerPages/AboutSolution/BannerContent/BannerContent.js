import React from 'react';
import { SwiperSlide } from 'swiper/react';

// data 
import { useData } from '../../../../../context/DataProvider/DataProvider';

// componets 
import { NioSwiper } from '../../../../../components';

export default function BannerContent() {

  const data = useData();
  const contents = data.innerpage.aboutSolution.banner.contents;

  return (
    <NioSwiper
      gap={30}
      autoplay
      pagination={{
        clickable: true,
      }}
      wrapperClass='pb-7'
      className='nk-swiper-peoples'
      breakpoints={{
        "0": {
          "slidesPerView": 1,
          "slidesPerGroup": 1
        },
        "480": {
          "slidesPerView": 2,
          "slidesPerGroup": 1
        },
        "991": {
          "slidesPerView": 4,
          "slidesPerGroup": 1
        }
      }}
    >
      {
        contents && contents.map((content, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={content.cover}
              alt={`${content.alt}-${idx}`}
              className="w-100 rounded-3"

            />
          </SwiperSlide>
        ))
      }
    </NioSwiper>

  )
}
