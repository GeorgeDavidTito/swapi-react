import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ScrollToTopOnMount from './ScrollToTopOnMount'

const Layout = ({ backgroundColor, children }) => {
  return (
    <Container>
      <ScrollToTopOnMount />
      <Main backgroundColor={backgroundColor}>{children}</Main>
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string.isRequired,
}

Layout.defaultProps = {
  backgroundColor: '#ffffff',
}

export default React.memo(Layout)

/**
 * Styles
 */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  position: relative;
`

const Main = styled.main`
  flex-grow: 1;
  margin: 0 auto;
  max-width: 1120px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.backgroundColor};
  padding-top: ${(props) => props.theme.sizes.layout.header};
  position: relative;
  @media (max-width: ${(props) => props.theme.sizes.breakPoints.small}) {
    padding-top: ${({ theme }) => theme.sizes.layout.smallHeader};
  }
`
