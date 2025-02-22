import classNames from 'classnames';
import React, { useState, useEffect } from 'react';

// components
import NioIcon from '../NioIcon/NioIcon';
import useRouteMatch from '../../hooks/useRouteMatch';

export default function NioBackTop({ className }) {

  const [showButton, setShowButton] = useState(false);
  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);

  const compClasses = classNames({
    "shadow": true,
    "active": showButton,
    "scroll-top border-0": true,
    "animate animate-infinite animate-pulse animate-duration-2": true,

    // bg color
    "text-bg-success-alt text-white": useRouteMatch(["/index-live-chat-app"]),
    "text-bg-success text-white text-white": useRouteMatch(["/index-bs-digital"]),
    "text-bg-info text-white": useRouteMatch(["/index-bs-management"]),
    "text-bg-info-alt text-white": useRouteMatch(["/index-language-learning"]),
    "text-bg-purple": useRouteMatch(["/index-kids-course", "/index-crypto-profile"]),
    "text-bg-indigo text-white": useRouteMatch(["/index-collaboration-tool", "/index-bs-solution", "/about-solution", "/contact-us-solution", "/features-solution", "/pricing-solution", "/index-bs-analytics"]),
    "text-bg-primary-alt text-white": useRouteMatch(["/index-bs-expense-tracker", "/index-saas", "/index-bs-subscription", "/index-data-driven"]),
    "text-bg-primary text-white": !useRouteMatch(["/index-live-chat-app"]),
    [`${className}`]: className

  })

  return (
    <button onClick={handleClick} className={compClasses}>
      <NioIcon name="chevrons-up" />
    </button>
  );
};


