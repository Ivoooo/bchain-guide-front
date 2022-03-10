import React from "react";
import {QuestionHandler} from "../questions/QuestionHandler";
import {Form} from "react-bootstrap";

export const FinalPage = ({answer, language}) => {
    const q = QuestionHandler.getQuestionList();
    const style = {maxWidth: 1000, margin:"auto", padding: "30px"}
    const lastQuestion = QuestionHandler.getLastStep([7,1], answer);

    function getPrevAnswer(position) {
        if(answer[position[0]][position[1]] === undefined) return [];
        if(answer[position[0]][position[1]]["normalized"] === "null") return [];
        return answer[position[0]][position[1]]["normalized"]
    }

    function getPrevNote(position) {
        if(answer[position[0]][position[1]] === undefined) return ["",];
        return answer[position[0]][position[1]]["notes"];
    }

    return (
        <>
            <h3 className="text-center" key={"Title"}>{"You failed successfully! (to be implemented)"}</h3>
            <h3 className="text-center" key={"Title"}>{"The last question you answered was " + lastQuestion}</h3>

            <h3 className="text-center" style={{marginTop: "60px", marginBottom: "60px", marginLeft: "auto", marginRight:"auto"}} key={"Title"}>{"___________________________________"}</h3>
            <h3 className="text-center" key={"Title"}>{language === "de" ? "Liste an beantworteten Fragen:"
                : "List of previously answered questions"}</h3>
            {q.map(qs => {
                const key = qs[0].toString() + "." + qs[1].toString();
                const q = QuestionHandler.getQuestion(qs);
                if(q["type"] === "Single Choice" || q["type"] === "Dual Choice") {
                    return (
                        <div key={key} style={style}>
                            <h3 className="text-center" key={key}>{q["question"][language]}</h3>
                            <h4 className="text-center" key={key}>{"➤ ️" + q["option"][language][getPrevAnswer(qs)]}</h4>
                        </div>
                    )
                }

                if(q["type"] === "Text") {
                    return (
                        <div key={key} style={style}>
                            <h3 className="text-center" key={key}>{q["question"][language]}</h3>
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
                            <h3 className="text-center" key={key}>{q["question"][language]}</h3>
                            {getPrevAnswer(qs).map((x, id) => {
                                return (
                                    <div style={{padding: "12px", maxWidth:"700px", margin:"auto"}}>
                                        <h4 className="text-center" key={key}>{"✓ " + q["option"][language][x]}</h4>
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
            }
            )}
        </>
    )
}