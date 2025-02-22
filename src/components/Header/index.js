import classNames from 'classnames';
import { createPopper } from '@popperjs/core';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';

// context 
import { useLayout } from '../../context/LayoutProvider/LayoutProvider';


// config 
import config from '../../data/layout-config';


// utilities
import { GetParents, SlideDown, SlideUp } from '../../utilities';

// components 
import HeaderMenu from './components/HeaderMenu/HeaderMenu';
import HeaderMain from './components/HeaderMain/HeaderMain';
import HeaderLogo from './components/HeaderLogo/HeaderLogo';
import HeaderAction from './components/HeaderAction/HeaderAction';

export default function Header({ variant, data, className }) {

  const layout = useLayout();
  const history = useNavigate();
  const headerRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);

  // variables for Sidebar
  let menu = {
    classes: {
      main: 'nk-nav',
      item: 'nk-nav-item',
      link: 'nk-nav-link',
      toggle: 'nk-nav-toggle',
      sub: 'nk-nav-sub',
      subparent: 'has-sub',
      active: 'active',
      current: 'current-page'
    },
  };

  // variants of navbar 
  function filterDataByVariant(variantNumber) {
    return config.filter(item => item.variant === variantNumber);
  }

  const [variantsNav] = filterDataByVariant(variant || 1);

  // helper functions 

  let currentLink = function (selector) {
    let elm = document.querySelectorAll(selector);

    elm.forEach(function (item) {
      var activeRouterLink = item.classList.contains('active');
      if (activeRouterLink) {
        let parents = GetParents(item, `.${menu.classes.main}`, menu.classes.item);
        parents.forEach(parentElemets => {
          parentElemets.classList.add(menu.classes.active, menu.classes.current);
          let subItem = parentElemets.querySelector(`.${menu.classes.sub}`);
          subItem !== null && (subItem.style.display = "block")
        })
      } else {
        item?.parentElement.classList.remove(menu.classes.active, menu.classes.current);
      }
    });

  }

  let dropdownExtended = function (elm) {
    let nextelm = elm?.nextElementSibling;
    let headerCollapse = layout.headerCollapse ? layout.headerCollapse : layout.breaks.lg;
    // eslint-disable-next-line
    if (window.innerWidth > eval(`layout.breaks.${headerCollapse}`)) {
      let placement = GetParents(elm, `.${menu.classes.main}`, menu.classes.sub).length > 0 ? 'right-start' : 'bottom-start';
      createPopper(elm, nextelm, {
        placement: placement,
        boundary: '.nk-wrap',
      });
    }
  }


  let closeSiblings = function (elm) {

    let parent = elm?.parentElement;
    let parentElement = parent?.parentElement;
    let siblings = parentElement?.children;

    if (siblings) {
      Array.from(siblings).forEach(item => {
        if (item !== parent) {
          item?.classList.remove(menu.classes.active);
          if (item?.classList.contains(menu.classes.subparent)) {
            let subitem = item.querySelectorAll(`.${menu.classes.sub}`);
            subitem.forEach(child => {
              child?.parentElement?.classList.remove(menu.classes.active);
              SlideUp(child, 400);
            })
          }
        }
      });
    }

  }

  let dropdownToggle = function (elm) {
    let parent = elm?.parentElement;
    let nextelm = elm?.nextElementSibling;
    let speed = nextelm?.children.length > 5 ? 400 + nextelm?.children.length * 10 : 400;
    if (!parent?.classList.contains(menu.classes.active)) {
      parent?.classList.add(menu.classes.active);
      SlideDown(nextelm, speed);
    } else {
      parent?.classList.remove(menu.classes.active);
      SlideUp(nextelm, speed);
    }
  }

  let menuToggle = function (e) {
    e.preventDefault();
    let item = e.target.closest(`.${menu.classes.toggle}`)
    dropdownToggle(item);
    closeSiblings(item);
  }

  let menuHover = function (e) {
    e.preventDefault();
    let item = e.target.closest(`.${menu.classes.toggle}`)
    dropdownExtended(item);
  }

  // get current links  
  useEffect(() => {
    currentLink(`.${menu.classes.link}`)
    // eslint-disable-next-line
  }, [null])


  // navbar on scroll
  useEffect(() => {
    // Add event listener for popstate event
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Remove event listener when component unmounts
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    // Call handleScroll when the route changes
    handleScroll();
  }, [history.location]);

  const handleScroll = () => {
    // Check if window.scrollY is greater than 60
    const shouldFixHeader = window.scrollY > 60;

    // Update isFixed state based on the scroll position
    setIsFixed(shouldFixHeader);
  }

  // components classes
  const compClasses = classNames({
    [`nk-header`]: true,
    [`${className}`]: className
  });

  const headerMainClass = classNames({
    "nk-header-main nk-navbar-main": true,
    "has-separate": variantsNav?.header.border,
    "is-theme is-theme-bg": variantsNav?.header.dark,
    [`has-fixed bg-${variantsNav?.header.activeBg}`]: isFixed,
    "bg-transparent": variantsNav?.header.transparent && !isFixed,
    "shadow-xl": variantsNav?.header.activeBg === "white" && isFixed,
    [`bg-${variantsNav?.header.bgColor}`]: !variantsNav?.header.transparent && !isFixed,

  });

  const menuClasses = classNames({
    [`nk-header-menu nk-navbar`]: true,
    [`navbar-active`]: layout.headerActive,
    [`navbar-mobile`]: layout.headerTransition || eval(`layout.breaks.${layout.headerCollapse}`) > window.innerWidth,
  });

  const actionClasses = classNames({
    [`nk-header-action`]: true,
  });

  const toggleBtnClass = classNames({
    [`btn-outline-${variantsNav?.header.dark ? 'white' : variantsNav?.header.toggleDark ? 'dark' : 'gray-700'}`]: true,
    [`navbar-toggle rounded-1 p-2 h-100 p-2`]: true,
    [`active`]: layout.headerActive,
  });

  const nioBtnClasses = classNames({
    [`btn-${variantsNav?.header.actBtn.variant.type === 'outline' ?
      `outline-${variantsNav?.header.actBtn.variant.color}` : `${variantsNav?.header.actBtn.variant.color}`}`]: variantsNav?.header.actBtn,
    [`rounded-pill`]: variantsNav?.header.actBtn.rounded,
  });

  return (
    <header className={compClasses}>
      <HeaderMain className={headerMainClass} ref={headerRef}>
        <HeaderLogo />
        <HeaderMenu
          data={data.menus}
          handler={{ menuToggle, menuHover }}
          buttonContent={{
            "class": nioBtnClasses,
            "icon": variantsNav?.header.actBtn.icon,
            "label": variantsNav?.header.actBtn.label,
            "redirect": variantsNav?.header.actBtn.url,
          }}
          className={menuClasses}
        />
        <HeaderAction
          className={actionClasses}
          nioBtnClasses={nioBtnClasses}
          nioToggleClasses={toggleBtnClass}
          buttonContent={{
            "icon": variantsNav?.header.actBtn.icon,
            "label": variantsNav?.header.actBtn.label,
            "redirect": variantsNav?.header.actBtn.url,
          }}
        />

      </HeaderMain>
    </header>
  )
}

