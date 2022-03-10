import React from "react";
import {AButton} from "../components/AButton";

export const SingleChoiceQuestion = ({question, option, handleClick, prevAnswer}) => {
    //convert answer 'option' into an iterable list to be able to apply .map
    let o = [];
    for (let i in option)
        o.push(option[i]);

    let q = question.split("\n");
    return (
        <>
            {q[1] === null ? <h2 className="text-center">{q[0]}</h2>
                : <>
                    <h2 className="text-center">{q[0]}</h2>
                    <h2 className="text-center">{q[1]}</h2>
                </>
            }
            <div className="d-grid gap-2">
                {o.map((x, id) =>
                    <AButton txt={x} key={id} onClick={(e) => handleClick(e.target.value)} isClicked={prevAnswer.includes(id)}/>
                )}
            </div>
        </>
    )
}