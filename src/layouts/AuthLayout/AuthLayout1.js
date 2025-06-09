import React, { useEffect } from 'react';
import { NioIcon, NioBrand, NioMedia, NioStickyBadge } from '../../components';
import './AuthLayout1.css'; // Import custom CSS for animations and styles

function AuthLayout1({ title = "Page Title Goes Here", rootClass = "layout-1", children }) {
  useEffect(() => {
    document.title = `${title} - NioLand React Template`;
  }, [title]);

  useEffect(() => {
    const body = document.querySelector('body');
    if (rootClass) {
      body.classList.add(rootClass);
    }
    return () => {
      if (rootClass) {
        body.classList.remove(rootClass);
      }
    };
  }, [rootClass]);

  useEffect(() => {
    // Load particles.js dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 40, density: { enable: true, value_area: 800 } },
          color: { value: '#f0f0f0' },
          shape: { type: 'circle', stroke: { width: 0 } },
          opacity: { value: 0.4, random: true },
          size: { value: 3, random: true },
          line_linked: { enable: true, distance: 150, color: '#f0f0f0', opacity: 0.3, width: 1 },
          move: { enable: true, speed: 1.5, direction: 'none', random: true, out_mode: 'out' },
        },
        interactivity: {
          detect_on: 'canvas',
          events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
          modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } },
        },
        retina_detect: true,
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className="nk-split-page flex-column flex-xl-row" style={{ marginTop: '-120px' }}>
        <div className="nk-split-col nk-auth-col justify-content-center">
          {children}
        </div>
        <div
          className="nk-split-col nk-auth-col-content"
          style={{
            background: 'linear-gradient(135deg, rgb(100, 200, 120) 0%, rgb(60, 160, 80) 100%)', // Brighter, more vibrant greens
            position: 'relative',
            overflow: 'hidden',
          }}
          masks={["shape-15"]}
        >
          <div id="particles-js" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />
          <div
            className="nk-auth-content mx-md-9 mx-xl-auto"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100%',
              padding: '2rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div className="nk-auth-content-inner text-center">
              <div className="float-logo" style={{ marginBottom: '2rem' }}>
                <NioBrand
                  logo="s1"
                  variant="dark"
                  imageRoot="../images/"
                  style={{
                    width: '300px',
                    filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3))',
                  }}
                  aria-label="Company logo"
                />
              </div>
              <NioMedia
                rounded
                size="lg"
                variant="text-bg-white text-green-500 mb-5 float-element"
              >
                <NioIcon name="hexagon-grid" size="lg" />
              </NioMedia>
              <h1
                className="mb-4 float-element"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: '800',
                  fontSize: '3rem',
                  color: '#ffffff',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', // Enhanced shadow for readability
                }}
              >
                Innovate with Data
              </h1>
              <div className="nk-auth-quote ms-sm-5">
                <div className="nk-auth-quote-inner float-element" style={{ animationDelay: '0.2s' }}>
                  <p
                    className="small"
                    style={{
                      color: '#ffffff',
                      fontSize: '1.2rem',
                      fontWeight: '500',
                      lineHeight: '1.6',
                      maxWidth: '450px',
                      margin: '0 auto',
                      textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)', // Enhanced shadow
                    }}
                    role="blockquote"
                    aria-label="Inspirational quote about data innovation"
                  >
                    Join a platform that transforms data into solutions.
                  </p>
                </div>
              </div>
              <a
                href="/learn-more"
                className="btn btn-outline-light mt-4 float-element"
                style={{ animationDelay: '0.4s', transition: 'all 0.3s ease' }}
                aria-label="Learn more about our data science platform"
              >
                Discover Now
              </a>
            </div>
          </div>
        </div>
      </div>
      <NioStickyBadge />
    </>
  );
}

export default AuthLayout1;