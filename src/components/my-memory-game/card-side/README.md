# &lt;card-side&gt;
A web component used to represent a card side.
Used together with card-tile component. 

## Attributes

### `part`
A String attribute; attribute that states which side the component is representing. `front` or `back`.

### `id`
A String attribute; attribute that states which side the component is representing. `front` or `back`.

## Styling with CSS
The image and background-color is styleable using the part `front` or `back`
Example (in `styles.css`): 
    #demo::part(front) {
    background-color: orangered;
    background-image: url("../images/0.png");
    }

## Slot
An image from `card-tile`.

## Example
```html
   <card-side part="back" id="back">
     <slot></slot>
    </card-side>
```
Example shows a `back` side. 
