import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useActor, useMachine } from '@xstate/react'
import { cellMachine } from '../state/machines'
import { GlobalStateContext } from '../GlobalStateProvider'
import { findNeighbors } from '../utils'

const Cell = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${props => (props.isAlive ? 'black' : 'white')};
  border: 1px solid grey;
  cursor: pointer;
  position: absolute;
  top: ${props => props.size * props.row}px;
  left: ${props => props.size * props.col}px;
  box-sizing: border-box;
`

export default ({ col, row, size = 30, boardState }) => {
  const [cellState, sendCell] = useMachine(cellMachine)
  const isAlive = cellState.matches('alive')

  const globalServices = useContext(GlobalStateContext)
  const [state, send] = useActor(globalServices.boardService)

  const { grid } = state.context

  useEffect(() => {
    if (state.matches({ playing: 'doStep' })) {
      const neighbors = findNeighbors(grid, row, col)
      sendCell('TICK', { neighbors })
    }
  }, [state])
  return (
    <Cell
      isAlive={isAlive}
      col={col}
      row={row}
      size={size}
      onClick={() => {
        sendCell('TOGGLE')
        send('update', [...grid, (grid[row][col] = !grid[row][col])])
      }}
    />
  )
}
