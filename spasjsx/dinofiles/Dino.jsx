import React, { useEffect, useRef, useState } from 'react'
import styles from '../../spscss/dino.module.css'

import dinorun from '../../spastatic/dinorun.gif'


import boop from '../../spastatic/boop.mp3'
const boopp = new Audio(boop)

const Dino = () => {


    const [score, setScore] = useState(0)

    const [bbottom, setBbottom] = useState(200)
    const bright = 900

    const [obsRight, setObsRight] = useState(0)
    const obsbottom = 200

    const timeref = useRef(null)


    const directionref = useRef('up')


    const gameref = useRef(null)




    function strt() {
        clearInterval(gameref.current)
        gameref.current = setInterval(() => {
            setObsRight((prev) => { return prev + 10 })
        }, 10);
    }



    function dub(e) {
        if (e.key == 'w') {
            clearTimeout(timeref.current)
            timeref.current = setInterval(() => {
                setBbottom((prev) => { return directionref.current == 'up' ? prev + 10 : prev - 10 })
            }, 25);
        }
    }


    useEffect(() => {
        window.addEventListener('keydown', dub)

        return () => { window.removeEventListener('keydown', dub) }
    })



    if (bbottom >= window.innerHeight - 400) {
        directionref.current = 'down'

    }


    if (bbottom == 180) {
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


    if (obsRight == bright && obsbottom == bbottom) {
        clearInterval(gameref.current)


    }




    return (
        <div className={styles.hero} >
            <button onClick={strt} >start</button>

            <h1 className={styles.dinoh1}>press w to jump. score: {score}</h1>

            <div className={styles.dinosaur} style={{ right: `${bright}px`, bottom: `${bbottom}px` }}>
                <img className={styles.dinosaurimij} src={dinorun} />
            </div>

            <div className={styles.obstacle} style={{ right: obsRight, bottom: obsbottom }} ></div>

            <div className={styles.land}></div>
        </div>
    )
}

export default Dino