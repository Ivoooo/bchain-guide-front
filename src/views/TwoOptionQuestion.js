import  {AButton} from "../components/AButton";
import Container from "react-bootstrap/Container";

export const TwoOptionQuestion = (question, option1, option2, handleClick) => {
    return (
        <div className = "dual-choice-container">
            <h2 className="text-center">{question}</h2>

            <div className="yes-no-grid-container" onClick={(e) => {
                handleClick(e.target.value)
            }}>
                {AButton(option1)}
                {AButton(option2)}
            </div>
        </div>
    )
}