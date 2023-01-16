import * as React from 'react';
import { 
    TableCell,
    TableHead, 
    TableRow,
    Paper,
    TableBody,
    Table,
    TablePagination
} from '@mui/material';

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
    const [change, setChange] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [email, setEmail] = useState(
        localStorage.getItem("email") ?
        localStorage.getItem("email"):
        ""
    )
    useEffect(() => {
        fetchData();
        console.log(email)
    }, [])
    const fetchData = async () => {
        Axios.get("http://localhost:3001/tasks/get", {
            params: {
                email: localStorage.getItem("email")
            }
        }).then((response) => {
            var res = response;
            // Sort Date data in order
            res.data.sort((a, b) => new Date(a.date) - new Date(b.date))
            setRows(response["data"]);
        })
    }

    const handleEdit = (event, row) => {
        setDisable({
            ...disable,
            [row.id]: row.value
        })
    }
    const handleDelete = (event, row) => {
        if (window.confirm("Do you want to delete the task \"" + row.task_name + "\"?")) {
            Axios.delete("http://localhost:3001/delete", {
                data: {
                    id: row.task_id,
                }
            }).then((response) => {
            })
            const newRows = rows;
            newRows.splice(rows.indexOf(row), 1);
            setRows(newRows);
            // console.log("successfully deleted a task");
        } else {
            // console.log("deletion canceled");
        }
    }

    const handleSave = (event, row, value) => {
        const index = row.id - rows[0].task_id;
        if (window.confirm("Do you want to save the changes?")) {
            if (change[row.id]) {
                if (change[row.id].isFinished !== rows[index].isFinished) {
                    Axios.post('http://localhost:3001/tasks/update', {
                        taskId: row.id,
                        isFinished: change[row.id].isFinished,
                    }).then((response) => {
                    })
                }
            }
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div id='task-table-div'>
            <h1 className='section-title'>Task Table</h1>
            <div id='task-table'>
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
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow>
                                    <TableCell>{row["task_name"]}</TableCell>
                                    <TableCell>{row.time}</TableCell>
                                    <TableCell>{row.date.substring(5, 10)}</TableCell>
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            defaultChecked={row["is_finished"] === "finished"}
                                            disabled={!disable[row.task_id]}
                                            onClick={(event) => {
                                                const index = row.task_id - rows[0].task_id;
                                                var value = ""
                                                if (change[index]) {
                                                    if (change[index] === "progress") {
                                                        value = "finished";
                                                    } else {
                                                        value = "progress";
                                                    }
                                                } else {
                                                    if (rows[index].is_finished === "progress") {
                                                        value = "finished"
                                                    } else {
                                                        value = "progress"
                                                    }
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
                                                        data: row,
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
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (0 ? 33 : 33) * emptyRows }}>
                                    <TableCell colSpan={3}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={rows.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        backIconButtonProps={{
                            "aria-label": "previous page"
                        }}
                        nextIconButtonProps={{
                            "aria-label": "next page"
                        }}

                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    </Paper>
                </React.Fragment>
                </div>
        </div>
    );
}