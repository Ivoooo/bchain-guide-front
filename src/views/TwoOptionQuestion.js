import {AButton} from "../components/AButton";
import React from "react";

export const TwoOptionQuestion = ({question, option, handleClick, prevAnswer}) => {
    let q, p = [];
    if (question.includes("\r")) {
        let qq = question.split("\r");
        q = qq[0].split("\n");
        p = qq[1].split("\n");
    }
    else {
        q = question.split("\n");
    }

    return (
        <div className = "dual-choice-container">
            {q.map(qs =>
                <h2 className="text-center" key={qs}>{qs}</h2>
            )}
            {p.map(qs =>
                <h3 className="text-center" key={qs}>{qs}</h3>
            )}

            <div className="two-option-grid-container">
                <AButton txt={option[0]} onClick={(e) => handleClick(e.target.value)} isClicked={prevAnswer.includes(0)}/>
                <AButton txt={option[1]} onClick={(e) => handleClick(e.target.value)} isClicked={prevAnswer.includes(1)}/>
            </div>
        </div>
    )
}