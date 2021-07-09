import React, { Component, useState, useEffect } from 'react';
import { List, Avatar, Space,Modal, Button } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Form, Input, Select } from 'antd';
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

    
    const IconText = ({ icon, text }) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );
    

const Article=(props)=>{
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState(0);
    const [modalText, setModalText] = useState([]);


    const showModel=(id)=>{
        setVisible(true);
        setId(id);
    }
     
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/blog/${id}`)
            .then(res=>{
                setModalText(res.data)
            })
      }, [visible]); 

  return(
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={props.data}
        footer={
          <div>
            
          </div>
        }
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a onClick={()=>showModel(item.id)}>{item.title}</a>}
              description={item.description}
            />
            <Modal
                title={modalText.title}
                visible={visible}
                onRequestClose={()=>setVisible(false)}
                onCancel={()=>setVisible(false)}
                onOk={()=>setVisible(false)}
            >
              <p>{modalText.content}</p>
              <Form {...layout}name="control-ref" >
                <h6>Update Form:</h6>
                <Form.Item label="Title">
                <Input name="title" allowClear placeholder={modalText.title}>
                </Input>
                </Form.Item>
                <Form.Item label="Content">
                  <Input name="Content" allowClear placeholder={modalText.content}>
                  </Input>
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit"  >
                    Update
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
            {item.content}
          </List.Item>
        )}
      />
  )
}
export default Article;

