import React,{useGlobal, setGlobal, useEffect} from "reactn";
// import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import QRScan from "./pages/QRScan";
import { AuthProvider } from "./components/auth/Auth";
import PrivateRoute from "./PrivateRoute";
import QRManager from "./pages/QRManager";
import BottomNav from './components/bottomNav/BottomNav';
import TopNav from './components/topNav/TopNav';


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
        <TopNav/>
      {loggedInUserData.length !== 0 ? <BottomNav /> : '' } 
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