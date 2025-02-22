import React from 'react';
import classNames from 'classnames';
import NioIcon from '../NioIcon/NioIcon';

export default function NioBadge({ className, size, icon, label, rounded, ...props }) {

  const compClasses = classNames({
    "badge fw-semibold text-uppercase": true,
    [`badge-${size}`]: size,
    "rounded-pill": rounded,
    [`${className}`]: className
  })

  return (
    <span className={compClasses} {...props}>
      {icon &&
        <NioIcon name={icon} className='me-1' />
      }
      {label && label}
    </span>
  )
}
