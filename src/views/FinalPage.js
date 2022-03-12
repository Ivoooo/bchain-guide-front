import React from "react";
import {QuestionHandler} from "../questions/QuestionHandler";
import {Form} from "react-bootstrap";

const GetText = ({issue1, issue2, language}) => {
    if(issue1.length === 0 && issue2.length === 0){
        if(language === "de") return <h2 className="text-center" key={"y"}>{"Ihr Geschäft erfüllt alle technischen Bereiche völlig! Als nächsten Schritt empfehlen wir die Implementierung der Blockchain."}</h2>;
        return <h2 className="text-center" key={"y"}>{"Your business fully meets all technical areas! The next step we recommend is to implement the blockchain."}</h2>
    }

    const style = {margin:"auto", padding: "30px"}
    return (
        <div>
            <div key={"w" + language} style={style}>
                <h3 className="text-center" key={"yy" + language}>{language === "de" ? "Ihr Geschäft hat in den folgenden technischen Bereichen am meisten Rückstand:"
                : "Your business is most behind in the following technical areas:"}</h3>
                {issue1.map(is =>
                    <h3 className="text-center" key={is + language}>{is}</h3>
                )}
            </div>
            {issue2.length !== 0 && <div key={"ww" + language} style={style}>
                <h3 className="text-center" key={"yyy" + language}>{language === "de" ? "Zusätzlich hat ihr Geschäft in den folgenden Bereichen auch noch Verbesserungsspielraum:"
                : "Additionally, their business also has room for improvement in the following areas:"}</h3>
                {issue2.map(is =>
                    <h3 className="text-center" key={is + language}>{is}</h3>
                )}
            </div>
            }
        </div>)
}

const Recommendations = ({type, language, answers}) => {
    //lists all questions asked in the evaluateCompany part in it's 4 answer options:
    let good = [];
    let medium = [];
    let bad = [];
    let tmp = [5,2]
    while(tmp[0] !== 6 && tmp[1] !== 1) {
        let a = answers[tmp[0]][tmp[1]]["normalized"][0];
        if(a === 1) good.push(tmp);
        else if(a === 2) medium.push(tmp);
        else if(a === 3) bad.push(tmp);

        tmp = QuestionHandler.getNextQuestion(tmp, answers)
    }

    //saves the 2 most lacking categories
    let core = []
    if(bad.length !== 0 && core.length !== 2) core.push(bad);
    if(medium.length !== 0 && core.length !== 2) core.push(medium);
    if(good.length !== 0 && core.length !== 2) core.push(good);

    //builds array for text to present
    function buildArray(questions) {
        let txt = [];
        let categories = [];
        for(let i = 0; i < questions.length; ++i) {
            let tmp = QuestionHandler.getQuestion(questions[i]);
            tmp = tmp["question"][language];
            let t = tmp.split("\n");

            if(categories.includes(t[0])) txt.push(t[1]);
            else {
                categories.push(t[0]);
                txt.push("▪ " + t[0]);
                txt.push("➤ ️" + t[1]);
            }
        }

        return txt;
    }
    let x1 = [];
    let x2 = [];
    if(core.length > 0) x1 = buildArray(core[0]);
    if(core.length === 2) x2 = buildArray(core[1]);
    console.log("x1: ", x1);
    console.log("x2: ", x2);

    return(
        <div key={"recommendations"}>
            <h2 className="text-center" key={"xYes"}>{language === "de" ? "Das Verwenden einer Blockchain wird in Ihrem Fall empfohlen!"
            : "Using a blockchain is recommended in your case!"}</h2>
            <h2 className="text-center" key={"xType"}>{language === "de" ? "Wir empfehlen eine " + type : "We recommend a " + type}</h2>

            <GetText issue1={x1} issue2={x2} language={language}/>
        </div>
    )
}

