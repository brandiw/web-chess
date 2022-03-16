function canSelect(loc) {
    if (!loc) return false
    console.log('selecting', loc)
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
    console.log('selected', selected.name, 'startLoc', selected.currentLoc, 'destination', endLoc)
    if (selected.name == 'pawn') {
        let moveSet = getLegalPawnMoves()
        return moveSet.includes(endLoc) ? true : false 
    }
    else {
        return true 
    }
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
    console.log('legal move sets:', moveSet)
    return moveSet
}

function squareClick() {
    console.log('clicked on', this.id, 'selected is', selected)
    if (!selected) {
        if (canSelect(this.getAttribute('data-content'))) {
            selected = selectFromBoard(this.id)
            this.classList.add('selected')
        }
    }
    else if (this.id == selected.currentLoc.join('')) {
        // Unselect element if already selected
        this.classList.remove('selected')
        selected = null
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

    // Make sure there is no selection
    selected = null

    // Update turn count
    turnCount += 1

    // Prompt next user
    let message = turnCount % 2 === 0 ? 'Go White!' : 'Go Black!'
    document.getElementById('message').textContent = message
}

function checkSpot(location) {
    return document.getElementById(location).getAttribute('data-content')
} 