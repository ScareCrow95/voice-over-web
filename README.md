# Voice over Web

Allows multiple users to stream audio to a single receiver - one way communication. This project uses peerjs for the WebIRC communication. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
Node.js
```

### Installing

How to install the project

Clone the git repo

```
git clone https://github.com/ScareCrow95/voice-over-web.git
```

change to the project directory and install node packages

```
npm install
```

Update your local ip address (to find out your ip address, type ipconfig in command prompt window) 
```
Update public/caller.js host ip
Update public/receiver.js host ip
```


Start the server 
```
npm start
```

Go to these url on browser for caller/receiver
```
https://<your ip address>:9000/caller
```
```
https://<your ip address>:9000/receiver
```

## Built With

* [PeerJS](https://peerjs.com/) - The web framework used

## Authors

* **Mridul Pareek** 

## License

This project is licensed under the MIT License
