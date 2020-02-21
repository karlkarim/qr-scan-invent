import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import QRScan from "./pages/QRScan";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Nav from './components/nav.js';
const App = () => {
  return (
    <AuthProvider>
      <Router>
      <Nav />
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/qrscan" component={QRScan} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        
    
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;