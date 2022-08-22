import React from 'react'

export default function Modal({ isCorrect, solution, turn, action }) {


  return (
    <div className="modal">
        <div>
          <h1>{isCorrect ? 'You Win!' : 'Nevermind'}</h1>
          <p className="solution">{solution}</p>
          <p>{isCorrect ? `You found the solution in ${turn} guesses :)` : 'Better luck next time :)'}</p>
          <div onClick={action}>Play Again</div>
        </div>
    </div>
  )
}
