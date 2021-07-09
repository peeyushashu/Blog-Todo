import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import axios from "axios";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Forms =()=>{
  const [title, settitle] = useState();
  const [Content, setContent] = useState();
    const HandleForm=(event)=>{
      settitle(event.target.elements.title.value)
      setContent(event.target.elements.Content.value)
    }

    useEffect(() => {
      axios.post(`http://127.0.0.1:8000/api/blog/create/`,{
        title:title,
        content:Content
      })
      .then(res=>console.log(res))
      .catch(err=>console.error(err));
    }, [HandleForm]); 
  
    return (
      <Form {...layout}name="control-ref" onSubmitCapture={HandleForm}>
        <Form.Item
          label="Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
        <Input
          name="title"
          placeholder="enter title"
          allowClear
        >
        </Input>
        </Form.Item>
        <Form.Item
          label="Content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            name="Content"
            placeholder="Write something about the title"
            allowClear
          >
          </Input>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit"  >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }

export default Forms;
