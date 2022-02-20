import {AButton} from "../components/AButton";
import {ATextArea} from "../components/ATextArea";
import React from "react";

export const SingleChoiceQuestion = (question, options, handleClick) => {
    //convert answer 'options' into an iterable list to be able to apply .map
    //returns array like: [ ['1', 'yes'], ['2', 'no'] , ..]
    let x = [];
    for (let i in options)
        x.push([i, options[i]]);

    return (
        <>
            <h2 className="text-center">{question}</h2>
            <div className="d-grid gap-2" onClick={(e) => {
                handleClick(e.target.value)
            }}>
                {x.map(option =>
                AButton(option[1]))
                }
            </div>
            <div style={{maxWidth: 800, margin:"auto", padding:10}}>
                {ATextArea("Falls Sie wollen können Sie hier ihre Antwort erläutern.")}
            </div>
        </>
    )
}