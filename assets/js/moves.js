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