const initialBoard = [
    [['br1'], ['bp1'], [], [''], [''], [''], ['wp1'], ['wr1']],
    [['bb1'], ['bp2'], [''], [''], [''], [''], ['wp2'], ['wb1']],
    [['bkn1'], ['bp3'], [''], [''], [''], [''], ['wp3'], ['wkn1']],
    [['bq'], ['bp4'], [''], [''], [''], [''], ['wp4'], ['wq']],
    [['bk'], ['bp5'], [''], [''], [''], [''], ['wp5'], ['wk']],
    [['bkn2'], ['bp6'], [''], [''], [''], [''], ['wp6'], ['wkn2']],
    [['bb2'], ['bp7'], [''], [''], [''], [''], ['wp7'], ['wb2']],
    [['br2'], ['bp8'], [''], [''], [''], [''], ['wp8'], ['wr2']]
]
const pieces = {
    'br1': '♜', 
    'bb1': '♝',
    'bkn1': '♞', 
    'bq': '♛',
    'bk': '♚',
    'bkn2': '♞',
    'bb2': '♝',
    'br2': '♜',
    'bp1': '♟',
    'bp2': '♟',
    'bp3': '♟',
    'bp4': '♟',
    'bp5': '♟',
    'bp6': '♟',
    'bp7': '♟',
    'bp8': '♟',
    'wr1': '♖', 
    'wb1': '♗',
    'wkn1': '♘', 
    'wq': '♕',
    'wk': '♔',
    'wkn2': '♘',
    'wb2': '♗',
    'wr2': '♖',
    'wp1': '♙',
    'wp2': '♙',
    'wp3': '♙',
    'wp4': '♙',
    'wp5': '♙',
    'wp6': '♙',
    'wp7': '♙',
    'wp8': '♙',
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

function squareClick(e) {
    console.log('hi', this.id)
}