import React, { forwardRef, useEffect, useRef, useState } from 'react';
import Filterizr from 'filterizr';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

// hook
import { useData } from '../../context/DataProvider/DataProvider';

// custom hooks
import NioIcon from '../NioIcon/NioIcon';

export default function NioFilterTab({ className, children, ...props }) {

  const data = useData();
  const filterItems = data.landingpage.demo.contents;

  const filterizrRef = useRef(null);
  const filterContainerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const compClasses = classNames({
    "nk-filter": true
  });

  const isCategoryActive = (category) => {
    return activeCategory === category
  };

  const handleFilter = category => {
    setActiveCategory(category);
    if (filterizrRef.current) {
      filterizrRef.current.filter(category);
    }
  }

  useEffect(() => {

    filterizrRef.current = new Filterizr(filterContainerRef.current, {
      // Filterizr options and configuration go here
      gridItemsSelector: '.nk-filter-item',
    });

    // Cleanup function to destroy Filterizr instance
    return () => {
      if (filterizrRef.current) {
        filterizrRef.current.destroy()
      }
    };

  }, []);


  return (
    <div className={compClasses}>
      <Row className="justify-content-center pb-5 pb-lg-7">
        <Col lg={8}>
          <NioFilterTab.Menu>
            <li>
              <button className={classNames("nk-filter-control", { "active": isCategoryActive("all") })} onClick={() => handleFilter("all")}>
                <NioIcon name="menu-squared" className="fs-20" />
                <span> All </span>
              </button>
            </li>
            <li>
              <button className={classNames("nk-filter-control", { "active": isCategoryActive("business-page-item") })} onClick={() => handleFilter("business-page-item")}>
                <NioIcon name="briefcase" className="fs-20" />
                <span> Business </span>
              </button>
            </li>
            <li>
              <button className={classNames("nk-filter-control", { "active": isCategoryActive("tech-page-item") })} onClick={() => handleFilter("tech-page-item")}>
                <NioIcon name="cpu" className="fs-20" />
                <span> Tech </span>
              </button>
            </li>
            <li>
              <button className={classNames("nk-filter-control", { "active": isCategoryActive("app-page-item") })} onClick={() => handleFilter("app-page-item")}>
                <NioIcon name="mobile" className="fs-20" />
                <span> App </span>
              </button>
            </li>
            <li>
              <button className={classNames("nk-filter-control", { "active": isCategoryActive("saas-page-item") })} onClick={() => handleFilter("saas-page-item")}>
                <NioIcon name="cloud" className="fs-20" />
                <span> Saas </span>
              </button>
            </li>
          </NioFilterTab.Menu>
        </Col>
      </Row>
      <NioFilterTab.Content items={filterItems} ref={filterContainerRef} />

    </div>
  )
}


function nioFilterMenu({ className, menus, handleEvent, currentTab, ...props }) {

  const compClasses = classNames({
    "nk-filter-menu": true,
    [`${className}`]: className
  });

  const itemClasses = classNames({
    "nk-filter-control": true,
  });


  return (
    <ul className={compClasses}>
      {
        menus ? menus.map((menu, idx) => (
          <li key={idx}>
            <button className={classNames({ itemClasses }, { "active": currentTab(menu?.category || "all") })} onClick={() => handleEvent(menu?.category || "all")}>
              <em className={`icon fs-20 ni ni-${menu?.icon || "menu-squared"}`}></em>
              <span> {menu?.title || "Title Goes Here"} </span>
            </button>
          </li>
        )) :
          props.children
      }
    </ul>
  )
}



const nioFilterItems = forwardRef(function ({ className, items, children, ...props }, ref) {

  const compClasses = classNames({
    "nk-filter-container": true,
    [`${className}`]: className
  });

  const itemClasses = classNames({
    "nk-filter-item": true
  })

  return (
    <div ref={ref} className={compClasses}>
      <Row className="gy-5">
        {
          items && items.map((item, idx) => (
            <Col md={6} lg={4} className={itemClasses} data-category={item?.category} key={idx}>
              <Link to={item?.url} className="d-inline-block mb-5">
                <div className="overflow-hidden rounded-bottom-0 rounded-3 mb-3">
                  <img src={`images/landing/${item?.src}`} alt={item?.title} />
                </div>
                <h5 className="text-capitalize text-center">{item?.title || "Title Goes Here"}</h5>
              </Link>
            </Col>
          ))
        }
      </Row>
    </div>
  )
});

NioFilterTab.Menu = nioFilterMenu;
NioFilterTab.Content = nioFilterItems;
