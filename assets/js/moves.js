function squareClick() {
    // console.log('clicked on', this.id, 'selected is', selected)
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
            document.getElementById('message').textContent = `You can't move there!`
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
    
    // Check for a state of check
    let message = turnCount % 2 === 1 ? 'Go White!' : 'Go Black!'
    if (checkForCheck()) {
        message = turnCount % 2 === 1 ? 'White You Are In Check!' : 'Black You Are In Check!'
    }

    // Make sure there is no selection or highlights
    selected = null
    unHighlightMoves()

    // Update captured pieces
    updateCapturedPieces()

    // Update turn count
    turnCount += 1

    // Prompt next user move
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
    else if (selected.name === 'bishop') {
        moveSet = getLegalBishopMoves()
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

function checkForCheck() {
    let opponent = turnCount % 2 === 1 ? 'w' : 'b'
    let moveSet = getMoveSet()
    if (selected.name === 'pawn') {
        moveSet = getPawnAttackMoves()
    }
    for(let i = 0; i < moveSet.length; i++) {
        // If legal move contains the enemy king, player is in check
        let spot = checkSpot(moveSet[i])
        if (spot && spot === opponent + 'king') {
            document.getElementById(moveSet[i]).style.backgroundColor = 'orange'
            checkState = {
                piece: selected
            }
            return true
        }
    }

    return false
}

// function checkForIndirectCheck() {
//     let opponent = turnCount % 2 === 1 ? 'w' : 'b'
//     let self = turnCount % 2 === 0 ? 'w' : 'b'
//     console.log('indirect check')
//     // Iterate through board state and see if any king in an enemy moveset
//     for (let i = 0; i < 8; i++) {
//         for (let j = 0; j < 8; j++) {
//             let elem = checkSpot(rows[Number(i)+1] + [Number(j)+1].toString())
//             // TODO: Check every move set for kings of the opposing player
//         }
//     }
//     return false
// }