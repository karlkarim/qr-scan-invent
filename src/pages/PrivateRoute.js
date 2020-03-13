import React, { useContext, useEffect, setGlobal } from "reactn";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Auth";


const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  useEffect(() => {
    const data = localStorage.getItem('user-data')
    if(data) {
      setGlobal({loggedInUserData: JSON.parse(data)})
    }
  },[])
  const {currentUser} = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};


export default PrivateRoute