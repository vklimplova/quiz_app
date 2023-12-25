//fce pro vytváření variables a updatování jejich stavu
import { useState, useEffect } from "react";
import { resultInitialState } from "../../constants";
import Timer from "../Timer/Timer";
import "./Quiz.scss";

const Quiz = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerIdx, setAnswerIdx] = useState(null); //na začátku nemáme žádné otázky
    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState(resultInitialState);
    const [showResult, setShowResult] = useState(false);
    const [choices, setChoices] = useState([]);
    const [showTimer, setShowTimer] = useState(true);


    const otazka = questions[currentQuestion];
    const question = otazka.question;
    const correctAnswer = otazka.correctAnswer;

    //... spread operator - z array si natáhnu hodnoty jednu po jedný

    useEffect(() => {
        const shuffledArray = shuffleArray([correctAnswer, ...otazka.incorrectAnswers]);
        setChoices(shuffledArray);
    }, [currentQuestion, correctAnswer, otazka.incorrectAnswers]);

    const shuffleArray = (array) => {
        const shakedArray = [...array];
        for (let i = shakedArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shakedArray[i], shakedArray[j]] = [shakedArray[j], shakedArray[i]];
        }
        return shakedArray;
    };

    const onAnswerClick = (answer, index) => {
        setAnswerIdx(index);
        if (answer === correctAnswer) {
            setAnswer(true);
        } else {
            setAnswer(false);
        }
    };

    const onClickNext = (finalAnswer) => {
        setAnswerIdx(null);
        setShowTimer(false);
        setResult((prev) =>
            finalAnswer
                ? {
                    ...prev,
                    score: prev.score + 1,
                    correctAnswers: prev.correctAnswers + 1,
                } : {
                    ...prev,
                    wrongAnswers: prev.wrongAnswers + 1,
                }
        );

        if (currentQuestion !== questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            setCurrentQuestion(0);
            setShowResult(true);

        }

        setTimeout(() => {
            setShowTimer(true);
        });

    };

    const onTryAgain = () => {
        setResult(resultInitialState);
        setShowResult(false);
    };

    const onRefreshPage = () => {
        window.location.reload(false);
    };

    const timeUp = () => {
        setAnswer(false);
        onClickNext(false);
    };

//duration={10} - můžu měnit dle toho, kolik času chci na odpověď, v sekundách 
    return (
        <div className="quiz-container">
            {!showResult ? (<>
            {showTimer && <Timer duration={5} onTimeUp={timeUp}/>} 
                <span className="active-question-no">{currentQuestion + 1}</span>
                <span className="total-question">/{questions.length}</span>
                <h2>{question.text}</h2>
                <ul>
                    {
                        choices.map((choice, index) => (
                            <li
                                onClick={() => onAnswerClick(choice, index)}
                                key={choice}
                                className={answerIdx === index ? 'selected-answer' : null}
                            >
                                {choice}

                            </li>
                        ))
                    }
                </ul>
                <div className="footer">
                    <button onClick={() => onClickNext(answer)} disabled={answerIdx === null}>
                        {currentQuestion === questions.length - 1 ? "Submit" : "Next question"}
                    </button>
                </div>
            </>) : <div className="result">
                <h3>Result</h3>
                <p>
                    Total score: <span>{result.score}</span>
                </p>
                <p>
                    Correct answers: <span>{result.correctAnswers}</span>
                </p>
                <p>
                    Wrong answers: <span>{result.wrongAnswers}</span>
                </p>
                <button onClick={onTryAgain}>Try again</button><br></br>
                <button onClick={onRefreshPage}>New quiz</button>
            </div>}

        </div>
    );
};

export default Quiz;