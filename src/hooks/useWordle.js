import { useState } from 'react'

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array(6)])
  const [history, setHistory] = useState([])
  const [isCorrect, setIsCorrect] = useState(false)
  const [usedKeys, setUsedKeys] = useState({})
  const [message, setMessage] = useState('')
  
  const formatGuess = () => {
    let solutionArray = [...solution]
    let formattedGuess = [...currentGuess].map((l) => ({key: l, color: 'grey'}))

    formattedGuess.forEach((l, i) => {
      if (solution[i] === l.key) {
        l.color = 'green'
        solutionArray[i] = null
      }
    })
    
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== 'green') {
        l.color = 'yellow'
        solutionArray[solutionArray.indexOf(l.key)] = null
      }
    })

    return formattedGuess
  }

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true)
    }

    setGuesses(prevGuesses => {
      let newGuesses = [...prevGuesses]
      newGuesses[turn] = formattedGuess
      return newGuesses
    })
    
    setHistory(prevHistory => [...prevHistory, currentGuess])
    setTurn(prevTurn => prevTurn + 1)
    
    setUsedKeys(prevUsedKeys => {
      formattedGuess.forEach(l => {
        const currentColor = prevUsedKeys[l.key]

        if (l.color === 'green') {
          prevUsedKeys[l.key] = 'green'
        }
        else if (l.color === 'yellow' && currentColor !== 'green') {
          prevUsedKeys[l.key] = 'yellow'
        }
        else if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
          prevUsedKeys[l.key] = 'grey'
        }
      })

      return prevUsedKeys
    })
    
    setCurrentGuess('')
  }
  
  const handleKeyup = ({ key }) => {
    setMessage('')
    if (key === 'Enter') {
      if (turn > 5) {
        setMessage('You used all your guesses! The solution was ' + solution)
        return
      }
      if (turn <= 5 && currentGuess === solution) {
        localStorage.setItem('matches', JSON.stringify([{"turn": turn, "solution": solution}]))
      }
      if (turn === 5 && currentGuess !== solution) {
        localStorage.setItem('matches', JSON.stringify([{"turn": null, "solution": solution}]))
      }
      if (history.includes(currentGuess) || currentGuess.length !== 5) {
        return
      }
      const formatted = formatGuess()
      addNewGuess(formatted)
    }
    if (key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1))
      return
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess(prev => prev + key)
      }
    }
  }

  return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup, message}
}

export default useWordle
