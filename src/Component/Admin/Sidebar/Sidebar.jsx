import "./Sidebar.css";
import { NavLink as Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import {ImStatsDots } from "react-icons/im"

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Người dùng</h3>
          <ul className="sidebarList">
            <Link to="/admin/" className="link">
              {({ isActive }) => (
                <li
                  className={`sidebarListItem ${
                    isActive === true ? "active" : ""
                  }`}
                >
                  <AiOutlineUser className="sidebarIcon" />
                  Người dùng
                </li>
              )}
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
        <h3 className="sidebarTitle">Thống kê</h3>
          <ul className="sidebarList">
            <Link to="/admin/stats" className="link">
                {({ isActive }) => (
                  <li
                    className={`sidebarListItem ${
                      isActive === true ? "active" : ""
                    }`}
                  >
                    <ImStatsDots className="sidebarIcon" />
                    Thống kê
                  </li>
                )}
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}