# &lt;my-window&gt;
The window manager of the PWD application.
Along with the `my-dekstop` component, it is one of the main control programs of the PWD application. 

## Main functionalities: 
* Attaches a sub-application (web component) to a window.
* Adds sub-application to the DOM.
* Handles draggable window logic.
* Handle window(s) focus.
* Makes sure that a window is not draggable outside the desktop (viewport).
* Dispatches event for closing window and sub-application.

## Attributes

### `app`
A String attribute of the sub-application to be attached to the window component.
Creates a new sub-application (web component) element and adds it to the DOM.

## Methods

### `dragWindow(window)`
A method that makes the window draggable across the desktop within it's viewport.
Code for draggable windows inspired by https://www.w3schools.com/howto/howto_js_draggable.asp.
Rewritten with code for handling window focus and viewport limits (written by me).
Called when the element is added to the DOM.

Parameters: window, the window element.

## Events
| Event Name | Fired When |
|------------|------------|
| `closeApp`| The close button is clicked on.

## Example
```html
   <my-window app="my-about-app"></my-window>
```
