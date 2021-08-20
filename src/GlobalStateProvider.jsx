import React, { createContext } from 'react'
import { useInterpret } from '@xstate/react'
import { boardMachine } from './state/machines'

export const GlobalStateContext = createContext({})

export const GlobalStateProvider = props => {
  const boardService = useInterpret(boardMachine)

  return (
    <GlobalStateContext.Provider value={{ boardService }}>
      {props.children}
    </GlobalStateContext.Provider>
  )
}
