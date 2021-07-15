// import react
import React from "react";
// prop types
import PropTypes from "prop-types";
// material core imports
import {
  makeStyles,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  Typography,
  IconButton,
  Container,
  TableSortLabel,
  TableRow,
  Box,
  Avatar,
  ListItem,
  ListItemIcon,
  Switch,
} from "@material-ui/core";
// useSelector import
// icons import
import { ArrowRight, ArrowLeft, VpnKey, Settings } from "@material-ui/icons";
// component import
import Navbar from "../components/Navbar";
import DeleteDialog from "../components/DeleteDialog";
import AddDialog from "../components/AddDialog";
// react link
import { Link } from "react-router-dom";
// redux func
import {useDispatch, useSelector} from 'react-redux';
// init state value
import { user } from "../redux/actions";

// descending order func
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// comparator func
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// stable sort func
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// headCells array
const headCells = [
  { id: "id", numeric: true, disablePadding: true, label: "" },
  { id: "name", numeric: false, disablePadding: false, label: "USER" },
  { id: "mass", numeric: false, disablePadding: false, label: "ROLE" },
  { id: "type", numeric: true, disablePadding: false, label: "STATUS" },
  { id: "type", numeric: true, disablePadding: false, label: "ACTIONS" },
];

// table head component starts
function EnhancedTableHead(props) {
  // get props from parent comp
  const { classes, order, orderBy, onRequestSort } = props;
  // createsorthandler func
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* data mapping by array.map() method */}
        {headCells.map((headCell) => (
          <>
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "center" : "left"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          </>
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
  rowCount: PropTypes.number.isRequired,
};

// table head comp ends

// -----------------------------------------------Main Components Starts here ---------------------------->

// main table useStyles
const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    padding: "3rem 0px",
    "& .MuiTableCell-head": {
      fontWeight: 700,
    },
    "& .MuiTableCell-body": {
      paddingRight: "40px",
    },
    '& .MuiTableCell-root':{
      padding:"7px !important"
    },
  },
  paper: {
    width: "100%",
    marginTop: "60px",
    boxShadow: "0px 0px 13px 1px rgba(0,0,0,0.68)",
    borderRadius: "20px",
  },
  table: {
    minWidth: 750,
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
    width: 1,
  },
  text: {
    padding: "40px 100px",
    textAlign: "center",
  },
  listItemIcon: {
    marginLeft: "20px",
  },
}));

// main comp funct

export default function EnhancedTable() {
  // classes
  const classes = useStyles();
  // main data
  const data = useSelector(state => state.states.userData);
  // order init state
  const [order, setOrder] = React.useState("asc");
  // orderBy init state
  const [orderBy, setOrderBy] = React.useState("calories");
  // page init state
  const [page, setPage] = React.useState(0);
  // rows per page state
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();

  // increment for pagination
  const handleNextPage = () => {
    setPage(page + 5);
    setRowsPerPage(rowsPerPage + 5);
  };
  // decrement for pagination
  const handlePreviousPage = () => {
    setPage(page - 5);
    setRowsPerPage(rowsPerPage - 5);
  };

  // handleRequestSort funct tp sort data
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // searchTerm init state
  const [searchTerm, setSearchTerm] = React.useState("");

  const [refresh, setrefresh] = React.useState('');

  // on settings button click
  const settingsHandler = (props) => {
    dispatch(user(props))
  }
  return (
    <>
      <Navbar
        // getting value from child and use it to setState
        filterData={(value) => setSearchTerm(value)}
        button={(<AddDialog />)}
        input={true}
        title="Project Access"
      />
      <div className={classes.root}>
        {/* container to add padding along x axis */}
        <Container fixed>
          {/* if condition true renders table otherwise simple typo below */}
          {data ? (
            // <Paper className={classes.paper}>

            //
            <>
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size="medium"
                  aria-label="enhanced table"
                >
                  {/* Table head comp */}
                  <EnhancedTableHead
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={data && data.length}
                  />
                  <TableBody>
                    {/* sort func applies to array */}
                    {stableSort(data, getComparator(order, orderBy))
                      // filter method to filter out data from array
                      // searchTerm includes value from textfield, only returns objects that includes same value
                      .filter((val) => {
                        if (searchTerm === "") {
                          return val;
                        } else if (
                          val.firstName
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        ) {
                          return val;
                        }
                      })
                      // slicing method for pagination purpose
                      .slice(page, rowsPerPage)
                      // finally map method to map the array data
                      .map((val, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow hover tabIndex={-1} key={val.name}>
                            <TableCell
                              component="th"
                              id={labelId}
                              align="right"
                              scope="row"
                              padding="default"
                            >
                              <Avatar alt="user" src={val.img ? val.img : ""} />
                            </TableCell>
                            <TableCell padding="default">
                              <Typography
                                variant="subtitle2"
                                style={{ fontWeight: 600 }}
                              >
                                {val.firstName}{" "}{val.lastName}
                              </Typography>
                              <Typography variant="caption">
                                {val.email}
                              </Typography>
                            </TableCell>
                            <TableCell padding="default">
                              {val.role === "admin" ? (
                                <ListItem style={{ padding: 0 }}>
                                  <Typography
                                    variant="subtitle2"
                                    style={{ fontWeight: 600 }}
                                  >
                                    Admin
                                  </Typography>
                                  <ListItemIcon
                                    className={classes.listItemIcon}
                                  >
                                    <VpnKey color="primary" />
                                  </ListItemIcon>
                                </ListItem>
                              ) : (
                                <Typography
                                  variant="subtitle2"
                                  style={{ fontWeight: 600 }}
                                >
                                  User
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell padding="default" align="center">
                              <Switch
                                size="small"
                                checked={val.status}
                                color={val.status ? "primary" : "default"}
                              />
                            </TableCell>
                            <TableCell padding="default" align="center">
                              <Box display="flex" justifyContent="center">
                                <Link to="/user-setup">
                                  <IconButton onClick={()=>settingsHandler(val)}>
                                    <Settings />
                                  </IconButton>
                                </Link>
                                <DeleteDialog
                                  firstName={val.firstName}
                                  lastName={val.lastName}
                                  status={val.status}
                                  id={val.id}
                                  index={index}
                                  refreshComp={(value)=>setrefresh(value)}
                                />
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* custom pagination with simplete increment */}
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <Typography>
                  Showing results: {page + 5}-{data && data.length}
                </Typography>
                <IconButton
                  disabled={page === 0}
                  onClick={() => handlePreviousPage()}
                >
                  <ArrowLeft />
                </IconButton>
                <IconButton
                  disabled={rowsPerPage === 20}
                  onClick={() => handleNextPage()}
                >
                  <ArrowRight />
                </IconButton>
              </Box>
            </>
          ) : (
            // if data is not true
            <>
              <Typography className={classes.text}>No data to show.</Typography>
            </>
          )}
        </Container>
      </div>
    </>
  );
}
