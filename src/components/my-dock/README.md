# &lt;my-dock&gt;
A application dock which main purpose is to open sub-application in the PWD application.
Should be used with `my-desktop` web component.

## Methods

### `clear()`
A method that when called will clear the text written on the board.

Parameters: none

Returns: Reference to self.

## Events
| Event Name | Fired When |
|------------|------------|
| `openApp`| The app icon is clicked.

### `openApp`
When dispatched 
contains the detail data with property name of the sub-application that is supposed to open.

## Example
```html
   <my-dock></my-dock>
```
