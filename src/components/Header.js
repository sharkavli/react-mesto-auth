import { LoggedContext } from '../contexts/LoggedContext';
import logo from '../images/logo.svg';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function Header(props) {
  const loggedContext = React.useContext(LoggedContext);
  const navigate = useNavigate();

  function signOut() {
    props.setEmail('');
    props.setLoggin(false);
    localStorage.removeItem('jwt');
    navigate('/sign-in', { replace: true });
  }

  return (
    <header className="header">
      <img src={logo} alt="Лого" className="header__logo" />
      {loggedContext ? (
        <div className="header__logged-text">
          <p className="header__email">{props.email}</p>
          <a onClick={signOut} className="header__link-exit">
            Выйти
          </a>
        </div>
      ) : (
        <Outlet />
      )}
    </header>
  );
}

export default Header;
