import { useEffect, useState } from "react";
import Quiz from "./components/Quiz/Quiz";

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);

// zobrazení kvízu poté, co se klikne na Start button
  const handleButtonClick = () => {
    setShowQuiz(true);
  };


  useEffect(() => {
    getQuestions();
  }, []); //spustí se, jen když se stránka renderuje poprvé

  //arrow function
  const getQuestions = async () => {
    try {
      const response = await fetch("https://the-trivia-api.com/v2/questions/"); //await, aby se stihli načíst otázky
      const questionsResponse = await response.json();
      console.log(questionsResponse);
      setQuestions(questionsResponse); //vložení hodnot do proměnné questions
    } catch (error) {
      console.log(error);
    } finally { //když projde try a otázky jsou připravený, tak se začne renderovat return
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>Welcome to my Quiz App</h1>
        <h2>Here are some simple rules:</h2>
        <ul>
          <li>There are 10 questions.</li>
          <li>You have 10s to answer each question.</li>
          <li>You can't go back once you click Next question.</li>
          <li>You get 1 point for correct answer.</li>
          <li>After you finish you can either try the same set of questions again or complete a different quiz.</li>
        </ul>
{/*zobrazuje se buď Start button nebo kvíz - zálěží na state kvízu*/}
      {showQuiz || (
          <button onClick={handleButtonClick}>Start Quiz</button>
        )} 
      </div>
      {showQuiz && <Quiz questions={questions} />}
    </div>
  )

}

export default App
