// react import
import React from "react";
// material imports
import { makeStyles } from "@material-ui/core/styles";
import {AppBar, Toolbar, Typography, Container, InputAdornment, TextField } from '@material-ui/core';
// material icons
import { Search } from "@material-ui/icons";



// material makestyles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    padding: "30px !important",
  },
  btn: {
    position: "absolute",
    bottom: "-24px",
  },
  toolbar: {
    padding: "0px 5rem",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontWeight:700,
    fontSize:"22px"
  },
  input: {
    '&::placeholder': {
      fontStyle: 'italic',
    },
  },
}));

// -------------------------------------------------main func---------------------------------------------
export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="relative" color="inherit">
        <Container fixed>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" className={classes.title}>
              {props.title}
            </Typography>
            {props.input &&
            <TextField
                type="search"
                placeholder="Type to filter the table"
                onChange={(e)=>props.filterData(e.target.value)}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <Search />
                    </InputAdornment>
                    ),
                classes: { input: classes.input}
                }}
            />
            }
          </Toolbar>
          <div className={classes.btn}>
            {props.button}
          </div>
        </Container>
      </AppBar>
    </div>
  );
}
