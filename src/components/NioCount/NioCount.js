import React from 'react'
import classNames from 'classnames';
import { useCountUp } from 'react-countup'

export default function NioCount(
  { end,
    start,
    suffix,
    prefix,
    decimal,
    decimals,
    duration,
    children,
    className,
    scrollSpyOnce,
    enableScrollSpy,
    ...props
  }
) {

  const compClasses = classNames({
    "nk-count-up": true,
    [`${className}`]: className
  })

  const countUpRef = React.useRef(null);

  useCountUp({
    end: end || 0,
    start: start || 0,
    ref: countUpRef,
    decimal: decimal,
    decimals: decimals,
    suffix: suffix || "",
    prefix: prefix || "",
    duration: duration || 1.25,
    scrollSpyOnce: scrollSpyOnce || true,
    enableScrollSpy: enableScrollSpy || true,
  })
  return (
    <span className={compClasses} ref={countUpRef} {...props} ></span>
  )
}
