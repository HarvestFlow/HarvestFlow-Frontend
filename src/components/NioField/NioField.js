import classNames from 'classnames';
import React, { forwardRef, useState } from 'react';
import NioIcon from '../NioIcon/NioIcon';


// Helping Function
const Field = forwardRef(({ icon, type, id, inputClasses, placeholder, field, ...props }, ref) => {

  const [inputType, setInputType] = useState(type);

  if (icon) {
    const [name, position = "before", _class = ""] = icon.split(" ");
    const isEyeFill = icon.includes("eye-fill");

    const handleTypeChange = () => {
      if (type !== "text") {
        setInputType(prevType => prevType === "password" ? "text" : "password")
      }
    };

    return (
      <>
        {position === "before" && (
          <>
            <div
              onClick={handleTypeChange}
              className={`form-control-icon ${position} ${_class}`}>
              <NioIcon name={isEyeFill ? (inputType === "password" ? `eye-fill ${position} ${_class}` : `eye-off-fill ${position} ${_class}`) : name} />
            </div>
            <input
              id={id}
              ref={ref}
              type={inputType}
              className={inputClasses}
              placeholder={placeholder}
              {...props}
            />
          </>
        )}

        {position === "after" && (
          <>
            <input
              id={id}
              ref={ref}
              type={inputType}
              className={inputClasses}
              placeholder={placeholder}
              {...props}
            />
            <div
              onClick={handleTypeChange}
              className={`form-control-icon ${position} ${_class}`}>
              <NioIcon name={isEyeFill ? (inputType === "password" ? `eye-fill ${position} ${_class}` : `eye-off-fill ${position} ${_class}`) : name} />
            </div>
          </>
        )}

      </>
    );
  } else {
    return (
      <input
        id={id}
        ref={ref}
        type={type}
        className={inputClasses}
        placeholder={placeholder}
        {...props}
      />
    );
  }
});

const FieldInput = forwardRef(({ className, childClass, icon, id, type = "text", placeholder = "Placeholder Content", errors, ...props }, ref) => {

  const compClasses = classNames({
    "form-control-wrap": true,
    "nk-error": errors,
    [`${className}`]: className
  });

  const inputClasses = classNames({
    "form-control": true,
    "pe-7": icon?.includes("after"),
    "ps-7": icon?.includes("before"),
    [`${childClass}`]: childClass
  });


  return (
    <div className={compClasses}>
      {icon ? (
        <Field
          id={id}
          ref={ref}
          icon={icon}
          type={type}
          inputClasses={inputClasses}
          placeholder={placeholder}
          {...props}
        />
      ) : (
        <input
          id={id}
          ref={ref}
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          {...props}
        />
      )}
      {
        errors &&
        <span className="nk-message text-capitalize nk-message-error">{errors?.message}</span>
      }
    </div>
  );
});

const CheckField = React.forwardRef(({ className, id, children, labelPosition = "before", ...props }, ref) => {
  const compClasses = classNames({
    "form-check": true,
    [`${className}`]: className
  });

  const inputElement = (
    <>
      <input
        id={id}
        ref={ref}
        type="checkbox"
        className="form-check-input"
        {...props}
      />
      {children && <label className="form-check-label" htmlFor={id}>{children}</label>}
    </>
  );

  if (labelPosition === "before") {
    return (
      <div className={compClasses}>
        {children && inputElement}
      </div>
    );

  } else {
    return (
      <div className={compClasses}>
        {inputElement}
        {children && <label className="form-check-label" htmlFor={id}>{children}</label>}
      </div>
    );
  }
})

export default function NioField({ className, label, htmlFor, children, ...props }) {

  const compClasses = classNames({
    "nk-form-group": true,
    [`${className}`]: className
  });

  return (
    <div className={compClasses}>
      {
        label && <label htmlFor={htmlFor} className="form-label">{label}</label>
      }
      {children}
    </div>
  )
}

NioField.Input = FieldInput;
NioField.Check = CheckField;