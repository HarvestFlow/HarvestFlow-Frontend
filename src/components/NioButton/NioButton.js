import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

// components
import NioIcon from '../NioIcon/NioIcon';
import useRouteMatch from '../../hooks/useRouteMatch';

export default function NioButton({ className, href, icon, img, label, ...props }) {

  const compClasses = classNames({
    "btn": !className || !className.includes("btn-link"),

    // border radius
    "rounded-1": useRouteMatch(["/index-bs-solution"]),

    // padding 
    "py-2 px-4": useRouteMatch(["/index-bs-subscription"]),

    // bg
    "bg-transparent p-0 rounded-0 border-0": className && className.includes("btn-link"),
    [`${className}`]: className,
  });

  const renderIconOrImage = (iconOrImg, label) => {

    if (iconOrImg) {
      const [name, position = "before", className = null] = iconOrImg.split(" ");

      return (
        <>
          {position === "before" && (
            <>
              {img ? <img src={name} className={"mx-2 " + className} alt="icon" /> : <NioIcon name={name} className={className} />}
            </>
          )}
          {
            label &&
            <span>{label}</span>
          }
          {position === "after" && (
            <>
              {img ? <img src={name} className={"mx-2 " + className} alt="icon" /> : <NioIcon name={name} className={className} />}
            </>
          )}
        </>
      );
    } else {
      return <span>{label}</span>;
    }
  };

  if (href === "#") {
    return (
      <ScrollLink
        to={href}
        smooth={true}
        duration={0}
        onClick={() => {
          scroll.scrollToTop();
        }}
        className={compClasses}
        {...props}
      >
        {renderIconOrImage(icon || img, label)}
      </ScrollLink>
    );
  } else if (href) {
    return (
      <Link to={href} className={compClasses} {...props}>
        {renderIconOrImage(icon || img, label)}
      </Link>
    );
  }

  return (
    <button className={compClasses} {...props}>
      {renderIconOrImage(icon || img, label)}
    </button>
  );
}
