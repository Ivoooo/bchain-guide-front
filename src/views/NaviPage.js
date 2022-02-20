import {AButton} from "../components/AButton";
import {ATextArea} from "../components/ATextArea";
import React from "react";
import DataJSON from "../components/data.json";

export const NaviPage = (progress, goTo) => {
    const x = [1,5,6,16,25,34];

    function jump(e) {
        for(let i = 0; i < x.length; i++) {
            if (DataJSON[i+1]["Title"]["Deutsch"] === e) {
                goTo(x[i])
                break;
            }
        }
    }

    return (
        <>
            <h3 className="text-center">Bitte wählen Sie aus, wo sie weitermachen wollen.</h3>
            <div className="d-grid gap-2" onClick={(e) => {
                jump(e.target.value)
            }}>
                <div className="yes-no-grid-container">
                    {AButton("Zurück zur jetzigen Frage")}
                    {AButton("Weit entfernteste beantwortete Frage")}
                </div>
                <h3 className="text-center">Zum Kapitel:</h3>
                {progress > x[0] && AButton(DataJSON[1]["Title"]["Deutsch"])}
                {progress > x[1] && AButton(DataJSON[2]["Title"]["Deutsch"])}
                {progress > x[2] && AButton(DataJSON[3]["Title"]["Deutsch"])}
                {progress > x[3] && AButton(DataJSON[4]["Title"]["Deutsch"])}
                {progress > x[4] && AButton(DataJSON[5]["Title"]["Deutsch"])}
                {progress > x[5] && AButton(DataJSON[6]["Title"]["Deutsch"])}
            </div>

        </>
    )
}