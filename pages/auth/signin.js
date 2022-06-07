import { Formik, Form, Field } from 'formik'

export default function SignIn() {

  

  return (
    <Formik
       initialValues={{ email: '', password: '' }}
       onSubmit={(values, actions) => {
        await signin({...values})
          actions.setSubmitting(false)
       }}
     >
      <Form>
        <label htmlFor="email">Email</label>
        <Field type="text" name="email" placeholder="Email" />
        <label htmlFor="password">Password</label>
        <Field type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </Form>
    </Formik>
  )
}