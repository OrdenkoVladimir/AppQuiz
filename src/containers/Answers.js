import React from 'react'

const Answers = (props) => {
    return (
        <div className="answers">
        {
          props.answers.map((answer, index) => {
            return (
              
              <button key={index} onClick={props.select} value={index} className={props.active === index ? 'active' : ''}>{answer.content}</button>  
              
            )
          })
        }
      </div>
    )
}

export default Answers