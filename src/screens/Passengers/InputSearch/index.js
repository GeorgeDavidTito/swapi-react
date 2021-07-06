import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../../../components/ui/Button'
import { VARIANTS } from '../../../components/ui/Button/constants'

const InputSearch = ({ filterAction }) => {
  const [filter, setFilter] = useState('')

  const handleSearch = () => {
    filterAction(filter?.toLowerCase())
  }

  return (
    <InputContainer>
      <Input
        type="text"
        placeholder="Buscar por nombre"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Button variant={VARIANTS.PRIMARY} onClick={handleSearch}>
        Buscar
      </Button>
    </InputContainer>
  )
}

export default InputSearch

/**
 * Styles
 */

const Input = styled.input`
  height: 44px;
  width: 60vw;
  font-size: 16px;
  padding: 1em;
  margin: 0 2em;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.cloudyBlue};
  background-color: white;
  color: ${({ theme }) => theme.colors.flatBlue};
  outline-color: ${({ theme }) => theme.colors.cloudyBlue};
  ::placeholder {
    color: ${({ theme }) => theme.colors.placeholderGrey};
  }
  @media (max-width: ${(props) => props.theme.sizes.breakPoints.small}) {
    font-size: 14px;
    width: 100%;
  }
`

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 16px;
`
