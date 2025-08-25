import { NavLink, type NavLinkRenderProps } from "react-router-dom";
import type { NavItem } from "../../models/components/navbar/NavItem.model";

function linkClass(props: NavLinkRenderProps): string {
  return "nav-link" + (props.isActive ? " active" : "");
}

type MenuItemProps = { item: NavItem };

export default function MenuItem({ item }: MenuItemProps) {
  const hasChildren = !!(item.submenu && item.submenu.length > 0);

  if (hasChildren) {
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onClick={(e) => e.preventDefault()}
        >
          {item.menuname}
        </a>
        <ul className="dropdown-menu">
          {item.submenu!.map((sub) => (
            <li key={sub.route ?? sub.menuname}>
              <NavLink
                to={sub.route ?? "#"}
                className={({ isActive }) =>
                  "dropdown-item" + (isActive ? " active" : "")
                }
                onClick={(e) => {
                  if (!sub.route) e.preventDefault();
                }}
              >
                {sub.menuname}
              </NavLink>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  if (item.route) {
    return (
      <li className="nav-item">
        <NavLink to={item.route} className={linkClass}>
          {item.menuname}
        </NavLink>
      </li>
    );
  }

  return (
    <li className="nav-item">
      <span className="nav-link disabled" aria-disabled="true">
        {item.menuname}
      </span>
    </li>
  );
}
