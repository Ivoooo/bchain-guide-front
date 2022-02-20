import Button from "react-bootstrap/Button";
import {useState} from "react";

export const LanguageButton = () => {
    const [txt, newTxt] = useState("DE");

    function change() {
        if(txt === "DE") newTxt("EN")
        else newTxt("DE")
    }
    return ( <Button
        variant={"outline-secondary"}
        value={txt}
        onClick={change}
    >{txt}</Button> )
}