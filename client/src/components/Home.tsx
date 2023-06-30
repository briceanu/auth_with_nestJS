import React from 'react';
import style from '../style/home.module.scss';
import { Link } from 'react-router-dom';

type NavbarProps = {
  isLoggedIn: boolean;
};
const Home: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  return (
    <div className={style.app}>
      <p>welcome to our home page</p>
      {isLoggedIn ? (
        <Link to='/secretPage'>Secret Page</Link>
      ) : (
        <Link to='/login'>Secret Page</Link>
      )}
    </div>
  );
};

export default Home;
