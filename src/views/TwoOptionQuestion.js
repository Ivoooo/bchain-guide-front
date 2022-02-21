import {AButton} from "../components/AButton";

export const TwoOptionQuestion = ({question, option, handleClick}) => {
    return (
        <div className = "dual-choice-container">
            <h2 className="text-center">{question}</h2>

            <div className="two-option-grid-container">
                <AButton txt={option[1]} onClick={handleClick}/>
                <AButton txt={option[2]} onClick={handleClick}/>
            </div>
        </div>
    )
}