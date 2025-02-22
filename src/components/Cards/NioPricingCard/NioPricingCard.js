import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

// components
import NioIcon from '../../NioIcon/NioIcon';
import NioBadge from '../../NioBadge/NioBadge';
import NioButton from '../../NioButton/NioButton';
import useRouteMatch from '../../../hooks/useRouteMatch';

export default function NioPricingCard({
  className,
  active,
  variant = "one",
  icon,
  title,
  subtitle,
  description,
  price,
  priceType,
  pricing,
  children,
  features,
  ...props }) {

  const location = useLocation();

  const compClasses = classNames({
    "nk-pricing": true,
    "active": active,

    // variants
    "nk-pricing-s1 p-5": variant === "one",
    "nk-pricing-s2 p-5": variant === "two",
    "nk-pricing-s3": variant === "three",
    "nk-pricing-s4": variant === "four",

    // border
    "border border-2 border-indigo": active && location.pathname === "/index-bs-solution",
    "border border-2 border-success": active && location.pathname === "/index-bs-digital",
    "border border-2 border-primary-alt": active && location.pathname === "/index-bs-subscription",
    "border border-lighter": (!active && location.pathname === "/index-bs-subscription") || (!active && location.pathname === "/index-bs-solution") || location.pathname === "/index-saas",

    // border radius
    "rounded-4": useRouteMatch(["/index-saas"]),

    // bg color
    "bg-gray-100": useRouteMatch(["/index-saas"]),
    "bg-primary-alt": (active && location.pathname === "/index-bs-expense-tracker") || (active && location.pathname === "/index-data-driven"),
    "bg-info": active && location.pathname === "/index-bs-management",
    "bg-white": (location.pathname === "/index-bs-solution" && variant === "two") || (location.pathname === "/index-bs-digital" && variant === "two") || (location.pathname === "/index-bs-subscription" && variant === "two"),

    [`${className}`]: className,

  });


  const wrapBadgeClasses = classNames({
    "nk-pricing-badge-wrap p-5": true,
    "bg-warning": useRouteMatch(["/index-bs-digital"]),
    "bg-info": useRouteMatch(["/index-bs-management"]),
    "bg-primary-alt": useRouteMatch(["/index-bs-expense-tracker", "/index-data-driven"]),
  });

  const badgeClasses = classNames({
    "text-bg-warning": useRouteMatch(["/index-bs-solution", "/index-bs-subscription", "/index-bs-digital"])
  });


  const pricingbtnBgClasses = classNames({
    "btn-block": true,

    // border
    "border-2": useRouteMatch(["/", "/index-bs-solution"]),

    // border radius
    "rounded-pill": useRouteMatch(["/index-saas"]),

    // btn color 
    "btn-indigo": location.pathname === "/index-bs-solution" && active,
    "btn-outline-indigo": location.pathname === "/index-bs-solution" && !active,
    "btn-success": location.pathname === "/index-bs-digital" && active,
    "btn-outline-dark": location.pathname === "/index-bs-digital" && !active,
    "btn-outline-info": location.pathname === "/index-bs-management" && !active,
    "btn-white text-dark": active && location.pathname === "/index-bs-expense-tracker",
    "btn-outline-primary": (location.pathname === "/" && !active) || (location.pathname === "/index-bs-subscription" && !active),
    "btn-primary-alt": (location.pathname === "/index-saas" && active) || (location.pathname === "/index-bs-subscription" && active),
    "btn-dark": (location.pathname === "/index-bs-management" && active) || (location.pathname === "/index-data-driven" && active),
    "btn-outline-primary-alt": (location.pathname === "/index-saas" && !active) || (!active && location.pathname === "/index-bs-expense-tracker") || (!active && location.pathname === "/index-bs-subscription") || (!active && location.pathname === "/index-data-driven"),

  });

  const pricingbtnOutlineClasses = classNames({
    "btn-block": true,
    "btn-gray border border-lighter": useRouteMatch(["/index-bs-digital", "/index-bs-subscription"]),

    [`${useRouteMatch(["/index-bs-solution", "/index-project-management"]) ? "btn-gray-500 text-gray-900" : "btn-outline-light border-lighter text-dark"}`]: true
  });


  const listIconClasses = classNames({
    "me-1": true,

    // text-color
    "text-indigo": useRouteMatch(["/index-bs-solution"]),
    "text-bg-success-soft": useRouteMatch(["/index-saas"]),
    "text-primary-alt": useRouteMatch(["/index-bs-subscription"]),
    "text-dark": location.pathname === "/index-bs-digital" && !active,
    "text-success": location.pathname === "/index-bs-digital" && active,
    "text-bg-info-soft": location.pathname === "/index-bs-management" && !active,
    "text-bg-primary-alt-soft": useRouteMatch(["/index-bs-expense-tracker", "/index-saas", "/index-data-driven"]),
  });

  const iconClasses = classNames({
    "text-primary-alt": useRouteMatch(["/index-saas"])
  });

  return (
    <div className={compClasses} {...props}>
      {
        variant === "one" ?
          <>
            {
              active &&
              <div className={wrapBadgeClasses}>
                <NioBadge
                  rounded
                  size="md"
                  variant="white"
                  label="Most Popular"
                  className="fs-12 text-bg-white"
                />
              </div>
            }
            <NioPricingCard.Head variant={variant}>
              <div className="amount-wrap">
                <span className={`amount ${location.pathname === "/index-bs-management" || "/index-data-driven" ? "h3" : "h2"}  mb-0`}>
                  ${price || 0}
                </span>
                <span className="amount-text fs-16">
                  /{priceType || 'month'}
                </span>
              </div>
            </NioPricingCard.Head>
            <NioPricingCard.Body>
              <div className="mb-4">
                {
                  location.pathname === "/index-bs-management" || "/index-bs-expense-tracker" ?
                    <h5 className="title">{title || 'Package Title'}</h5> :
                    <h4 className="title">{title || 'Package Title'}</h4>
                }
                <p className="fs-16 m-0">
                  {subtitle || 'package subtitle content goes here '}
                </p>
              </div>
              <ul className="nk-list-link fw-medium">
                {
                  features ? features.map((feature, idx) => (
                    <li className={active || feature.active ? 'active' : 'muted'} key={idx}>
                      <NioIcon name="check" className={listIconClasses} />
                      <span className="fs-14">{feature.title}</span>
                    </li>
                  )) :
                    <li className="active">
                      <NioIcon name="check" className={listIconClasses} />
                      <span className="fs-14">Unlimited users</span>
                    </li>
                }
              </ul>
              <div className="pt-4">
                <NioButton className={pricingbtnBgClasses} label="Choose Plan" />
              </div>
            </NioPricingCard.Body>
          </> :
          variant === "two" ?
            <>
              <NioPricingCard.Head variant={variant} className="pb-4">
                <div className="nk-pricing-title-group mb-2">
                  <h5 className="title mb-1">
                    {title || 'Package Title'}
                  </h5>
                  {
                    active &&
                    <NioBadge
                      rounded
                      label='Popular'
                      className={badgeClasses}
                    />
                  }
                </div>
                <div className="amount-wrap">
                  <span className="amount h1 mb-0">
                    <sub>$</sub>{price || '0'}</span>
                  <span className="amount-text">/per {priceType || 'monthly'}</span>
                </div>
                <p className="fs-18 fw-medium mt-2">{subtitle || 'Subtitle Content Goes Here'}</p>
              </NioPricingCard.Head>

              <NioPricingCard.Body>
                <ul className="gap g-3">
                  <li>
                    <NioButton
                      href="#"
                      label="Get Started"
                      className={pricingbtnBgClasses}
                    />
                  </li>
                  <li>
                    <NioButton
                      href="#"
                      label="Learn More"
                      className={pricingbtnOutlineClasses}
                    />
                  </li>
                </ul>
                <ul className="nk-list-link border-top border-lighter pt-4 mt-5">
                  {
                    features ? features.map((feature, idx) => (
                      <li className={active || feature.active ? 'active' : 'muted'} key={idx}>
                        <NioIcon name='check-circle-fill' className={listIconClasses} />
                        <span className="fs-16">{feature.title}</span>
                      </li>
                    )) :
                      <li className="muted">
                        <NioIcon name='check-circle-fill' className={listIconClasses} />
                        <span className="fs-16">Complete documentation</span>
                      </li>
                  }
                </ul>
              </NioPricingCard.Body>
            </> :
            variant === "three" ?
              <>
                <NioPricingCard.Head variant={variant}>
                  <div className="nk-pricing-title-group mb-2">
                    <h4 className="title mb-0">{title || "package Title"}</h4>
                    {
                      active &&
                      <NioBadge
                        rounded
                        size='md'
                        icon='star-fill'
                        label='Popular'
                        className='text-bg-white text-uppercase text-primary'
                      />
                    }
                  </div>
                  <p className="text text-2">
                    {
                      description || "package description content goes here"
                    }
                  </p>
                </NioPricingCard.Head>
                <NioPricingCard.Body>
                  <ul className="nk-list-link">
                    {
                      features ? features.map((feature, idx) => (
                        <li className={active || feature.active ? 'active' : 'muted'} key={idx}>
                          <NioIcon name={active ? 'check-circle-fill' : 'check-circle'} className='me-1' />
                          <span>{feature.title}</span>
                        </li>
                      )) :
                        <li className="active">
                          <NioIcon name='check-circle' className='me-1' />
                          <span>Everything on Startup plan</span>
                        </li>
                    }

                  </ul>
                  <div className="nk-month-amount amount-wrap pt-4 mt-auto">
                    <span className="amount h3 mb-0">${price || 10}.00 USD</span>
                    <span className="amount-text opacity-75">/{priceType || 'month'}</span>
                  </div>
                  <div className="pt-4">
                    <NioButton
                      to='#'
                      as="link"
                      outline='primary'
                      label='Get Started'
                      className='btn-block'
                    />
                  </div>
                </NioPricingCard.Body>
              </> :
              variant === "four" ?
                <>
                  <div className="nk-pricing-head">
                    <div className="icon">
                      <img src={icon} alt="icon" />
                    </div>
                    <div className="info">
                      {
                        title &&
                        <div className='title'>{title || 'Package Title'}</div>
                      }
                      {
                        subtitle &&
                        <span className='subtitle'>{subtitle || 'Package Subtitle Content Goes Here'}</span>
                      }
                    </div>
                  </div>
                  <div className="nk-pricing-body">
                    <div className="price-tag">
                      ${price || 0} <span>/{priceType || 'user'}</span>
                    </div>
                    <ul className="nk-pricing-info">
                      {
                        features ? features.map((feature, idx) => (
                          <li key={idx}>
                            <p className={active || feature.active ? 'active' : 'mute'} >{feature.title}</p>
                          </li>
                        )) :
                          <li>
                            <p className="mute">120+ Message all Operator</p>
                          </li>
                      }

                    </ul>
                    <div className="card-pricing-action">
                      <button
                        to="#"
                        className={`btn w-100 ${active ? 'btn-primary' : 'btn-outline-primary'} `}
                      >
                        <span>Choose Plan</span>
                        <NioIcon name='arrow-right' />
                      </button>
                    </div>
                  </div>
                </> :
                variant === "five" ?
                  <>
                    <NioPricingCard.Head variant={variant}>
                      <div className="nk-pricing-title-group mb-2">
                        <div className="d-flex align-items-center">
                          <NioIcon name={icon} className={iconClasses} />
                          <h3 className="mb-0">{title || 'Package Title'}</h3>
                        </div>
                        {
                          active &&
                          <NioBadge rounded className="text-bg-dark" label="Popular" />
                        }
                      </div>
                      <p className="fs-20 text-capitalize fw-semibold">
                        {subtitle}
                      </p>
                    </NioPricingCard.Head>
                    <NioPricingCard.Body>
                      <div className="amount-wrap mb-2">
                        <span className="amount h2 mb-0">${price}</span>
                        <span className="amount-text">/{priceType}</span>
                      </div>
                      <p className="fs-18">
                        {description}
                      </p>
                      <ul className="nk-list-link">
                        {
                          features ? features.map((feature, idx) => (
                            <li className={active || feature.active ? 'active' : 'muted'} key={idx}>
                              <NioIcon name="check-circle-fill" className={listIconClasses} />
                              <span>{feature.title}</span>
                            </li>
                          )) :
                            <li className="active">
                              <NioIcon name='check-circle-fill' className={listIconClasses} />
                              <span>Everything in Free Plan</span>
                            </li>}
                      </ul>
                      <div className="pt-4">
                        <NioButton
                          href="/contact-us"
                          label={props.buttonlabel || "Get Started"}
                          className={pricingbtnBgClasses}
                        />
                      </div>

                    </NioPricingCard.Body>
                  </> :
                  <>
                    {children}
                  </>
      }
    </div>
  )
};


export function NioPricingHead({ variant, className, children }) {

  const location = useLocation();

  const compClasses = classNames({
    [`nk-pricing-head`]: true,
    [`
    ${variant === "one" ?
        `${location.pathname === "/index-bs-expense-tracker" || "/index-bs-management" ? "mb-3" : "mb-1"}` :
        variant === "two" ?
          'pb-4' :
          variant === "three" ?
            'mb-3 mb-md-4' :
            variant === "four" ?
              '' :
              variant === 'five' ?
                'mb-4' : null
      }
    `]: variant,
    [`${className}`]: className
  });

  return (
    <div className={compClasses}>
      {children}
    </div>
  )
}

export function NioPricingBody({ className, children }) {

  const compClasses = classNames({
    [`nk-pricing-body`]: true,
    [`${className}`]: className
  });

  return (
    <div className={compClasses}>
      {children}
    </div>
  )
}

NioPricingCard.Head = NioPricingHead;
NioPricingCard.Body = NioPricingBody;