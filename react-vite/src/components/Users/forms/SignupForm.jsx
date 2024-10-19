import { useDispatch } from "react-redux";
import { useState } from "react";
import { thunkSignup } from "../../../redux/session";

import "./SignupForm.css"
function SignupForm({signupHidden}){
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()



    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
          return setErrors({
            confirmPassword:
              "Confirm Password field must be the same as the Password field",
          });
        }
    
        const serverResponse = await dispatch(
          thunkSignup({
            email,
            username,
            password,
          })
        );
    
        if (serverResponse) {
          setErrors(serverResponse);
        } else {
            setErrors({})
        }
    }

    return(
            <div hidden={signupHidden} className="SignupForm">
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
                        Username
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>
                    {errors.username && <p>{errors.username}</p>}
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
                    <label>
                        Confirm Password
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                    {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                    <button type="submit">Sign Up</button>
                </form>
            </div>
    )
}

export default SignupForm