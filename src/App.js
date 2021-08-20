import Board from './ui/Board'
import Controller from './ui/Controller'
import { GlobalStateProvider } from './GlobalStateProvider'
import './App.css'

function App() {
  return (
    <GlobalStateProvider>
      <div className="container">
        <div className="board">
          <Board size={30} />
        </div>
        <Controller />
      </div>
    </GlobalStateProvider>
  )
}

export default App
