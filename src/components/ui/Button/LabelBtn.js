import styled, { css } from 'styled-components'

import Btn from './Btn'
import { VARIANTS } from './constants'

const LabelBtn = styled(Btn).attrs(() => ({
  forwardedAs: 'label',
  variant: VARIANTS.OUTLINE,
  type: null,
}))`
  cursor: pointer;
  width: 100%;
  max-width: 100%;
  background: transparent;
  font-size: 12px;
  margin-top: 7px;
  ${(props) =>
    props.warning &&
    css`
      color: ${(props) => props.theme.colors.carmine};
      border-color: ${(props) => props.theme.colors.carmine};
      :hover {
        color: white;
        background: ${(props) => props.theme.colors.carmine};
      }
    `}
`

export default LabelBtn
