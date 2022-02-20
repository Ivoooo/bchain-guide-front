import {FloatingLabel, Form} from "react-bootstrap";

//https://react-bootstrap.github.io/forms/floating-labels/

export function BTextArea() {
    return (
        <FloatingLabel controlId="floatingTextarea2" label="Comments">
            <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
            />
        </FloatingLabel>
    )
}