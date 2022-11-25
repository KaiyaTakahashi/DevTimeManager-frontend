import React, { useState } from "react"
import "/Users/kaiyatakahashi/Desktop/DevTimeManager/client/src/styles/components.css"
import { useStopwatch } from 'react-timer-hook';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Axios from 'axios';

Axios.defaults.withCredentials = true;

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
    const [taskName, setTaskName] = useState("");
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        Axios.post("http://localhost:3001/tasks/insert", {
            taskName: taskName,
            isFinished: data.isFinished,
            date: new Date(),
            time: hours + ":" + minutes + ":" + seconds,
        }).then((response) => {
            console.log(response);
        })
    }
    return (
        <form id="timer-flex" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <br></br>
                <span>Task: </span>
                <TextField
                    label="Task"
                    variant="outlined"
                    required
                    onChange={(e) => setTaskName(e.target.value)}
                />
            </div>
            <div>
                <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
                <p>{isRunning ? 'Running' : 'Not Running'}</p>
                {
                    isRunning ? <Button variant="contained" onClick={pause}>Pause</Button> : <Button variant="contained" onClick={start}>Start</Button>
                }
                <Button variant="contained" onClick={reset} color="secondary">Reset</Button>
            </div>
            <div>
                <div className="radio">
                <label>
                    <input 
                        type="radio"
                        {...register("isFinished", {required: "Status is required"})}
                        value="progress"
                    />
                    In Progress
                </label>
                </div>
                <div className="radio">
                <label>
                    <input
                        type="radio"
                        {...register("isFinished", {required: "Status is required"})}
                        value="finished"
                        defaultChecked={true}
                    />
                    Finished
                </label>
                </div>
                <Button type="submit" variant="contained">Submit</Button>
                <pre>{JSON.stringify(watch(), null, 2)}</pre>
            </div>
        </form>
      );
}

export default Timer;