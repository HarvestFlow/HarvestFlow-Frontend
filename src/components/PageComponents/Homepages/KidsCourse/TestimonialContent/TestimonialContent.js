import React from 'react';
import { SwiperSlide } from 'swiper/react';

// data 
import { useData } from "../../../../../context/DataProvider/DataProvider";

// components 
import NioMedia from "../../../../NioMedia/NioMedia";
import NioSwiper from "../../../../../components/NioSwiper/NioSwiper"

export default function TestimonialContent() {

  const data = useData()
  const contents = data.testimonials.kids.contents;

  return (
    <NioSwiper
      className="nk-swiper-s1"
      gap={30}
      navigation
      loop={true}
      duration={1600}
      autoplay={false}
      centeredSlides={true}
      wrapperClass="align-items-center pt-4"
      navClass="swiper-button-group-s1 text-purple justify-content-center"
      breakpoints={{
        "0": { "slidesPerView": 1 },
        "992": { "slidesPerView": 2 },
        "1200": { "slidesPerView": 3 }
      }}
    >
      {
        contents && contents.map((content, idx) => (
          <SwiperSlide className="pt-7 pt-md-0 h-auto" key={idx}>
            <div className="nk-testimonial-wrap nk-testimonial-wrap-s2 py-5 py-md-7">
              <div className="nk-testimonial-card nk-testimonial-card-s2 bg-white text-center">
                <div className="nk-testimonial-content">
                  <div className="nk-testimonial-media mx-auto pb-5">
                    <img src={content?.author.cover} alt={content?.author.name} />
                  </div>
                  <div>
                    <h3 className="mb-3">{content?.author.name}</h3>
                    <p className="line-clamp-3 m-0">
                      {content?.description}
                    </p>
                  </div>
                  <ul className="d-flex gap-1 align-items-center justify-content-center pt-5">
                    <li>
                      <NioMedia size="xs" rounded variant="danger text-white" icon="star-fill" />
                    </li>
                    <li>
                      <NioMedia size="xs" rounded variant="danger text-white" icon="star-fill" />
                    </li>
                    <li>
                      <NioMedia size="xs" rounded variant="danger text-white" icon="star-fill" />
                    </li>
                    <li>
                      <NioMedia size="xs" rounded variant="danger text-white" icon="star-fill" />
                    </li>
                    <li>
                      <NioMedia size="xs" rounded variant="danger text-white" icon="star-fill" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))
      }

    </NioSwiper>
  )
}
