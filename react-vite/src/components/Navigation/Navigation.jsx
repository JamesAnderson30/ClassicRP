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
      <line x1="31" y1="15" x2="18" y2="2" stroke="#70AEDB" stroke-width="2.5"></line>
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
