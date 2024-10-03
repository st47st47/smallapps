import React, { useEffect, useState } from 'react'
import styles from '../../spscss/tictactoe.module.css'

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 7], [2, 4, 6]
]

const startarray = new Array(9).fill('').map((each) => { return { idee: Math.random(), content: each } })


const Tictactoe = () => {
    const [winnerFound, setWinnerFound] = useState(false)

    const [ponesturn, setPonesturn] = useState(true)

    const [myarr, setMyarr] = useState(startarray)

    function clk(arg) {
        if (winnerFound) { return }

        if (myarr.find((each) => { return each.idee == arg }).content != '') { alert('this spot is full') }

        else {
            setMyarr((prev) => {
                return prev.map((each) => {
                    return each.idee == arg ? { ...each, content: ponesturn ? 'x' : 'o' } : each
                })
            })
            setPonesturn((prev) => { return !prev })
        }

    }


    useEffect(() => {


        if (
            winPatterns.some((each) => { return each.every((each) => { return myarr[each].content == 'x' }) })
            ||
            winPatterns.some((each) => { return each.every((each) => { return myarr[each].content == 'o' }) })
        ) {
            alert(`${ponesturn ? 'o' : 'x'} won`)

            setWinnerFound(true)
        }


        if (
            myarr.every((each) => { return each.content !== '' })
        ) {
            alert('game tied')
            setMyarr(startarray)
        }

    }, [myarr])





    return (
        <div className={styles.hero}>
            {winnerFound && <button onClick={() => { setMyarr(startarray); setWinnerFound(false); setPonesturn(true) }}>reset?</button>}
            <div className={styles.mygrid}>
                {
                    myarr.map((each) => {
                        return <div className={styles.boardsection} onClick={() => { clk(each.idee) }}>{each.content}</div>
                    })
                }
            </div>
        </div>
    )
}

export default Tictactoe

