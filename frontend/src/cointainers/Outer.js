import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import LoginForm from '../components/loginForm';
import Forms from '../components/form';
import {Link} from 'react-router-dom';
import * as actions from '../store/actions/auth';
import { connect } from 'react-redux'


const { Header, Content, Footer } = Layout;

  const Outer =(props)=>{
    const [CreateModalVisible, setCreateModalVisible] = useState(false);
    const [ListModalVisible, setListModalVisible] = useState(true);
    const [LoginModalVisible, setLoginModalVisible] = useState(false);

    const handleAdd=()=>{
        setCreateModalVisible(true);
        setListModalVisible(false);
        setLoginModalVisible(false);
        console.log(CreateModalVisible, ListModalVisible, LoginModalVisible)
    }
    const handleList=()=>{
        setCreateModalVisible(false);
        setListModalVisible(true);
        setLoginModalVisible(false);
        console.log(CreateModalVisible, ListModalVisible, LoginModalVisible)
    }
    const handleLogin=()=>{
        setCreateModalVisible(false);
        setListModalVisible(false);
        setLoginModalVisible(true);
        console.log(CreateModalVisible, ListModalVisible, LoginModalVisible)
    }

    return( 
        <Layout className="layout">
            <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" onClick={()=>handleList()}>Article List</Menu.Item>
                {
                    props.isAuthenticated?
                    <>
                        <Menu.Item key="2" onClick={()=>handleAdd()} >Add Article</Menu.Item>
                        <Menu.Item key="3" onClick={props.logout}>
                            Logout
                        </Menu.Item>
                    </>
                    :
                    
                    <Menu.Item key="3" onClick={()=>handleLogin()}>
                        Login
                    </Menu.Item>
                
                }
            </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Blog</Breadcrumb.Item>
                <Breadcrumb.Item>Articles</Breadcrumb.Item>
            </Breadcrumb>
            {(()=>{if(ListModalVisible===true){
                return(
                    <div className="site-layout-content">
                        {props.children}
                    </div>
                )
            }else if(CreateModalVisible===true){
                return(
                    <div className="site-layout-content">
                        <Forms/>
                    </div>
            )}
            else{
                return(
                    <div className="site-layout-content">
                        <LoginForm/>
                    </div>
                )
            }
            })()
            }
            
            </Content>
            <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
        )}

    const mapDispatchToProps = dispatch => {
        return {
            logout: () => dispatch(actions.logout()) 
        }
    }
  export default connect(null, mapDispatchToProps)(Outer);

  