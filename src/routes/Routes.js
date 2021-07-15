// react import
import React from 'react';
// Switch, Route import
import {
    Switch,
    Route,
  } from "react-router-dom";
//   components import
import Home from '../views/Home';
import UserSetup from '../views/UserSetup';



export default function Routes() {
    return (
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/user-setup" exact>
                    <UserSetup />
                </Route>
            </Switch>
    )
}
