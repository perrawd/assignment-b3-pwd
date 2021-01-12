# &lt;my-desktop-bar&gt;
A web component used to simulate a desktop top bar displaying the current time.
Features buttons to open the "About" app and button to restart Desktop application.

## Main functionalities: 
* Displays the current time.
* Open About application.
* Restart (desktop) application button.

## Events
| Event Name | Fired When |
|------------|------------|
| `closeApp`| The about button is clicked on.
| `restart`| The restart button is clicked on.

## Methods

### `currentTime()`
A method that returns the current time.
Used in the desktop bar to display time. 

Parameters: none

Returns: The current time in HH:MM format.

## Example
```html
   <my-desktop-bar></my-desktop-bar>
```
