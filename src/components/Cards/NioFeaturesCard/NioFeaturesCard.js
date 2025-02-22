import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

// components
import NioCard from '../NioCard/NioCard';
import NioIcon from '../../NioIcon/NioIcon';
import NioMedia from '../../NioMedia/NioMedia';

export default function NioFeaturesCard({
  className,
  title,
  description,
  variant,
  icon,
  size,
  readmore,
  readLabel = 'Learn More',
  children,
  props }) {

  const comClasses = classNames({
    [`${className}`]: className,
  });

  const titleClasses = classNames({
    [`h2`]: size === 'xl',
    [`h3`]: size === 'lg',
    [`h4`]: size === 'md',
    [`h5`]: size === 'sm',
  })


  return (
    <NioCard className={comClasses} {...props}>
      <NioCard.Body>
        <div className="d-flex flex-column justify-content-between h-100">
          <NioMedia
            size='lg'
            icon={icon}
            variant={variant}
            className='mb-3 mb-md-5' type='circle'
          />
          <div className={titleClasses}>{title}</div>
          <p className={` ${size === 'lg' ? 'lead' : 'card-text'} m-0`}>
            {description}
          </p>
          {
            readmore &&
            <Link to={readmore} className="btn-link mt-2 mt-md-5">
              <span>{readLabel}</span>
              <NioIcon name='arrow-right' />
            </Link>
          }
        </div>
      </NioCard.Body>
      {children}
    </NioCard>
  )
}
