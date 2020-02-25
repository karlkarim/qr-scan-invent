import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ManageQR from './pages/ManageQrCodes';
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import './App.css'
import Scan from './pages/scan';
import NavBar from './components/NavBar/index';

const App = () => {
  return (
    <AuthProvider>

      <Router>
        {/* <Switch> */}
          <NavBar />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path='/manage-qr' component={ManageQR} /> 
          <PrivateRoute exact path='/scan' component={Scan} /> 
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        {/* </Switch> */}
      </Router>
    </AuthProvider>
  );
};

export default App;