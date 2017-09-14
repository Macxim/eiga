import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

const UserMenu = (props) => {

  const userMenuClasses = `user-menu ${props.isOpen && 'is-open'}`;

  return (
    <div className={userMenuClasses}>
      <span className="user-menu__greetings">{props.username}</span>
      <ul className="user-menu-list">
        <li><Link className="user-menu-list__item" to="/favorites">Favorites</Link></li>
        <li><Link className="user-menu-list__item" to="/watch-later">Watch Later</Link></li>
        <li><Link className="user-menu-list__item user-menu-list__item--logout" to="/logout">Logout</Link></li>
      </ul>
    </div>
  );

}

export default UserMenu;
