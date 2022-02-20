import React from "react";
import {Col, Image, Nav, Navbar} from "react-bootstrap";
import "./Views.css"
import "../components/UZH_logo.gif"
import Container from "react-bootstrap/Container";
import {LanguageButton} from "../components/LanguageButton";

//requires Progress Bar percentage to be given as "now" props
//todo download https://www.cd.uzh.ch/de/vorlagen/uzh-logo/logo_normal.html
export class HeaderFrontPage extends React.Component {
    render() {
        return <Navbar>
            <Container>

                <Navbar.Brand href="#home">Blockchainguide</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Nav>
                    <LanguageButton/>
                </Nav>
            </Container>
        </Navbar>
    }
}