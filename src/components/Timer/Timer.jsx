import "./Timer.scss";
import { useEffect, useState, useRef } from "react";

//Time využívá 2 props - celkový čas timeru a fce, která se zavolá, pokud timer vyprší
function Timer({ duration, onTimeUp }) {
    const [loader, setLoader] = useState(0);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef();

//hook, který startuje nebo zastavuje timer
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setLoader((cur) => cur + 1);

        }, 1000); //změna po 1s

        return () => clearInterval(intervalRef.current);
    }, []); //prázdný array -> fce jeden jen jednou za otázku

    useEffect(() => {
        setProgress(100 * (loader / duration));

        if (loader === duration) {
            clearInterval(intervalRef.current);

            setTimeout(() => {
                onTimeUp();

            }, 1000); //po vypršení času se počká 1s a spustí se onTimeUp v Quiz
        }

    }, [loader]);

    return <div className="timer-container">
        <div 
        style={{
            width: `${progress}%`
        }}
        className="loading"></div>

    </div>
}

export default Timer;