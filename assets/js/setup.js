class Piece {
    constructor(color, name, abbrev, startLoc) {
        this.name = name
        this.abbrev = abbrev
        this.startLoc = startLoc
        this.currentLoc = startLoc
        this.color = color
    }
}

const initialBoard = [
    [new Piece('black', 'rook', 'brook', ['a', 1]), new Piece('black', 'pawn', 'bpawn', ['a', 2]), , , , , new Piece('white', 'pawn', 'wpawn', ['a', 7]), new Piece('white', 'rook', 'wrook', ['a', 8])],
    [new Piece('black', 'knight', 'bknight', ['b', 2]), new Piece('black', 'pawn', 'bpawn', ['b', 2]), , , , , new Piece('white', 'pawn', 'wpawn', ['b', 7]), new Piece('white', 'knight', 'wknight', ['b', 8])],
    [new Piece('black', 'bishop', 'bbishop', ['c', 3]), new Piece('black', 'pawn', 'bpawn', ['c', 2]), , , , , new Piece('white', 'pawn', 'wpawn', ['c', 7]), new Piece('white', 'bishop', 'wbishop', ['c', 8])],
    [new Piece('black', 'king', 'bking', ['d', 4]), new Piece('black', 'pawn', 'bpawn', ['d', 2]), , , , , new Piece('white', 'pawn', 'wpawn', ['d', 7]), new Piece('white', 'king', 'wking', ['d', 8])],
    [new Piece('black', 'queen', 'bqueen', ['e', 5]), new Piece('black', 'pawn', 'bpawn', ['e', 2]), , , , , new Piece('white', 'pawn', 'wpawn', ['e', 7]), new Piece('white', 'queen', 'wqueen', ['e', 8])],
    [new Piece('black', 'bishop', 'bbishop', ['f', 6]), new Piece('black', 'pawn', 'bpawn', ['f', 2]), , , , , new Piece('white', 'pawn', 'wpawn', ['f', 7]), new Piece('white', 'bishop', 'wbishop', ['f', 8])],
    [new Piece('black', 'knight', 'bknight', ['g', 7]), new Piece('black', 'pawn', 'bpawn', ['g', 2]), , , , , new Piece('white', 'pawn', 'wpawn', ['g', 7]), new Piece('white', 'knight', 'wknight', ['g', 8])],
    [new Piece('black', 'rook', 'brook', ['h', 8]), new Piece('black', 'pawn', 'bpawn', ['h', 2]), , , , , new Piece('white', 'pawn', 'wpawn', ['h', 7]), new Piece('white', 'rook', 'wrook', ['h', 8])]
]
const pieces = {
    'brook': '♜', 
    'bbishop': '♝',
    'bknight': '♞', 
    'bqueen': '♛',
    'bking': '♚',
    'brook': '♜',
    'bpawn': '♟',
    'wrook': '♖', 
    'wbishop': '♗',
    'wknight': '♘', 
    'wqueen': '♕',
    'wking': '♔',
    'wpawn': '♙',
    '': ''
}

const rows = {
    1: 'a',
    2: 'b',
    3: 'c',
    4: 'd',
    5: 'e',
    6: 'f',
    7: 'g', 
    8: 'h'
}

const reverseRows = {
    'a': 1,
    'b': 2,
    'c': 3,
    'd': 4,
    'e': 5,
    'f': 6,
    'g': 7, 
    'h': 8
}

function drawBoard(boardState) {
    for (let i = 0; i < boardState.length; i++) {
        for (let j = 0; j < boardState[i].length; j++) {
            if (boardState[i][j]) {
                document.getElementById(`${rows[i+1]}${j+1}`).textContent = pieces[boardState[i][j].abbrev]
                document.getElementById(`${rows[i+1]}${j+1}`).setAttribute('data-content', boardState[i][j].abbrev)
            }
        }
    }
}

function setEvents(boardState) {
    for (let i = 0; i < boardState.length; i++) {
        for (let j = 0; j < boardState[i].length; j++) {
            document.getElementById(`${rows[i+1]}${j+1}`).addEventListener('click', squareClick)
        }
    }
}

function startTimer() {
    timer = setInterval(tick, 1000)
}

function tick() {
    if (turnCount % 2 === 0) {
        whiteTime += 1
        let seconds = whiteTime % 60
        let minutes = Math.floor(whiteTime / 60)
        seconds = seconds < 10 ? '0' + seconds : seconds
        minutes = minutes < 10 ? '0' + minutes : minutes
        document.getElementById('white-time-seconds').textContent = seconds
        document.getElementById('white-time-minutes').textContent = minutes
    }
    else {
        blackTime += 1
        let seconds = blackTime % 60
        let minutes = Math.floor(blackTime / 60)
        seconds = seconds < 10 ? '0' + seconds : seconds
        minutes = minutes < 10 ? '0' + minutes : minutes
        document.getElementById('black-time-seconds').textContent = seconds
        document.getElementById('black-time-minutes').textContent = minutes
    }
}

function selectFromBoard(loc) {
    let letter = reverseRows[loc[0]]
    let num = loc[1]

    return boardState[letter-1][num-1]
}

function moveOnBoard(startLoc, endLoc) {
    let startLetter = reverseRows[startLoc[0]]
    let startNum = startLoc[1]
    let endLetter = reverseRows[endLoc[0]]
    let endNum = endLoc[1]
    
    // Swap
    let temp = boardState[startLetter-1][startNum-1]
    boardState[endLetter-1][endNum-1] = temp
    boardState[startLetter-1][startNum-1] = null

    console.log('board state is...', boardState)
}