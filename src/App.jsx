import { useEffect, useState } from "react";
import Quiz from "./Quiz";

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuestions();
  }, []); //spustí se, jen když se stránka renderuje poprvé

  //arrow function
  const getQuestions = async () => {
    try {
      const response = await fetch("https://the-trivia-api.com/v2/questions/"); //await 
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
      <div className="header">Vítejte kamarádi</div>
      <Quiz questions={questions} />
    </div>
  )

}




export default App
