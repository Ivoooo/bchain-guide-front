import React from 'react';
import Container from 'react-bootstrap/Container';
import './App.css';
import DataJSON from './components/data.json';
import {TwoOptionQuestion} from "./views/TwoOptionQuestion";
import {SingleChoiceQuestion} from "./views/SingleChoiceQuestion";
import {MultipleChoiceQuestion} from "./views/MultipleChoiceQuestion";
import {Header} from "./views/Header";
import {BButton} from "./components/BButton";
import {FrontPage} from "./views/FrontPage";
import {NotePage} from "./views/NotePage";
import {HeaderFrontPage} from "./views/HeaderFrontPage";
import './views/Views.css';
import {wait} from "@testing-library/user-event/dist/utils";
import {NaviPage} from "./views/NaviPage";
import {Telemetry} from "./views/Telemetry";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            position: -1,
            furthestPosition: 0,
            current: {"Question": "Willkommmen beim Blockchainguide der Universität Zürich. Dieser Fragebogen ist ein Tool für staatliche und private Einrichtungen um zu evaluieren ob für einen bestimmten Anwendungsfall die Benützung einer Blochchain einen Vorteil bringen könnte. \n Der Blockchainguide basiert auf dem von der Universität und Kanton Zürich erarbeiteten Blockchain Guide (todo hyperlink). Eine kurze Zusammenfassung finden sie hier (todo). Wir empfehlen die Zusammenfassung zu lesen für ein besseres Verständnis aber es nicht nicht essenziell.",
                "Options": "Zur Umfrage"},
            next: null,
            qqs: [[0,1],[1,1],[1,1.5],[1,2],[1,3],[2,1],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],[4,9],[4,10],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9],[5,10],[6,1]],
            data: null,
            questionType: "Front Page",
            title: "a",
            goTo: 0,
        }

        this.goNext = this.goNext.bind(this)
        this.goTo = this.goTo.bind(this)
    }

    findNextPage() {
        let q = this.state.qqs[this.state.position+1]
        this.setState({current: DataJSON[q[0]]["Fragen"][q[1]],
            title: DataJSON[q[0]]["Title"]["Deutsch"]
        })

        if(this.state.furthestPosition < this.state.position) {
            this.setState({furthestPosition: this.state.position})
        }

        //this is needed because otherwise it will log the old state.
            //this needs to be changed at last otherwise page might not rerender with new artefacts
        this.setState({questionType: DataJSON[q[0]]["Fragen"][q[1]]["Type"]})
        console.log("Next Page loaded " + this.state.position, this.state.questionType, this.state.title, this.state.current)
    }

    goNext(newNext) {
        console.log(newNext)
        this.goTo(this.state.position + 1);
    }

    goTo(pageId) {
        if(pageId === "Navi") {
            this.setState({questionType: "Navi", title: "Navigation"});
        }
        else {
            this.setState({position: pageId});
            this.findNextPage();

        }
    }

    componentDidMount() {
        //todo remove state
        console.log(this.state.data)
        localStorage.clear() // todo REMOVE
        //if the user has never used the website before a new progress tracker will be created:
        if (!localStorage.getItem("data")) {
            localStorage.setItem("data", DataJSON)
            localStorage.setItem("version", "1.0") //if there are any major updates that could break compatibility this may be of use
        }
        this.setState({data: localStorage.getItem("data")})

        if(this.state.position < 0){
            this.goNext(null);
        }
    }

    getTwoOptionQuestion() {
        return(
            TwoOptionQuestion(this.state.current.Question,
                this.state.current.Options[1],
                this.state.current.Options[2],
                this.goNext
            )
        )
    }

    getSingleChoiceQuestion() {
        return(
            SingleChoiceQuestion(this.state.current.Question,
            this.state.current.Options,
            this.goNext
            )
        )
    }

    getMultipleChoiceQuestion() {
        return <MultipleChoiceQuestion
            question={this.state.current.Question}
            options={this.state.current.Options}
            goNext={this.goNext}
        />;
    }

    getNextButton() {
        return <div style={{float: "right"}}>
            {BButton("Next", this.goNext, false)}
        </div>
    }

    getFrontPage() {
        return(
            FrontPage(this.state.current.Question,
                this.state.current.Options,
                this.goNext
            )
        );
    }

    getNotePage() {
        return(
            NotePage(this.state.current.Question,
                this.state.current.Options,
                this.goNext
            )
        );
    }

    getNaviPage() {
        return NaviPage(
            this.state.furthestPosition+50,
            this.goTo
        )
    }

    getNextPage() {
        if(this.state.questionType === "Front Page") return this.getFrontPage()
        if(this.state.questionType === "Text") return this.getNotePage()
        if(this.state.questionType === "Dual Choice") return this.getTwoOptionQuestion()
        if(this.state.questionType === "Single Choice with Other") return this.getSingleChoiceQuestion()
        if(this.state.questionType === "Single Choice") return this.getSingleChoiceQuestion()
        if(this.state.questionType === "Multiple Choice") return this.getMultipleChoiceQuestion()
        if(this.state.questionType === "Multiple Choice or none") return this.getMultipleChoiceQuestion()
        if(this.state.questionType === "Navi") return this.getNaviPage();
        if(this.state.questionType === "Telemetry") return this.getTelemetry();
    }

    getTelemetry() {
        return <Telemetry/>;
    }

    render() {
        return <Container>
            {this.state.position === 0 || this.state.questionType === "Navi"  ? <HeaderFrontPage/> : <Header className="head" now={this.state.position} max={this.state.qqs.length} goTo={this.goTo}/>}
            <div className="p-3">
                <h1 className="header">{this.state.title}</h1>
                <div className="p-5 mb-4 white rounded-3">
                    {this.getNextPage()}
                </div>
            </div>
        </Container>
    }
}

export default App;
