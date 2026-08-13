import {
  LayoutDashboard,
  Users,
  UserPlus,
  BarChart3,
  Settings
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard
    },
    {
      name: "Students",
      path: "/students",
      icon: Users
    },
    {
      name: "Add Student",
      path: "/students/add",
      icon: UserPlus
    },
    {
      name: "Reports",
      path: "/reports",
      icon: BarChart3
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings
    }
  ];

  return (
    <aside className="sidebar">

      {/* Logo */}

      <div className="sidebar-logo">

        <div className="logo-icon">
          <Users size={22} />
        </div>

        <div>
          <h2>StudentHub</h2>
          <span>Management System</span>
        </div>

      </div>

      {/* Navigation */}

      <nav className="sidebar-nav">

        <p className="nav-title">
          MAIN MENU
        </p>

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${
                  isActive ? "active" : ""
                }`
              }
            >

              <Icon size={20} />

              <span>
                {item.name}
              </span>

            </NavLink>
          );
        })}

      </nav>

      {/* Bottom */}

      <div className="sidebar-bottom">

        <div className="user-mini">

          <div className="user-avatar">
            A
          </div>

          <div>
            <strong>Akshu</strong>
            <span>Administrator</span>
          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;