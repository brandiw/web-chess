// Initialize Board
let boardState = JSON.parse(JSON.stringify(initialBoard))

// Draw initial board state
drawBoard(boardState)

// Set up event handling
setEvents(boardState)