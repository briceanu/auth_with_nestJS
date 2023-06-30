import React from 'react';
import style from '../style/login.module.scss';
import basicSchema from '../schemas/signUpSchema';
import { FormikHelpers, FormikValues, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

// const API_BASE2 = process.env.REACT_APP_API_BASE;
// console.log(API_BASE2);
type LogInProps = {
  signUp: boolean;
};
const Signup: React.FC<LogInProps> = ({ signUp }) => {
  const navigate = useNavigate();
  const onSubmit = async (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>
  ) => {
    const { resetForm, setSubmitting } = formikHelpers;
    setSubmitting(true);
    const { name, email, password } = values;
    try {
      const response = await fetch(`http://localhost:3001/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error(error);
    }
    resetForm();
    navigate('/');
  };
  const { touched, handleBlur, errors, handleChange, values, handleSubmit } =
    useFormik<FormikValues>({
      initialValues: {
        name: '',
        email: '',
        password: '',
      },
      validationSchema: basicSchema,
      onSubmit,
    });

  return (
    <>
      <div className={style.login_container}>
        <h3>Sign up</h3>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <input
            type='text'
            name='name'
            placeholder='name'
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${errors.name && touched.name && style.input_error}`}
          />
          {errors.name && touched.name && (
            <p className={style.error}>{String(errors.name)}</p>
          )}
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
          <button type='submit'>Sign up</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
