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

function squareClick() {
    console.log('hi', this.id, this.textContent, this.getAttribute('data-content'))
    console.log(canSelect(this.getAttribute('data-content')))
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
        // try move
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
    console.log(message)
}