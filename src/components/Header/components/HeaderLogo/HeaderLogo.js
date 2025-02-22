import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import NioBrand from '../../../NioBrand/NioBrand';

export default function HeaderLogo({ className, logo = 's1', mode = 'dark' }) {
  const location = useLocation();

  // define logo variants for layouts 
  const routes = {
    // landing
    "/": "s1.dark",

    // homepage
    "/index-analytics": "s1.dark",
    "/index-kids-course": "s2.dark",
    "/index-collaboration-tool": "s2.dark",
    "/index-bs-expense-tracker": "s2.dark",
    "/index-live-chat-app": "s3.dark",
    "/index-bs-solution": "s2.light",
    "/index-saas": "s2.light",
    "/index-bs-digital": "s3.dark",
    "/index-crypto-profile": "s2.light",
    "/index-bs-management": "s2.light",
    "/index-bs-subscription": "s2.light",
    "/index-data-driven": "s1.dark",
    "/index-language-learning": "s3.light",

    // inner page 
    "/404": "s1.dark",
    "/about": "s1.dark",
    "/blogs": "s1.dark",
    "/features": "s1.dark",
    "/contact-us": "s1.dark",
    "/help-center": "s1.dark",
    "/blog-details": "s1.dark",
    "/terms-and-conditions": "s1.dark",
    "/about-solution": "s2.light",
    "/features-solution": "s2.light",
    "/pricing": "s1.dark",
    "/pricing-solution": "s2.light",
    "/contact-us-solution": "s2.light",
    "/help-center-details": "s1.dark",
    "/customer-testimonials": "s1.dark",
    "/careers": "s1.dark",
    "/career-details": "s1.dark",
  };

  // Get routeLogo and routeTheme with default values
  const routeInfo = routes[location.pathname];
  const [routeLogo, routeTheme] = (typeof routeInfo === 'string' && routeInfo.split('.')) || ['s1', 'dark'];

  const compClasses = classNames({
    "nk-header-logo": true,
    [`${className}`]: className
  });

  return (
    <NioBrand
      logo={routeLogo || logo}
      variant={routeTheme || mode}
      className={compClasses}
    />
  );
}
