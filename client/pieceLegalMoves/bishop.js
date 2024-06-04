const cols = ["a" ,"b", "c", "d", "e", "f", "g", "h"]

export function getBishopLegalMoves(initial, position, board) {
    const { row, col } = position // col -> 5,  row -> 0     => f1
    const legalMoves = []
    
    let color
    if (initial === initial.toUpperCase()) {
      color = 'white'
    } else {
      color = 'black'
    }


    //up left
    let i = 1
    while (col - i >= 0 && row + i -1 < 8) {
      // if square does not contain own piece:
      let diagUpLeft = board[row-1+i][col-i]

      if (diagUpLeft === '') {
        legalMoves.push(`${cols[col - i]}${row + i}`)
        i ++
      } else if ((color === 'white' && diagUpLeft === diagUpLeft.toLowerCase()) || (color === 'black' && diagUpLeft === diagUpLeft.toUpperCase())) {  
        // sqaure contains opposing piece
      legalMoves.push(`${cols[col - i]}${row + i}`)
      break
      } else {
        break
      }
    }
    // down left
    let k = 1
    while (col - k >= 0 && row -1 - k >= 0) {
      let diagDownLeft = board[row-1 - k][col - k]

      if (diagDownLeft === '') {
        legalMoves.push(`${cols[col - k]}${row - k}`)
        k ++
      } else if ((color === 'white' && diagDownLeft === diagDownLeft.toLowerCase()) || (color === 'black' && diagDownLeft === diagDownLeft.toUpperCase())) {  
        // sqaure contains opposing piece
        legalMoves.push(`${cols[col - k]}${row - k}`)
        break
      } else {
        break
      }
    }

    //up right
    let j = 1
    while (col + j < 8 && row -1 + j < 8) {
    // if square does not contain own piece:
      let diagUpRight = board[row-1 + j][col + j]

      if (diagUpRight === '') {
        legalMoves.push(`${cols[col + j]}${row + j}`)
        j ++
      } else if ((color === 'white' && diagUpRight === diagUpRight.toLowerCase()) || (color === 'black' && diagUpRight === diagUpRight.toUpperCase())) {  
        // sqaure contains opposing piece
        legalMoves.push(`${cols[col + j]}${row + j}`)
        break
      } else {
        break
      }
    }

    // down right
    let m = 1
    while (col + m < 8 && row -1 - m >= 0) {
      let diagDownRight = board[row-1 - m][col + m]
      console.log('checking down right')
      if (diagDownRight === '') {
        legalMoves.push(`${cols[col + m]}${row - m}`)
        m ++
      } else if ((color === 'white' && diagDownRight === diagDownRight.toLowerCase()) || (color === 'black' && diagDownRight === diagDownRight.toUpperCase())) {  
        // sqaure contains opposing piece
        legalMoves.push(`${cols[col + m]}${row - m}`)
        break
      } else {
        break
      }
    }
      


    

    console.log(board)
    console.log(legalMoves)
    return legalMoves




    
    // let i = 1
    // console.log(board)
    // //up left
    // while (col - i < 8 && row + i < 7) {  
    //   let diagUpLeft = board[col-i][row+i]

    //   if (diagUpLeft === '') {  // if square does not contain piece:
    //     legalMoves.push(`${cols[col - i]}${row + i}`)
    //     i ++
    //   } else if ((color === 'white' && diagUpLeft === diagUpLeft.toLowerCase() || color === 'black' && diagUpLeft === diagUpLeft.toUpperCase())) {  // sqaure contains opposing piece
    //      legalMoves.push(`${cols[col - i]}${row + i}`)
    //      console.log('elif')
    //      break
    //   } else {
    //     console.log('else')
    //     break
    //   }
    // } 



}