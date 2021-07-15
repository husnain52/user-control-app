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
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
// matetial icons
import { Close, Delete, Face } from "@material-ui/icons";
// redux functions
import { useDispatch, useSelector } from "react-redux";
// initial state value
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
  btn: {
    backgroundColor: "#F79696",
    color: "#fff",
    textTransform: "capitalize",
    borderRadius: "40px",
    marginRight: "auto",
    marginBottom: "40px",
    "&:hover": {
      backgroundColor: "#F79696",
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
}));


// --------------------------------------------main function-----------------------------------------------
export default function DeleteDialog(props) {
  const classes = useStyles();
  // dispatch function
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  // index from props
  const i = props.index;
  // data state get
  const data = useSelector(state => state.states.userData);
  // delete function
  const deleteHandler = () => {
    const array = data;
        // removing object with index from array
        const index = i;
        if (index > -1) {
        array.splice(index, 1);
        }
        dispatch(userData(array))
        setOpen(false);
        // to rerender prev comp
        props.refreshComp(Math.random())
  }
  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <Delete />
      </IconButton>
      <Dialog className={classes.root} open={open} onClose={handleClose}>
        <Box px={5}>
          <DialogTitle onClose={handleClose}>Delete User</DialogTitle>
          <DialogContent>
            <ListItem>
              <ListItemIcon>
                <Face />{" "}
              </ListItemIcon>
              <ListItemText variant="subtitle2" className={classes.name}>
                {props.firstName && props.firstName}{" "}{props.lastName && props.lastName}
              </ListItemText>
              <Typography
                variant="subtitle2"
                className={props.status ? classes.active : classes.inActive}
              >
                {props.status ? "Active User" : "InActive User"}
              </Typography>
            </ListItem>
            <Divider />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" className={classes.btn} onClick={deleteHandler}>
              Delete User
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
