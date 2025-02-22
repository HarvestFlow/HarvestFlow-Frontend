import React, { useEffect } from 'react';
import { NioIcon, NioBrand, NioMedia, NioStickyBadge } from '../../components';

function AuthLayout1({ title = "Page Title Goes Here", rootClass = "layout-1", children }) {

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
      <div className="nk-split-page flex-column flex-xl-row" style={{ marginTop: '-120px' }}>
        <div className="nk-split-col nk-auth-col justify-content-center">
          {children}
        </div>
        <div className="nk-split-col nk-auth-col nk-auth-col-content" style={{ backgroundColor: 'rgba(10, 169, 76, 0.39)' }} masks={["shape-15"]}>
        <div className="nk-auth-content mx-md-9 mx-xl-auto"> 
            <div className="nk-auth-content-inner">
            <div style={{ textAlign: 'center' }}>
          <NioBrand logo="s2" variant="dark" imageRoot="../images/" size="00px" />
      </div>
              <div className="media media-lg media-circle media-middle text-bg-indigo text-white mb-5">
                <div className="form-logo mb-3">
                  <NioIcon name="quote-left" />
                </div>
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

export default AuthLayout1;