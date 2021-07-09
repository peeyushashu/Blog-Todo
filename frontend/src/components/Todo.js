import React, { Component } from 'react';
import './Todo.css';
import Modal from './Modal';
import axios from "axios";


class Todo extends Component{
  constructor(props){
    super(props);
    this.state= {
      //modal: false,
      viewCompleted: false,
      activeItem:{
        title:"",
        description:"",
        completed: false
      },
      todoList: []
    };
  }
  componentDidMount(){
    this.refreshList();
  }

  refreshList=()=>{
    axios
    .get("http://127.0.0.1:8000/api/todo/")
    .then(res=>{this.setState({todoList: res.data});
      console.log(res);
  })
    // .catch(err =>console.log(err));
  };

  
  displayCompleted = status=>{
    if(status){
      return this.setState({viewCompleted:true})
    }
    return this.setState({viewCompleted: false})
  };

  renderTabList =() =>{
    return(
      <div className ="my-5 tab-list">
        <button
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "btn btn-active-red": ""}
        >
          complete
        </button>
        <button
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ?"":"btn btn-active-red"}
        >
          Incomplete
        </button>
      </div>
    );
  };
  renderItems=()=>{
    const{viewCompleted}=this.state;
    const newItems = this.state.todoList.filter(
      item=>item.completed === viewCompleted
    );
    return newItems.map(item=>(
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo":""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
           onClick={()=>this.editItem(item)} 
           className="btn btn-secondary mr-2">
             Edit{" "}
          </button>
          <button 
            onClick={()=>this.handleDelete(item)}
            className="btn btn-danger">
              Delete{" "}
          </button>
        </span>
      </li>
    ));
  };
  toggle=() =>{
    this.setState({modal:!this.state.modal});
  };
  
  handleSubmit =item =>{
    this.toggle();
    if(item.id){
      axios
        .put('http://127.0.0.1:8000/api/todo/${item.id}/', item)
        .then(res=> this.refreshList());
      return;
    }
    axios
      .post("http://127.0.0.1:8000/api/todo/",item)
      .then(res => this.refreshList());
    //alert("save"+ JSON.stringify(item));
  };

  handleDelete = item => {
    axios
          .delete(`http://127.0.0.1:8000/api/todo/${item.id}`)
          .then(res => this.refreshList());
  };

  createItem=()=>{
    const item= {title:"", description:"", completed: false};
    this.setState({ activeItem: item, modal: !this.state.modal});
  };

  editItem= item=>{
    this.setState({activeItem: item, modal: !this.state.modal});
  }

  render(){
    return(
      <main className="content">      
        <h1 className="text-Black text-uppercase text-center my-4">Todo App</h1>
        <div className="row">
         <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button
                  onClick={this.createItem} 
                  className="btn btn-primary">
                    Add task
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal?(
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ):null}       
      </main>
    );
  }
}

export default Todo;
