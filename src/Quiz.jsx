//fce pro vytváření variables a updatování jejich stavu
import { useState, useEffect } from "react";
import { resultInitialState } from "./constants";
import Choice from "./components/Choice";

const Quiz = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerIdx, setAnswerIdx] = useState(null); //na začátku nemáme žádné otázky
    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState(resultInitialState);
    const [showResult, setShowResult] = useState(false);
    const [choices, setChoices] = useState([]);


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

    const onClickNext = () => {
        setAnswerIdx(null);
        setResult((prev) =>
            answer
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

    };

    const onTryAgain = () => {
        setResult(resultInitialState);
        setShowResult(false);
    }

    const onRefreshPage = () => {
        window.location.reload(false);
    }


    return (
        <div className="quiz-container">
            {!showResult ? (<>
                <span className="active-question-no">{currentQuestion + 1}</span>
                <span className="total-question">/{questions.length}</span>
                <h2>{question.text}</h2>
                <ul>
                    {
                        choices.map((choice, index) => (
                            <Choice key={index} choice={choice} index={index} answerIdx={answerIdx} onAnswerClick={onAnswerClick}></Choice>

                        ))
                    }
                </ul>
                <div className="footer">
                    <button onClick={onClickNext} disabled={answerIdx === null}>
                        {currentQuestion === questions.length - 1 ? "Konec kvízu" : "Další otázka"}
                    </button>
                </div>
            </>) : <div className="result">
                <h3>Výsledek</h3>
                <p>
                    Počet otázek: <span>{questions.length}</span>
                </p>
                <p>
                    Celkové skóre: <span>{result.score}</span>
                </p>
                <p>
                    Počet správných odpovědí: <span>{result.correctAnswers}</span>
                </p>
                <p>
                    Počet špatných odpovědí: <span>{result.wrongAnswers}</span>
                </p>
                <button onClick={onTryAgain}>Další pokus</button><br></br>
                <button onClick={onRefreshPage}>Zkusit jiný kvíz</button>
            </div>}

        </div>
    );
};

export default Quiz;