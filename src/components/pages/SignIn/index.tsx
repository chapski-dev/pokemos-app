import { Form, Input, Button} from 'antd';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { SIGNIN_ENDPOINT } from './../../../constants/endpoints';
import { openNotification } from './../../../utils/index';

import "./style.scss"

const SignIn = () => {
  const history = useHistory();
  const onFinish = (values: any) => {
    console.log('Success:', values);
    axios.post(SIGNIN_ENDPOINT, {
      email: values.email,
      password: values.password,
    })
      .then(respons => {
        if (respons.status === 201) {
          localStorage.setItem('user', JSON.stringify(respons.data));
          localStorage.setItem('token', respons.data.accessToken);
          history.push('/dashboard');
        }
        console.log("response:", respons)})
      .catch(err => openNotification(err.response.data.error, err.response.data.message));
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="sign-in-page">
      <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <Link to='/signUp'> Go to SignUp</Link>

    </Form>
    </div>
  )
}

export default SignIn;