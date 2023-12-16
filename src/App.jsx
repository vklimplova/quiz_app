import { useEffect, useState, useRef } from "react";
import Quiz from "./Quiz";

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      getQuestions();
      isMounted.current = false;
    }

  }, []);

  const getQuestions = async () => {
    try {
      const response = await fetch("https://the-trivia-api.com/v2/questions/");
      const questionsResponse = await response.json();
      console.log(questionsResponse);
      setQuestions(questionsResponse);
    } catch (error) {
      console.log(error);
    } finally {
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
