import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const SignupForm = ({ setAuth }) => {
  const history=useHistory()
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match').required('Required'),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', values);
      localStorage.setItem('token', res.data.token);
      setAuth(true);
      history.push('/login');
    } catch (err) {
      setErrors({ server: err.response.data.msg });
    }
    setSubmitting(false);
  };

  return (
    <div className="form-box">
      <h2>Signup</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="input-group">
              <label>First Name</label>
              <Field type="text" name="firstName" />
              <ErrorMessage name="firstName" component="div" className="error" />
            </div>
            <div className="input-group">
              <label>Last Name</label>
              <Field type="text" name="lastName" />
              <ErrorMessage name="lastName" component="div" className="error" />
            </div>
            <div className="input-group">
              <label>Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="input-group">
              <label>Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div className="input-group">
              <label>Confirm Password</label>
              <Field type="password" name="confirmPassword" />
              <ErrorMessage name="confirmPassword" component="div" className="error" />
            </div>
            {errors.server && <div className="error">{errors.server}</div>}
            <button type="submit" disabled={isSubmitting}>Signup</button>
          </Form>
        )}
      </Formik>
      <p>
        Have an account? <span onClick={() => history.push('/login')} className="link">Login</span>
      </p>
      <button className="google-button">Signup with Google</button>
    </div>
  );
};

export default SignupForm;
