import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const TaskForm = ({ fetchTasks }) => {
  const initialValues = {
    title: '',
    description: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem('token');
    const config = { headers: { 'x-auth-token': token } };
    await axios.post('http://localhost:5000/api/tasks', values, config);
    fetchTasks();
    resetForm();
    setSubmitting(false);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <div className="input-group">
            <label>Title</label>
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>
          <div className="input-group">
            <label>Description</label>
            <Field type="text" name="description" />
            <ErrorMessage name="description" component="div" className="error" />
          </div>
          <button type="submit" disabled={isSubmitting}>Add Task</button>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
