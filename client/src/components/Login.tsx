import React, { useState } from 'react';
import style from '../style/signIn.module.scss';
import basicSchema from '../schemas/loginSchema';
import { FormikHelpers, FormikValues, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

type LogInProps = {
  login: boolean;
  setLogin: (value: boolean) => void;
  //
  setIsLoggedIn: (value: boolean) => void;
};
const Login: React.FC<LogInProps> = ({ login, setLogin, setIsLoggedIn }) => {
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const onSubmit = async (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>
  ) => {
    const { resetForm, setSubmitting } = formikHelpers;
    setSubmitting(true);
    const { email, password } = values;
    try {
      const response = await fetch(`http://localhost:3001/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Store the JWT token in local storage
        setIsLoggedIn(true);
        navigate('/');
      } else {
        throw new Error('Failed login');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to log in. Please check your credentials.'); // Set the error message
    }
    resetForm();
    setLogin(!login);
  };
  const { touched, handleBlur, errors, handleChange, values, handleSubmit } =
    useFormik<FormikValues>({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: basicSchema,
      onSubmit,
    });

  return (
    <>
      <div className={style.signIn_container}>
        <h3>Login</h3>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <input
            type='text'
            name='email'
            placeholder='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${errors.email && touched.email && style.input_error}`}
          />
          {errors.email && touched.email && (
            <p className={style.error}>{String(errors.email)}</p>
          )}
          <input
            type='password'
            name='password'
            placeholder='password'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${
              errors.password && touched.password && style.input_error
            }`}
          />
          {errors.password && touched.password && (
            <p className={style.error}>{String(errors.password)}</p>
          )}
          {error && <p className={style.error}>{error}</p>}{' '}
          {/* Display the error message if it exists */}
          <button type='submit'>Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
