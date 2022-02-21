import {AButton} from "../components/AButton";
import React from "react";

export const FrontPage = ({question, option, handleClick, refer=false}) => {
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
        <>
            {q.map(qs =>
                <h2 className="text-center" key={qs}>{qs}</h2>
            )}
            {p.map(qs =>
                <h3 className="text-center" key={qs}>{qs}</h3>
            )}
            <a href='https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/politik-staat/kanton/digitale-verwaltung-und-e-government/projekte_digitale_transformation/blockchain_leitfaden_final.pdf' target="_blank" rel="noreferrer">
                { refer && <AButton txt={"Leitfaden anschauen"}/> }
            </a>
            <div style={{float: "right"}}>
                <AButton txt={option} onClick={handleClick}/>
            </div>
        </>
    )
}