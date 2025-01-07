import { useDispatch } from "react-redux";
import { thunkLogin } from "../../../redux/session";
import { useState } from "react";

import "./LoginForm.css"
function LoginForm({loginHidden}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const opacityClass = loginHidden ? "noOpacity" : "opacity";


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const serverResponse = await dispatch(
          thunkLogin({
            email,
            password,
          })
        );

        if(!serverResponse.ok){
            setErrors({"error":true})
        } else {
            setErrors({})
        }

    }
    return(
            <div hidden={loginHidden} className={`LoginForm ${opacityClass}`}>
                <h3>Welcome Back! c:</h3>
                <form id="LoginForm"  onSubmit={handleSubmit}>
                    <label>
                        Email
                        <input
                        type="text"
                        className="LoginEmailInput"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </label>
                    
                    <hr />
                    <label>
                        Password
                        <input
                        type="password"
                        className="LoginPasswordInput"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </label>
                    {errors.error && <p className="noMargin">Login not found!</p>}
                    <button type="submit">Log In</button>
                </form>
            </div>
    )
}

export default LoginForm