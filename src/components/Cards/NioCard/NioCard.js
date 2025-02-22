import React from 'react';
import classNames from 'classnames';
import { Card } from 'react-bootstrap';

export default function NioCard({ className, children, ...props }) {

  const comClasses = classNames({
    [`nk-card card`]: true,
    [`${className}`]: className
  });

  return (
    <Card className={comClasses} {...props}>
      {children}
    </Card>
  )
};

function NioCardBody({ className, children, ...props }) {

  const compClasses = classNames({
    'card-body': true,
    [`${className}`]: className
  });

  return (
    <Card.Body className={compClasses} {...props}>
      {children}
    </Card.Body>
  )
}

NioCard.Body = NioCardBody;