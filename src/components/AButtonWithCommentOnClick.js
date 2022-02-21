import React, {useState} from "react";
import {AButton} from "./AButton";
import {ATextArea} from "./ATextArea";

export const AButtonWithCommentOnClick = ({ txt="Placeholder AButtonWithCommentOnClick" }) => {
    const [show, toggleShow] = useState(false);

    function change() {
        toggleShow(!show);
    }

    return (
        <>
            <AButton txt={txt} onClick={change} isClicked={show} />
            {show && ATextArea()}
        </>
    );
};