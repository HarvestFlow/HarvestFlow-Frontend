import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function useRouteMatch(routes) {

  const location = useLocation();
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    if (Array.isArray(routes)) {
      setIsMatching(routes.includes(location.pathname))
    } else {
      setIsMatching(location.pathname === routes)
    }
  }, [routes, location.pathname])

  return isMatching;
}
