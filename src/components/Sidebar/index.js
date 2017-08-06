import React from 'react';
import { NavLink } from 'react-router-dom';

import './index.css';

const Sidebar = () => {
  return (
    <div className="App-sidebar">
      <ul className="sidebar-menu">
        <li className="sidebar-menu__item">
          <NavLink exact={true} to="/" activeClassName="is-active">
            Popular
          </NavLink>
        </li>
        <li className="sidebar-menu__item">
          <NavLink exact={true} to="/top-rated" activeClassName="is-active">
            Top Rated
          </NavLink>
        </li>
        <li className="sidebar-menu__item">
          <NavLink exact={true} to="/coming-soon" activeClassName="is-active">
            Coming Soon
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
