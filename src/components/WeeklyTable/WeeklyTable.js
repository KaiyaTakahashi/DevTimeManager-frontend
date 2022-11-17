import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import { TableBody } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableRow } from '@mui/material';

function createData(id, name, time, date, isFinished) {
    return { id, name, time, date, isFinished};
}

function preventDefault(event) {
    event.preventDefault();
}

const rows = [
    createData(
      0,
      'Google Authentication',
      180,
      '16 Mar, 2019',
      true,
    ),
    createData(
      1,
      'JWT token',
      240,
      '16 Mar, 2019',
      false,
    ),
    createData(
        2, 
        'Login View', 
        360, 
        '16 Mar, 2019', 
        false,
    ),
    createData(
      3,
      'Table view',
      120,
      '16 Mar, 2019',
      true,
    ),
    createData(
      4,
      'Leetcode',
      60,
      '15 Mar, 2019',
      true
    ),
  ];

export default function WeeklyTable() {
    return (
        <div id='weekly-table'>
        <React.Fragment>
            <h1>Weekly Table</h1>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell>Task Name</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.time}</TableCell>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.isFinished}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color={"primary"} href="#" onClick={preventDefault} sx={{ mt: 3}}>
                See more tasks
            </Link>
        </React.Fragment>
        </div>
    );
}