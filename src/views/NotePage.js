import {AButton} from "../components/AButton";
import React, {useState} from "react";
import {ATextArea} from "../components/ATextArea";

export const NotePage = ({question, option, handleClick, prevNote=""}) => {
    const [answer, setAnswer] = useState("");
    question = question.split("\n");
    let q = question[0];
    question.shift();

    function goNext() {
        //prevNote is the previous given answer.
        //answer is the new answer
        if(answer === "" && prevNote !== "") handleClick(prevNote) //if you don't edit the input. I.e. just checking again
        else handleClick(answer);
    }

    return (
        <>
            <h2 className="text-center">{q}</h2>
            {question.map(q =>
                <h4 className="text-center" key={q}>{q}</h4>
            )}
            <div style={{maxWidth: 800, margin:"auto"}}>
                <ATextArea txt={"Bitte geben Sie hier Ihren Geschäftsfall an."} saveAnswer={setAnswer} prevAnswer={prevNote} key={q}/>
            </div>
            <div style={{float: "right", padding: "12px"}}>
                <AButton txt={option} onClick={goNext} />
            </div>
        </>
    )
}