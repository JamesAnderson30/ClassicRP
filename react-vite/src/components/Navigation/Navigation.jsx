import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import LoginFormPage from "../LoginFormPage";
import "./Navigation.css";
import LoginSignup from "../Users/LoginSignup";

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
      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"><line x1="800" y1="800" x2="0" y2="0" stroke="#000000" stroke-width="3"></line></svg>
        <ul className="NavList">
          <li className="NavButton">
            Home
          </li>
          <li className="NavButton"> 
            Browse Categories
          </li>
          <li className="NavButton">
            Browse Topics
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
