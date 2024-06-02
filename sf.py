# To run, you need to pip install stockfish
from stockfish import Stockfish

# Testing to see if all imported modules work
    # providing the path of the chess engine, which is stored here locally (downloaded here: https://stockfishchess.org/download/)
    # Note: This probably only works for windows..
    
#stockfish = Stockfish(path='./stockfish-windows-x86-64-avx2/stockfish/stockfish-windows-x86-64-avx2.exe') 
#print(stockfish.is_fen_valid("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")) #prints True


def best_move_from_board(board):
    '''
    takes in board position using FEN notation, returns the best move
    Note that FEN notation has 'w' or 'b' after board pieces to indicate which player's turn it is
    '''
    # initialize sf object
    stockfish = Stockfish(path='./stockfish-windows-x86-64-avx2/stockfish/stockfish-windows-x86-64-avx2.exe') 
    
    if '%' in board:
        board = board.replace('%', '/') # assuming that there's '%' instead of / to avoid URL conflict when calling API
    
    stockfish.set_fen_position(board)

    if not stockfish.is_fen_valid(board): 
        #checks if the board is legal or if there are any moves left to play
        #if illegal or checkmate position, returns error
        return 'cannot play: illegal position or checkmate'
    
    return stockfish.get_best_move()

## TEST
# example board, using % as space char. Correct move is d2d4.
board = "rnbqkbnr%pppp1ppp%4p3%8%4P3%8%PPPP1PPP%RNBQKBNR w KQkq - 0 2"
assert best_move_from_board(board) == 'd2d4'
print('test passed')


