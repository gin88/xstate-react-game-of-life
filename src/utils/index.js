import sumBy from 'lodash/sumBy'

export const initBoard = size =>
  Array(size)
    .fill()
    .map(() => Array(size).fill(false))

export const findNeighbors = (myArray, i, j) => {
  const rowLimit = myArray.length - 1
  const columnLimit = myArray[0].length - 1
  const neighbors = []

  for (let x = Math.max(0, i - 1); x <= Math.min(i + 1, rowLimit); x++) {
    for (let y = Math.max(0, j - 1); y <= Math.min(j + 1, columnLimit); y++) {
      if (x !== i || y !== j) {
        neighbors.push(myArray[x][y])
      }
    }
  }
  return sumBy(neighbors, o => !!o)
}

export const calculateNextGrid = (grid, size) => {
  let newGrid = initBoard(size)
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const node = grid[i][j]
      const neighbors = findNeighbors(grid, i, j)
      if (node) {
        newGrid[i][j] = !(neighbors < 2 || neighbors > 3)
      } else {
        newGrid[i][j] = neighbors === 3
      }
    }
  }
  return newGrid
}
