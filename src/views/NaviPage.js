import React from "react";
import DataJSON from "../components/data.json";
import {AButton} from "../components/AButton";

export const NaviPage = ({progress, maxProgress, goTo, chapter, language}) => {

    let c = [];
    for(let i=0; i < chapter.length; ++i ) c.push(i)

    return (
        <>
            <h3 className="text-center">Bitte wählen Sie aus, wo sie weitermachen wollen.</h3>
            <div className="d-grid gap-2">
                <div className="two-option-grid-container">
                    <AButton txt={language === "DE" ? "Zurück zur jetzigen Frage" : "Back to the current question"}
                             onClick={() => goTo(progress)}/>
                    <AButton txt={language === "DE" ? "Weit entfernteste beantwortete Frage" : "Furthest answered question"}
                             onClick={() => goTo(maxProgress)}/>
                </div>
                <h3 className="text-center">Zum Kapitel:</h3>
                {c.map(ch => {
                    return (maxProgress > chapter[ch]) && <AButton txt={DataJSON[ch+1]["Title"]["Deutsch"]}
                                                                   onClick={(e) => goTo(e.target.value)}
                                                                   value={chapter[ch]}
                                                                   key={ch}
                    />
                })}
            </div>
        </>
    )
}