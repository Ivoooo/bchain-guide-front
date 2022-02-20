import {BButton} from "../components/BButton";
import React from "react";

export const FrontPage = (question, option, handleClick) => {
    question = question.split("\n");
    return (
        <>
            {question.map(q =>
                <h2 className="text-center">{q}</h2>
            )}
            <div style={{float: "right"}}>
                {BButton(option, handleClick, true)}
            </div>
        </>
    )
}