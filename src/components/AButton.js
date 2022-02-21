import Button from "react-bootstrap/Button";

export const AButton = ({txt = "placeholder AButton", onClick = null, isClicked = false, disabled = false, value=null}) => (
    <Button
        variant={!isClicked ? "outline-primary" : "primary"}
        size="lg"
        value={value !== null ? value : txt}
        onClick={onClick}
        disabled={disabled}
        key={value !== null ? value : txt}
    >{txt}</Button>
)