import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import styles from './Base.module.css'


const Base = () => {
    const [here, setHere] = useState(false)
    return (
        <>
            <button className={styles.navbtn} onClick={() => { setHere((prev) => { return !prev }) }}>{here ? 'X' : 'O'}</button>
            <nav className={styles.navone} style={{ left: here ? '0px' : '-100vw' }}>
                <NavLink to='audioplayer'>audio player</NavLink>
                <NavLink to='memorygame'>memory game</NavLink>
                <NavLink to='emojigame'>emoji quiz</NavLink>
                <NavLink to='tictactoe'>tic tac toe</NavLink>
                <NavLink to='todos'>todos</NavLink>
                <NavLink to='weather'>weather</NavLink>
                <NavLink to='dino'>dino</NavLink>
                <NavLink to='wordle'>wordle</NavLink>
            </nav>
            <Outlet />
        </>
    )
}

export default Base