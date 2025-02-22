import classNames from 'classnames';
import { Link as ScrollLink } from 'react-scroll';
import { NavLink, Link, useLocation } from 'react-router-dom';

// context
import { useLayout, useLayoutUpdate } from '../../../../context/LayoutProvider/LayoutProvider';

// components
import NioIcon from '../../../NioIcon/NioIcon';
import NioButton from '../../../NioButton/NioButton';

export default function HeaderMenu({ data, className, handler, buttonContent }) {

  const layout = useLayout();
  const layoutUpdate = useLayoutUpdate();

  const compClasses = classNames({
    [`${className}`]: className,
  });

  return (
    <>

      {
        layout.headerActive &&
        <div className="navbar-overlay" onClick={layoutUpdate.headerMobile}></div>
      }

      <nav className={compClasses}>
        <div>
          <HeaderMenu.Nav data={data} handler={handler} />
          <div className="nk-navbar-btn d-lg-none">
            <ul className="nk-btn-group sm justify-content-center">
              <li className="w-100">
                <NioButton
                  as="link"
                  icon={buttonContent.icon || 'bag'}
                  to={buttonContent.redirect || '/pricing'}
                  label={buttonContent.label || 'Purchase Now'}
                  className={buttonContent.class + ' w-100'}
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

function NioNav({ data, className, handler }) {
  const location = useLocation(); // Get the current location

  const compClasses = classNames({
    "nk-nav": true,
    [`${className}`]: className
  });

  const navItemClasses = classNames({
    "nk-nav-item": true,
  });

  const navLinkClasses = classNames({
    "nk-nav-link": true,
  });

  return (
    <ul className={compClasses}>
      {data && data.map((menu, idx) => (
        <li
          key={idx}
          onClick={handler.menuToggle}
          className={navItemClasses + ` ${menu.item.submenu.items.length !== 0 ? 'has-sub' : ''}`}
        >
          {location.pathname === "/" ? (
            menu.item.url.startsWith('#') ? (
              <ScrollLink
                offset={-60}
                to={menu.item.url.slice(1)} // Remove the leading #
                className={navLinkClasses + ` ${menu.item.submenu.items.length !== 0 ? 'nk-nav-toggle' : ''}`}
              >
                <span className="nk-nav-text">{menu.item.title}</span>
              </ScrollLink>
            ) : (
              <Link
                to={menu.item.url}
                className={navLinkClasses + ` ${menu.item.submenu.items.length !== 0 ? 'nk-nav-toggle' : ''}`}
              >
                <span className="nk-nav-text">{menu.item.title}</span>
              </Link>
            )
          ) : (
            <Link
              to={menu.item.url}
              className={navLinkClasses + ` ${menu.item.submenu.items.length !== 0 ? 'nk-nav-toggle' : ''}`}
            >
              <span className="nk-nav-text">{menu.item.title}</span>
            </Link>
          )}

          <HeaderMenu.DropMenu data={menu.item.submenu} className={menu.item.mega && "nk-nav-mega-lg-home"} />
        </li>
      ))}
    </ul>
  );
}

function NioDropMenu({ className, data }) {

  const { media, items } = data;
  const compClases = classNames({
    "nk-nav-sub nk-nav-mega nk-nav-mega-lg": true,
    [`${className}`]: className,
  });

  return (
    <>
      {
        items.length !== 0 &&
        <ul className={compClases}>
          <li className="nk-nav-item col-lg-8">
            <ul className='row mx-auto'>
              {
                items.map((item, idx) => (
                  <li className="col-lg-4 p-0" key={idx}>
                    {
                      !item.color ?
                        <>
                          <NavLink to={item.url} className="nk-nav-link">
                            {item.title}
                          </NavLink>
                        </>
                        :
                        <>
                          <NavLink to={item.url} className="nk-nav-link">

                            <div className="media-group">
                              <div className={`text-${item.color} me-3`}>
                                <NioIcon name={item.icon} />
                              </div>

                              <div className="media-text sm">
                                <span className="lead-text">{item.title}</span>
                                <span className="sub-text m-0">{item.subtitle}</span>
                              </div>
                            </div>
                          </NavLink>
                        </>
                    }
                  </li>
                ))
              }
            </ul>
          </li>
          {
            // Promo Banner N:B It's Been Removal
            media &&
            <li className="nk-nav-item col-lg-4 nk-nav-media d-none d-lg-block">
              <Link to="https://themeforest.net/user/softnio/portfolio" traget="_blank">
                <img src="/images/promo-banner/promo-1.png" alt="promo-banner" className="rounded-3" />
              </Link>
            </li>
          }
        </ul>
      }
    </>
  )
}
HeaderMenu.Nav = NioNav;
HeaderMenu.DropMenu = NioDropMenu;
