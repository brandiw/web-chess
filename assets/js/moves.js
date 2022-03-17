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

function squareClick() {
    console.log('clicked on', this.id, 'selected is', selected)
    if (!selected) {
        if (canSelect(this.getAttribute('data-content'))) {
            selected = selectFromBoard(this.id)
            this.classList.add('selected')
            if (showMoves) {
                highlightMoves()
            }
        }
    }
    else if (this.id == selected.currentLoc.join('')) {
        // Unselect element if already selected
        this.classList.remove('selected')
        selected = null
        unHighlightMoves()
    }
    else {
        // Try to move
        if (isLegalMove(this.id)) {
            executeMove(this.id)
        }
        else {
            console.log(`Fool you can't move there.`)
        }
    }
}

function executeMove(endLoc) {
    // Update status line
    let newP = document.createElement('p') 
    newP.textContent = `${selected.name} to ${endLoc}`
    document.getElementById('status-update').append(newP)

    // Update destination board state
    let destination = document.getElementById(endLoc)
    destination.setAttribute('data-content', selected.abbrev)
    destination.textContent = pieces[selected.abbrev]

    // Remove departure spot info
    let departure = document.getElementById(selected.currentLoc.join(''))
    departure.setAttribute('data-content', '')
    departure.textContent = ''

    // Deselect highlighted area
    document.getElementById(selected.currentLoc.join('')).classList.remove('selected')

    // Update board state and location
    moveOnBoard(selected.currentLoc.join(''), endLoc)
    selected.currentLoc[0] = endLoc[0]
    selected.currentLoc[1] = endLoc[1]

    // Make sure there is no selection or highlights
    selected = null
    unHighlightMoves()

    // Update captured pieces
    updateCapturedPieces()

    // Update turn count
    turnCount += 1

    // Prompt next user
    let message = turnCount % 2 === 0 ? 'Go White!' : 'Go Black!'
    document.getElementById('message').textContent = message
}

function checkSpot(location) {
    let elem = document.getElementById(location)
    return elem ? elem.getAttribute('data-content') : ''
} 

function spaceEmptyOrEnemy(loc) {
    return spaceEmpty(loc) || spaceEnemy(loc)
}

function spaceEmpty(loc) {
    return !checkSpot(loc) 
}

function spaceEnemy(loc) {
    let spot = checkSpot(loc) || ''
    let color = turnCount % 2 === 0 ? 'w' : 'b'
    return spot && spot[0] !== color
}

function highlightMoves() {
    let moveSet = []
    if (selected.name === 'pawn') {
        moveSet = getLegalPawnMoves()   
    }
    else if (selected.name === 'knight') {
        moveSet = getLegalKnightMoves()
    }
    else if (selected.name === 'rook') {
        moveSet = getLegalRookMoves()
    }

    if (moveSet.length) {
        moveSet.forEach(m => {
            document.getElementById(m).classList.add('highlight')
        })
    }
}

function unHighlightMoves() {
    let boardDivs = document.querySelectorAll('#board div')
    for (let i = 0; i < boardDivs.length; i++) {
        boardDivs[i].classList.remove('highlight')
    }
}

function updateCapturedPieces() {
    let capturedDisplay = document.getElementById('captured')
    capturedDisplay.textContent = ''
    for (let i = 0; i < capturedPieces.length; i++) {
        let newSpan = document.createElement('span')
        newSpan.textContent = pieces[capturedPieces[i].abbrev]
        capturedDisplay.append(newSpan)
    }
    
}