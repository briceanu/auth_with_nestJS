import * as yup from 'yup';
const regex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/i;
const password = /^(?=.*\d).{5,}$/i;
const basicSchema = yup.object().shape({
  name: yup
    .string()
    .required('First name required')
    .min(5, 'First name must be at least 5 charaters'),
  email: yup
    .string()
    .matches(regex, { message: 'Please enter a valid email' })
    .required('Email required'),
  password: yup.string().required('Password is required').matches(password, {
    message: 'Password must be 5 characters long and must include numbers',
  }),
});
export default basicSchema;
