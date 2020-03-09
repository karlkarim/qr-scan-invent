import React,{useGlobal, setGlobal, useEffect} from "reactn";
// import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import QRScan from "./pages/QRScan";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import QRManager from "./pages/QRManager";
import Nav from './components/nav.js';
const App = () => {
  const[loggedInUserData] = useGlobal('loggedInUserData')
  const restoreUser = async() => {
    const localUserData = localStorage.getItem('user-data')
      if(localUserData){
        await setGlobal({loggedInUserData : JSON.parse(localUserData)})
      }
  }

  console.log(loggedInUserData);
  useEffect(() => {
    restoreUser()
  },[loggedInUserData.length])
   return (
    <AuthProvider>
      <Router>
        
      {loggedInUserData.length !== 0 ? <Nav /> : '' } 
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/qrscan" component={QRScan} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <PrivateRoute exact path="/QRManager" component={QRManager} />
    
      </Router>
    </AuthProvider>
  );
};

export default App;