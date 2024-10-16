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
      <span className="Logo">ClassicRP</span>
    </div>
  );
}

export default Navigation;
