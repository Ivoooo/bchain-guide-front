import React, {useEffect, useState} from "react";
import {AButton} from "./AButton";
import {ATextArea} from "./ATextArea";

export const AButtonWithCommentOnClick = ({ txt="Placeholder AButtonWithCommentOnClick" , handleClick=null, isClicked=false, prevNote=""}) => {
    const [notes, setNotes] = useState(prevNote);
    const [show, toggleShow] = useState(isClicked);

    useEffect( () => {
        handleClick(txt, show, notes)
    }, [handleClick, notes, show, txt])

    function change(e) {
        console.log("Clicked on: " + e.target.value);
        toggleShow(!show);
    }

    return (
        <>
            <AButton txt={txt} onClick={(e) => change(e)}  isClicked={show}/>
            {show && <ATextArea saveAnswer={setNotes} prevAnswer={prevNote}/>}
        </>
    );
};