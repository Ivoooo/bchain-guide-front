import React from "react";
import {AButton} from "../components/AButton";
import {QuestionHandler} from "../questions/QuestionHandler";

export const NaviPage = ({answer, titles, language, goTo, toggleNavi}) => {
    let chapters = [0];
    let tmp = [0,1];
    while(tmp[0] !== 7 || tmp[1] !== 1) {
        if(answer[tmp[0]][tmp[1]] === undefined) break; //if answer has never been answered

        tmp = QuestionHandler.getNextQuestion(tmp, answer);
        if(tmp[0] !== chapters[chapters.length-1]) chapters.push(tmp[0]);
    }
    const furthestPosition = tmp; //could also refactor but helps with readability above.

    function onPress(c) {
        goTo([parseInt(c),1]);
    }

    return (
        <>
            <h3 className="text-center">Bitte wählen Sie aus, wo sie weitermachen wollen.</h3>
            <div className="d-grid gap-2">
                <div className="two-option-grid-container">
                    <AButton txt={language === "de" ? "Zurück zur jetzigen Frage" : "Back to the current question"}
                             onClick={() => toggleNavi(false)}/>
                    <AButton txt={language === "de" ? "Weit entfernteste beantwortete Frage" : "Furthest answered question"}
                             onClick={() => goTo(furthestPosition)}/>
                </div>

                <h3 className="text-center">Zum Kapitel:</h3>
                {chapters.map((ch) => {
                    return <AButton txt={titles[ch]}
                                    onClick={(e) => onPress(e.target.value)}
                                    value={ch}
                                    key={ch}
                    />
                })}
            </div>
        </>
    )
}