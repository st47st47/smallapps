import React, { useState } from 'react'
import styles from '../../spscss/emojigame.module.css'



const quizdata = [
    { q: '👮‍♂️💥🏢', a: 'Die Hard' },
    { q: '🦇🌑🤖', a: 'The Dark Knight' },
    { q: '🔥🚗🦂', a: 'Mad Max' },
    { q: '🕶️💊💥', a: 'The Matrix' },
    { q: '👨‍💼🔫🖤', a: 'John Wick' },
    { q: '🔥💣🗽💥', a: 'Mission Impossible' }
]

const Emojigame = () => {
    const [inp, setInp] = useState('')
    const [score, setScore] = useState(0)
    const [curques, setCurques] = useState(0)
    const [gameOver, setGameOver] = useState(false)

    function clk() {
        if (curques !== 5) {
            setCurques((prev) => { return prev + 1 })

            if ((quizdata[curques].a).toLowerCase() === inp.toLowerCase()) {
                setScore((prev) => { return prev + 1 })
            }

            setInp('')
        }
        else {

            if ((quizdata[curques].a).toLowerCase() === inp.toLowerCase()) {
                setScore((prev) => { return prev + 1 })
            }

            setGameOver(true)
        }
    }

    function rstrt() {
        setInp('')
        setScore(0)
        setCurques(0)
        setGameOver(false)
    }

    console.log(curques)

    return (
        <div className={styles.hero}>
            <h1>Guess the movie from emojis</h1>

            {
                !gameOver ?
                    <div>
                        <h1 className={styles.quesh1}>{quizdata[curques].q}</h1>
                        <input className={styles.emojiinpu} type="text" value={inp} onChange={(e) => { setInp(e.target.value) }} />
                        <br />
                        <button className={styles.fornxtbtn} onClick={clk}>next</button >
                    </div> :
                    <div>
                        <h1>GAME OVER</h1>
                        <button onClick={rstrt} className={styles.forrstrtbtn}>restart</button>
                    </div>

            }

            <h2>{gameOver && 'final'} score: {score}/{quizdata.length}</h2>
        </div>
    )
}

export default Emojigame