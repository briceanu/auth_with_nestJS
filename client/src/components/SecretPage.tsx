import { useEffect, useState } from 'react';
import style from '../style/secretPage.module.scss';
interface UserData {
  id: number;
  name: string;
  // Add other properties if available
}

const SecretPage = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check if user is logged in
    const checkLoginStatus = () => {
      // Implement your authentication logic here
      // For example, check if the user has a valid token in local storage
      const token = localStorage.getItem('token');
      const userLoggedIn = !!token; // Set to true if token exists
      setIsLoggedIn(userLoggedIn);
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      // User is logged in, fetch the data
      const token = localStorage.getItem('token');
      fetch('http://localhost:3001/secretPage', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          const data = responseData.data;
          setData(data);
        })
        .catch((error) => {
          console.error(error);
          // TODO: Handle the error in your React component
        });
    } else {
      // User is not logged in, clear the data
      setData([]);
    }
  }, [isLoggedIn]);

  return (
    <div className={style.secret_page}>
      {/* Render the data in your component if the user is logged in */}
      {isLoggedIn && data && data.length > 0 ? (
        <>
          {data.map((item) => (
            <div key={item.id}>
              {item.id} {item.name}
            </div>
          ))}
          <p>this is the super secret page</p>
        </>
      ) : (
        <p>Please log in to view this page</p>
      )}
    </div>
  );
};

export default SecretPage;
