import React from 'react'

const Buttons = (props) => {
    return (
        <div className="buttons">
            <button onClick={props.handlerClickStartTest} 
                    className={!props.begin ? "active" :  "hidden" }>Начать тест</button>

            <button onClick={props.nextQuestion} 
                    className={!props.begin ? "hidden" : "nextBtn active" }>Следующий вопрос</button>

        <div className={!props.resultButton ? 'hidden' : 'button_result_bLock active'}>
            <button onClick={props.handlerClickResult} >Результат</button>
        </div>       
   
    </div>
    )
}

export default Buttons