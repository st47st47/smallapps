import React, { useEffect, useState } from 'react'
import '../../spscss/memorygame.css'

import cardimage from '../../spastatic/card.png'

const content = [1, 2, 3, 4]
const twod = content.map((each) => { return [each, each] })
function flatten(twodarray) {
    return twodarray.reduce((accu, curval) => {
        if (Array.isArray(curval)) {
            return accu.concat(flatten(curval))
        }
        else {
            accu.push(curval)
            return accu
        }
    }, [])
}
const contentready = flatten(twod).sort(() => { return Math.random() - 0.5 })

const Memorygame = () => {


    const [firstChoice, setFirstChoice] = useState({ cchoice: 'x', sstatus: false })
    const [secondChoice, setSecondChoice] = useState({ cchoice: 'y', sstatus: false })
    const [score, setScore] = useState(0)

    const [fun, setFun] = useState(27)

    function anycrdclk(arg) {
        if (firstChoice.sstatus !== true) {
            setFirstChoice({ cchoice: arg, sstatus: true })

        }

        else if (secondChoice.sstatus !== true) {
            setSecondChoice({ cchoice: arg, sstatus: true })

            setFun(Math.random())

        }
    }

    useEffect(() => {
        if (firstChoice.cchoice == secondChoice.cchoice) {
            setScore((prev) => { return prev + 1 })
        }

        setFirstChoice(
            { cchoice: 'x', sstatus: false }
        )
        setSecondChoice(
            { cchoice: 'y', sstatus: false }
        )

    }, [fun])



    return (
        <div className="heromem">
            <h1 className='memscore'>score: {score}</h1>
            <div className="memgrid">

                {contentready.map((each) => {
                    return <div className="memcard" onClick={() => { anycrdclk(each) }}>
                        <div className="headsface">
                            <img src={cardimage} />
                        </div>
                        <div className="tailsface">{each}</div>
                    </div>
                })}

                <div className="memcard">
                    <div className="headsface">
                        <img src={cardimage} />
                    </div>
                    <div className="tailsface">joker</div>
                </div>
            </div>
        </div>
    )
}

export default Memorygame



