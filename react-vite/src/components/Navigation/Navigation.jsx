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
        <ul>
          <li>
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
