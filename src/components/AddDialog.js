// react import 
import React from "react";
// material core imports
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  withStyles,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  makeStyles,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  MuiDialogTitle
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
// material icons
import { Add, AlternateEmail, Close, Face, VpnKey } from "@material-ui/icons";
// redux functions
import { useSelector, useDispatch } from "react-redux";
// initial state from redux
import { userData } from "../redux/actions";



// styles
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  title: {
    fontWeight: 700,
    padding: "30px",
  },
});
// Dialog Title render function
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h5" className={classes.title}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <Close />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});


// material makeStyles
const useStyles = makeStyles((theme) => ({
  btnAdd: {
    backgroundColor: "#305ECA",
    "&:hover": {
      backgroundColor: "#305ECA",
    },
    "& .MuiSvgIcon-root": {
      color: "#fff",
    },
  },
  btn: {
    backgroundColor: "#44A0D3",
    color: "#fff",
    textTransform: "capitalize",
    borderRadius: "40px",
    marginRight: "auto",
    marginBottom: "40px",
    "&:hover": {
      backgroundColor: "#44A0D3",
    },
  },
  name: {
    padding: "0px 10px",
  },
  active: {
    fontWeight: 700,
    color: "#44A0D3",
    paddingLeft: "3rem",
  },
  inActive: {
    fontWeight: 700,
    color: "red",
    paddingLeft: "8rem",
  },
  formControl: {
    "& .MuiSelect-select": {
      minWidth: "11rem",
    },
  },
}));

// -----------------------------------------main function----------------------------------------------
export default function DeleteDialog() {
  const classes = useStyles();
  // redux dispatch
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  // useslector to get state data
  const data = useSelector((state) => state.states.userData);

  const handleClose = () => {
    setOpen(false);
  };
  const [openSelect, setOpenSelect] = React.useState(false);

  // input values state
  const [state, setstate] = React.useState({
    role: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  // errors state
  const [errors, seterrors] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  const handleChange = (event) => {
    setstate({ ...state, role: event.target.value });
    seterrors({ ...errors, role: "" });
  };

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleOpen = () => {
    setOpenSelect(true);
  };
  const handleChangeFisrtName = (event) => {
    setstate({ ...state, firstName: event.target.value });
    seterrors({ ...errors, firstName: "" });
  };
  const handleChangeLastName = (event) => {
    setstate({ ...state, lastName: event.target.value });
    seterrors({ ...errors, lastName: "" });
  };
  const handleChangeEmail = (event) => {
    setstate({ ...state, email: event.target.value });
    seterrors({ ...errors, email: "" });
  };
  

  // main submit button function
  const clickHandler = () => {
    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!state.firstName) {
      seterrors({ ...errors, firstName: "First Name is required" });
    } else if (!state.lastName) {
      seterrors({ ...errors, lastName: "Last Name is required" });
    } else if (!state.email) {
      seterrors({ ...errors, email: "Email is required" });
    } else if (!pattern.test(state.email)) {
      seterrors({ ...errors, email: "Email is not valid" });
    } else if (!state.role) {
      seterrors({ ...errors, role: "Please select a role" });
    } 
    else {
      const newObj = {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        role: state.role,
        id: Math.random(),
      };
      const newArr = [newObj].concat(data);
      dispatch(userData(newArr));
      setOpen(false);
    }
  };

  return (
    <div>
      <IconButton className={classes.btnAdd} onClick={() => setOpen(true)}>
        <Add />
      </IconButton>
      <Dialog className={classes.root} open={open} onClose={handleClose}>
        <Box px={5}>
          <DialogTitle onClose={handleClose}>Invite New User</DialogTitle>
          <DialogContent>
            <ListItem>
              <ListItemIcon>
                <Face fontSize="small" />{" "}
              </ListItemIcon>
              <ListItemText>
                <Box display="flex" justifyContent="space-between">
                  <TextField
                    size="small"
                    required
                    label="First Name"
                    value={state.firstName}
                    onChange={handleChangeFisrtName}
                  />
                  {errors.firstName && (
                    <p className="error">{errors.firstName}</p>
                  )}
                  <TextField
                    size="small"
                    required
                    value={state.lastName}
                    onChange={handleChangeLastName}
                    label="Last Name"
                    style={{ marginLeft: "20px" }}
                  />
                  {errors.lastName && (
                    <p className="error">{errors.lastName}</p>
                  )}
                </Box>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AlternateEmail fontSize="small" />{" "}
              </ListItemIcon>
              <ListItemText>
                <TextField
                  fullWidth
                  size="small"
                  value={state.email}
                  onChange={handleChangeEmail}
                  required
                  label="Email"
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <VpnKey fontSize="small" />{" "}
              </ListItemIcon>
              <ListItemText>
                <FormControl required className={classes.formControl}>
                  <InputLabel id="demo-controlled-open-select-label">
                    Role
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={openSelect}
                    onClose={handleCloseSelect}
                    onOpen={handleOpen}
                    value={state.role}
                    label="Role"
                    onChange={handleChange}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                  </Select>
                  {errors.role && <p className="error">{errors.role}</p>}
                </FormControl>
              </ListItemText>
            </ListItem>
            <Divider />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              className={classes.btn}
              onClick={clickHandler}
            >
              Send Invitation
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
