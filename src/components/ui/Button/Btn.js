import PropTypes from 'prop-types'

import { StyledButton } from './styles'
import { SIZES, VARIANTS } from './constants'
import LoadingSpinner from '../../LoadingSpinner'

const Btn = ({
  children,
  variant,
  size,
  Icon,
  disabled,
  loading,
  onClick,
  ...props
}) => {
  const handleClick = (e) => {
    if (!disabled && !loading) {
      onClick && onClick()
    } else {
      e.preventDefault()
    }
  }

  return (
    <StyledButton
      onClick={handleClick}
      $variant={variant}
      $size={size}
      disabled={disabled}
      {...props}
    >
      {loading && (
        <LoadingSpinner small noMargin autoWidth color="currentColor" />
      )}
      {!loading && Icon && <Icon size="1em" style={{ marginRight: '0.5em' }} />}
      {!loading && children && <span>{children}</span>}
    </StyledButton>
  )
}

Btn.propTypes = {
  /**
   * Button text
   */
  children: PropTypes.node,
  /**
   * Type variant
   */
  variant: PropTypes.oneOf(Object.values(VARIANTS)),
  /**
   * Size of button
   */
  size: PropTypes.oneOf(Object.values(SIZES)),
  Icon: PropTypes.object,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
}

Btn.defaultProps = {
  variant: VARIANTS.PRIMARY,
  size: SIZES.NORMAL,
  loading: false,
  disabled: false,
  type: 'button',
}

export default Btn
