import React from "react";
import Container from "react-bootstrap/Container";
import {AButton} from "../components/AButton";

export class Telemetry extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            personalized: false,
            anonymized: false
        }
    }

    handleClick(e) {
        console.log(e)
        if(e === "Personalisierte Daten teilen") this.setState({personalized: true});
        if(e === "Nur grundlegende Daten teilen") this.setState({anonymized: true});
        console.log(this.state)
    }

    getPersonalized() {
        return <Container>
            <h3>Error</h3>
        </Container>
    }

    getAnonymized() {
        return <Container>
            <h3>Error</h3>
        </Container>
    }

    render() {
        return <>
            <h2 className="text-center">Noch eine letzte Frage vor dem Ergebnis! Die Universität Zürich würde gerne ihre Daten sammeln um die Website zu verbessern und für Forschungszwecke.</h2>
            <h3 className="text-center">Nur Personen die direkt mit dem Projekt involviert sind haben Zugriff auf persoalisierte Daten. Es kann aber sein, dass Daten in komplett anonymisierter Form als Teil einer Forschungsarbeit publiziert werden.</h3>

            <div className="yes-no-grid-container" onClick={(e) => {
                this.handleClick(e.target.value)
            }}>
                <AButton txt={"Personalisierte Daten teilen"} />
                <AButton txt={"Nur grundlegende Daten teilen"} />
            </div>
            {this.state.personalized && this.getPersonalized()}
            {this.state.anonymized && this.getAnonymized()}
        </>
    }
}