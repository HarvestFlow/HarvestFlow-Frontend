import React from 'react';
import classNames from 'classnames';
import { useLocation, useParams } from 'react-router-dom';
import NioBrand from '../../../NioBrand/NioBrand';

export default function HeaderLogo({ className, logo = 's1', mode = 'dark' }) {
  const location = useLocation();
  const { challengeId } = useParams();

  const routes = {
    "/": "s2.dark",
    "/index-analytics": "s1.dark",
    "/index-kids-course": "s2.dark",
    "/index-bs-expense-tracker": "s2.dark",
    "/index-live-chat-app": "s3.dark",
    "/index-bs-solution": "s2.light",
    "/index-saas": "s2.light",
    "/index-bs-digital": "s3.dark",
    "/index-crypto-profile": "s2.light",
    "/index-bs-management": "s2.light",
    "/index-bs-subscription": "s2.light",
    "/index-company-home-page": "s2.light",
    "/index-challenged-home-page": "s2.light",
    "/index-data-driven": "s1.dark",
    "/index-language-learning": "s3.light",
    "/Allchallenges": "s2.dark",
    "/ChallengeDetails/": "s2.dark",
    "/discussion/": "s2.dark",
    "/Team": "s2.dark",
    "/Favorit": "s2.dark",
    "/Mychallengecompany": "s2.dark",


    // inner page 
    "/404": "s1.dark",
    "/about": "s1.dark",
    "/blogs": "s1.dark",
    "/features": "s1.dark",
    "/contact-us": "s1.dark",
    "/help-center": "s1.dark",
    "/blog-details": "s1.dark",
    "/terms-and-conditions": "s1.dark",
    "/about-solution": "s2.dark",
    "/features-solution": "s2.light",
    "/pricing": "s1.dark",
    "/pricing-solution": "s2.light",
    "/contact-us-solution": "s2.dark",
    "/help-center-details": "s1.dark",
    "/customer-testimonials": "s1.dark",
    "/careers": "s1.dark",
    "/career-details": "s1.dark",
    "/index-user-management-admin": "s2.dark",
    "/index-user-management-superadmin": "s2.dark",
    "/profile": "s2.dark",
    "/Profile": "s2.dark",
    "/editProfile":"s2.dark", 
    "/construction": "s2.light", 
    "/terms-and-conditions":"s2.dark", 
    "/privacy-policy": "s2.dark",
    "/terms-conditions":"s2.dark",
    "/superAdmin":  "s2.light",
    "/terms-of-use":"s2.dark",
    "/terms-use":"s2.dark",
    "/listeAdmin":"s2.dark",
    "/careers": "s2.dark",
    "/CompanyDashboard":"s2.dark"
  };
  let routeInfo = routes[location.pathname];
  if (!routeInfo && location.pathname.startsWith("/ChallengeDetails/")) {
    routeInfo = routes["/ChallengeDetails/"];
  }
  if (!routeInfo && location.pathname.startsWith("/discussion/")) {
    routeInfo = routes["/discussion/"];
  }
  const [routeLogo, routeTheme] = (typeof routeInfo === 'string' && routeInfo.split('.')) || ['s1', 'dark'];

  const compClasses = classNames({
    "nk-header-logo": true,
    [`${className}`]: className
  });

  return (
    <NioBrand
     
      variant={routeTheme || mode}
      className={compClasses}
    />
  );
}
