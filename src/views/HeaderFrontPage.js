import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import "./Views.css"
import Container from "react-bootstrap/Container";
import {HeaderButton} from "../components/HeaderButton";

export const HeaderFrontPage = ({language, changeLanguage}) => {
    return <Navbar>
            <Container>
                <Navbar.Brand href="/">Blockchainguide</Navbar.Brand>
                <Nav>
                    <HeaderButton txt={language.toUpperCase()} onClick={changeLanguage} />
                </Nav>
            </Container>
        </Navbar>
}