import React, { useEffect, useRef, useState } from 'react'
import styles from '../../spscss/coinToss.module.css'

import headsSide from '../../spastatic/pennyHeads.png'
import tailsSide from '../../spastatic/pennyTails.png'

const CoinToss = () => {
    const [tossStatus, setTossStatus] = useState(false)
    const [flips, setFlips] = useState(0)
    const [maxFlips, setMaxFlips] = useState(null)
    const ref = useRef(null)

    function handleToss() {
        setFlips(0)
        setMaxFlips(
            10 + Math.ceil(Math.random() * 10)
        )
        clearInterval(ref.current)
        ref.current = setInterval(() => {
            setTossStatus((prev) => { return !prev })
            setFlips((prev) => { return prev + 1 })
        }, 240)
    }

    useEffect(() => {
        if (flips > maxFlips) {
            clearInterval(ref.current)
        }
    }, [flips])





    return (
        <div className={styles.hero}>
            <div className={styles.theCoin}>
                <div
                    className={styles.heads}
                    style={{
                        transform: tossStatus && `rotateY(180deg)`,
                    }}
                >
                    <img src={headsSide} />
                </div>

                <div
                    className={styles.tails}
                    style={{
                        transform: tossStatus && `rotateY(0deg)`
                    }}
                >
                    <img src={tailsSide} />
                </div>
            </div>

            <button onClick={handleToss} className={styles.tossButton}>Toss</button>
        </div >
    )
}
export default CoinToss