import React, {useEffect, useState} from "react";
import {AButton} from "../components/AButton";

export const Overview = ({question, position, titles, option, handleClick, language}) => {
    const [newTitles, setTitles] = useState([]);

    useEffect(() => {
        let a = [...titles];
        a.pop(); //getting rid of Final result step
        a.pop(); //getting rid of data collection step
        setTitles(a);
    }, [titles])

    return (
        <>
            <h1 className="text-center">{language === "de" ? "Fortschritt" : "Progress"}</h1>
            <h2 className="text-center" key={question}>{question}</h2>
            <div style={{maxWidth: 800, margin:"auto", padding:10}}>
                {newTitles.map((ch, index) => {
                    return <h2 key={index}>{
                        index < position[0] ?
                            "✓ " + titles[index] :
                            "✘ " + titles[index]
                    }</h2>
                })}
            </div>
            <div style={{float: "right"}}>
                <AButton txt={option} onClick={(e) => handleClick(e.target.value)}/>
            </div>
        </>
    )
}