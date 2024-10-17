import { useSelector } from "react-redux";
import defaultAvatar from "../../../media/default-user.png"

function LoginSignup(){
    const user = useSelector((state) => state.session.user);
  
    //IF USER NOT LOGGED IN
    if(!user){
        return (
            <div id="LoginDiv">
                <button>Login</button> or <button>Signup!</button>
            </div>
        )
    }
    
    //IF USER IS
    //check for default profile image
    

    return (
        <div id="UserInformation">
            <img 
                src={user.profilePicture}
                onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src=defaultAvatar;
             }} />
            <p>Welcome {user.username}!</p>
            
        </div>
    )
}

export default LoginSignup;