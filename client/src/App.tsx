import React from 'react';
import Navbar from './components/Navbar';
import SignUp from './components/SingUp';
import Login from './components/Login';
import Home from './components/Home';
import SecretPage from './components/SecretPage';
import { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  //

  const [login, setLogin] = useState(true);

  //
  const toggleLogin = () => {
    setLogin(login);
    if (signUp === true) {
      setSignUp(true);
    }
  };
  const toggleSignIn = () => {
    setSignUp(login);
    if (login === true) {
      setLogin(true);
    }
  };
  const [signUp, setSignUp] = useState(false);
  //
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = localStorage.getItem('token');
    if (!userToken || userToken === 'undefined') {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  // console.log(isLoggedIn);
  return (
    <Router>
      <Navbar
        toggleLogin={toggleLogin}
        toggleSignIn={toggleSignIn}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Routes>
        <Route path='/signup' element={<SignUp signUp={signUp} />} />
        {isLoggedIn ? (
          <Route path='/secretPage' element={<SecretPage />} />
        ) : (
          <Route
            path='/login'
            element={
              <Login
                login={login}
                setLogin={setLogin}
                //
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
        )}
        <Route path='/' element={<Home isLoggedIn={isLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
