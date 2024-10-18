import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import defaultAvatar from "../../../media/default-user.png"
import { thunkLogout, thunkLogin } from "../../redux/session";
import "./LoginSingup.css";
function LoginSignup(){
    const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    
    // Button Clicks
    const handleLogout = (e) =>{
        e.preventDefault();
        console.log("handle Logout")
        dispatch(thunkLogout());
    }

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
            <>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
              <label>
                Email
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {"email" in errors && errors.email[0]}
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
                {"password" in errors && errors.password[0]}
              </label>
              {errors.password && <p>{errors.password}</p>}
              <button type="submit">Log In</button>
            </form>
          </>
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