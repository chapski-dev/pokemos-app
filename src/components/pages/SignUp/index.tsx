import { Form, Input, Button, Select } from 'antd';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { SIGNUP_ENDPOINT } from './../../../constants/endpoints';
import { openNotification } from './../../../utils/index';

const { Option } = Select;

const SignUp = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const onFinish = (values: any) => {
    console.log('Success:', values);
    axios.post(SIGNUP_ENDPOINT, values)
      .then(respons => {
        if(respons.status === 201) history.push('/signIn');
        console.log("response:", respons)})
      .catch(err => openNotification(err.response.data.error, err.response.data.message));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const onGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        return;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        return;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
    }
  };

  return (
    <div className="sign-up-page">
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please input your First Name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please input your Last Name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
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
        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select
            placeholder="Select a option and change input text above"
            onChange={onGenderChange}
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: 'Please input your phone!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
        <Link to="/signIn">Go to Sign in</Link>
      </Form>
    </div>
  )
}

export default SignUp;