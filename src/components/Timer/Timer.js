import React, { useState } from "react"
import "/Users/kaiyatakahashi/Desktop/DevTimeManager/client/src/styles/components.css"
import { useStopwatch } from 'react-timer-hook';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import CustomButton from "../Button/Button";
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
        const today = new Date();
        if (localStorage.getItem("isLoggedin") === "true") {
            if (window.confirm("Do you want to push this event to google calendar?")) {
                // Create an event
                console.log("Event was created");
                Axios.post('http://localhost:3001/create_event', {
                    summary: data.task,
                    description: "",
                    location: "",
                    startDateTime: today.createStartDate(hours, minutes, days),
                    endDateTime: today,
                    email: localStorage.getItem("email"),
                }).then((response) => {
                    console.log(response.data);
                })
            } else {
                console.log("Event wasn't created");
            }

            /* Insert task into database */
            Axios.post("http://localhost:3001/tasks/insert", {
                taskName: data.task,
                time: hours + ":" + minutes + ":" + seconds,
                isFinished: data.isFinished,
                date: today,
                email: localStorage.getItem("email"),
            }).then((response) => {
                console.log("Task is stored in tasks")
                console.log(response);
            })
            /* Insert task into progress_tasks */
            Axios.post("http://localhost:3001/progress_tasks/insert", {
                date: today,
                value: hours + Math.round((minutes / 60) * 10) / 10,
                email: localStorage.getItem("email"),
            }).then((response) => {
                console.log("Task is stored in progress_tasks")
                console.log(response);
            })
            window.location.reload();
        } else {
            window.alert("Please login before you submit a task.")
        }
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
                    <div id="timer-count-buttons">
                        {
                            isRunning ? <CustomButton colour="red" title="Pause" onClick={pause} isTapped={true}/> : <CustomButton colour="green" title="Start" onClick={start} isTapped={true} />
                        }
                        <CustomButton
                            title="Reset"
                            onClick={reset}
                            colour="reset"
                            isTapped={true}
                        />
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
                    <CustomButton
                        isSubmit={true}
                        title="Submit"
                        colour="submit"
                        isTapped={true}
                    />
                </div>
            </form>
        </div>
      );
}

export default Timer;