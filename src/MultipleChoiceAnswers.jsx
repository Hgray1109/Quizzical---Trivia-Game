import React from 'react'

export default function MultipleChoiceAnswers(props) {
  

    function decodeHtml(html) {
        const txt = document.createElement("textarea")
        txt.innerHTML = html
        return txt.value
    }

    let color = "#D7DDE8"
        if(props.isComplete){
            if(props.isHeld && props.isTrue) {
                color = "green"
                console.log("check 1")
            } else if (props.isHeld && !props.isTrue) {
                color = "red"
                console.log("check 2")
            } else if (props.isTrue) {
                color = "yellow"
                console.log("check 4")
            }
        } else {
            if (props.isHeld){
                color = "green"
                console.log("check 5")
            }
        }


    const styles ={
        backgroundColor: color
    }

    return (
        <div>
             <p onClick={props.holdValue} className="display-answers" style={styles}>
             {decodeHtml(props.value)}
            </p>
        
        </div>
    )
}