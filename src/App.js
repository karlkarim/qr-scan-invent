import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Button from './components/Buttons/button';

const App = () => {
  return (
    <AuthProvider>
    {/* <Button buttonStyle={'btn-warning-outline'} buttonSize={'btn-medium'} type="submit" onClick={() => console.log('clicked')}>
      Test
    </Button> */}
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;