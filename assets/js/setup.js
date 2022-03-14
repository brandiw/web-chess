const initialBoard = [
    [['brook'], ['bpawn'], [], [''], [''], [''], ['wpawn'], ['wrook']],
    [['bbishop'], ['bpawn'], [''], [''], [''], [''], ['wpawn'], ['wbishop']],
    [['bknight'], ['bpawn'], [''], [''], [''], [''], ['wpawn'], ['wknight']],
    [['bqueen'], ['bpawn'], [''], [''], [''], [''], ['wpawn'], ['wqueen']],
    [['bking'], ['bpawn'], [''], [''], [''], [''], ['wpawn'], ['wking']],
    [['bknight'], ['bpawn'], [''], [''], [''], [''], ['wpawn'], ['wknight']],
    [['bbishop'], ['bpawn'], [''], [''], [''], [''], ['wpawn'], ['wbishop']],
    [['brook'], ['bpawn'], [''], [''], [''], [''], ['wpawn'], ['wrook']]
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

function drawBoard(boardState) {
    for (let i = 0; i < boardState.length; i++) {
        for (let j = 0; j < boardState[i].length; j++) {
            console.log('at', `${rows[i+1]}${j+1}`, 'putting', boardState[i][j])
            document.getElementById(`${rows[i+1]}${j+1}`).textContent = pieces[boardState[i][j]]
            document.getElementById(`${rows[i+1]}${j+1}`).setAttribute('data-content', boardState[i][j])
        }
    }
}

function setEvents(boardState) {
    for (let i = 0; i < boardState.length; i++) {
        for (let j = 0; j < boardState[i].length; j++) {
            console.log('at', boardState[i][j])
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