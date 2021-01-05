# &lt;high-score&gt;
A web component for displaying the top 5 players by the best completed times. 

## Description
Get players in the localStorage and their total game time (and save in an array).
Sort the players by total time and add the five best to the high-score list display.
Also displays a message if the user answered wrong, time (of question) elapsed or if the user completes the game. 

## Attributes

### `message`
Display the message in the message board. Configurable by the user. 

### `completedgame` 
Takes a boolean (converted to string). If (true) the message boards background changes to green (for presentation). 
Default (false) is red (game over, when user answers wrong or time is over)

## Events
| Event Name | Fired When |
|------------|------------|
| `resetgame`| User clicks on button to restart game. 

## Example
```html
    <high-score message="Time over! Game over!" completedgame="false"></high-score>
```
