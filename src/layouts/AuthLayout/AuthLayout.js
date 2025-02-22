import React, { useEffect } from 'react';

// components 
import { NioIcon, NioMedia, NioStickyBadge } from '../../components'

function AuthLayout({ title = "Page Title Goes Here", rootClass = "layout-1", children }) {

  useEffect(() => {
    document.title = `${title} - NioLand React Template`
  }, [title]);

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
    <>
      <div className="nk-split-page flex-column flex-xl-row"  style={{ marginTop: '-120px' }}>
        <div className="nk-split-col nk-auth-col justify-content-center">
          {children}
        </div>
        <div className="nk-split-col nk-auth-col nk-auth-col-content  bg-indigo is-theme">
          <div className="nk-auth-content mx-md-9 mx-xl-auto">
            <div className="nk-auth-content-inner">

              <div className="media media-lg media-circle media-middle text-bg-indigo text-white mb-5">
                <NioIcon name="quote-left" />
              </div>
              <h1 className="mb-5">JOIN US NOW</h1>
              <div className="nk-auth-quote ms-sm-5">
                <div className="nk-auth-quote-inner">
                  <p className="small">Login to unlock the possibilities of industry-driven data science innovation!</p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NioStickyBadge />
    </>
  )
}
export default AuthLayout;