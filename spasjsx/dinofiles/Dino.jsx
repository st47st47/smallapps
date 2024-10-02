import React, { useEffect, useRef, useState } from 'react'
import styles from '../../spscss/dino.module.css'

import dinorun from '../../spastatic/dinorun.gif'
import dinostill from '../../spastatic/dinostill.png'

import boop from '../../spastatic/boop.mp3'
const boopp = new Audio(boop)

const Dino = () => {

    const [inProgress, setInProgress] = useState(false)

    const [score, setScore] = useState(0)

    const [bbottom, setBbottom] = useState(200)
    const bright = 900

    const [obsRight, setObsRight] = useState(0)
    const obsbottom = 200

    const timeref = useRef(null)


    const directionref = useRef('up')


    const gameref = useRef(null)




    function strt() {
        setInProgress(true)
        clearInterval(gameref.current)
        gameref.current = setInterval(() => {
            setObsRight((prev) => { return prev + 10 })
        }, 10);
    }



    function dub(e) {
        if (e.key == 'w') {
            clearTimeout(timeref.current)
            timeref.current = setInterval(() => {
                setBbottom((prev) => { return directionref.current == 'up' ? prev + 5 : prev - 5 })
            }, 10);
        }
    }


    useEffect(() => {
        window.addEventListener('keydown', dub)

        return () => { window.removeEventListener('keydown', dub) }
    }, [])



    if (bbottom >= window.innerHeight - 400) {
        directionref.current = 'down'

    }


    if (bbottom == 170) {
        clearInterval(timeref.current)
        directionref.current = 'up'
    }


    if (obsRight >= window.innerWidth) {
        boopp.play()

        clearInterval(gameref.current)


        setObsRight(0)
        setScore((prev) => { return prev + 1 })

        strt()
    }


    if (obsRight == bright && obsbottom >= bbottom) {
        clearInterval(gameref.current)

        setInProgress(false)
        setObsRight(899)
    }


    console.log(obsRight)



    return (
        <div className={styles.hero} >
            <h1 className={styles.dinoh1}>press w to jump. score: {score}</h1>

            {
                !inProgress && <h1 className={styles.restarth1} onClick={() => { setObsRight(0); strt(); setScore(0); setInProgress(true) }}>game over. restart?</h1>
            }

            <div className={styles.dinosaur} style={{ right: `${bright}px`, bottom: `${bbottom}px` }}>
                <img className={styles.dinosaurimij} src={inProgress ? dinorun : dinostill} />
            </div>

            <div className={styles.obstacle} style={{ right: obsRight, bottom: obsbottom }} ></div>

        </div>
    )
}

export default Dino