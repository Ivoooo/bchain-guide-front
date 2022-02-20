import React, {useState} from "react";
import Toast from "react-bootstrap/Toast";
import {BButton} from "./BButton";

export const HelpField = ({ title="a", explanation="b" }) => {
    const [show, toggleShow] = useState(false);

    function positive() {
        toggleShow(true);
    }

    return (
        <>
            {!show && BButton("❓", positive)}
            <Toast show={show} onClose={() => toggleShow(false)}>
                <Toast.Header>
                    <strong className="mr-auto">{title}</strong>
                </Toast.Header>
                <Toast.Body>{explanation}</Toast.Body>
            </Toast>
        </>
    );
};