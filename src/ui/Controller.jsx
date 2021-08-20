import React, { useContext } from 'react'
import styled from 'styled-components'
import { useActor } from '@xstate/react'
import { GlobalStateContext } from '../GlobalStateProvider'

const Controller = styled.button`
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 100;
  box-shadow: inset 0px 34px 0px -15px #b54b3a;
  background-color: #a73f2d;
  border: 1px solid #241d13;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 9px 23px;
  text-decoration: none;
  text-shadow: 0px -1px 0px #7a2a1d;

  &:hover {
    background-color: #b34332;
  }
  &:active {
    right: 19px;
    top: 22px;
  }
`

const MonitorBox = styled.div`
  width: 260px;
  height: 260px;
  border: 1px solid blue;
  position: fixed;
  top: 80px;
  right: 20px;
  padding: 20px;
`

export default () => {
  const globalServices = useContext(GlobalStateContext)
  const [state, send] = useActor(globalServices.boardService)

  const { context, value } = state
  const { interval, elapsed } = context
  return (
    <>
      {state.matches('paused') && (
        <Controller onClick={() => send('StartClicked')}>Play</Controller>
      )}
      {state.matches('playing') && (
        <Controller onClick={() => send('StopClicked')}>Stop</Controller>
      )}
      <MonitorBox>
        <b>State</b>: {JSON.stringify(value)}
        <br />
        <b>Interval</b>: {interval} <br />
        <b>Elapsed</b>: {elapsed} <br />
      </MonitorBox>
    </>
  )
}
