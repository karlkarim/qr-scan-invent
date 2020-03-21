import { setGlobal } from 'reactn';
import app from 'firebase';


export const logOut = () => {
    app.auth().signOut();
    localStorage.removeItem('user-data')
    setGlobal({loggedInUserData: []})
    setGlobal({profileMenuState: false})
}