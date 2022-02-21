import React from 'react';
import Container from 'react-bootstrap/Container';
import './App.css';
import DataJSON from './components/data.json';
import {Header} from "./views/Header";
import {HeaderFrontPage} from "./views/HeaderFrontPage";
import './views/Views.css';
import {Router} from "./Router";
import {NaviPage} from "./views/NaviPage";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            position: -1,
            furthestPosition: 0,
            current: {"Question": "The question will load shorty.",
                "Options": "Zur Umfrage"},
            next: null,
            qqs: [[0,1],[1,1],[1,1.5],[1,2],[1,3],[2,1],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],[4,9],[4,10],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9],[5,10],[6,1]],
            data: null,
            questionType: "Front Page",
            title: "a",
            goTo: 0,
            language: "DE"
        }

        this.goNext = this.goNext.bind(this)
        this.goTo = this.goTo.bind(this)
        this.changeLanguage = this.changeLanguage.bind(this)
    }

    findNextPage(pageId) {
        console.log("Previous Page loaded " + this.state.position, this.state.questionType, this.state.title, this.state.current)

        let q = this.state.qqs[pageId];

        this.setState({current: DataJSON[q[0]]["Fragen"][q[1]],
            title: DataJSON[q[0]]["Title"]["Deutsch"],
            position: pageId,
            questionType: DataJSON[q[0]]["Fragen"][q[1]]["Type"]
        })

        if(this.state.furthestPosition < pageId) {
            this.setState({furthestPosition: pageId})
        }
    }

    goTo(pageId) {
        if(pageId === "Navi") {
            this.setState({questionType: "Navi", title: "Navigation"});
        }
        else {
            this.findNextPage(parseInt(pageId));
        }
    }

    goNext(newNext) {
        console.log("Given answer is: ")
        if(newNext !== null) console.log(newNext.target.value)
        this.goTo(this.state.position + 1);
    }

    changeLanguage() {
        if(this.state.language === "DE") this.setState({language: "EN"})
        else this.setState({language: "DE"})
    }

    componentDidMount() {
        //todo remove state
        console.log(this.state.data)
        localStorage.clear() // todo REMOVE
        //if the user has never used the website before a new progress tracker will be created:
        if (!localStorage.getItem("data")) {
            localStorage.setItem("data", DataJSON)
            localStorage.setItem("version", "1.0") //if there are any major updates that could break compatibility this may be of use
        } //todo connect version to settings
        this.setState({data: localStorage.getItem("data")})

        if(this.state.position < 0){
            this.goNext(null);
        }
    }

    render() {
        return <Container>
            {this.state.position === 0 || this.state.questionType === "Navi"  ?
                <HeaderFrontPage language={this.state.language}
                                 changeLanguage={this.changeLanguage}
                />
                : <Header className="head"
                          now={this.state.position}
                          max={this.state.qqs.length}
                          goTo={this.goTo}
                          language={this.state.language}
                          changeLanguage={this.changeLanguage}
                />
            }
            <div className="p-3">
                <h1 className="header">{this.state.title}</h1>
                <div className="p-5 mb-4 white rounded-3">
                    {this.state.questionType === "Navi" ?
                        <NaviPage progress={this.state.position}
                                  chapter={[1,5,6,15,25,35]/*todo make this generate automatically*/}
                                  maxProgress={this.state.furthestPosition}
                                  goTo={this.goTo}
                                  language={this.state.language}
                        />
                        : <Router questionType={this.state.questionType}
                                  question={this.state.current.Question}
                                  option={this.state.current.Options}
                                  goNext={this.goNext}
                        />
                    }
                </div>
            </div>
        </Container>
    }
}

export default App;
