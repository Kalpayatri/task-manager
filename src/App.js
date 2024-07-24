import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (value) => {
    setIsAuthenticated(value);
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginForm setAuth={setAuth} />
        </Route>
        <Route path="/signup">
          <SignupForm setAuth={setAuth} />
        </Route>
        <PrivateRoute path="/dashboard" component={Dashboard} isAuthenticated={isAuthenticated} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
