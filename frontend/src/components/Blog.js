import React, { Component } from 'react';
import { connect } from 'react-redux'
import Outer from '../cointainers/Outer'
import './Blog.css'
import ArticleList from '../cointainers/ArticleList'
import * as actions from "../store/actions/auth";

class Blog extends Component{
    componentDidMount(){
        console.log("testing")
        this.props.onTryAutoSignup();
    }
    render(){
        return(
            <div className="Blog">
                <Outer {...this.props}>
                    <ArticleList />
                </Outer>
            </div>
        )
    }
}

const mapStateToProps= state=>{
    return{
        isAuthenticated: state.token !==null
    }
}

const mapDispatchToProps= dispatch =>{
    return{
        onTryAutoSignup: ()=> dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);