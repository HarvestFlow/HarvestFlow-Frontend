import React, { useEffect, useRef } from "react";
import classNames from 'classnames';
import ScrollCarousel from "scroll-carousel";

const NioScrollCarousel = ({ className, selector, autoplay, autoplaySpeed, speed, smartSpeed, direction, slideSelector, margin, ...props }) => {

  const carouselRef = useRef(null);

  useEffect(() => {
    const uniqueSelector = `.nk-carousel-${selector}`;
    carouselRef.current.classList.add(uniqueSelector);

    new ScrollCarousel(uniqueSelector, {
      autoplay: autoplay || true,
      autoplaySpeed: autoplaySpeed || 5,
      speed: speed || 7,
      smartSpeed: smartSpeed || false,
      direction: direction || 'rtl',
      slideSelector: slideSelector || null,
      margin: margin || 10
    });
  }, [selector, autoplay, autoplaySpeed, speed, smartSpeed, direction, slideSelector, margin]);

  const compClasses = classNames({
    "nk-carousel": true,
    [`nk-carousel-${selector}`]: selector,
    [`${className}`]: className
  });

  return (
    <div className={compClasses} ref={carouselRef}>
      {props.children}
    </div>
  );
};

export default NioScrollCarousel;
