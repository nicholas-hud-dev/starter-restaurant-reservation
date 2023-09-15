import React from "react";

import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";

import NewReservation from "../createReservation/NewReservation";
import NewTable from "../newTable/NewTable";
import Edit from "../Edit/Edit";
import Seat from "../Seat/Seat";
import Search from "../Search/Search";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = new URLSearchParams(useLocation().search);
  const date = query.get('date')
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact path="/reservations/:reservation_id/seat">
        <Seat />
      </Route>
      <Route exact path="/reservations/:reservation_id/edit">
        <Edit />
      </Route>
      <Route exact path="/reservations/new">
        <NewReservation />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date || today()} />
      </Route>
      <Route path="/tables/new">
        <NewTable />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
