function canSelect(loc) {
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

function isLegalMove(piece, startLoc, endLoc) {
    // check if the move is legal based on the piece
    console.log('piece', piece, 'startLoc', startLoc, 'destination', endLoc)
    if (piece.substring(1) == 'pawn') {
        let moveSet = getLegalPawnMoves(piece, startLoc)
        return moveSet.includes(endLoc) ? true : false 
    }
    else {
        return true 
    }
}

function getLegalPawnMoves(piece, location) {
    let moveSet = []
    let locationLetter = reverseRows[location[0]]
    let locationNumber = location[1]

    // Check forward spot empty
    if (piece[0] == 'w') {
        // Forward is down
        let newLocation = rows[locationLetter] + (locationNumber - 1)
        if (!document.getElementById(newLocation).getAttribute('data-content')) {
            moveSet.push(newLocation)

            // Check two spots forward
            if (initialBoard[locationLetter-1][locationNumber-1] == 'wpawn') {
                let newLocation = rows[locationLetter] + (locationNumber - 2)
                if (!document.getElementById(newLocation).getAttribute('data-content')) {
                    moveSet.push(newLocation)
                }
            }
        }

        // Check diagonals
        if (locationLetter != 1) {
            let diag1 = checkSpot(rows[locationLetter - 1] + (locationNumber - 1))
            if (diag1 && diag1[0] == 'b') {
                moveSet.push(rows[locationLetter - 1] + (locationNumber - 1))
            }
        }
        if (locationLetter != 8) {
            let diag2 = checkSpot(rows[locationLetter + 1] + (locationNumber - 1))
            if (diag2 && diag2[0] == 'b') {
                moveSet.push(rows[locationLetter + 1] + (locationNumber - 1))
            }
        }
    }
    else {
        // Forward is up
        let newLocation = rows[locationLetter] + (Number(locationNumber) + 1)
        if (!document.getElementById(newLocation).getAttribute('data-content')) {
            moveSet.push(newLocation)

            // Check two spots forward
            if (initialBoard[locationLetter-1][locationNumber-1] == 'bpawn') {
                let newLocation = rows[locationLetter] + (Number(locationNumber) + 2)
                if (!document.getElementById(newLocation).getAttribute('data-content')) {
                    moveSet.push(newLocation)
                }
            }
        }

        // Check diagonals
        if (locationLetter != 1) {
            let diag1 = checkSpot(rows[locationLetter - 1] + (Number(locationNumber) + 1))
            if (diag1 && diag1[0] == 'w') {
                moveSet.push(rows[locationLetter - 1] + (Number(locationNumber) + 1))
            }
        }
        if (locationLetter != 8) {
            let diag2 = checkSpot(rows[locationLetter + 1] + (Number(locationNumber) + 1))
            if (diag2 && diag2[0] == 'w') {
                moveSet.push(rows[locationLetter + 1] + (Number(locationNumber) + 1))
            }
        }
    }

    return moveSet
}

function squareClick() {
    console.log('hi', this.id, this.textContent, this.getAttribute('data-content'))
    if (!selected) {
        if (canSelect(this.getAttribute('data-content'))) {
            selected = [this.id, this.getAttribute('data-content')]
            this.classList.add('selected')
            console.log(selected)
        }
    }
    else if (this.id == selected[0]) {
        // Unselect element if already selected
        this.classList.remove('selected')
        selected = null
    }
    else {
        // Try to move
        if (isLegalMove(selected[1], selected[0], this.id)) {
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
    newP.textContent = `${selected[1].substring(1)} to ${endLoc}`
    document.getElementById('status-update').append(newP)

    // Update destination board state
    let destination = document.getElementById(endLoc)
    destination.setAttribute('data-content', selected[1])
    destination.textContent = pieces[selected[1]]

    // Remove departure spot info
    let departure = document.getElementById(selected[0])
    departure.setAttribute('data-content', '')
    departure.textContent = ''

    // Deselect all
    document.getElementById(selected[0]).classList.remove('selected')
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