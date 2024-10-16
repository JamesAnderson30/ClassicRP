import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="Navigation">
      
      <ul className="NavigationList">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <ProfileButton />
        </li>

        <li>
          <NavLink to="/categories">Browse Categories</NavLink>
        </li>
      </ul>
      <div className="Logo">ClassicRP</div>
      <div className="NavButtons">
        <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <line x1="621" y1="332" x2="362" y2="48" stroke="#70AEDB" stroke-width="25"/>
        </svg>
        <ul className="NavList">
          <li className="NavButton">
            Test1
          </li>
          <li>
            test2
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
