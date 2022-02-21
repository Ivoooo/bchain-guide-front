import Button from "react-bootstrap/Button";
import React from "react";

export const HeaderButton = ({txt = "placeholder HeaderButton", onClick = null}) => (
    <Button
        variant={"outline-secondary"}
        value={txt}
        onClick={onClick}
        key={txt}
    >{txt}</Button>
)