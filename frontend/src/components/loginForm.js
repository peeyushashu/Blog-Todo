import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux'
import * as actions from '../store/actions/auth';
import Label from 'reactstrap/lib/Label';
import Signup from './Signup';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginForm =(props)=>{ 
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [signup, setsignup] = useState(false);
    const HandleForm=(event)=>{
      setUser(event.target.elements.user.value)
      setPassword(event.target.elements.password.value)
      props.onAuth(user,password);
    }
    
    const HandleSignup =()=>{
      setsignup(true);
    }
  let errorMessage=null;
  if(props.error){
    errorMessage=(
      <p>{props.error.message}</p>
    );
  }
  if (signup===false) {
    return (
      <div>
        {errorMessage}
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onSubmitCapture={HandleForm}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input name="user"/>
          </Form.Item>
  
          <Form.Item
            label="Password"
            name="pass"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password name="password"/>
          </Form.Item>
  
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit 
            </Button> or &nbsp;
            <Label onClick={HandleSignup}>
              <a style={{ color: 'blue' }}> Signup</a>
            </Label>
          </Form.Item>
        </Form>
      </div>  );
  }else{
    return(
      <div>
        <Signup/>
      </div>
    )
  }
    
  }

const mapStateToProps=(state)=>{
  return{
    loading:state.loading,
    error:state.error
  }
}

const mapDispatchToProps= dispatch =>{
  return{
    onAuth:(username, password)=> dispatch(actions.authLogin(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
