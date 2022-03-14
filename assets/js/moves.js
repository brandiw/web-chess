function isLegalMove(piece, startLoc, endLoc) {
    // stub
    return true 
}

function canSelect(loc) {
    // Determine color by turn count
    let turn = turnCount % 2 === 0 ? 'w' : 'b'

    // Select only your own piece
    if (loc[0] != turn) {
        console.log('You cannot select the other player or an empty spot')
        return false
    }
    else {
        return true
    }
}