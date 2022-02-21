import React from "react";
import {NotePage} from "./views/NotePage";
import {TwoOptionQuestion} from "./views/TwoOptionQuestion";
import {SingleChoiceQuestion} from "./views/SingleChoiceQuestion";
import {MultipleChoiceQuestion} from "./views/MultipleChoiceQuestion";
import {Telemetry} from "./views/Telemetry";
import {AButton} from "./components/AButton";
import {InfoPage} from "./views/InfoPage";

export const Router = ({questionType, question, option, goNext}) => {
    //todo make option and options consistent!
    console.log("Loading..." +  questionType, option, goNext, question)

    if (questionType === "Front Page") return <InfoPage question={question} option={option} handleClick={goNext}/>
    if (questionType === "Text") return <NotePage question={question} option={option} handleClick={goNext}/>
    if (questionType === "Dual Choice") return <TwoOptionQuestion question={question} option={option} handleClick={goNext}/>
    if (questionType === "Single Choice with Other") return <SingleChoiceQuestion question={question} option={option} handleClick={goNext}/>
    if (questionType === "Single Choice") return <SingleChoiceQuestion question={question} option={option} handleClick={goNext}/>
    if (questionType === "Multiple Choice") return <MultipleChoiceQuestion
        question={question}
        options={option}
        goNext={goNext}
    />
    if (questionType === "Multiple Choice or none") return <MultipleChoiceQuestion
        question={question}
        options={option}
        goNext={goNext}
    />
    if (questionType === "Telemetry") return <Telemetry/>

    return <>
        <h1> {questionType} </h1>
        <AButton txt={"Error missing Question Type (above) not detected"} onClick={goNext} />
    </>
}