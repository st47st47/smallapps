import { useState, useEffect, useRef } from "react";
import styles from '../../spscss/audioplayer.module.css'

import space from '../../spastatic/space.png'
import forest from '../../spastatic/forest.png'
import ocean from '../../spastatic/ocean.png'

import spacesound from '../../spastatic/1minspace.mp3'
import forestsound from '../../spastatic/1minforest.mp3'
import oceansound from '../../spastatic/1minocean.mp3'

function Audioplayerfinal() {
    const [songs] = useState([
        { title: 'space', artist: 'artist 1', img_src: space, src: spacesound },
        { title: 'forest', artist: 'artist 2', img_src: forest, src: forestsound },
        { title: 'ocean', artist: 'artist 3', img_src: ocean, src: oceansound },

    ])

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

    useEffect(() => {
        setNextSongIndex(() => {
            if (currentSongIndex + 2 > songs.length) { return 0 }
            else { return currentSongIndex + 1 }
        })
    }, [currentSongIndex])

    return (
        <div className={styles.hero}>
            <Player
                songs={songs}
                currentSongIndex={currentSongIndex}
                setCurrentSongIndex={setCurrentSongIndex}
                nextSongIndex={nextSongIndex}
            />
        </div>
    );
}

export default Audioplayerfinal;






































// 

function Player(props) {
    const audioel = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const [fin, setfin] = useState(false)

    useEffect(() => {
        if (isPlaying) { audioel.current.play() }
        else { audioel.current.pause() }

    })

    useEffect(() => {
        audioel.current.addEventListener('ended', () => {
            setIsPlaying(!isPlaying)
        })
    })

    const Skipsong = (forwards = true) => {
        if (forwards) {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp++;
                if (temp > props.songs.length - 1) { temp = 0 }
                return temp
            })
        }
        else {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp--;
                if (temp < 0) { temp = props.songs.length - 1 }
                return temp
            })
        }
    }

    return (
        <div className={styles.cplayer}>
            <audio src={props.songs[props.currentSongIndex].src} ref={audioel}></audio>
            <h4>playing now</h4>
            <SongDetails song={props.songs[props.currentSongIndex]} />
            <Playercontrols
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                SkipSong={Skipsong}
                fin={fin}
                setfin={setfin}

            />
            <p><strong>next: </strong>{props.songs[props.nextSongIndex].title} by {props.songs[props.nextSongIndex].artist}</p>
        </div>
    )
}




























































// 
function SongDetails(props) {
    return (
        <div className={styles.cplayerdetails}>
            <div className={styles.detailsimg}>
                <img src={props.song.img_src} />
            </div>
            <h3 className={styles.detailstitle}>{props.song.title}</h3>
            <h4 className={styles.detailsartist}>{props.song.artist}</h4>
        </div>
    )
}




























// 
function Playercontrols(props) {
    return (<>
        <div className={styles.cplayercontrols}>
            <button className={styles.skipbtn} onClick={() => props.SkipSong(false)}>⏮️</button>
            <button className={styles.playbtn}
                onClick={() => props.setIsPlaying(!props.isPlaying)}>{props.isPlaying || props.fin ? '⏹️' : '▶️'}
            </button>
            <button className={styles.skipbtn} onClick={() => props.SkipSong()}>⏭️</button>
        </div >
    </>)
}
