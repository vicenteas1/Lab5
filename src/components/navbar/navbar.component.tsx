import { NavLink } from "react-router-dom";
import { navMenu } from "./navbar.constants";
import weatherPng from "../../assets/weather.png";
import MenuItem from "../menuItem/menu-item.component";
import "./navbar.component.scss";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img src={weatherPng} alt="Weather animation" className="weather-icon" />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {navMenu.map((item) => (
              <MenuItem key={item.menuname} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
