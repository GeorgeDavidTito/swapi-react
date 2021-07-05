import React from 'react'
import ReactLoading from 'react-loading'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'

const LoadingSpinner = (props) => (
  <Container
    noMargin={props.noMargin}
    autoWidth={props.autoWidth}
    className={props.className}
  >
    {props.children && (
      <Text>
        <i>{props.children}</i>
      </Text>
    )}
    <ReactLoading
      type="spin"
      color={props.color || props.theme.colors.cornflowerBlue}
      width={props.small ? '1em' : '64px'}
      height={props.small ? '1em' : '64px'}
    />
  </Container>
)

LoadingSpinner.propTypes = {
  color: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  noMargin: PropTypes.bool,
  autoWidth: PropTypes.bool,
  small: PropTypes.bool,
}

LoadingSpinner.defaultProps = {
  autoWidth: false,
  small: false,
}
export default withTheme(React.memo(LoadingSpinner))

/**
 * Styles
 */

const Container = styled.div`
  width: ${(props) => (props.autoWidth ? 'auto' : '100%')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: ${(props) => (props.noMargin ? '0' : '20px 0')};
`

const Text = styled.p`
  text-align: center;
  color: ${(props) => props.theme.colors.cornflowerBlue};
`
