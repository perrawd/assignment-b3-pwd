# &lt;memory-game-board&gt;
The actual game logic of the Memory Game application.

## Attributes

### `grid`
A String attribute; that will start a type of game with the specified grid (4x4, 4x2, or 2x2).

## Methods

### `flippedTiles()`
This method handles the actual logic of the game.
* Makes sure that only two tiles are flipped at the time.
* Makes sure that the tiles are flipped for a suitable time
* Check if tiles matches
* Check if all tiles are matched
* Fire synthetic events when tiles match, do not match, and when a game round is over.


### `shuffleImages(newValue)`
Randomizes and shuffles the tiles. 


## Events
| Event Name | Fired When |
|------------|------------|
| `gameCompleted`| if all possible matches has been done.
| `notMatched`| if tiles do not match.


## Example
```html
   <memory-game-board grid="4x2"></bart-board>
```

## Requirements
[x] The game must offer the ability to be rendered with different sizes of the grid, 4x4, 4x2, and 2x2.
[x] The player has to be able to flip the tiles with the mouse and keyboard.
[x] The player must only be able to flip two tiles face up at a time.
[x] After a suitable time, matching tiles that face up must not have a visible representation in the grid.
[x] After an appropriate time, tiles facing up and not matching must be flipped face down.
[x] The positions, or rather the images, of the tiles in the grid must be randomized before each game round.
[x] Throughout a game round, the tiles must retain their original positions in the grid.
[] Fire synthetic events when tiles match, do not match, and when a game round is over.
[x] The game must count how many attempts the player has made to find matching tiles and present the number of attempts when the game round is over.
[x] After a game round is over, the user must be allowed to start a new game round without having to reload the page.
