// Initialize Board
let boardState = JSON.parse(JSON.stringify(initialBoard))

// Declare global variables
let turnCount = 0
let selected = null

// Draw initial board state
drawBoard(boardState)

// Set up event handling
setEvents(boardState)