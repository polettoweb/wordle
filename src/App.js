import { useEffect, useState } from 'react'
import Wordle from './components/Wordle'

import db from './db.json'

function App() {
  const [solution, setSolution] = useState(null)
  const [matches, setMatches] = useState(0)
  const [lost, setLost] = useState(0)
  const [won, setWon] = useState(0)

  useEffect(() => {
    const stat = localStorage.getItem('matches') !== null && JSON.parse(localStorage.getItem('matches'))
    if (stat.length) {
      const lostMatches = stat.filter(item => item.turn === null)
      setMatches(stat.length)
      setLost(lostMatches.length)
      setWon(stat.length - lostMatches.length)
    } else {
      setMatches(0)
      setLost(0)
      setWon(0)
    }
  }, [])

  
  useEffect(() => {
    // random int between 0 & db.length
    const randomSolution = db.solutions[Math.floor(Math.random()*db.solutions.length)].word
    setSolution(randomSolution)

    console.log(randomSolution)
  }, [setSolution])

  return (
    <div className="App">
      <h1>Wordle</h1>
      <div className="container">
        <p>Total Matches: {matches}</p>
        <p>Won: {won}</p>
        <p>Lost: {lost}</p>
      </div>
      {solution && <Wordle solution={solution} />}
    </div>
  )
}

export default App