import React from 'react';
import classNames from 'classnames';

export default function NioIcon({ className, name, size, variant }) {
  const comClass = classNames({
    [`icon-${size}`]: size,
    [`icon ni ni-${name}`]: true,
    [`text-${variant}`]: variant,
    [`${className}`]: className,
  })
  return (
    <em className={comClass}></em>
  )
}
