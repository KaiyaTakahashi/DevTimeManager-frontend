import React from "react";
import PropTypes from "prop-types";

import {
  Select,
  Paper,
  Table,
  makeStyles,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Checkbox,
  IconButton,
  TextField,
  MenuItem
} from "@mui/material";

import { Form, Field } from "react-final-form";
// import { Field } from "react-final-form-html5-validation";

function createData(id, TipoDispositivo, Ubicable, Personal, Valor, Extension) {
  return {
    id,
    TipoDispositivo,
    Ubicable,
    Personal,
    Valor,
    Extension
  };
}
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}
function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}
const headCells = [
  {
    id: "TipoDispositivo",
    numeric: false,
    disablePadding: false,
    label: "TipoDispositivo",
    type: "text"
  },
  {
    id: "Ubicable",
    numeric: false,
    disablePadding: false,
    label: "Ubicable",
    type: "boolean"
  },
  {
    id: "Personal",
    numeric: false,
    disablePadding: false,
    label: "Personal",
    type: "boolean"
  },
  {
    id: "Valor",
    numeric: false,
    disablePadding: false,
    label: "Valor",
    type: "number"
  },
  {
    id: "Extension",
    numeric: false,
    disablePadding: false,
    label: "Extension",
    type: "number"
  },
  {
    id: "Editar",
    numeric: false,
    disablePadding: false,
    label: "Editar",
    type: "button"
  }
];
function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "center"}
            padding={headCell.disablePadding ? "none" : "none"}
            sortDirection={orderBy === headCell.id ? order : false}
            type={headCell.disablePadding ? "none" : "none"}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};
