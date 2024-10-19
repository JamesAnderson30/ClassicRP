import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import defaultAvatar from "../../../media/default-user.png"
import { thunkLogout } from "../../redux/session";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";
import "./LoginSingup.css";
function LoginSignup(){

    const [loginHidden, setLoginHidden] = useState(true)
    const [signupHidden, setSignupHidden] = useState(true)

    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    
    //body click

    useEffect(() => {
        document.body.addEventListener('click', handleBodyClick)
      
        return () => {
          document.body.removeEventListener('click', handleBodyClick)
        }
      })

    // If you click anywhere outside of the login modal, close the loginModal
    const handleBodyClick = (e) =>{
        if(!e.target.matches('.LoginForm, .LoginForm *, .SignupForm, .SignupForm *, button')){
            setLoginHidden(true)
            setSignupHidden(true)
        }
    }

    // Button Clicks
    const handleLogout = (e) =>{
        e.preventDefault();
        console.log("handle Logout")
        dispatch(thunkLogout());
        hideLoginForm(e);
        hideSignupForm(e);
    }

    const showLoginForm = (e) => {
        e.preventDefault()
        setSignupHidden(true)
        setLoginHidden(false)
    }
    const hideLoginForm = (e) => {
        e.preventDefault(); 
        setLoginHidden(true)
    }

    const showSignupForm = (e) =>{
        e.preventDefault()
        setLoginHidden(true)
        setSignupHidden(false)
    }

    const hideSignupForm = (e) => {
        e.preventDefault(); 
        setSignupHidden(true)
    }


    //IF USER NOT LOGGED IN
    if(!user){
        return (
            //LOGIN FORM
        
        <div id="Login">
            <div className="LoginButtons">
                <button onClick={(e)=>showLoginForm(e)} id="LoginButton">Log In</button> or <button onClick={(e)=>showSignupForm(e)} id="SignupButton">Sign Up!</button>
            </div>
            <LoginForm loginHidden={loginHidden}/>
            <SignupForm signupHidden={signupHidden} />
          </div>
        
        )
    }
    
    //IF USER IS
    //check for default profile image
    

    return (
        <div id="UserArea">
            <div id="UserInformation">
                <p>Welcome {user.username}!</p>
                <p><button onClick={handleLogout}>Logout</button></p>
            </div>
            <img 
                src={user.profilePicture}
                onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src=defaultAvatar;
             }} />
        </div>
    )
}

export default LoginSignup;