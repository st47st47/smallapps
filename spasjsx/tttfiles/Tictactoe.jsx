import styles from '../../spscss/tictactoe.module.css'
import { useEffect, useState } from "react"



function Tictactoefinal() {
    const [board, setBoard] = useState(['', '', '', '', '', '', '', '', ''])
    const [player, setPlayer] = useState('O')
    const [result, setResult] = useState({ winner: "none", state: "none" })

    useEffect(() => {
        checkWin()
        checkIfTie()

        if (player == "X") {
            setPlayer("O")
        } else {
            setPlayer("X")
        }
    }, [board])

    useEffect(() => {
        if (result.state != 'none') {
            alert(`game over. winning player: ${result.winner}`)
            restartGame()
        }
    }, [result])

    const chooseSquare = (square) => {
        setBoard(
            board.map((val, idx) => {
                if (idx == square && val == '') {
                    return player
                }
                return val
            }))
    }

    const checkWin = () => {
        Patterns.forEach((currPattern) => {
            const firstPlayer = board[currPattern[0]]
            if (firstPlayer == '') return;
            let foundWinningPattern = true
            currPattern.forEach((idx) => {
                if (board[idx] != firstPlayer) {
                    foundWinningPattern = false
                }
            })
            if (foundWinningPattern) {
                setResult({ winner: player, state: "won" })
            }
        })
    }

    const checkIfTie = () => {
        let filled = true
        board.forEach((square) => {
            if (square == '') {
                filled = false
            }
        })
        if (filled) {
            setResult({ winner: "no winner", state: 'tie' })
        }
    }

    const restartGame = () => {
        setBoard(['', '', '', '', '', '', '', '', ''])
        setPlayer("O")
    }

    return (
        <div className={styles.hero}>
            <div className={styles.board}>
                <div className={styles.row}>
                    <Square val={board[0]} chooseSquare={() => { chooseSquare(0) }} />
                    <Square val={board[1]} chooseSquare={() => { chooseSquare(1) }} />
                    <Square val={board[2]} chooseSquare={() => { chooseSquare(2) }} />
                </div>
                <div className={styles.row}>
                    <Square val={board[3]} chooseSquare={() => { chooseSquare(3) }} />
                    <Square val={board[4]} chooseSquare={() => { chooseSquare(4) }} />
                    <Square val={board[5]} chooseSquare={() => { chooseSquare(5) }} />
                </div>
                <div className={styles.row}>
                    <Square val={board[6]} chooseSquare={() => { chooseSquare(6) }} />
                    <Square val={board[7]} chooseSquare={() => { chooseSquare(7) }} />
                    <Square val={board[8]} chooseSquare={() => { chooseSquare(8) }} />
                </div>

            </div>
        </div>
    );
}

export default Tictactoefinal;



















// 
import React from "react";

function Square({ val, chooseSquare }) {
    return (
        <div className={styles.square} onClick={chooseSquare}>
            {val}
        </div>
    )
}









































// 
const Patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]