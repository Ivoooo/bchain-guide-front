import Button from "react-bootstrap/Button";

export const BButton = (txt="e", onClick=null, isClicked=false, disabled=false) => (
    <Button
        variant={isClicked ? "outline-primary" : "primary"}
        size="lg"
        value={txt}
        onClick={onClick}
        disabled={disabled}
    >{txt}</Button>
)