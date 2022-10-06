import React, {useEffect} from "react"
import { nanoid } from 'nanoid'
import MultipleChoiceAnswers from "./MultipleChoiceAnswers"



export default function Questions(props) {

    const [options, setOptions] = React.useState(displayAnswers())

    function decodeHtml(html) {
        const txt = document.createElement("textarea")
        txt.innerHTML = html
        return txt.value
    }


    function generateOptions(values, questionId){
        return {
          id: nanoid(),
          value: values,
          isHeld: false,
          isTrue: false,
          questionId: questionId
        }
    }

    function displayAnswers(){
        const questionId = nanoid()
        let answers =[]
        answers.push(generateOptions(props.correctAnswer, questionId))
        answers.push(generateOptions(props.incorrectAnswers[0], questionId))
        answers.push(generateOptions(props.incorrectAnswers[1], questionId))
        answers.push(generateOptions(props.incorrectAnswers[2], questionId))
        answers[0].isTrue=true
        return answers.sort(() => Math.random() - 0.5)

    }


    
   

    function holdValue(id, questionId) {
        setOptions(oldOptions => oldOptions.map(option =>{
            return option.questionId === questionId ? 
            option.id === id ? 
            {...option, isHeld: !option.isHeld} :
            {...option, isHeld: false} : 
            option
        }))

       
    }

        useEffect(() =>{
            const selectedOptionsArray = options.filter((option) => option.isHeld) 
            if(selectedOptionsArray.length === 1) {
                const selectOption = selectedOptionsArray[0]
                props.saveValue(props.question, selectOption.value)
            } else {
                props.saveValue(props.question, "")            
            }
        }, [options])


    const answersElements = options.map(answermap => (
        <MultipleChoiceAnswers 
        value={answermap.value} 
         id={answermap.id}
         isTrue={answermap.isTrue} 
         key={answermap.id} 
         isHeld={answermap.isHeld}
        holdValue={() => holdValue(answermap.id, answermap.questionId)}
        isComplete={props.isComplete}
        />
    ))

    return (
        <div className="display-game">
                <h1 className="display-questions">
                    {decodeHtml(props.question)}
                    </h1>
                <div className="answer-container">
                    {answersElements}
                </div>
            <hr className="line-break"/>
        </div>
    )
}
   