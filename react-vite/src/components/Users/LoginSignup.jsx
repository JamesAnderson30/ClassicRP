import { useSelector } from "react-redux";
import { useState } from "react";
import defaultAvatar from "../../../media/default-user.png"
import "./LoginSingup.css";
function LoginSignup(){
    const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const user = useSelector((state) => state.session.user);
    
    // Button Clicks
    const handleLogout = (e) =>{
        e.preventDefault();
        dispatch(thunkLogout());
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
    }

    //IF USER NOT LOGGED IN
    if(!user){
        return (
            <>
            <h1>Log In</h1>
            {errors.length > 0 &&
              errors.map((message) => <p key={message}>{message}</p>)}
            <form onSubmit={handleSubmit}>
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