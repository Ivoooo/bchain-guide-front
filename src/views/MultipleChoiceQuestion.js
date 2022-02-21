import React from "react";
import {AButtonWithCommentOnClick} from "../components/AButtonWithCommentOnClick";
import {AButton} from "../components/AButton";

export class MultipleChoiceQuestion extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            options: [],
            answers: [],
            disabled: true,
            incorrect: false,
            question: [""],
        }
    }

    componentDidMount() {
        let x = [];
        let y = [];
        for (let i in this.props.options){
            x.push(this.props.options[i]);
            y.push(false);
        }
        this.setState({options: x, answers: y, question: this.props.question.split("\n")})
    }

    handleClick(e) {
        let idx = this.state.options.indexOf(e);
        let a = this.state.answers;
        a[idx] = !a[idx];
        this.setState({answers: a})
        console.log(e, idx, this.state.answers)
        this.checkDisabled();
    }

    checkDisabled() {
        //check if options are allowed
        let hasTrues = false
        for(let i=0; i < this.state.answers.length-1; i++) {
            if(this.state.answers[i]) hasTrues = true;
        }
        let last = this.state.answers[this.state.answers.length-1]
        //this.state.answers.every(element => !element)
        this.setState({enabled: hasTrues + last, incorrect: last && hasTrues})
    }

    render() {
        return <>
            {this.state.question.map(q =>
                <h2 className="text-center">{q}</h2>
            )}

            <div className="d-grid gap-2" onClick={(e) => {
                this.handleClick(e.target.value)
            }}>
                {this.state.options.map(option =>
                    <AButtonWithCommentOnClick txt={option} key={option}/>
                )}
            </div>
            <div style={{float: "right"}}>
                {this.state.incorrect && <h4 className="text-center">{"Die letzte Option und alle anderes sind exklusiv. Bitte ändern sie ihre Auswahl."}</h4>}
                {!this.state.incorrect && <AButton txt={"Next"} onClick={this.props.goNext} disabled={!this.state.enabled} key={"Next"}/>}
            </div>
        </>
    }
}