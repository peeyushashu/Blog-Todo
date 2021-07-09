import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd';
import { connect } from 'react-redux'
import * as actions from '../store/actions/auth';
import LoginForm from './loginForm';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Signup = (props) => {
  const [form] = Form.useForm();
  const [login, setlogin] = useState(false);
  let username=null, email=null, password1=null, password2=null;
    const HandleForm=(event)=>{
      username=event.target.elements.username.value
      email=event.target.elements.email.value
      password1=event.target.elements.password1.value
      password2=event.target.elements.password2.value
      props.onAuth(username, email, password1, password2);
    }
    const HandleSignup =()=>{
      
    }

  const HandleLogin=()=>{
    setlogin(true);
  }

  if (login===false) {
    return (
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          scrollToFirstError
          onSubmitCapture={HandleForm}
        >
            <Form.Item
            name="username"
            label="UserName"
            rules={[
              {
                required: true,
                message: 'Please input your UserName',
              },
            ]}
          >
            <Input name="username"/>
          </Form.Item>
          <Form.Item
          name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input name="email"/>
          </Form.Item>
    
          <Form.Item
          name="password1"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password name="password1"/>
          </Form.Item>
          <Form.Item
            name="password2"
            label="Confirm Password"
            dependencies={['password1']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password1') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password name="password2"/>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" >
              Register
            </Button>&nbsp;
            <Button type="primary" onClick={HandleLogin}>
              Login
            </Button>
          </Form.Item>
        </Form>
      );
  } else {
      return(
        <div>
            <LoginForm/>
        </div>
      )
  }
};

const mapStateToProps=(state)=>{
    return{
      loading:state.loading,
      error:state.error
    }
  }
  
  const mapDispatchToProps= dispatch =>{
    return{
      onAuth:(username, email, password1, password2)=> dispatch(actions.authSignup(username, email, password1, password2))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
