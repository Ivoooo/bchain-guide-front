import {AButton} from "../components/AButton";
import React from "react";
import {ATextArea} from "../components/ATextArea";

export const NotePage = ({question, option, handleClick}) => {
    question = question.split("\n");
    let q = question[0];
    question.shift();

    return (
        <>
            <h2 className="text-center">{q}</h2>
            {question.map(q =>
                <h4 className="text-center" key={q}>{q}</h4>
            )}
            <div style={{maxWidth: 800, margin:"auto"}}>
                {ATextArea("Bitte geben Sie hier Ihren Geschäftsfall an.")}
            </div>
            <div style={{float: "right", padding: "12px"}}>
                <AButton txt={option} onClick={handleClick} />
            </div>
        </>
    )
}