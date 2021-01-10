# &lt;my-desktop&gt;
A web component that simulates a operating system desktop. 
Along with the `my-window` component, it is one of the main control programs of the PWD application. 

## Main functionalities: 
* Specifies the viewport of the PWD application.
* Handles opening and closing sub-applications by adding or removing them to and from the DOM
* Display a background image.

## Other components included and initiated
### `my-dock`
### `my-desktop-bar`

## Eventlisteners

### `openApp`
When an `openApp` event is received, a specified sub-application is added to the desktop environment. 
The sub-application is added via a `my-window` component containing the specified sub-application component, these are added to the DOM.

### `closeApp`
When an `closeApp` event is received, a specified sub-application is removed from the desktop environment and from the DOM.

### `photo`
When an `photo` event is received from the `my-camera-app` sub-application, the `my-photo` component is added via a `my-window` component containing the specified image. 

## Example
```html
   <my-desktop></my-desktop>
```
