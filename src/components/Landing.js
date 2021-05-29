import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MemberRegistrationForm from "./Member/MemberRegistration";
import LoginForm from "./LoginForm";
import Navbar from "./Layout/Navbar";
import { CookiesHelper } from "./common/CookiesHelper";
import Home from "./Member/Home";
import ClaimList from "./Member/ClaimList";
import AddClaim from "./Member/AddClaim";

const cookieService = CookiesHelper();
function Landing() {
  const storeactiveUserDetail = cookieService.readCookie("activeUserDetail");
  console.log("storeactiveUserDetail : ", storeactiveUserDetail);

  const [state, setState] = useState({
    activeUserDetail: storeactiveUserDetail,
  });

  const successLogin = (user) => {
    console.log(user.memberName, " : ", user.password);
    setState({ ...state, activeUserDetail: user });
    cookieService.createCookie("activeUserDetail", user, 1);
  };
  const logOutClickHandler = () => {
    console.log("logOutClickHandler  ");
    setState({ ...state, activeUserDetail: null });
    cookieService.eraseCookie("activeUserDetail");
  };
  return (
    <React.Fragment>
      {state.activeUserDetail && (
        <Navbar
          userDetail={state.activeUserDetail}
          logout={logOutClickHandler}
        />
      )}
      <Router>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/claim/list" component={ClaimList} />
          <Route path="/claim/add" component={AddClaim} />
          <Route path="/member/add" component={MemberRegistrationForm} />
          <Route
            path="/"
            component={() => <LoginForm successLogin={successLogin} />}
          />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default Landing;
