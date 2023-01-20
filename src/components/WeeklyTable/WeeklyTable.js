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

export default function WeeklyTable() {
    const [rows, setRows] = useState([]);
    const [disable, setDisable] = useState([{0: null}]);
    const [change, setChange] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        Axios.get("http://localhost:3001/tasks/get", {
            params: {
                email: localStorage.getItem("email")
            }
        }).then((response) => {
            var res = response;
            // Sort Date data in order
            res.data.sort((a, b) => new Date(b.date) - new Date(a.date))
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
            Axios.delete("http://localhost:3001/tasks/delete", {
                data: {
                    id: row.task_id,
                }
            }).then((response) => {
            })
            fetchData();
        } else {
        }
    }

    const handleSave = (event, row, value) => {
        var taskIndex = 0;
        for (let i = 0; i < rows.length; i++) {
            if (row.id === rows[i].task_id) {
                taskIndex = i;
            }
        }
        if (change[row.id] && change[row.id].isFinished !== rows[taskIndex]["is_finished"]) {
            if (window.confirm("Do you want to save the change?")) {
                Axios.post('http://localhost:3001/tasks/update', {
                    taskId: row.id,
                    isFinished: change[row.id].isFinished,
                }).then((response) => {
                })
            }
        } else {
            window.alert("There is nothing to update.");
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
                                <TableRow
                                    tabIndex={row.id}
                                    key={row.task_id}
                                >
                                    <TableCell>{row["task_name"]}</TableCell>
                                    <TableCell>{row.time}</TableCell>
                                    <TableCell>{new Date(row.date).toLocaleString().substring(0, 5)}</TableCell>
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            defaultChecked={row["is_finished"] === "finished"}
                                            disabled={!disable[row.task_id]}
                                            onClick={(event) => {
                                                var index = 0;
                                                for (let i = 0; i < rows.length; i++) {
                                                    if (row.task_id === rows[i].task_id) {
                                                        index = i;
                                                    }
                                                }
                                                var value = ""
                                                if (change[row.task_id]) {
                                                    if (change[row.task_id].isFinished === "progress") {
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