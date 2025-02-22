import classNames from 'classnames';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// components
import NioIcon from '../NioIcon/NioIcon';
import NioLightBox from '../NioLightBox/NioLightBox';

export default function NioMedia({ href, className, variant, size, border, rounded, icon, img, children, lightboxSrc, ...props }) {

  const [showLightbox, setShowLightbox] = useState(false);
  const compClasses = classNames({
    "media": true,
    "media-middle": true,
    [`media-${size}`]: size,
    "rounded-pill": rounded,
    [`${className}`]: className,
    [`text-bg-${variant}`]: variant,
    [`media-border border-${variant} text-${variant}`]: border,
    "pointer": lightboxSrc, // Adding pointer class if lightboxSrc is provided
  });

  const toggleLightbox = () => {
    setShowLightbox((prevShowLightbox) => !prevShowLightbox);
  };


  if (lightboxSrc) {
    return (
      <>
        <Link to="#" className={compClasses} {...props} onClick={toggleLightbox}>
          {img && <img src={img} alt="cover" />}
          {icon && <NioIcon name={icon} />}
          {children}
        </Link>
        <NioLightBox show={showLightbox} src={[lightboxSrc]} />
      </>
    );

  }

  if (href) {
    return (
      <Link to={href || "#"} className={compClasses} {...props}>
        {img && <img src={img} alt="cover" />}
        {icon && <NioIcon name={icon} />}
        {children}
      </Link>
    );
  }

  return (
    <div className={compClasses} {...props}>
      {img && <img src={img} alt="cover" />}
      {icon && <NioIcon name={icon} />}
      {children}
    </div>
  );
}
