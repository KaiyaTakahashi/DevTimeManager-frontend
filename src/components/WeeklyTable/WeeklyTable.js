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
        console.log("edit1", "disable:", disable, "c:", row);
        setDisable({
            ...disable,
            [row.id]: row.value
        })
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
                        <TableCell>Status</TableCell>
                        <TableCell>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow>
                            <TableCell>{row["task_name"]}</TableCell>
                            <TableCell>{row.time}</TableCell>
                            <TableCell>{row.date.substring(5, 10)}</TableCell>
                            <TableCell>{row["is_finished"]}</TableCell>
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
                                        <DeleteIcon>
                                        </DeleteIcon>
                                        <SaveAltIcon>
                                        </SaveAltIcon>
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