import classNames from 'classnames';
import { createPortal } from 'react-dom';
import Toast from 'react-bootstrap/Toast';
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-bootstrap';

// components
import NioIcon from '../NioIcon/NioIcon';

function NioToaster({ messages, variant, className }) {

  const [toastStates, setToastStates] = useState(
    messages.reduce((acc, curr) => {
      acc[curr.id] = true;
      return acc;
    }, {})
  );

  const handleToastClose = (id) => {
    setToastStates((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  useEffect(() => {
    const closeToastsOneByOne = () => {
      let timeout = 2400;
      for (const toast of messages) {
        if (toastStates[toast.id]) {
          setTimeout(() => {
            handleToastClose(toast.id);
          }, timeout);
          timeout += 1600; // Adjust this value for desired delay between toasts
        }
      }
    };

    closeToastsOneByOne();
  }, [messages, toastStates]);

  const compClasses = classNames({
    "nk-toast position-relative rounded-0": true,
    "nk-toast-error": variant === "error",
    "nk-toast-success": variant === "success",
    "nk-toast-warning": variant === "warning",
    [`${className}`]: className
  })

  const iconName = classNames({
    "check": variant === "success",
    "alert-fill": variant === "warning",
    "alert-circle-fill": variant === "error",
  });

  return createPortal(
    <>
      <ToastContainer className="position-fixed top-0 end-0 ">
        {messages.map((message) => (
          <Toast
            key={message.id}
            show={toastStates[message.id]}
            onClose={() => handleToastClose(message.id)}
            className={compClasses}
          >
            <div>
              <span className="nk-toast-icon">
                <NioIcon name={iconName} />
              </span>
            </div>
            <div className="nk-toast-info w-100 text-start">
              <h6 className="m-0 text-dark">{message.header}</h6>
              <p>{message.body}</p>
            </div>
            <button type="button" className="nk-toast-btn" onClick={() => handleToastClose(message.id)}>
              <NioIcon name='cross' />
            </button>
          </Toast>
        ))}
      </ToastContainer>
    </>,
    document.body
  );
}

export default NioToaster;
