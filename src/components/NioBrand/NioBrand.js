import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

export default function NioBrand({ href = "/", variant = "dark", logo = "s1", imageRoot = "/images", className, ...props }) {

  const compClasses = classNames({
    "logo-link": true,
    [`${className}`]: className
  })

  let imgSrc, imgSrcSet;

  if (variant === 'light') {
    imgSrc = `${imageRoot}/logo-${logo}.png`;
    imgSrcSet = `${imageRoot}/logo-${logo}2x.png 2x`;
  } else if (variant === 'dark') {
    imgSrc = `${imageRoot}/logo-${logo}-dark.png`;
    imgSrcSet = `${imageRoot}/logo-${logo}-dark2x.png 2x`;
  } else {
    imgSrc = `${imageRoot}/logo-${logo}.png`;
    imgSrcSet = `${imageRoot}/logo-${logo}2x.png 2x`;
  }

  return (
    <Link to={href} className={compClasses} {...props}>
      <div className="logo-wrap">

        {variant === "both" && (
          <>
            <img className="logo-img logo-light" src={imgSrc} srcSet={imgSrcSet} alt="brand-logo" />
            <img className="logo-img logo-dark" src={`${imageRoot}${logo}-dark.png`} srcSet={`${imageRoot}${logo}-dark2x.png 2x`} alt="brand-logo" />
          </>
        )}

        {variant !== "both" && (
          <img className="logo-img" src={imgSrc} srcSet={imgSrcSet} alt="brand-logo" />
        )}

      </div>
    </Link>
  );
};


