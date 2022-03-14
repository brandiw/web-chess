// Initialize board
const initialBoard = [
    [['br1'], ['bb1'], ['bkn1'], ['bq'], ['bk'], ['bkn2'], ['bb2'], ['br2']],
    [['bp1'], ['bp2'], ['bp3'], ['bp4'], ['bp5'], ['bp6'], ['bp7'], ['bp8']],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [['wp1'], ['wp2'], ['wp3'], ['wp4'], ['wp5'], ['wp6'], ['wp7'], ['wp8']],
    [['wr1'], ['wb1'], ['wkn1'], ['wq'], ['wk'], ['wb2'], ['wkn2'], ['wr2']]
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
    'wp8': '♙'
}

let boardState = JSON.parse(JSON.stringify(initialBoard))

console.log(boardState)