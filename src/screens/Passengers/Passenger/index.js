import React from 'react'
import styled, { css } from 'styled-components'
import Button from '../../../components/ui/Button'
import { VARIANTS } from '../../../components/ui/Button/constants'
import { removeItem } from '../../../slices/passengersSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectRemoveItemLoading } from '../../../slices/passengersSlice'
import LoadingSpinner from '../../../components/LoadingSpinner'

const Passenger = ({ item }) => {
  const dispatch = useDispatch()
  const loading = useSelector(selectRemoveItemLoading)

  const handleRemove = () => {
    dispatch(removeItem(item.name.toLowerCase()))
  }

  return (
    <Row key={item.name}>
      <LeftPanel>
        <Column>
          <NameItem> {item.name}</NameItem>
        </Column>
        <Column>
          <strong>Height: </strong>
          {item.height}
        </Column>
        <Column>
          <strong>Gender: </strong>
          {item.gender}
        </Column>
      </LeftPanel>
      <RightPanel>
        <Column>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <Button variant={VARIANTS.PRIMARY} onClick={handleRemove}>
              Eliminar
            </Button>
          )}
        </Column>
      </RightPanel>
    </Row>
  )
}

export default Passenger

/**
 * Styles
 */

const Column = styled.div`
  flex: 1;
  margin: 0 1em;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${(props) => props.theme.sizes.breakPoints.small}) {
    margin: 5px 0 0 0;
    ${({ big }) =>
      big &&
      css`
        font-weight: bold;
        font-size: 1.1em;
      `};
  }
`

const NameItem = styled.div`
  font-size: 16px;
  font-weight: 700;
  padding: 4px 0px;
`

const Row = styled.div`
  background-color: #ffffff;
  border: 1px solid ${(props) => props.theme.colors.lightGrey};
  border-radius: 6px;
  margin-bottom: 10px;
  padding: 12px;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.greyishBrownTwo};
  font-size: 14px;
  text-decoration: none;
  justify-content: space-between;

  &:last-child {
    margin-bottom: 0;
  }
  @media (max-width: ${(props) => props.theme.sizes.breakPoints.small}) {
    font-size: 14px;
    padding: 10px 14px;
    margin-bottom: 8px;
    align-items: stretch;
  }
`

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`
