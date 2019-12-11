import React, {useState, useEffect} from 'react';
import './App.css';
import quizQuestions from '../Api'
import Answers from '../containers/Answers'
import Buttons from '../containers/buttons'


const App = () => {
  const [allQuestions, setQuestions] = useState(quizQuestions)
  const [question, setQuestion] = useState('')
  const [answers, setAnswers] = useState([])
  const [correctAnswer, setCorrectAnswer] = useState()
  const [count, setCount] = useState(0)
  const [begin, setBegin] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [activeAnswer, setActiveAnswer] = useState(null)
  const [resultButton, setResultButton] = useState(false)
  const [result, setResult] = useState(null)
  const [startTime, setStartTime] = useState({})
  const totalQuestions = allQuestions.length


  useEffect(() => {
    setQuestion(allQuestions[count].question)
    setAnswers(allQuestions[count].answers)
    setCorrectAnswer(allQuestions[count].answerIndex)
  }, )
 
  const handlerClickStartTest = (e) => {
    e.preventDefault()
    setBegin(true)
    const time = new Date().getTime()
    setStartTime({
      time: time,
    })
   
  }

  const nextQuestion = (e) => {
    e.preventDefault()
    if (activeAnswer === correctAnswer) {
      setSelectedAnswers([activeAnswer, ...selectedAnswers])
    }
    if(activeAnswer != null && count !== (totalQuestions - 1)) {
      setCount( count + 1)
      setActiveAnswer(null)
    } else if (activeAnswer != null && count === (totalQuestions - 1) )  {
      setActiveAnswer(null)
      setResultButton(true)
      const nowTime = new Date().getTime() - startTime.time
      setStartTime({
        time: nowTime,
        hours: parseInt((nowTime / (1000 * 60 * 60)) % 24),
        minutes: parseInt((nowTime / (1000 * 60)) % 60),
        seconds:   parseInt((nowTime/ 1000) % 60),
      })
    }
     
    } 
    
    const handlerClickResult = () => {
      setResult(true)
    }


  const selectAnswer = (e) => {
    e.preventDefault()
    const active = +e.target.value
    setActiveAnswer(active)
  }

  return (
   <div className="test-container">
     <h1>Алгоритмизация</h1>
     {
       !begin ? 
       <h3>Нажмите "Начать тест", чтобы приступить к выполнению</h3>
      :
      <div className="questions">
      <div className="counter">
        <span>Вопрос {count + 1} из {totalQuestions}</span> 
      </div>
      <h2>{question}</h2>
      <Answers answers={answers} 
               select={selectAnswer} 
               active={activeAnswer}
               />
     </div> 
     }
    
    <Buttons handlerClickStartTest={handlerClickStartTest} 
             nextQuestion={nextQuestion} 
             begin={begin} 
             resultButton={resultButton} 
             handlerClickResult={handlerClickResult}/>
    <div className={!result ? 'hidden' : 'popup-result active'}>
      <h3>Результат</h3>
      <h2>{selectedAnswers.length > 2 ? "Тест пройден" : "Тест не пройден"} </h2>
      <div>
        <ul>
          <li>Количество правильных ответов: {selectedAnswers.length}</li>
    <li>Потраченное время:  
        {startTime.hours < 10 ? "0" + startTime.hours : startTime.hours } 
        : 
        {startTime.minutes < 10 ? "0" + startTime.minutes : startTime.minutes}
        : 
        {startTime.seconds < 10 ? "0" + startTime.seconds : startTime.seconds} </li>
        </ul>
      </div>
    </div>
   </div> 
  )
}

export default App;
