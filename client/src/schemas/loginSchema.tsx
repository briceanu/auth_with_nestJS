import * as yup from 'yup';
const regex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/i;
const basicSchema = yup.object().shape({
  email: yup
    .string()
    .matches(regex, { message: 'Please enter a valid email' })
    .required('Email required'),
  password: yup.string().required('Password is required'),
});
export default basicSchema;
