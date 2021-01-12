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
