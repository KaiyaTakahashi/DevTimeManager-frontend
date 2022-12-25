import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import { Button, Paper, TableBody } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableRow } from '@mui/material';
import  Axios  from 'axios';
import { useEffect, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

Axios.defaults.withCredentials = true;

function preventDefault(event) {
    event.preventDefault();
}

export default function WeeklyTable() {
    const [rows, setRows] = useState([]);
    const [disable, setDisable] = useState([{0: null}]);
    const [change, setChange] = useState([{}]);
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        Axios.get("http://localhost:3001/tasks/get").then((response) => {
            setRows(response["data"]);
            console.log(response)
            // const arr = new Array(response["data"][response["data"].length - 1]["task_id"]).fill(false);
            // setDisable(arr)
            console.log("this is rows: ",rows)
            console.log("this is dis: ", disable)
        })
    }

    const handleEdit = (event, row) => {
        console.log(rows)
        setDisable({
            ...disable,
            [row.id]: row.value
        })
    }
    const handleDelete = (event, row) => {
        console.log("Delete ", row.task_name)
    }

    const handleSave = (event, row, value) => {
        console.log("Save ", row.task_name)
        // Check change and row's information
        console.log(row.id);
        const firstIndex = rows[0].task_id;
        const index = row.id - firstIndex;
        if (change[row.id] !== undefined) {
            if (change[row.id].isFinished !== rows[index].isFinished) {
                var newRows = rows
                if (newRows[index].is_finished === "progress") {
                    newRows[index].is_finished = "finished"
                } else {
                    newRows[index].is_finished = "progress"
                }
                setRows(newRows)
            }
        }
    }

    const handleIsFinished = (event, row) => {
        // const firstIndex = rows[0].task_id;
        // const index = row.id - firstIndex;
        // var newRows = rows
        // if (newRows[index].is_finished === "progress") {
        //     newRows[index].is_finished = "finished"
        // } else {
        //     newRows[index].is_finished = "progress"
        // }
        // console.log("newRows: ", newRows)
        // console.log("changedRowTask: ", index)
        // setRows(newRows)
    }

    return (
        <div id='weekly-table'>
        <faCoffee></faCoffee>
        <React.Fragment>
            <Paper className='container'>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell>Task Name</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Finished</TableCell>
                        <TableCell>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow>
                            <TableCell>{row["task_name"]}</TableCell>
                            <TableCell>{row.time}</TableCell>
                            <TableCell>{row.date.substring(5, 10)}</TableCell>
                            <TableCell>
                                <input
                                    type="checkbox"
                                    // checked={row["is_finished"] === "finished"}
                                    defaultChecked={row["is_finished"] === "finished"}
                                    disabled={!disable[row.task_id]}
                                    onClick={(event) => {
                                        // handleIsFinished(event, {
                                        //     id:  row.task_id,
                                        // })
                                        const firstIndex = rows[0].task_id;
                                        const index = row.task_id - firstIndex;
                                        var value = ""
                                        if (rows[index].is_finished === "progress") {
                                            value = "finished"
                                        } else {
                                            value = "progress"
                                        }
                                        setChange({
                                            ...change,
                                            [row.task_id]: {
                                                "isFinished": value
                                            }
                                        })
                                    }}
                                /> 
                            </TableCell>
                            <TableCell>
                                {
                                    (disable[row.task_id] === false || disable[row.task_id] === undefined) ?
                                    <EditIcon
                                    onClick={(event) => {
                                        handleEdit(event, {
                                            id:  row.task_id,
                                            value: true,
                                        })
                                    }}
                                    >
                                    </EditIcon> : 
                                    <div className='icon-box'>
                                        <CancelIcon
                                        onClick={(event) => {
                                            handleEdit(event, {
                                                id:  row.task_id,
                                                value: false,
                                            })
                                        }}
                                        >
                                        </CancelIcon>
                                        <DeleteIcon
                                            onClick={(event) => {
                                                handleDelete(event, row)
                                            }}
                                        />
                                        <SaveAltIcon
                                            onClick={(event) => {
                                                handleSave(event, {
                                                    id: row.task_id,
                                                })
                                            }}
                                        />
                                    </div>
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </Paper>
            <Link color={"primary"} href="#" onClick={preventDefault} sx={{ mt: 3}}>
                See more tasks
            </Link>
        </React.Fragment>
        </div>
    );
}