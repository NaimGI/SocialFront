import {useEffect,useState} from 'react';
import {AppBar, Avatar, Button, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import { useNavigate ,useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actionType from '../../constants/actionTypes';
import  memories from "../../img/memories.png";
import useStyles from "./styles.js";
import decode from 'jwt-decode';
const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const classes = useStyles();
    const navigate =useNavigate();
    const dispatch =useDispatch();
    const location=useLocation();
    const logout = () => {
      localStorage.clear();
        dispatch({ type: actionType.LOGOUT });
        setUser(null);
      
          navigate("/auth");
      
      };

    useEffect(() => {
        const token = user?.token;
        if (token) {
          const decodedToken = decode(token);
    
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
      }, [location]);
      console.log(user);
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
        <Typography className={classes.heading} component={Link} to="/posts" variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
           </div>
           <Toolbar className={classes.toolbar}>
            {user?
            <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}></Avatar>
                <Typography className={classes.userName}  variant="h6" >{user.result.name}</Typography>
                <Button variant='contained' className={classes.logout} onClick={logout} color="secondary">Logout</Button>
            </div>
            :<Button  component={Link} to="/auth" variant='contained' color="primary">Sign in</Button>}
           </Toolbar>
      </AppBar>
    );
}

export default Navbar;
