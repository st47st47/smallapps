import React, { useEffect, useState } from 'react'
import '../../spscss/memorygame.css'

import cardimage from '../../spastatic/card.png'

const content = [1, 2, 3, 4, 1, 2, 3, 4]


const contentready = content.sort(() => { return Math.random() - 0.5 }).map((each) => { return { idee: Math.random(), value: each, status: false, scored: false } })

const Memorygame = () => {
    const [cardsForScreen, setCardsForScreen] = useState(contentready)

    const [firstChoice, setFirstChoice] = useState({ cchoice: 'x', sstatus: false })
    const [secondChoice, setSecondChoice] = useState({ cchoice: 'y', sstatus: false })
    const [score, setScore] = useState(0)

    const [fun, setFun] = useState(27)

    function anycrdclk(arg) {

        setCardsForScreen((prev) => {
            return prev.map((each) => {
                return each.idee == arg.idee ? { ...each, status: true } : each
            })
        })

        if (firstChoice.sstatus !== true) {
            setFirstChoice({ cchoice: arg.value, sstatus: true })

        }

        else if (secondChoice.sstatus !== true) {
            setSecondChoice({ cchoice: arg.value, sstatus: true })

            setFun(Math.random())

        }
    }

    useEffect(() => {
        if (firstChoice.cchoice == secondChoice.cchoice) {
            setScore((prev) => { return prev + 1 })
            setCardsForScreen((prev) => {
                return prev.map((each) => {
                    return each.value == firstChoice.cchoice ? { ...each, scored: true } : each
                })
            })
        } else {
            setCardsForScreen((prev) => {
                return prev.map((each) => {
                    return !each.scored ? { ...each, status: false } : each
                })
            })
        }


        setFirstChoice(
            { cchoice: 'x', sstatus: false }
        )
        setSecondChoice(
            { cchoice: 'y', sstatus: false }
        )

    }, [fun])


    console.log(cardsForScreen)


    return (
        <div className="heromem">
            <h1 className='memscore'>score: {score}</h1>
            <div className="memgrid">

                {cardsForScreen.map((each) => {
                    return <div className="memcard" onClick={() => { anycrdclk(each) }}>
                        <div className="headsface" style={{ transform: each.status && 'rotateY(180deg)' }}>
                            <img src={cardimage} />
                        </div>
                        <div className="tailsface" style={{ transform: each.status && 'rotateY(0deg)' }}>{each.value}</div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Memorygame



