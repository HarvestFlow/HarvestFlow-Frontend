import classNames from 'classnames';
import React, { useEffect } from 'react';

import { useLayout } from '../../context/LayoutProvider/LayoutProvider';

export default function AppRoot({ className, rootClass = "layout-1", children, ...props }) {

  const layout = useLayout();
  const compClasses = classNames({
    [`nk-app-root`]: true,
    [`${className}`]: className
  });

  useEffect(() => {

    const body = document.querySelector('body');

    if (layout.headerActive) {
      body.classList.add('navbar-shown');
    } else {
      body.classList.remove('navbar-shown');
    }

  }, [layout.headerActive]);

  useEffect(() => {
    // Apply rootClass to the body element when the rootClass prop changes
    const body = document.querySelector('body');

    if (rootClass) {
      body.classList.add(rootClass);
    }

    // Remove the previous rootClass if it exists
    return () => {
      if (rootClass) {
        body.classList.remove(rootClass);
      }
    };
  }, [rootClass]);

  return (
    <div className={compClasses} data-navbar-collapse={layout.headerCollapse || 'lg'}>
      {children}
    </div>
  );
}

export function AppMain({ className, children }) {

  const compClasses = classNames({
    [`nk-pages`]: true,
    [`${className}`]: true,
  });

  return (
    <main className={compClasses}>
      {children}
    </main>
  );
}

AppRoot.Main = AppMain;
