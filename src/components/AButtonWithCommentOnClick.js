import React, {useState} from "react";
import {BButton} from "./BButton";
import {ATextArea} from "./ATextArea";
import {BTextArea} from "./BTextArea";

export const AButtonWithCommentOnClick = ({ txt="c" }) => {
    const [show, toggleShow] = useState(true);

    function change() {
        toggleShow(!show);
        console.log(show);
    }

    return (
        <>
            {BButton(txt, change, show)}
            {!show && ATextArea()}

            {/*{AButton(msg)}*/}
            {/*{this.state.question1 && <ATextArea/>}*/}
            {/*{BButton('123', 5)}*/}
        </>
    );
};