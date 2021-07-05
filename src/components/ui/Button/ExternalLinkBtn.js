import styled from 'styled-components'
import Btn from './Btn'

const ExternalLinkBtn = styled(Btn).attrs(() => ({
  forwardedAs: 'a',
  type: null,
  rel: 'noopener noreferrer',
}))``

export default ExternalLinkBtn
