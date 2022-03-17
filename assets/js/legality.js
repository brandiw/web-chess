function canSelect(loc) {
    // if empty don't select
    if (!loc) return false

    // Determine color by turn count
    let turn = turnCount % 2 === 0 ? 'w' : 'b'

    // Select only your own piece
    if (loc[0] != turn) {
        return false
    }
    else {
        return true
    }
}

function isLegalMove(endLoc) {
    // check if the move is legal based on the piece
    if (selected.name == 'pawn') {
        let moveSet = getLegalPawnMoves()
        return moveSet.includes(endLoc) ? true : false 
    }
    else if (selected.name == 'knight') {
        let moveSet = getLegalKnightMoves()
        return moveSet.includes(endLoc) ? true : false
    }
    else if (selected.name == 'rook') {
        let moveSet = getLegalRookMoves()
        return moveSet.includes(endLoc) ? true : false
    }
    else {
        return true 
    }
}

function getLegalRookMoves() {
    let moveSet = []
    let locationLetter = reverseRows[selected.currentLoc[0]]
    let locationNumber = selected.currentLoc[1]
    
    // Check up
    for (let i = Number(locationNumber); i < 8; i++) {
        let nextSpace = rows[locationLetter] + (Number(i) + 1)
        if (spaceEmpty(nextSpace)) {
            moveSet.push(nextSpace)
        }
        else if (spaceEnemy(nextSpace)) {
            moveSet.push(nextSpace)
            break
        }
        else {
            break
        }
    }
    // Check down
    for (let i = Number(locationNumber); i > 1; i--) {
        let nextSpace = rows[locationLetter] + (Number(i) - 1)
        if (spaceEmpty(nextSpace)) {
            moveSet.push(nextSpace)
        }
        else if (spaceEnemy(nextSpace)) {
            moveSet.push(nextSpace)
            break
        }
        else {
            break
        }
    }
    // Check right
    for (let i = Number(locationLetter); i < 8; i++) {
        let nextSpace = rows[Number(i)+1] + locationNumber.toString()
        if (spaceEmpty(nextSpace)) {
            moveSet.push(nextSpace)
        }
        else if (spaceEnemy(nextSpace)) {
            moveSet.push(nextSpace)
            break
        }
        else {
            break
        }
    }
    // Check left
    for (let i = Number(locationLetter); i > 1; i--) {
        let nextSpace = rows[Number(i)-1] + locationNumber.toString()
        if (spaceEmpty(nextSpace)) {
            moveSet.push(nextSpace)
        }
        else if (spaceEnemy(nextSpace)) {
            moveSet.push(nextSpace)
            break
        }
        else {
            break
        }
    }

    return moveSet
}

function getLegalKnightMoves() {
    let moveSet = []
    let locationLetter = reverseRows[selected.currentLoc[0]]
    let locationNumber = selected.currentLoc[1]
    
    // 1 left, 2 up
    if (locationLetter - 1 >= 1 && Number(locationNumber) + 2 <= 8 && 
        spaceEmptyOrEnemy(rows[locationLetter-1] + (Number(locationNumber)+2))) {
        moveSet.push(rows[locationLetter-1] + (Number(locationNumber)+2))
    }
    // 1 right, 2 up
    if (locationLetter + 1 <= 8 && Number(locationNumber) + 2 <= 8 && 
        spaceEmptyOrEnemy(rows[locationLetter+1] + (Number(locationNumber)+2))) {
        moveSet.push(rows[locationLetter+1] + (Number(locationNumber)+2))
    }
    // 1 left, 2 down
    if (locationLetter - 1 >= 1 && Number(locationNumber) - 2 >= 1 &&
        spaceEmptyOrEnemy(rows[locationLetter-1] + (Number(locationNumber-2)))) {
        moveSet.push(rows[locationLetter-1] + (Number(locationNumber-2)))
    }
    // 1 right, 2 down
    if (locationLetter + 1 <= 8 && Number(locationNumber) - 2 >= 1 && 
        spaceEmptyOrEnemy(rows[locationLetter+1] + (Number(locationNumber-2)))) {
        moveSet.push(rows[locationLetter+1] + (Number(locationNumber-2)))
    }
    // 2 left, 1 up
    if (locationLetter - 2 >= 1 && Number(locationNumber) + 1 <= 8 && 
        spaceEmptyOrEnemy(rows[locationLetter-2] + (Number(locationNumber)+1))) {
        moveSet.push(rows[locationLetter-2] + (Number(locationNumber)+1))
    }
    // 2 right, 1 up
    if (locationLetter + 2 <= 8 && Number(locationNumber) + 1 <= 8 && 
        spaceEmptyOrEnemy(rows[locationLetter+2] + (Number(locationNumber)+1))) {
        moveSet.push(rows[locationLetter+2] + (Number(locationNumber)+1))
    }
    // 2 left, 1 down
    if (locationLetter - 2 >= 1 && Number(locationNumber) - 1 >= 1 &&
        spaceEmptyOrEnemy(rows[locationLetter-2] + (Number(locationNumber-1)))) {
        moveSet.push(rows[locationLetter-2] + (Number(locationNumber-1)))
    }
    // 2 right, 1 down
    if (locationLetter + 2 <= 8 && Number(locationNumber) - 1 >= 1 &&
        spaceEmptyOrEnemy(rows[locationLetter+2] + (Number(locationNumber-1)))) {
        console.log(checkSpot(rows[locationLetter+2] + (Number(locationNumber-1))))
        moveSet.push(rows[locationLetter+2] + (Number(locationNumber-1)))
    }

    return moveSet
}

function getLegalPawnMoves() {
    let moveSet = []
    let locationLetter = reverseRows[selected.currentLoc[0]]
    let locationNumber = selected.currentLoc[1]
    let forward = 1

    if (selected.color == 'white') {
        // Forward is down
        forward = -1
    }

    // Check forward spot empty
    let newLocation = rows[locationLetter] + (Number(locationNumber) + forward)
    if (!document.getElementById(newLocation).getAttribute('data-content')) {
        moveSet.push(newLocation)

        // Check two spots forward
        if (selected.currentLoc.join('') === selected.startLoc.join('')) {
            let newLocation = rows[locationLetter] + (Number(locationNumber) + forward + forward)
            if (!document.getElementById(newLocation).getAttribute('data-content')) {
                moveSet.push(newLocation)
            }
        }
    }

    // Check diagonals
    if (locationLetter != 1) {
        let diag1 = checkSpot(rows[locationLetter - 1] + (Number(locationNumber) + forward))
        if (diag1 && diag1[0] !== selected.color[0]) {
            moveSet.push(rows[locationLetter - 1] + (Number(locationNumber) + forward))
        }
    }
    if (locationLetter != 8) {
        let diag2 = checkSpot(rows[locationLetter + 1] + (Number(locationNumber) + forward))
        if (diag2 && diag2[0] !== selected.color[0]) {
            moveSet.push(rows[locationLetter + 1] + (Number(locationNumber) + forward))
        }
    }

    return moveSet
}