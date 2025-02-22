import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function NioScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top of the page whenever the location changes
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  return null;

}
