import React from "react";
import {ProgressBar, Stack} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../components/UZH_logo.gif"
import {LanguageButton} from "../components/LanguageButton";

//requires Progress Bar percentage to be given as "now" props
export class Header extends React.Component{
    render() {
        return <Stack className="Stack" direction="horizontal" gap={3}>
            <Button variant="outline-secondary" onClick={() => this.props.goTo(this.props.now-1)}>Zurück</Button>
            <Button variant="outline-secondary" onClick={() => this.props.goTo("Navi")}>Navi</Button>
            <ProgressBar className="ProgressBar" now={Math.round(100 * this.props.now / this.props.max)}
                         label={`${Math.round(100 * this.props.now / this.props.max)}%`} style={{ width: "70rem" }}/>
            <LanguageButton/>
        </Stack>;
    }
}