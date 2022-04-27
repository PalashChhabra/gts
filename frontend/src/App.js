import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import UserLanding from "./views/screens/dashboard/user-landing.js";
import Login from "./views/screens/login/Login.js";
import Register from "./views/screens/register/Register.js";
import BookSelection from "./views/screens/bookselect/book-select-component.js";
import ErrorPage from "views/screens/errorpage/error.js";
import EditBook from "views/screens/bookedit/editbook.js";
import ResumeTranslation from "views/screens/resumeTranslation/resume-translation-component.js";
import NotFoundPage from "views/screens/404page/404page.component.js";
import BookHistory from "views/screens/history/book-history-component.js";

class App extends React.Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />]
          <Route path="/register" component={Register} />
          <Route path="/home" component={UserLanding} />
          <Route path="/BookSelection" component={BookSelection} />
          <Route path="/editBook" component={EditBook} />
          <Route path="/inProgress" component={ResumeTranslation} />
          <Route path="/history" component={BookHistory} />
          <Route path="/authError" component={ErrorPage} />
          <Route path="/404" component={NotFoundPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </>
    );
  }
}

export default App;
