# &lt;my-dock&gt;
A application dock which main purpose is to open sub-application in the PWD application.
Should be used with `my-desktop` web component.

## Methods

### `_openApp()`
Dispatches an `openApp` event when a app icon is clicked on.

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
