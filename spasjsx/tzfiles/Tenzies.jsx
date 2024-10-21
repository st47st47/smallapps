import React, { useEffect, useRef, useState } from 'react'
import styles from '../../spscss/tenzies.module.css'

const diceValuesStartState = new Array(10).fill('').map(() => { return { numbo: Math.ceil(Math.random() * 6), freezeStatus: false } })
const Tenzies = () => {
    const [diceValues, setDiceValues] = useState(
        diceValuesStartState
    )

    const [timer, setTimer] = useState(0)
    const timerRef = useRef(null)

    const [bestScore, setBestScore] = useState(Infinity)

    const modalRef = useRef(null)

    function handleRoll() {
        setDiceValues((prev) => {
            return prev.map((each) => {
                return !each.freezeStatus ? { ...each, numbo: Math.ceil(Math.random() * 6) } : each
            })
        })
    }

    function handleFreeze(argu) {
        if (timer == 0) {
            clearInterval(timerRef.current)
            timerRef.current = setInterval(() => {
                setTimer((prev) => { return prev + 1 })
            }, 1000)
        }

        setDiceValues((prev) => {
            return prev.map((each) => {
                return each == argu ? { ...each, freezeStatus: !each.freezeStatus } : each
            })
        })
    }



    useEffect(() => {
        if (
            diceValues.every((each) => { return each.numbo == diceValues[0].numbo })
        ) {
            clearInterval(timerRef.current)
            if (Number(timer) < Number(bestScore)) { setBestScore(timer) }
            alert('You Won!!')

            setDiceValues(diceValuesStartState)
            setTimer(0)
        }
    }, [diceValues])



    function handleCloseModal() {
        modalRef.current.close()
    }


    useEffect(() => {
        modalRef.current.showModal()
    }, [])



    return (
        <div className={styles.hero}>
            <div className={styles.grid}>
                {
                    diceValues.map((each) => {
                        return <div className={styles.dice} onClick={() => { handleFreeze(each) }} style={{ border: each.freezeStatus && '5px solid lightblue' }}>{each.numbo}</div>
                    })
                }
            </div>

            <button onClick={handleRoll} className={styles.rollButton}>Roll</button>

            <h1 className={styles.lsh1s}>timer: {timer}s</h1>

            {
                bestScore < Infinity && <h1 className={styles.lsh1s}>your best score: {bestScore}s</h1>
            }

            <dialog ref={modalRef} className={styles.dlg}>
                <button onClick={handleCloseModal}>x</button>
                <br />
                <h1>Tenzies game: Roll until all dice are the same. Click each dice to freeze it at its current value</h1>
            </dialog>
        </div >
    )
}

export default Tenzies