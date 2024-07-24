import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './LoginForm.css';

const LoginForm = ({ setAuth }) => {
  const history = useHistory();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', values);
      localStorage.setItem('token', res.data.token);
      setAuth(true);
      history.push('/dashboard');
    } catch (err) {
      setErrors({ server: err.response.data.msg });
    }
    setSubmitting(false);
  };

  return (
    <div className="form-box">
      <h2>Login</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form>
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
            {errors.server && <div className="error">{errors.server}</div>}
            <button type="submit" disabled={isSubmitting}>Login</button>
          </Form>
        )}
      </Formik>
      <p>
        Don't have an account yet? <span onClick={() => history.push('/signup')} className="link">Signup</span>
      </p>
      <button className="google-button">Login with Google</button>
    </div>
  );
};

export default LoginForm;
