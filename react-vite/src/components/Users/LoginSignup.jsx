import { useSelector } from "react-redux";

function LoginSignup(){
    const sessionUser = useSelector((state) => state.session.user);
    //IF USER NOT LOGGED IN
    if(!sessionUser){
        return (
            <div id="LoginDiv">
                <button>Login</button> or <button>Signup!</button>
            </div>
        )
    }
    //IF USER IS
    return (
        <div id="UserInformation">
            {sessionUser.email}
        </div>
    )
}

export default LoginSignup;