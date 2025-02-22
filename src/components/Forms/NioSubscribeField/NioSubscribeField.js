import classNames from 'classnames';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';

// custom hooks
import useRouteMatch from '../../../hooks/useRouteMatch';

// components 
import NioField from '../../NioField/NioField';
import NioButton from '../../NioButton/NioButton';
import NioToaster from '../../NioToaster/NioToaster';

export default function NioSubscribeField({ variant, icon, className, isTheme, rounded, children, ...props }) {

  const location = useLocation();
  const [showToaster, setShowToaster] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data)

    // clear field 
    reset()

    // Show the toaster
    setShowToaster(true);

    // Reset toaster state after a certain delay (e.g., 3 seconds)
    setTimeout(() => {
      setShowToaster(false);
    }, 3000); // Adjust the delay as needed


  };

  const compClasses = classNames({
    "form-group": true,
    "is-theme": isTheme,
    "nk-newsletter-one": variant === "one",
    "nk-newsletter-two": variant === "two",
    "nk-newsletter-three": variant === "three",
    "gap-0": useRouteMatch(["/index-bs-analytics"])
  });

  const iconClasses = classNames({
    [`${icon}`]: icon
  });

  const formControllWrapClasses = classNames({
    "mb-4 mb-md-0": useRouteMatch(["/index-bs-analytics"])
  });

  const formControllClasses = classNames({

    // bg color
    "bg-gray": useRouteMatch(["/index-saas"]),
    "bg-transparent text-white": useRouteMatch(["/index-crypto-profile"]),

    // padding
    "p-2 py-3": useRouteMatch(["/index-saas"]),
    "ps-0": useRouteMatch(["/index-crypto-profile"]),
    "p-4": useRouteMatch(["/index-collaboration-tool", "/index-saas"]),
    "p-3": !useRouteMatch(["/index-crypto-profile", "/index-collaboration-tool", "/index-saas"]),

    // border & radius
    "rounded-pill": useRouteMatch(["/index-saas"]),
    "rounded-1": useRouteMatch(["/index-live-chat-app"]),
    "border-dark": useRouteMatch(["/index-live-chat-app", "/index-language-learning"]),
    "rounded-3": useRouteMatch(["/index-kids-course", "/index-collaboration-tool"]),
    "border-0 rounded-0 border-bottom border-gray-800": useRouteMatch(["/index-crypto-profile"]),

  });


  const btnClassess = classNames({

    "btn btn-block h-100": useRouteMatch(["/index-analytics", "/index-kids-course", "/index-bs-expense-tracker", "/index-live-chat-app", "/index-bs-solution", "/index-bs-digital", "/index-crypto-profile", "/index-bs-management", "/index-bs-subscription", "/index-data-driven", "/index-language-learning", "/about", "/about-solution", "/features", "/features-solution", "/customer-testimonials", "/contact-us", "/contact-us-solution", "/pricing", "/pricing-solution", "/blogs", "/blog-details", "/help-center", "/help-center-details", "/terms-and-conditions", "/careers", "/career-details", "/404"]),

    // padding
    "py-4": useRouteMatch(["/index-bs-analytics"]),
    "py-3": useRouteMatch(["/index-data-driven", "/index-live-chat-app", "/index-collaboration-tool"]),
    "py-2 px-3 fs-16": useRouteMatch(["/index-bs-consulting"]),

    // border 
    "border-0 rounded-0": useRouteMatch(["/index-crypto-profile"]),

    // border radius
    "rounded-pill": rounded,
    "rounded-0": useRouteMatch(["/index-bs-analytics"]),
    "rounded-1": useRouteMatch(["/index-live-chat-app"]),
    "rounded-3": useRouteMatch(["/index-kids-course", "/index-bs-expennse-tracker"]),

    // bg
    "btn-info": useRouteMatch(["/index-bs-management"]),
    "btn-success-alt": useRouteMatch(["/index-live-chat-app"]),
    "btn-danger": useRouteMatch(["/index-bs-subscription"]),
    "btn-success": useRouteMatch(["/index-bs-digital"]),
    "btn-info-alt": useRouteMatch(["/index-language-learning"]),
    "btn-purple": useRouteMatch(["/index-kids-course", "/index-crypto-profile"]),
    "btn-primary": !useRouteMatch(["/index-bs-management", "/about-solution", "/index-live-chat-app", "/index-bs-subscription", "/index-bs-digital", "/index-language-learning", "/index-kids-course", "/index-crypto-profile"]),
    "btn-indigo": useRouteMatch(["/index-bs-solution", "/about-solution", "/contact-solution", "/features-solution", "/contact-us-solution", "/pricing-solution", "/index-collaboration-tool"]),
    "btn-primary-alt": useRouteMatch(["/index-bs-expense-tracker", "/index-saas", "/index-data-driven"]),

    [`${props.buttonclass}`]: props.buttonclass,
  });


  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} {...props}>
        {
          variant === "one" ?
            <Row className={compClasses}>
              <Col md={8} className={`${location.pathname === "/index-bs-analytics" ? "pe-md-0" : ""}`}>
                <NioField.Input
                  icon={iconClasses}
                  childClass={formControllClasses}
                  className={formControllWrapClasses}
                  {...register("email", {
                    required: "Field is Required",
                    pattern: {
                      value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "Invalid Email Address"
                    }
                  })}
                  placeholder={props.placeholder || "Enter Your Email"}
                />
              </Col>
              <Col md={4} className="ps-md-0 mt-3 mt-md-0">
                <input type="submit" className={btnClassess} value={props.buttontext || "Subscribe"} />
              </Col>
            </Row>
            :
            variant === "two" ?
              <div className="form-group nk-newsletter-two row">
                <div className="col-lg-8">
                  <div className="form-control-wrap mb-4 mb-lg-0">
                    <NioField.Input
                      icon={iconClasses}
                      placeholder={props.placeholder || "Enter Your Email"}
                      childClass={formControllClasses}
                      className={formControllWrapClasses}
                      {...register("email", {
                        required: "Field is Required",
                        pattern: {
                          value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                          message: "Invalid Email Address"
                        }
                      })}
                    />
                  </div>
                </div>
                <div className="col-lg-4 ps-lg-0">
                  <input type="submit" className={btnClassess} value="Subscribe" />
                </div>
              </div>
              :
              variant === "three" ?
                <div className={compClasses}>
                  <div className="form-control-wrap">
                    <NioField.Input
                      icon={iconClasses}
                      placeholder={props.placeholder || "Enter Your Email"}
                      childClass={formControllClasses}
                      className={formControllWrapClasses}
                      {...register("email", {
                        required: "Field is Required",
                        pattern: {
                          value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                          message: "Invalid Email Address"
                        }
                      })}
                    />
                    <NioButton
                      type="submit"
                      className={btnClassess}
                      label={props.buttontext || "Subscribe"}
                    />
                  </div>
                </div>
                :
                <>
                  {children}
                </>
        }
      </Form>
      {
        showToaster &&
        <NioToaster variant="success" messages={[{ id: 1, header: "Success", body: "You have successfully Subscribed" }]} />
      }

      {
        errors.email &&
        <NioToaster variant="error" messages={[{ id: 1, header: "Error", body: errors.email?.message }]} />
      }

    </>
  )
}
