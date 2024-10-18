import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import defaultAvatar from "../../../media/default-user.png"
import { thunkLogout, thunkLogin } from "../../redux/session";
import "./LoginSingup.css";
function LoginSignup(){
    const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
    const [loginHidden, setLoginHidden] = useState(true)
    const [errors, setErrors] = useState({});
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    
    // Button Clicks
    const handleLogout = (e) =>{
        e.preventDefault();
        console.log("handle Logout")
        dispatch(thunkLogout());
    }

    const showLoginForm = () => setLoginHidden(false)
    const hideLoginForm = () => setLoginHidden(true)

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const serverResponse = await dispatch(
          thunkLogin({
            email,
            password,
          })
        );

        if(!serverResponse.ok){
            setErrors(serverResponse)
        } else {
            setErrors({})
        }
    }

    //IF USER NOT LOGGED IN
    if(!user){
        return (
            <div id="Login">
            <button onClick={showLoginForm} id="LoginButton">Log In</button> or <button id="SignupButton">Sign Up!</button>

            
            <form id="LoginForm" hidden={loginHidden} onSubmit={handleSubmit}>
                <label>
                    Email
                    <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </label>
                {errors.email && <p>{errors.email}</p>}
                <label>
                    Password
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </label>
                {errors.password && <p>{errors.password}</p>}
                <button type="submit">Log In</button>
                </form>
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