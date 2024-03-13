import Logo from '../../assets/logo.jpeg';
import { NavLink } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../../store/reducers/user';


import './style.css';

const Header = () => {
  return (
    <header className="header">
      <NavLink to="/">
        <img src={Logo} alt="Logo" />
      </NavLink>
      <nav className="header__nav">
        <ul>
          <NavLink to="/">
            <li>Current employee</li>
          </NavLink>
          <NavLink to="/create-employee">
            <li>Create employee</li>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default Header;