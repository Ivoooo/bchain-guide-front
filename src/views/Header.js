import React from "react";
import {ProgressBar, Stack} from "react-bootstrap";
import {HeaderButton} from "../components/HeaderButton";

//requires Progress Bar percentage to be given as "now" props
export const Header = ({goTo, now, max, language, changeLanguage}) => {
    let curr = Math.round(100 * now / max)

    return (
        <Stack className="Stack" direction="horizontal" gap={3}>
            <HeaderButton txt={"Navi"} onClick={() => goTo("Navi")} />
            <HeaderButton txt={language === "DE" ? "Zurück" : "Back"} onClick={() => goTo(now-1)} />
            <ProgressBar className="ProgressBar" now={curr}
                         label={`${curr}%`} style={{ width: "70rem" }}/>
            <HeaderButton txt={language} onClick={changeLanguage} />
        </Stack>
    )
}