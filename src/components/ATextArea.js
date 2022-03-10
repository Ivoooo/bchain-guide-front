import {FloatingLabel, Form} from "react-bootstrap";

//https://react-bootstrap.github.io/forms/floating-labels/

export function ATextArea({saveAnswer, prevAnswer=""}) {
    return (
        <FloatingLabel controlId="floatingTextarea" label="Text:">
            <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                onChange={(e) => saveAnswer(e.target.value)}
                defaultValue={prevAnswer}
            />
        </FloatingLabel>
    )
}