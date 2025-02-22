// context
import { useLayoutUpdate } from '../../../../context/LayoutProvider/LayoutProvider';

// components
import NioButton from '../../../NioButton/NioButton';


export default function HeaderAction({ buttonContent, className, nioBtnClasses, nioToggleClasses }) {

  const layoutUpdate = useLayoutUpdate();

  return (
    <div className={className}>
      <ul className="nk-btn-group sm justify-content-center">
        <li className="d-none d-md-block">
          <NioButton
            as="link"
            icon={buttonContent.icon || 'bag'}
            to={buttonContent.redirect || '/pricing'}
            label={buttonContent.label || 'Purchase Now'}
            className={nioBtnClasses}
          />
        </li>
        <li className="nk-navbar-toggle">
          <NioButton
            icon='menu'
            className={nioToggleClasses}
            onClick={layoutUpdate.headerMobile}
          />
        </li>
      </ul>
    </div>
  )
}
