# Tic Tac Toe Game UI

Game description: https://en.wikipedia.org/wiki/Tic-tac-toe

## Backend - API

The UI uses [**Tic Tac Toe Game API**](https://github.com/fizis/tic-tac-toe-api) under the hood.

For now API_URL can be configured in GameBoard.js file.

## Launch and Test

### Prerequisites

Install Node.js:
https://nodejs.org/en/download/

Install Docker (optional):
https://docs.docker.com/install/

### Build & Run

Development:  
`npm start`

Production:  
`npm run build`  
`npm install -g serve`  
`serve -s build`  

### Test

`npm test`

### Docker

The UI can be launched on Docker.

Build image:  
`docker build -t [image name] .`

Run container from image built on port 3000:  
`docker run -p 3000:3000 [image name]`

## Gameplay

Click on the game board to start a game.
