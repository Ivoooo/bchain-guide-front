import Button from "react-bootstrap/Button";

export function AButton(txt="i") {
    return (
        <Button
            variant="outline-primary"
            size="lg"
            value={txt}
        >{txt}</Button>
    )
}