# &lt;card-tile&gt;
A web component used to represent a flippable card tile.

## Dependencies

### `card-side`
Requires `card-side` web component which represents each side of the card.

## Attributes

### `active`
A boolean attribute; if set to `false` the tile will enter a deactivated state.
When in deactivated state, the tile will not be flippable.

Default value: `true`

### `visibility`
A boolean attribute; if set to `false` the tile will enter a hidden state.
When in deactivated state, the tile will not be vissible or active.

Default value: `true`

## Events
| Event Name | Fired When |
|------------|------------|
| `cardflip`| The card is flipped.
bubbles: true,
composed: true,
detail: {
side: (current side of the tile)
innerHTML: (this.innerHTML=


## Styling with CSS
The image and background-color is styleable using the part `front` or `back`
Example (in `styles.css`): 
    #demo::part(front) {
    background-color: orangered;
    background-image: url("../images/0.png");
    }

## Example
```html
   <card-tile visibility="true" active="false"><img src="./images/2.png" alt="front"></card-tile>
```
Example shows an inactive tile with the image `2.png`
