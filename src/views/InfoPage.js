import React from "react";
import {FrontPage} from "./FrontPage";

export const InfoPage = ({question, option, handleClick}) => {
    console.log(option)

    if(typeof option === "string") {
        return <FrontPage question={question} option={option} handleClick={handleClick} refer={false} />
    }
    else {
        return <FrontPage question={question} option={option[1]} handleClick={handleClick} refer={true} />
    }
}