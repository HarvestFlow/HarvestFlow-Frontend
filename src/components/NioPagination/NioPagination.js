import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

// components
import NioIcon from '../NioIcon/NioIcon';

export default function NioPagination({ className, pagination = [] }) {

  const compClasses = classNames({
    "pagination": true,
    [`${className}`]: className
  });

  return (
    <ul className={compClasses}>
      {
        pagination.length > 0 &&
        <li className="page-item">
          <Link to="#" className="page-link">
            <NioIcon name='chevron-left' />
            <span className="d-none d-sm-inline-block">Prev</span>
          </Link>
        </li>
      }

      {
        pagination.map((page, idx) => (
          <NioPagination.Item key={idx} activeIndex={idx === 3} label={page} />
        ))
      }

      {
        pagination.length > 0 &&
        <li className="page-item">
          <Link to="#" className="page-link">
            <span className="d-none d-sm-inline-block">next</span>
            <NioIcon name='chevron-right' />
          </Link>
        </li>
      }
    </ul>


  )
}


export function NioPaginationItem({ className, activeIndex, disable, label }) {

  const compClasses = classNames({
    [`page-item`]: true,
    [`disable`]: disable,
    [`active`]: activeIndex,
    [`${className}`]: className,
  })

  return (
    <li className={compClasses}>
      <Link to="#" className="page-link">
        {label}
      </Link>
    </li>
  )
}



NioPagination.Item = NioPaginationItem;