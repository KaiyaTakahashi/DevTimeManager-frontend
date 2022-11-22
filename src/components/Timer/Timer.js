import React, { useState } from "react"
import "/Users/kaiyatakahashi/Desktop/DevTimeManager/client/src/styles/components.css"
import { useStopwatch } from 'react-timer-hook';
import { useForm } from 'react-hook-form';
import TaskState from './TaskState.js';
import TextField from '@mui/material/TextField'

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
    const [isStarted, setIsStarted] = useState(false);
    return (
        <div id="timer-flex">
            <div>
                <br></br>
                <span>Task: </span>
                <TextField
                    label="Task"
                    variant="outlined"
                    required
                />
            </div>
            <div>
                <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
                <p>{isRunning ? 'Running' : 'Not Running'}</p>
                {
                    isRunning ? <button onClick={pause}>Pause</button> : <button onClick={start}>Start</button>
                }
                <button onClick={reset}>Reset</button>
            </div>
            <div>
                <TaskState></TaskState>
            </div>
        </div>
      );
}

export default Timer;