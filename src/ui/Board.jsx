import React, { useContext } from 'react'
import { useActor } from '@xstate/react'
import { GlobalStateContext } from '../GlobalStateProvider'
import Cell from './Cell'

const Row = ({ cols, index, state }) => {
  return (
    <>
      {cols.map((col, i) => (
        <Cell col={i} row={index} isAlive={col} state={state} />
      ))}
    </>
  )
}

export default () => {
  const globalServices = useContext(GlobalStateContext)
  const [state] = useActor(globalServices.boardService)

  const { grid } = state.context

  return (
    <>
      {grid.map((cols, index) => (
        <Row cols={cols} index={index} state={state} />
      ))}
    </>
  )
}