const Feedback = ({questions, language, answer}) => {
    const lastQ = questions[questions.length -1];

    //case no relevance
    let key = "x"
    if(lastQ[0] === 3) {
        key += "3"
        if(language === "de") return (<div key={key}>
            <h2 className="text-center" key={key + "2"}>{"Das Verwenden einer Blockchain wird in Ihrem Fall nicht empfohlen."}</h2>
            <h3 className="text-center" key={key + "3"}>{"Die Blockchain-Technologie bietet Vorteile in 4 Kernbereichen:"}</h3>
            <h3 className="text-center" key={key + "4"}>{"▪ Kontrolle und Vertrauen"}</h3>
            <h3 className="text-center" key={key + "5"}>{"▪ Effizienz"}</h3>
            <h3 className="text-center" key={key + "6"}>{"▪ Datensicherheit"}</h3>
            <h3 className="text-center" key={key + "7"}>{"▪ Verteilung und Zusammenarbeit"}</h3>
            <h3 className="text-center" key={key + "8"}>{"Da keiner dieser Aspekte für Sie zumindest von mittlerer Relevanz ist, ist eine nicht blockchain-basierte Lösung besser geeignet."}</h3>
        </div>);
        return (<div key={key}>
            <h2 className="text-center" key={key + "2"}>{"The use of blockchain is not recommended in your case."}</h2>
            <h3 className="text-center" key={key + "3"}>{"Blockchain technology offers benefits in 4 key areas:"}</h3>
            <h3 className="text-center" key={key + "4"}>{"▪ Control and Trust"}</h3>
            <h3 className="text-center" key={key + "5"}>{"▪ Efficiency"}</h3>
            <h3 className="text-center" key={key + "6"}>{"▪ Data Security"}</h3>
            <h3 className="text-center" key={key + "7"}>{"▪ Distribution and Collaboration"}</h3>
            <h3 className="text-center" key={key + "8"}>{"Since none of these aspects are at least of medium relevance to you, a non-blockchain based solution would be more appropriate."}</h3>
        </div>);
    }

    if(lastQ[0] === 4) {
        key += "4"
        let q = QuestionHandler.getQuestion(lastQ);
        if(language === "de") return (<div key={key}>
            <h2 className="text-center" key={key + "1"}>{"Das Verwenden einer Blockchain wird in Ihrem Fall nicht empfohlen."}</h2>
            <h3 className="text-center" key={key + "1"}>{"Ihre Interessen stimmen mit den Kernbereichen der Blockchain-Technologie überein, aber das Verwenden einer Blockchain ergibt nur Sinn wenn Sie die folgende Frage mit Ja beantworten können:"}</h3>
            <h3 className="text-center" key={key + "2"}>{"▪ " + q["question"][language]}</h3>
            <h3 className="text-center" key={key + "3"}>{"Es gibt bessere nicht blockchain-basierte Lösungen in Ihrem Fall."}</h3>
        </div>)
        return (<div key={key}>
            <h2 className="text-center" key={key + "1"}>{"The use of blockchain is not recommended in your case."}</h2>
            <h3 className="text-center" key={key + "2"}>{"Your interests align with the core areas of blockchain technology, but using a blockchain only makes sense if you can answer yes to the following question:"}</h3>
            <h3 className="text-center" key={key + "3"}>{"▪ " + q["question"][language]}</h3>
            <h3 className="text-center" key={key + "4"}>{"There are better non-blockchain based solutions in your case."}</h3>
        </div>)
    }

    //case blockchain recommended: print type and improvements for company
    let type;
    if(answer[4][9]["normalized"][0] === 1) type="private permissioned blockchain";
    else if(answer[4][10]["normalized"][0] === 1) type="public permissioned blockchain";
    else type="public permissionless blockchain";

    return <Recommendations type={type} language={language} answers={answer}/>;
}

export const FinalPage = ({answer, language, titles}) => {
    let tmp = [0,1];
    let q = [];
    while(tmp[0] !== 7 || tmp[1] !== 1) {
        if(answer[tmp[0]][tmp[1]] === undefined) break; //if answer has never been answered

        q.push(tmp);
        tmp = QuestionHandler.getNextQuestion(tmp, answer);
    }

    function getPrevAnswer(position) {
        if(answer[position[0]][position[1]] === undefined) return [];
        if(answer[position[0]][position[1]]["normalized"] === "null") return [];
        return answer[position[0]][position[1]]["normalized"]
    }

    function getPrevNote(position) {
        if(answer[position[0]][position[1]] === undefined) return ["",];
        return answer[position[0]][position[1]]["notes"];
    }

    const style = {maxWidth: 1000, margin:"auto", padding: "30px"}
    return (
        <>
            <Feedback questions={q} language={language} answer={answer}/>

            <h3 className="text-center" style={{marginTop: "60px", marginBottom: "60px", marginLeft: "auto", marginRight:"auto"}} key={"Title1"}>{"___________________________________"}</h3>
            <h2 className="text-center" key={"Title2"}>{language === "de" ? "Liste an beantworteten Fragen:"
                : "List of previously answered questions"}</h2>
            <h3 className="text-center" key={"Title2"}>{language === "de" ? "Es wäre empfehlenswert diese Seite auszudrucken für zukünftigen Kontext."
                : "It would be advisable to print this page for future context."}</h3>
            {q.map(qs => {
                const key = qs[0].toString() + "." + qs[1].toString();
                const q = QuestionHandler.getQuestion(qs);

                if(q["type"] === "Overview") {
                    return (
                        <div key={key} style={style}>
                            <h2 className="text-center" key={key+"1"}>{titles[qs[0]] + ":"}</h2>
                        </div>
                    )
                }

                if(q["type"] === "Single Choice" || q["type"] === "Dual Choice") {
                    return (
                        <div key={key} style={style}>
                            <h3 className="text-center" key={key+"1"}>{q["question"][language]}</h3>
                            <h4 className="text-center" key={key+"2"}>{"➤ ️" + q["option"][language][getPrevAnswer(qs)]}</h4>
                        </div>
                    )
                }

                if(q["type"] === "Text") {
                    return (
                        <div key={key} style={style}>
                            <h3 className="text-center" key={key+"1"}>{q["question"][language]}</h3>
                            <Form.Control
                                placeholder={getPrevNote(qs)}
                                as="textarea"
                                rows={2}
                                readOnly
                            />
                        </div>
                    )
                }

                if(q["type"] === "Multiple Choice or none") {
                    return (
                        <div key={key} style={style}>
                            <h3 className="text-center" key={key+"1"}>{q["question"][language]}</h3>
                            {getPrevAnswer(qs).map((x, id) => {
                                return (
                                    <div style={{padding: "12px", maxWidth:"700px", margin:"auto"}}>
                                        <h4 className="text-center" key={key+id}>{"✓ " + q["option"][language][x]}</h4>
                                        {getPrevNote(qs)[id] !== "" && <Form.Control
                                            placeholder={getPrevNote(qs)[id]}
                                            as="textarea"
                                            rows={2}
                                            readOnly
                                        />}
                                    </div>
                                )
                            })}
                        </div>
                    )
                }

                return null;
            })}
        </>
    )
}