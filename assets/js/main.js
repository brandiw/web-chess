// Initialize Board
let boardState = JSON.parse(JSON.stringify(initialBoard))

// Declare global variables
let turnCount = 0
let selected = null
let whiteTime = 0
let blackTime = 0
let whiteTimer = null
let blackTimer = null

// Draw initial board state
drawBoard(boardState)

// Set up event handling
setEvents(boardState)

// Start the time
startTimer()