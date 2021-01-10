# &lt;my-messages-app&gt;
A messaging application for course-wide message chat using Web Sockets. 
The application uses IndexedDB for storing username and messages received. 

## Usage

### Web Socket
Web Socket connection to the course server is opened upon opening the application.
When the application is closed or if the component is removed from the DOM, the connection will close.

### Username
Username is stored in IndexedDB. 
If the application is opened for the first time or if there is no username stored, the user will be asked to set a username.

### Chat messages
Chat messages are sent and received through Web Socket. 
Received messages are stored in IndexedDB (see Chat History below for more information).

## Additional features

### Emoji support
Supports emoji button to add a emoji to the textarea. 
Emoji picker is using 'emoji-picker-element' package.
Popup for the emoji picker is using 'Popper' package.

### Chat history
Chat messages are stored in IndexedDB with the username, message and datestamp of which when the message was received (exception: Messages from 'The Server' user).

## Methods

### `_sendText()`
Sends message in JSON format to the course server using Web Socket.

### `_getMessages(event)`
Retrieves messages stored in IndexedDB and adds them to the conversations element when the application is started.

Parameters: {object} event The IndexedDB event object.

### `_addMessage(message)`
Adds message to the conversations element from a object passed as argument.

Parameter: {object} message The message object.

### `_getUsername(event)`
Retrieves username from IndexedDB if there are any.
If none is found, run _addUsername() to add one.

Parameters: {object} event The IndexedDB event object.

### `_addUsername(event)`
Adds username to IndexedDB.

## Example
```html
   <my-messages-app></my-messages-app>
```
