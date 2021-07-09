import React, { Component } from 'react';
import Article from './Article';
import axios from 'axios';

class ArticleList extends Component {
    state = { 
        article :[]
     }

     componentDidMount() {
         axios.get('http://127.0.0.1:8000/api/blog')
            .then(res=>{
                this.setState({
                    article: res.data
                });
                console.log(res.data);
            })
     }
    render() { 
        return ( 
            <Article data={this.state.article}/>
         );
    }
}
 
export default ArticleList;