import "./Timer.scss";
import { useEffect, useState, useRef } from "react";

function Timer({ duration, onTimeUp }) {
    const [loader, setLoader] = useState(0);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef();

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setLoader((cur) => cur + 1);

        }, 1000); //změna po 1s

        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        setProgress(100 * (loader / duration));

        if (loader === duration) {
            clearInterval(intervalRef.current);

            setTimeout(() => {
                onTimeUp();

            }, 1000);
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