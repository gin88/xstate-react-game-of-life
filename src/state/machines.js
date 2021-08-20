import { Machine, assign } from 'xstate'
import { initBoard, calculateNextGrid } from '../utils'

const BOARD_SIZE = 30

export const cellMachine = Machine({
  id: 'cell',
  initial: 'dead',
  states: {
    alive: {
      on: {
        TICK: {
          target: 'dead',
          cond: (context, event) => {
            return event.neighbors !== 2 && event.neighbors !== 3
          },
        },
        TOGGLE: 'dead',
      },
    },
    dead: {
      on: {
        TICK: {
          target: 'alive',
          cond: (context, event) => {
            return event.neighbors === 3
          },
        },
        TOGGLE: 'alive',
      },
    },
  },
})

export const boardMachine = Machine({
  id: 'board',
  initial: 'paused',
  context: {
    interval: 500,
    grid: initBoard(BOARD_SIZE),
    elapsed: 0,
    size: BOARD_SIZE,
  },
  states: {
    paused: {
      on: {
        StartClicked: 'playing',
      },
    },
    playing: {
      on: {
        StopClicked: 'paused',
      },
      initial: 'idle',
      states: {
        idle: {
          after: {
            500: { target: 'doStep' },
          },
          update: {
            actions: assign({
              grid: (c, e) => e.grid,
            }),
          },
        },
        doStep: {
          after: {
            '': {
              target: 'idle',
              actions: [
                assign({
                  elapsed: context =>
                    +(context.elapsed + context.interval).toFixed(2),
                  grid: context =>
                    calculateNextGrid(context.grid, context.size),
                }),
              ],
            },
          },
        },
      },
    },
  },
})
