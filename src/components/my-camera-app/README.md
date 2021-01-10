# &lt;my-camera-app&gt;
A camera application that starts a video stream from the web camera using WebRTC and can capture frames from the video stream. 

## Methods

### `_camera()`
A method that calls `MediaDevices.getUserMedia()` and requests a video stream.
The callback receives a stream object, the error callback is called if opening the stream doesn't work. 
When the video stream is linked to the video elements `srcObject` property, the video starts playing with the `.play()` method.

### `_takePhoto()`
When called, the method captures the currently displayed video frame. 

A camera shutter sound is played when a frame is captured, using the Audio object with a MP3 file and play() method.

The captured frame is converted into a PNG file a custom event is dispatched with the PNG file.

#### Events
| Event Name | Fired When |
|------------|------------|
| `photo`| A video frame is captured.

### `_stopCamera(videoElement)`
Stops the initiated video stream. Called when the element is removed from the DOM.

Parameter: `videoElement` The DOM video element containing the video stream.

## Example
```html
   <my-camera-app></my-camera-app>
```
