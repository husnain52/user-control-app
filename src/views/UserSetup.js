// react import
import React from "react";
// material imports
import {
  Box,
  Button,
  Collapse,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
// material icons
import { ExpandLess, ExpandMore, Settings } from "@material-ui/icons";
// comp imports
import Navbar from "../components/Navbar";
// img import
import UserImg from "../assets/img/user.png";
// react link
import { Link } from "react-router-dom";
// redux import
import { useSelector } from "react-redux";


// material makestyles
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#F3F3F3",
  },
  btnSet: {
    backgroundColor: "#C6C6C6",
    color: "#fff",
    padding: "12px",
    borderRadius: "40px",
  },
  btn: {
    backgroundColor: "#7E7EF1",
    borderRadius: "40px",
    color: "#fff",
    textTransform: "capitalize",
    marginTop: "30px",
    "&:hover": {
      backgroundColor: "#7E7EF1",
    },
  },
  formControl: {
    "& .MuiSelect-select": {
      minWidth: "11rem",
    },
  },
  nested: {
    padding: "0px 50px",
  },
}));


// -------------------------------------------------main func---------------------------------------------
export default function UserSetup() {
  const classes = useStyles();
  // get state value from redux
  const user = useSelector((state) => state.states.user);
  const [role, setrole] = React.useState(user ? user.role : "");
  // select toggler
  const [openSelect, setOpenSelect] = React.useState(false);
  // admin state
  const [admin, setadmin] = React.useState(
    user && user.role === "admin" ? true : false
  );
  // active state
  const [active, setactive] = React.useState(user && user.status);

  const handleChange = (event) => {
    setrole(event.target.value);
  };

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleOpen = () => {
    setOpenSelect(true);
  };
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  
  return (
    <>
      <Navbar
        title="User Setup"
        input={false}
        button={<Settings className={classes.btnSet} />}
      />
      <div className={classes.root}>
        {user ? (
          <Grid container>
            <Grid item md={4}>
              <Box
                my={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Box
                  my={3}
                  display="flex"
                  flexDirection="column"
                  textAlign="center"
                >
                  <img
                    src={user.img ? user.img : UserImg}
                    alt="user"
                    height="200px"
                  />
                  <a href="/">Upload a photo</a>
                </Box>
                <Typography variant="h4">
                  {user && user.firstName} {user && user.lastName}
                </Typography>
                <Typography variant="subtitle2">
                  {user && user.email}
                </Typography>
                <Button
                  className={classes.btn}
                  disabled={!active}
                  variant="contained"
                >
                  Resend Invitation
                </Button>
              </Box>
            </Grid>
            <Grid item md={3}>
              <Box
                my={6}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  style={{ textAlign: "left !important" }}
                >
                  Details
                </Typography>
                <Box my={3}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={active}
                        color="primary"
                        size="small"
                        onChange={() => setactive(!active)}
                      />
                    }
                    label={`This User is ${active ? "Active" : "InActive"}`}
                  />
                </Box>
                <TextField
                  style={{ marginBottom: "20px" }}
                  size="small"
                  defaultValue={user.firstName}
                  required
                  label="First Name"
                />
                <TextField
                  style={{ marginBottom: "20px" }}
                  size="small"
                  defaultValue={user.lastName}
                  required
                  label="Last Name"
                />
                <FormControl required className={classes.formControl}>
                  <InputLabel id="demo-controlled-open-select-label">
                    Role
                  </InputLabel>
                  <Select
                    style={{ marginBottom: "20px" }}
                    labelId="select-label"
                    id="open-select"
                    open={openSelect}
                    onClose={handleCloseSelect}
                    onOpen={handleOpen}
                    value={role}
                    onChange={handleChange}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                  </Select>
                </FormControl>
                <Link to="/">
                  <Button
                    className={classes.btn}
                    disabled={!active}
                    variant="contained"
                  >
                    Save Changes
                  </Button>
                </Link>
              </Box>
            </Grid>
            <Grid item md={5}>
              <Box my={6} mx={2}>
                <Typography gutterBottom variant="h5">
                  Permissions
                </Typography>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  px={2}
                >
                  <Typography>Super Admin</Typography>
                  <Switch
                    checked={admin}
                    disabled={!active}
                    onChange={() => setadmin(!admin)}
                  />
                </Box>
                <Divider />
                <Box>
                  <Box display="flex" alignItems="center">
                    <ListItem onClick={handleClick}>
                      {open ? <ExpandLess /> : <ExpandMore />}
                      <ListItemText
                        style={{ paddingLeft: "10px" }}
                        primary="Permission Group 1"
                      />
                    </ListItem>
                    <Switch size="small" color="inherit" disabled={!active} />
                  </Box>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List className="list" component="div" disablePadding>
                      <ListItem className={classes.nested}>
                        <ListItemText primary="Permission 11" />
                        <Switch size="small" disabled={!active} />
                      </ListItem>
                      <ListItem className={classes.nested}>
                        <ListItemText primary="Permission 12" />
                        <Switch size="small" disabled={!active} />
                      </ListItem>
                      <ListItem className={classes.nested}>
                        <ListItemText primary="Permission 13" />
                        <Switch size="small" disabled={!active} />
                      </ListItem>
                      <ListItem className={classes.nested}>
                        <ListItemText primary="Permission 14" />
                        <Switch size="small" disabled={!active} />
                      </ListItem>
                      <ListItem className={classes.nested}>
                        <ListItemText primary="Permission 15" />
                        <Switch size="small" disabled={!active} />
                      </ListItem>
                    </List>
                  </Collapse>
                  <Divider style={{ marginTop: "10px" }} />
                  <ListItem>
                    {open ? <ExpandLess /> : <ExpandMore />}
                    <ListItemText
                      style={{ paddingLeft: "10px" }}
                      primary="Permission Group 2"
                    />
                    <Switch size="small" disabled={!active} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    {open ? <ExpandLess /> : <ExpandMore />}
                    <ListItemText
                      style={{ paddingLeft: "10px" }}
                      primary="Permission Group 3"
                    />
                    <Switch size="small" disabled={!active} />
                  </ListItem>
                  <Divider />
                </Box>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Box
            height="80vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Link to="/">
              <Button variant="contained" color="primary">
                Go to Home
              </Button>
            </Link>
          </Box>
        )}
      </div>
    </>
  );
}
