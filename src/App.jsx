import { useEffect, useState } from "react";
import Quiz from "./components/Quiz/Quiz";

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="header">
        <h1>Welcome to my Quiz App</h1>
        <h2>Here are some simple rules:</h2>
        <ul>
          <li>there are 10 questions</li>
          <li>after you press the Start button you have 10s to answer each question</li>
          <li>you can't go back once you answer and click Next question</li>
          <li>you get 1 point for correct answer</li>
          <li>at the end you can either try the same set of questions again or try different quiz</li>
        </ul>

      </div>

      <Quiz questions={questions} />
    </div>
  )

}




export default App
