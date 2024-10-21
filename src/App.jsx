import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Base from './Base'

import One from './One'

import Audioplayer from '../spasjsx/apfiles/Audioplayer'
import Memorygame from '../spasjsx/mgfiles/Memorygame'
import Emojigame from '../spasjsx/egfiles/Emojigame'
import Tictactoe from '../spasjsx/tttfiles/Tictactoe'
import Todos from '../spasjsx/tdfiles/Todos'
import Weather from '../spasjsx/wtfiles/Weather'
import Dino from '../spasjsx/dinofiles/Dino'
import Wordle from '../spasjsx/wdlfiles/Wordle'
import Tenzies from '../spasjsx/tzfiles/Tenzies'



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Base />} >
          <Route path='' element={<One />} />
          <Route path='audioplayer' element={<Audioplayer />} />
          <Route path='memorygame' element={<Memorygame />} />
          <Route path='emojigame' element={<Emojigame />} />
          <Route path='tictactoe' element={<Tictactoe />} />
          <Route path='todos' element={<Todos />} />
          <Route path='weather' element={<Weather />} />
          <Route path='dino' element={<Dino />} />
          <Route path='wordle' element={<Wordle />} />
          <Route path='tenzies' element={<Tenzies />} />
        </Route >
      </Routes>
    </BrowserRouter>
  )
}

export default App