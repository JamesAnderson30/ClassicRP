// import { NavLink } from "react-router-dom";
// import ProfileButton from "./ProfileButton";
// import LoginFormPage from "../LoginFormPage";
import "./Navigation.css";
import LoginSignup from "../Users/LoginSignup";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div className="Navigation">
      <LoginSignup />

      {/* <ul className="NavigationUser">
        
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <ProfileButton />
        </li>
      </ul> */}
      <div className="Logo">ClassicRP</div>
      <div className="NavButtons">
      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"><line x1="800" y1="800" x2="0" y2="0" stroke="#000000" strokeWidth="3"></line></svg>
        <ul className="NavList">
          <li className="NavButton">
            <NavLink to={'/'}>Home</NavLink>
          </li>
          <li className="NavButton"> 
            <NavLink to={`/categories`}>Browse Categories </NavLink>
          </li>
          <li className="NavButton">
            <NavLink to={'/documents/manage'}>Manage Documents</NavLink>
          </li>
          <li className="NavButton">
            Chat
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
