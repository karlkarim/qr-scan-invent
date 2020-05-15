import React, { useGlobal, setGlobal, useEffect } from "reactn";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ManageQR from './pages/admin/ManageQrCodes';
import { AuthProvider } from "./Auth";
import PrivateRoute from "./pages/PrivateRoute";
import './App.css';
import Scan from './pages/scan';
import BottomNav from './components/BottomNav';
import ManageUsers from './pages/admin/manageUsers';
import NotificationMsg from './components/Notification/index';
import TopNav from './components/TopNav/index';
import ProfileMenu from "./components/ProfileMenu";
import UserItems from './pages/userItems';

const App = () => {
  const [ loggedInUserData ] = useGlobal('loggedInUserData')
  const [ notificationMsg ] = useGlobal('notificationMsg')
  const restoreUser = async () => {
  const data = localStorage.getItem('user-data')
    if(data) {
      await setGlobal({loggedInUserData: JSON.parse(data)})
    }
  }
  useEffect(() => {
    restoreUser()
},[loggedInUserData.length])
  return (
    <AuthProvider>
      
      <Router>
        {loggedInUserData.length !== 0  ? <BottomNav /> : ''}
        {loggedInUserData.length !== 0  ? <TopNav /> : ''}
        {notificationMsg.show === true ? <NotificationMsg /> : ''}
        {loggedInUserData.length !== 0  ? <ProfileMenu /> : ''}
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path='/manage-qr' component={ManageQR} /> 
          <PrivateRoute exact path='/manage-users' component={ManageUsers} /> 
          <PrivateRoute exact path='/user-items' component={UserItems} /> 
          <PrivateRoute exact path='/scan' component={Scan} /> 
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          
      </Router>
    </AuthProvider>
  );
};

export default App;