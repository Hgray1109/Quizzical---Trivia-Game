import React, {useState, useEffect} from 'react'
import Questions from './Questions'
import Confetti from 'react-confetti'

export default function App() {
  
  const [gameStart, setGameStart] = useState(true)
  const [triviaData, setTriviaData] = useState([])
  const [selectedValue, setSelectedValue] = useState({})
  const [count, setCount] = useState("")
  const [displayCount, setDisplayCount] = useState(false)
  const [category, setCategory] = useState(9)
  const [difficulty, setDifficulty] = useState("easy")
  const [startTime, setStartTime] = useState(0)
  console.log(triviaData)
  

  useEffect(() => {
    restartGame()

    //  setGameStart(gameStart => !gameStart)
  }, [])



  function startGame() {
    setGameStart(gameStart => !gameStart)
    restartGame()
  }

  function returnMenu() {
    setCategory(9)
    setDifficulty("easy")
    restartGame()
    setGameStart(gameStart => !gameStart)
  }

  function restartGame() {
    fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`)
    .then(res => res.json())
    .then(data => setTriviaData(data.results))
    setCount("")
    setDisplayCount(false)
    setSelectedValue({})
    setStartTime(new Date().getTime())
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  }

  function checkAnswers() {
    let correctCount = 0
    triviaData.forEach((data) => {
      if(data.question in selectedValue){
          if(data.correct_answer === selectedValue[data.question]) {
            correctCount ++
          }
      } 
    })
  
    setCount(correctCount)
    setDisplayCount(true)
    window.scrollTo({top: 10000, left: 0, behavior: 'smooth'})
  }

  function saveValue(question, value){
      const selectedObject = {...selectedValue}
      selectedObject[question] = value
      setSelectedValue(selectedObject)
  }


  const questionElements = triviaData.map(data => (
    <Questions question={data.question} correctAnswer={data.correct_answer} incorrectAnswers={data.incorrect_answers} key={data.question + startTime} saveValue={saveValue} isComplete={displayCount}/>
    
  ))
  
  function selectCategory(event) {
    setCategory(event.target.value)
  }



  function selectdifficulty(event) {
   setDifficulty(event.target.value)
  }


    
  return (
    
      <main className="card">
       { gameStart ? 
       <div className="title-card">
          <h1 className="title">Quizzical</h1>
          <p className="title-text">Press the button below to start a random trivia game!</p>

          <form className="form">
            <label className="category-label">Select a category:</label>
              <select onChange={selectCategory} className="category-options">     
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="15">Entertainment: VideoGames</option>
                    <option value="21">Sports</option>
                    <option value="27">Animals</option>
                    <option value="23">History</option>
              </select>
          </form>

          <form>
            <label className="category-label">Select a difficulty:</label>
              <select onChange={selectdifficulty} className="category-options">     
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
              </select>
          </form>

          <button className="start-btn" onClick={startGame}>Start Game!</button> 
        </div> 
        : <div className="element-display"> 
             {questionElements} 
             <div className="buttons-display">
                <button className="play-btn" onClick={returnMenu}>Main Menu</button> 
                <button className="play-btn reset" onClick={restartGame}>Restart Game</button>
                <button className="play-btn" onClick={checkAnswers}>Check Answers!</button>
                {displayCount && <p className="tally-score">Your Score is: {count}/5</p>}
                {count === 5 && <Confetti className="confetti" />}
             </div>
          </div>
        }
        
      </main>
  )
}