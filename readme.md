# Web Chess

A two player chess game that can be played on the web.

## Requirements

### General and Design

- There should be two chess players (black and white) taking alternating turns
- Time should be kept for each of the players during their own turn
- Time expires at 90 minutes for each player
- Moves are tracked in order to tell the story of the game
- WebSockets or WebRTC (?) for real time multi-player (simulated for now)
- The game should visually display various game states for the player
    - Timers
    - Move history
    - Letter and number grids
    - Captured pieces
    - Messages prompting the next action

### Features and Logic

- White starts first
- Time starts on page load for white
- When a player completes a turn it begins the opponent's timer
- Pieces are selectable and de-selectable
- Only legal moves for each piece shall be executed
- The game should detect when a king piece is in check
- If a king is in check, getting out of check is prioritized over all other moves
- The game should detect a checkmate

### Movements

#### Pawns

- Can move forward only if there is no enemy piece obstructing the path
- May not move backward
- May attack forward and diagonally (for example, a white pawn on B5 may attack an enemy piece at A4 or C4, but not on B4)
- Can move an extra space forward on the first turn only if there are no pieces obstructing the path
- There is a special condition met if a pawn reaches an opponent's back row 

#### Rooks

- Can move in a single straight line either horizontally or vertically as long as it is unobstructed
- Can be obstructed by their own pieces, but may take an enemy piece in its path

#### Knights

- Move in an "L" shape, 2 spaces in one direction and 1 space in the other
- Are not obstructed by other pieces on the board and can move to any free destination or enemy-occupied destination within their move set

#### Bishops

- May move in a single, straight line in a diagonal direction

#### Queens

- Possess the combined move sets from the rook and bishop

#### Kings

- May move one space in any direction
- Must move when they are put into check
- The game is lost when that player's king piece is unable to move out of check, a condition known as "checkmate"

