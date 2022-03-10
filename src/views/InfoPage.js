import React from "react";
import {FrontPage} from "./FrontPage";

export const InfoPage = ({question, option, handleClick}) => {
    console.log(option)

    return <FrontPage question={question} option={option} handleClick={handleClick} refer={typeof option !== "string"} />
}