import React, { forwardRef, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Swiper } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Thumbs, Scrollbar } from 'swiper/modules';

export default function NioSwiper({
  autoplay,
  children,
  gap = 12,
  duration = 1600,
  pagination,
  navigation = false,
  draggable = true,
  masks = [],
  className,
  navClass,
  wrapperClass,
  paginationClass,
  breakpoints = {},
  centeredSlides = false,
  loop = false,
  freeMode = false,
  thumbs,
  onSwiper,
  onInit,
  ...props
}) {

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const compClasses = classNames({
    "nk-swiper": true,
    [`${className}`]: className
  });

  useEffect(() => {
    const maskDiv = document.createElement('div');
    const wrapper = document.querySelector('.swiper');
    const existingMask = wrapper.querySelector('.nk-mask');

    if (!masks) {
      return;
    }

    // adding additional class for mask 
    maskDiv.classList.add('nk-mask');

    if (masks) {
      masks.forEach(name => {
        const classNames = name.split(' ');
        classNames.forEach(className => maskDiv.classList.add(className));
      });
    }

    // duplicate mask will be removed 
    if (existingMask) {
      existingMask.remove();
    }

    wrapper.insertAdjacentElement('afterbegin', maskDiv);

    return () => {
      maskDiv.remove();
    };
  }, [masks]);

  useEffect(() => {
    const classesToAdd = (wrapperClass || '').split(' ');
    const wrapper = document.querySelector('.swiper-wrapper');

    classesToAdd.forEach(className => {
      if (className.trim() !== '') {
        wrapper.classList.add(className)
      }
    });

    return () => {
      classesToAdd.forEach(className => {
        if (className.trim() !== '') {
          wrapper.classList.remove(className);
        }
      });
    };
  }, [wrapperClass]);


  const defaultInit = swiper => {
    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
    swiper.navigation.init();
    swiper.navigation.update();
  }

  return (
    <Swiper
      loop={loop}
      draggable={true}
      spaceBetween={gap}
      freeMode={freeMode}
      allowTouchMove={true}
      className={compClasses}
      centeredSlides={centeredSlides}
      onInit={onInit || defaultInit}
      autoplay={
        autoplay ? {
          delay: duration,
          disableOnInteraction: false
        } : false}

      thumbs={Thumbs}
      onSwiper={onSwiper}
      breakpoints={breakpoints ? breakpoints : null}
      modules={[Navigation, Pagination, Autoplay, Thumbs, Scrollbar]}
      pagination={pagination}
      {
      ...props
      }
    >

      {
        children
      }


      {
        navigation &&
        <NioSwiper.Navigation
          className={navClass}
          ref={{ "prevRef": prevRef, "nextRef": nextRef }} />
      }
    </Swiper >
  )
};


const NioNavigation = forwardRef((props, ref) => {
  const compClasses = classNames({
    "swiper-button-group": true,
    [`${props.className}`]: props.className,
  });

  return (
    <div className={compClasses}>
      <div ref={ref.prevRef} className="swiper-button-prev"></div>
      <div ref={ref.nextRef} className="swiper-button-next"></div>
    </div>
  )
})

NioSwiper.Navigation = NioNavigation;