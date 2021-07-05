import styled, { css } from 'styled-components'
import { darken, lighten } from 'polished'
import { VARIANTS, SIZES } from './constants'

const styleForButton = (fontColor, backgroundColor) => css`
  background-color: ${backgroundColor};
  color: ${fontColor} !important;
  :hover {
    background: ${darken(0.1, backgroundColor)};
  }
`

const outlineStyle = css`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.cornflowerBlue};
  color: ${({ theme }) => theme.colors.cornflowerBlue};
  :hover {
    color: white;
    background: ${({ theme }) => darken(0.1, theme.colors.cornflowerBlue)};
  }
`

const outlineGreyStyle = css`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.warmGreyTwo};
  color: ${({ theme }) => theme.colors.warmGreyTwo};
  :hover {
    background-color: ${({ theme }) => lighten(0.35, theme.colors.warmGreyTwo)};
  }
`

const muttedStyle = css`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.cornflowerBlue};
  text-decoration: underline;
  :hover {
    color: ${({ theme }) => darken(0.1, theme.colors.cornflowerBlue)};
    background: transparent;
  }
`

const VARIANT_STYLES = {
  [VARIANTS.PRIMARY]: ({ theme }) =>
    styleForButton('white', theme.colors.cornflowerBlue),
  [VARIANTS.FACEBOOK]: ({ theme }) =>
    css`
      ${styleForButton('white', theme.colors.facebookBlue)};
      font-weight: normal;
    `,
  [VARIANTS.GOOGLE]: ({ theme }) =>
    css`
      ${styleForButton(theme.colors.black, theme.colors.white)};
      font-weight: normal;
    `,
  [VARIANTS.APPLE]: ({ theme }) =>
    css`
      ${styleForButton('white', theme.colors.black)};
      font-weight: normal;
    `,
  [VARIANTS.OUTLINE]: outlineStyle,
  [VARIANTS.OUTLINE_GREY]: outlineGreyStyle,
  [VARIANTS.MUTTED]: muttedStyle,
  [VARIANTS.FAILURE]: ({ theme }) =>
    styleForButton('white', theme.colors.carmine),
  [VARIANTS.SUCCESS]: ({ theme }) =>
    styleForButton('white', theme.colors.greenThree),
}

const normalStyle = css`
  max-width: 240px;
  height: auto;
`

const smallStyle = css`
  max-width: 170px;
  height: ${({ theme }) => theme.sizes.forms.buttonSmallHeight};
`

const SIZE_STYLES = {
  [SIZES.NORMAL]: normalStyle,
  [SIZES.SMALL]: smallStyle,
}

const StyledButton = styled.button`
  width: 100%;
  font-size: 14px;
  padding: 0.5em 1em;
  min-height: ${({ theme }) => theme.sizes.forms.buttonHeight};
  border-radius: 3px;
  font-weight: 600;
  border: 0;
  text-align: center;
  transition: all 0.2s;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  text-decoration: none !important;
  cursor: pointer;
  -webkit-appearance: initial;

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      max-width: 100%;
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
      pointer-events: none;
    `}

  ${({ $variant }) => VARIANT_STYLES[$variant || VARIANTS.PRIMARY]};
  ${({ $size }) => SIZE_STYLES[$size || SIZES.NORMAL]};

  @media (max-width: ${({ theme }) => theme.sizes.breakPoints.small}) {
    font-size: 16px;
  }
`

export { StyledButton }
