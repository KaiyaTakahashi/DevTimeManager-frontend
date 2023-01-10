import React, { useState } from "react"
import "/Users/kaiyatakahashi/Desktop/DevTimeManager/client/src/styles/components.css"
import { useStopwatch } from 'react-timer-hook';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Axios from 'axios';

Axios.defaults.withCredentials = true;
Date.prototype.createStartDate = function(hours, minutes, days) {
    this.setTime(this.getTime() - (hours*60*60*1000) - (minutes*60*1000) - (days*60*60*60*1000));
    return this
}

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
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        if (localStorage.getItem("isLoggedin") === "true") {
            if (window.confirm("Do you want to push this event to google calendar?")) {
                // Create an event
                const today = new Date();
                console.log("Event was created");
                Axios.post('http://localhost:3001/create_event', {
                    summary: data.task,
                    description: "",
                    location: "",
                    startDateTime: today.createStartDate(hours, minutes, days),
                    endDateTime: today,
                }).then((response) => {
                    console.log(response.data);
                })
            } else {
                console.log("Event wasn't created");
            }
        } else {
            console.log("User is not logged in, but created task in a database");
            window.alert("Task was saved")
        }
        /* Insert task into database */
        Axios.post("http://localhost:3001/tasks/insert", {
            taskName: data.task,
            isFinished: data.isFinished,
            date: new Date(),
            time: hours + ":" + minutes + ":" + seconds,
        }).then((response) => {
            console.log("Task is stored in tasks")
            console.log(response);
        })
        /* Insert task into weekly_tasks */
        // Axios.post("http://localhost:3001/weekly_tasks/insert", {
        //     date: new Date().toISOString().split('T')[0],
        //     value: hours + Math.floor(minutes / 60),
        // }).then((response) => {
        //     console.log("Task is stored in weekly_tasks")
        //     console.log(response);
        // })
    }
    return (
        <div id="timer-div">
            <h1 className="section-title">Timer</h1>

            <form id="timer-flex" onSubmit={handleSubmit(onSubmit)}>
                <div className="timer-item">
                    <br></br>
                    <span>Task: </span>
                    <TextField
                        label="Task"
                        variant="outlined"
                        required
                        defaultValue="" {...register("task")}
                    />
                </div>
                <div className="timer-item" id="timer-count-box">
                    <div id="timer-count">
                        <span>{hours}</span>hrs <span>{minutes}</span>mins <span>{seconds}</span>secs
                    </div>
                    {/* <p>{isRunning ? 'Running' : 'Not Running'}</p> */}
                    <div id="timer-count-buttons">
                        {
                            isRunning ? <Button variant="contained" onClick={pause}>Pause</Button> : <Button variant="contained" onClick={start}>Start</Button>
                        }
                        <Button variant="contained" onClick={reset} color="secondary">Reset</Button>
                    </div>
                </div>
                <div className="timer-item" id="timer-status-box">
                    <div id="timer-status-radios">
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
                    </div>
                    <Button type="submit" variant="contained">Submit</Button>
                    {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
                </div>
            </form>
        </div>
      );
}

export default Timer;