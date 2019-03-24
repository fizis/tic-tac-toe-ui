import GameBoard from './GameBoard';

it('loads a game if state has game ID', () => {
  const gameBoard = new GameBoard();

  gameBoard.state = { id: 'test_id' };
  gameBoard.createGame = jest.fn();
  gameBoard.loadGame = jest.fn();

  gameBoard.initGame();
  
  expect(gameBoard.loadGame).toHaveBeenCalledTimes(1);
});

it('creates a game if state has no game ID', () => {
  const gameBoard = new GameBoard();

  gameBoard.createGame = jest.fn();
  gameBoard.loadGame = jest.fn();

  gameBoard.initGame();
  
  expect(gameBoard.createGame).toHaveBeenCalledTimes(1);
});
