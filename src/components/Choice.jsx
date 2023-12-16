import React from 'react'

function Choice({choice, index, onAnswerClick, answerIdx}) {
    return (
        <li
            onClick={() => onAnswerClick(choice, index)}
            key={choice}
            className={answerIdx === index ? 'selected-answer' : null}
        >
            {choice}

        </li>
    )
}

export default Choice