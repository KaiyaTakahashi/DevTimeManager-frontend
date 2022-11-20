import React from "react"
import "/Users/kaiyatakahashi/Desktop/DevTimeManager/client/src/styles/components.css"
import { useStopwatch } from 'react-timer-hook';

function Timer() {
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: false });
    return (
        <div>
            <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            <p>{isRunning ? 'Running' : 'Not Running'}</p>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={reset}>Reset</button>
        </div>
      );
}

export default Timer;