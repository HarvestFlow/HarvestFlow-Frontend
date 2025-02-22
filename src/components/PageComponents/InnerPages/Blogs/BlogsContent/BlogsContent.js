import React from 'react';
import { SwiperSlide } from 'swiper/react';

// data 
import { useData } from '../../../../../context/DataProvider/DataProvider';

// components
import { NioBlogCard, NioSwiper } from '../../../../../components';

export default function BlogsContent() {

  const data = useData();
  const contents = data.posts.blogs.featured.contents;

  return (
    <NioSwiper
      gap={60}
      loop={false}
      duration={2500}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      paginationClass="text-center text-lg-end"
      wrapperClass="has-pagination pb-5 pb-lg-7"
      navClass="swiper-button-group-s2 has-bg"
      className="nk-swiper-s2 blog-slider overflow-visible"
      breakpoints={{ "0": { "slidesPerView": "1" } }}
    >
      {
        contents && contents.map((content, idx) => (
          <SwiperSlide key={idx} className="d-flex flex-wrap pb-2">
            <NioBlogCard
              variant="one"
              url={content.url}
              tags={content.tags}
              user={content.user}
              cover={content.cover}
              title={content.title}
            />
          </SwiperSlide>
        ))
      }
    </NioSwiper>
  )
}