const EnhancedTableToolbar = props => {
  return <Toolbar align="center" />;
};
EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(2)
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 100
  },
  tableWrapper: {
    overflowX: "auto"
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  }
}));
export default function TasksTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Oficina");
  const [rows, setRows] = React.useState([
    createData(1, "email", false, true, "0991651335", 1256),
    createData(2, "web", true, false, "0991552233", 1235)
  ]);
  const [selected, setSelected] = React.useState([]);
  const [checked2, setChecked2] = React.useState([{}]);
  const [checked3, setChecked3] = React.useState([{}]);
  const [valor, setValor] = React.useState([{ 0: null }]);
  const [extension, setExtension] = React.useState([{ 0: null }]);
  const [select] = React.useState([
    { key: 0, label: "email", value: "email" },
    { key: 1, label: "number", value: "number" },
    { key: 2, label: "web", value: "web" },
    { key: 3, label: "text", value: "text" }
  ]);
  const [option, setOption] = React.useState([{ 0: "" }]);
  const [disable, setDisable] = React.useState([{ 0: true }]);
  const [page, setPage] = React.useState(0);
  const [type, setType] = React.useState([{ 0: null }]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleDelete = (i, row, c) => {
    const items = rows;
    items.splice(rows.indexOf(row), 1);
    setRows(items);
    setDisable({
      ...disable,
      [c.id]: c.value
    });
  };

  const handleChangeValor = (event, row, b) => {
    console.log("props1", props.input.value);
    console.log("1", event.target.value);
    setValor({
      ...valor,
      [row.id]: event.target.value
    });
    console.log("save2", rows, row, { [row.id]: event.target.value });
  };

  const handleChangeExtension = (event, row, b) => {
    console.log("1", event.target.value);
    setExtension({
      ...extension,
      [row.id]: event.target.value
    });
    console.log("save2", rows, row, { [row.id]: event.target.value });
  };

  const handleSave = (
    event,
    row,
    b,
    select,
    checked2,
    checked3,
    valor,
    extension
  ) => {
    console.log("save1", select, checked2, checked3, valor, extension);

    setDisable({
      ...props.input.value,
      [b.id]: b.value
    });
    console.log("props2", props.input.value);
    console.log("save2", rows, row, { [b.id - 1]: row });
  };

  const handleAdd = (rows, b) => {
    console.log("add", "rows:", rows);
    let items = rows;
    items.push([]);
    setRows(items);
    setDisable({
      ...disable,
      [b.id]: b.value
    });
    console.log("add2", rows);
  };
  const handleEdit = (event, c) => {
    console.log("edit1", "disable:", disable, "c:", c);
    setDisable({
      ...disable,
      [c.id]: c.value
    });
    console.log("edit2", disable, c);
  };
  const handleChangeType = (e, id) => {
    setOption({ ...option, [id]: e.target.value });
    console.log("Option: ", option);
    setType({
      ...type,
      [id]: e.target.value
    });
    console.log("type: ", type);
  };
  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };
  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick2 = (event, id, selected, row) => {
    console.log(id, selected[id], row);
    let data = selected[id] === undefined ? !row : !selected[id];
    console.log(checked2, data, { [id]: data });
    setChecked2({ ...checked2, [id]: data });
  };
  const handleClick3 = (event, id, selected, row) => {
    console.log(id, selected[id], row);
    let data = selected[id] === undefined ? !row : !selected[id];
    console.log(checked3, data, { [id]: data });
    setChecked3({ ...checked3, [id]: data });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const isSelected = id => selected.indexOf(id) !== -1;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  return (
    <div className={classes.root}>
      <IconButton
        aria-label="Add"
        onClick={() => handleAdd(rows, { id: `${rows.length}+1`, value: true })}
      >
        <span className="MuiIconButton-label">
          <i className="zmdi zmdi-plus" />
        </span>
      </IconButton>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    // ENCABEZADO
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={row.id}
                      key={row.id}
                      selected={isItemSelected}
                      style={
                        !disable[`${row.id}`]
                          ? { cursor: "not-allowed" }
                          : { cursor: "pointer" }
                      }
                    >
                      {/**Combo */}
                      <TableCell id={row.id} align="center">
                        <Field
                          name={"TipoDispositivo" + `${row.id}`}
                          component="select"
                          className={classes.select}
                          disabled={!disable[`${row.id}`]}
                          defaultValue={
                            option[`${row.id}`] === undefined
                              ? row.TipoDispositivo
                              : option[`${row.id}`]
                          }
                          onChange={event =>
                            handleChangeType(event, `${row.id}`)
                          }
                        >
                          {select.map(obj => (
                            <option key={obj.key} value={obj.value}>
                              {obj.value}
                            </option>
                          ))}
                        </Field>
                      </TableCell>
                      <TableCell align="center">
                        <Field
                          name={"Ubicable" + `${row.id}`}
                          component="input"
                          type="checkbox"
                          disabled={!disable[`${row.id}`]}
                          checked={
                            checked2[`${row.id}`] === undefined
                              ? row.Personal
                              : checked2[`${row.id}`]
                          }
                          inputprops={{ "aria-labelledby": labelId }}
                          onClick={event =>
                            handleClick2(event, row.id, checked2, row.Personal)
                          }
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Field
                          name={"Personal" + `${row.id}`}
                          component="input"
                          type="checkbox"
                          disabled={!disable[`${row.id}`]}
                          checked={
                            checked3[`${row.id}`] === undefined
                              ? row.Ubicable
                              : checked3[`${row.id}`]
                          }
                          inputprops={{ "aria-labelledby": labelId }}
                          onClick={event =>
                            handleClick3(event, row.id, checked3, row.Ubicable)
                          }
                        />
                      </TableCell>
                      <TableCell id={row.id} align="center">
                        <Field
                          name={"valor" + `${row.id}`}
                          component="input"
                          disabled={!disable[`${row.id}`]}
                          type={type[`${row.id}`]}
                          defaultValue={
                            valor[`${row.id}`] === undefined
                              ? row.Valor
                              : valor[`${row.id}`]
                          }
                          required
                          onChange={event =>
                            handleChangeValor(event, row, `${row.id - 1}`)
                          }
                        />
                      </TableCell>
                      <TableCell id={row.id} align="center">
                        <Field
                          name={"extension" + `${row.id}`}
                          component="input"
                          disabled={
                            !disable[`${row.id}`] |
                            (type[`${row.id}`] !== "number")
                          }
                          type={type[`${row.id}`]}
                          defaultValue={
                            type[`${row.id}`] !== "number"
                              ? ""
                              : extension[`${row.id}`] === undefined
                              ? row.Extension
                              : extension[`${row.id}`]
                          }
                          required
                          onChange={event =>
                            handleChangeExtension(event, row, `${row.id - 1}`)
                          }
                        />
                      </TableCell>
                      <TableCell align="center">
                        {(disable[`${row.id}`] === false) |
                        (disable[`${row.id}`] === undefined) ? (
                          <IconButton
                            aria-label="Edit"
                            onClick={event =>
                              handleEdit(event, {
                                id: `${row.id}`,
                                value: true
                              })
                            }
                          >
                            <span className="material-icons">edit</span>
                          </IconButton>
                        ) : (
                          disable[`${row.id}`] === true && (
                            <IconButton
                              aria-label="Cancel"
                              onClick={event =>
                                handleEdit(event, {
                                  id: `${row.id}`,
                                  value: false
                                })
                              }
                            >
                              <span className="material-icons">cancel</span>
                            </IconButton>
                          )
                        )}
                        {disable[`${row.id}`] === true && (
                          <IconButton
                            aria-label="Delete"
                            onClick={event =>
                              handleDelete(`${row.id}`, row, {
                                id: `${row.id}`,
                                value: false
                              })
                            }
                          >
                            <span className="material-icons">delete</span>
                          </IconButton>
                        )}
                        {disable[`${row.id}`] === true && (
                          <IconButton
                            aria-label="Save"
                            onClick={event =>
                              handleSave(
                                event,
                                row,
                                {
                                  id: `${row.id}`,
                                  value: false
                                },
                                select,
                                checked2,
                                checked3,
                                valor,
                                extension
                              )
                            }
                          >
                            <span className="material-icons">save</span>
                          </IconButton>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.seleccionCatalogo}
                      </TableCell>
                      <TableCell align="center">{row.tipoUbicacion}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (0 ? 33 : 33) * emptyRows }}>
                  <TableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "previous page"
          }}
          nextIconButtonProps={{
            "aria-label": "next page"
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}