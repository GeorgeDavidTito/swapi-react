import { css } from 'styled-components'

export const baseComponent = css`
  display: block;
  width: 100%;
  font-size: 14px;
  padding: 0 10px;
  height: ${(props) => props.theme.sizes.forms.inputHeight};
  @media (max-width: ${(props) => props.theme.sizes.breakPoints.small}) {
    font-size: 16px;
  }
`
