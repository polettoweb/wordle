import React from 'react'
import db from '../db.json'

export default function Keypad({ usedKeys }) {
  const letters = db.letters

  const handleClick = (key) => {
    window.dispatchEvent(new KeyboardEvent('keyup', {'key': key}))
  }

  return (
    <div className="keypad">
      {letters && letters.map((l, i) => {
        const color = usedKeys[l.key]
        const button = <div key={l.key} onClick={() => window.dispatchEvent(new KeyboardEvent('keyup', { 'key': l.key }))} className={color}>{l.key}</div>
        if (l.key === 'z') {
          return (
            <React.Fragment key={i}>
              <br />
              {button}
            </React.Fragment>
          )
        } else {
          return button
        }
      })}

      <br />
      <div onClick={() => handleClick('Backspace')} className="backspace">{"<"}</div>
      <div onClick={() => handleClick('Enter')} className="enter">Enter</div>
    </div>
  )
}
