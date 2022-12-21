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

Axios.defaults.withCredentials = true;

function preventDefault(event) {
    event.preventDefault();
}

export default function WeeklyTable() {
    const [rows, setRows] = useState([]);
    const [disable, setDisable] = useState(new Array(rows.length).fill(false));
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        Axios.get("http://localhost:3001/tasks/get").then((response) => {
            setRows(response["data"]);
            setDisable(new Array(rows.length).fill(false))
            console.log(rows)
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
                            <EditIcon
                                onClick={(event) => {
                                    console.log(row)
                                }}
                            >

                            </EditIcon>
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