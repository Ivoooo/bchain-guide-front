import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import './App.css';
import {Header} from "./views/Header";
import {HeaderFrontPage} from "./views/HeaderFrontPage";
import './views/Views.css';
import {Router} from "./Router";
import {NaviPage} from "./views/NaviPage";
import {QuestionHandler} from "./questions/QuestionHandler";

const App = () => {
    const [position, setPosition] = useState([0,1]);
    const [current, setCurrent] = useState({"question": {"de":"The question will load shorty."}, "option": {"de":"Zur Umfrage"}});
    const [questionType, setQuestionType] = useState("Front Page");
    const [titles, setTitles] = useState(["Einführung"]);
    const [language, toggleLanguage] = useState("de");
    const [navi, toggleNavi] = useState(false);
    const [answer, setAnswer] = useState({0:{}, 1: {}, 2: {}, 3:{}, 4:{}, 5:{}, 6:{}, 7:{}});
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (!localStorage.getItem("data")) localStorage.setItem("version", "1.0") //todo get version from file
        const t = new Date();
        let q = t.getTime()
        setTime(q);
    }, []) //since no variable is at the end here it's basically "componentDidMount". So this function is executed
    //just once at the beginning


    useEffect( () => {
        console.log(position);

        //update the question & corresponding type
        let q = QuestionHandler.getQuestion(position);
        setCurrent(q);
        setQuestionType(q["type"]);
        console.log(q)
    }, [position]) //here the function is executed every time furthestPosition or position
        //is updated. Also, at the beginning since it goes from null to the given start state above

    useEffect(() => {
        setTitles(QuestionHandler.getTitles(language));
    }, [language])

    function goTo([chapter=1, part=1]) {
        setPosition([chapter,part]);
        toggleNavi(false);
    }

    function goNext(prevAnswer, prevNotes=[""],) {
        console.log("Given answer is: " + prevAnswer);
        if(typeof prevAnswer === "string") prevAnswer = [prevAnswer];

        //gathering answers to save
        let d = {};
        const t = new Date();
        d["time"] = t.getTime() - time;
        let f = t.getTime() //this line is needed, can't setTime directly
        setTime(f);
        d["language"] = language;
        d["answer"] = prevAnswer;
        if(questionType === "Text") prevNotes = prevAnswer; //technically it's notes; also needed for prefill if revisiting question
        d["notes"] = prevNotes;
        d["question"] = current["question"][language]; //just in case but technically not needed.

        //generating normalized answer array
        if(questionType === "Text" || prevAnswer === "null") d["normalized"] = "null";
        else {
            let ids = [];
            for(let i = 0; i<current["option"][language].length; i++) {
                if(prevAnswer.includes(current["option"][language][i])) {
                    ids.push(i)
                }
            }
            d["normalized"] = ids;
        }

        //saving answer
        let a = answer;
        a[position[0]][position[1]] = d;
        setAnswer(a); //todo save in local storage
        console.log(a)

        let q = QuestionHandler.getNextQuestion(position, answer);
        setPosition(q);
    }

    function getPrevAnswer() {
        if(answer[position[0]][position[1]] === undefined) return [];
        if(answer[position[0]][position[1]]["normalized"] === "null") return [];
        return answer[position[0]][position[1]]["normalized"]
    }

    function getPrevNote() {
        if(answer[position[0]][position[1]] === undefined) return ["",];
        return answer[position[0]][position[1]]["notes"];
    }

    function goBack()  {
        setPosition(QuestionHandler.getLastStep(position, answer));
    }

    function swapLanguage() {
        if(language === "de") toggleLanguage("en")
        else toggleLanguage("de")
    }

    return <Container>
        {(position[0] === 0 && position[1] === 1) || navi  ?
            <HeaderFrontPage language={language}
                             changeLanguage={swapLanguage}
            />
            : <Header className="head"
                      position={position}
                      goBack={goBack}
                      language={language}
                      changeLanguage={swapLanguage}
                      toggleNavi={toggleNavi}
            />
        }
        <div className="p-3">
            <h1 className="header">{titles[position[0]]}</h1>
            <div className="p-5 mb-4 white rounded-3">
                {navi ?
                    <NaviPage answer={answer}
                              titles={titles}
                              goTo={goTo}
                              toggleNavi={toggleNavi}
                              language={language}
                    />
                    : <Router language={language}
                              questionType={questionType}
                              question={current["question"][language]}
                              option={current["option"][language]}
                              goNext={goNext}
                              position={position}
                              titles={titles}
                              prevAnswer={getPrevAnswer()}
                              prevNote={getPrevNote()}
                              answeredQuestions={answer}
                    />
                }
            </div>
        </div>
    </Container>
}

export default App;
