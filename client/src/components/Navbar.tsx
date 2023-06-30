import React from 'react';
import style from '../style/navbar.module.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//
type NavbarProps = {
  toggleLogin: () => void;
  toggleSignIn: () => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isLoggedIn: boolean;
};

const Navbar: React.FC<NavbarProps> = ({
  toggleLogin,
  toggleSignIn,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/');
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav>
      <a href='/'>Secret drinks home page</a>
      <div className={style.buttons_container}>
        {isLoggedIn ? (
          <p>welcome</p>
        ) : (
          <Link to='/signup'>
            <button onClick={toggleSignIn}>sign up</button>
          </Link>
        )}
        {isLoggedIn ? (
          <button onClick={logOut}>log out</button>
        ) : (
          <Link to='/login'>
            <button onClick={toggleLogin}>log in</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
