import React, {useCallback, useEffect, useState} from "react";
import {AButtonWithCommentOnClick} from "../components/AButtonWithCommentOnClick";
import {AButton} from "../components/AButton";

export const MultipleChoiceQuestion = ({language, question, option, goNext, prevAnswer, prevNote}) =>{
    //states
    const [newOption, setNewOption] = useState([]);
    const [newQuestion, setNewQuestion] = useState([]);
    const [answer, setAnswer] = useState([]);
    const [notes, setNotes] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const [incorrect, setIncorrect] = useState(false);

    //calculates if incorrect of next button should be disabled
    //can't use useEffect since size of array never changes and doesn't check content.
    const checkDisabled = useCallback(() => {
        let hasTrues = false;
        for(let i=0; i < answer.length-1; i++) {
            if(answer[i]) {
                hasTrues = true;
                break;
            }
        }
        let last = answer[answer.length-1]

        setIncorrect(hasTrues && last);
        setDisabled(!hasTrues && !last);
    }, [answer])

    useEffect(() => {
        checkDisabled();
    }, [answer, checkDisabled])

    //builds initial question; answer, option and note array
    useEffect(() => {
        let a = [], n = [], o = [];
        for(let i=0; i<option.length; ++i) {
            a.push(false);
            n.push("");
            o.push(option[i]);
        }
        console.log(prevAnswer)
        if(prevAnswer !== []) {
            for(let i=0; i<prevAnswer.length; ++i) {
                a[prevAnswer[i]] = true;
                n[prevAnswer[i]] = prevNote[i];
            }
        }
        setNewQuestion(question.split("\n"));
        setAnswer(a);
        setNotes(n);
        setNewOption(o);
    }, [option, prevAnswer, prevNote, question])

    function handleClick(option, bool, note) {
        let idx = newOption.indexOf(option);
        let a = answer;
        a[idx] = bool;
        setAnswer(a);

        //AButtonWithCommentOnClick might not have fully initialized.
        if(note !== "") {
            let b = notes;
            b[idx] = note;
            setNotes(b);
        }

        checkDisabled();
    }

    //builds the answer array and goes next.
    function handleNext() {
        let a = [],b = [];
        for(let i=0; i < answer.length; i++) {
            if(answer[i]) {
                a.push(newOption[i]);
                b.push(notes[i]);
            }
        }
        goNext(a, b);
    }

    return <>
        {newQuestion.map(qs =>
            <h2 className="text-center">{qs}</h2>
        )}

        <div className="d-grid gap-2">
            {newOption.map((o, id) =>
                <AButtonWithCommentOnClick txt={o} key={id} handleClick={handleClick} language={language} isClicked={answer[id]} prevNote={notes[id]}/>
            )}
        </div>
        <div style={{float: "right"}}>
            {incorrect ? <h4 className="text-center">{language === "de" ? "Die letzte Option und alle anderes sind exklusiv. Bitte ändern sie ihre Auswahl."
                    : "The last option and all others are mutually exclusive. Please change your answer"}</h4>
                : <AButton txt={"Next"} onClick={handleNext} disabled={disabled} key={"Next"}/>
            }
        </div>
    </>
}