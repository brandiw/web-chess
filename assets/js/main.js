// Initialize Board
let boardState = JSON.parse(JSON.stringify(initialBoard))

// Declare global variables
let capturedPieces = []
let turnCount = 0
let selected = null
let whiteTime = 0
let blackTime = 0
let whiteTimer = null
let blackTimer = null
let showMoves = true
let checkState = null

// Draw initial board state
drawBoard(boardState)

// Set up event handling
setEvents(boardState)

// Start the time
startTimer()

// Set up toggle for showing moves
document.getElementById('showToggle').addEventListener('click', function() {
    showMoves = !showMoves
    document.getElementById('toggleStatus').textContent = showMoves ? 'On ✅' : 'Off ❌'
    if (!showMoves) {
        unHighlightMoves()
    }
    else {
        highlightMoves()
    }
})