import React, { useState } from 'react'
import styles from '../../spscss/wordle.module.css'

const todaysWord = 'bicep'

const Wordle = () => {
    const [guessesLeft, setGuessesLeft] = useState(6)
    const [uIp, setUIp] = useState('')

    const [guesses, setGuesses] = useState([])


    function hndltry() {
        if (uIp === todaysWord) {
            alert('you win')
        }
        else if (uIp.length > 5) {
            alert('word cannot more than 5 letters long')
        }
        else {
            setGuessesLeft((prev) => { return prev - 1 })
            setGuesses((prev) => { return [...prev, uIp] })
        }

        setUIp('')
    }



    return (
        <div className={styles.hero}>
            {
                guessesLeft > 0 ? <div className={styles.gameboard}>
                    <h1>WORDLE. guess the secret word. </h1>
                    <h1 className={styles.rules}>RULES: <span className={styles.grayspan}>gray</span>= letter does not exist in secret word. <span className={styles.goldspan}>gold</span>= letter exists in secret word but at different position. <span className={styles.greenspan}>green</span>= letter exists in secret word at that position.</h1>
                    <input type="text" placeholder='your guess....' value={uIp} onChange={(e) => { setUIp(e.target.value) }} />
                    <button onClick={hndltry} className={styles.wrdlbtn}>try</button>

                    <h1>you have {guessesLeft} guesses left</h1>

                    <h1>previous guesses:</h1>
                    {
                        guesses.map((each) => {
                            return <h2>
                                {each.split('').map((each, idx) => {
                                    return <span
                                        style={{ backgroundColor: each == todaysWord[idx] ? 'green' : todaysWord.includes(each) ? 'gold' : 'gray' }}>
                                        {each}</span>
                                })}
                            </h2 >
                        })
                    }
                </div> : <div className={styles.tryagainscreen}>
                    <h1>Sorry, you ran out of guesses</h1>
                    <button onClick={() => { setGuessesLeft(5); setGuesses([]) }} className={styles.wrdlbtn}>play again</button>
                </div >
            }
        </div >
    )
}

export default Wordle