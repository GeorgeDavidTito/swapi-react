import React from 'react'
import styled, { withTheme } from 'styled-components'
import PropTypes from 'prop-types'
import { Error } from '@styled-icons/material/Error'

const ErrorComponent = ({ message, theme }) => {
  return (
    <Container>
      <Error size={48} color={theme.colors.carmine} />
      <Message>{message}</Message>
    </Container>
  )
}

ErrorComponent.propTypes = {
  message: PropTypes.string.isRequired,
  retry: PropTypes.func,
}

export default withTheme(ErrorComponent)

/**
 * Styles
 */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4em auto;
  max-width: 520px;
`

const Message = styled.p`
  color: ${({ theme }) => theme.colors.carmine};
  text-align: center;
  font-size: 18px;
`
