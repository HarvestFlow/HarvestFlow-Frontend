import { forwardRef } from 'react';
import classNames from 'classnames';
import { Container } from 'react-bootstrap';

const HeaderMain = forwardRef((props, ref) => {

  const compClasses = classNames({
    [`${props.className}`]: props.className,
  });

  return (
    <div className={compClasses} {...props} ref={ref}>
      <Container>
        <div className="nk-header-wrap">
          {props.children}
        </div>
      </Container>
    </div>
  )
})

export default HeaderMain;