import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const MainPanel = (props) => (
  <Container
    marginBottom={props.marginBottom}
    paddingBottom={props.paddingBottom}
    backgroundColor={props.backgroundColor}
    withTopContent={props.topContent}
    border={props.border}
  >
    {props.children}
  </Container>
)

MainPanel.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  marginBottom: PropTypes.string,
  paddingBottom: PropTypes.string,
  backgroundColor: PropTypes.string.isRequired,
  smallMargin: PropTypes.bool,
  center: PropTypes.bool,
  topContent: PropTypes.element,
  border: PropTypes.bool,
}

MainPanel.defaultProps = {
  marginBottom: '0',
  paddingBottom: '40px',
  backgroundColor: '#edf6ff',
  smallMargin: false,
  center: false,
  border: false,
}

export default React.memo(MainPanel)

/**
 * Styles
 */

const Container = styled.div`
  padding-top: ${({ withTopContent }) => (withTopContent ? '0' : '20px')};
  background: ${(props) => props.backgroundColor};
  padding-bottom: ${(props) => props.paddingBottom};
  margin-bottom: ${(props) => props.marginBottom};
  position: relative;
  ${({ border, theme }) =>
    border &&
    css`
      border-bottom: 1px solid ${theme.colors.lightGrey};
    `};
  @media (max-width: ${(props) => props.theme.sizes.breakPoints.small}) {
    padding-top: 20px;
  }
  @media print {
    padding: 10px 0;
    margin: 0;
    background: transparent;
  }
`
