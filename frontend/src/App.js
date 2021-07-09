import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';
import Todo from './components/Todo';
import Blog from './components/Blog';
import { Nav, NavItem, NavLink } from 'reactstrap';


class App extends Component {
  state = {  }
  render() { 
    return (
      <Router >
        <Nav tabs>
          <NavItem>
            <NavLink href="/Todo" active>Todo</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/Blog" active>Blog</NavLink>
          </NavItem>         
        </Nav>
        <Switch>
          <Route path= "/Todo" exact>
                <Todo />
              </Route>
          <Route path="/Blog" exact>
            <Blog />
              </Route>
        </Switch> 
      </Router>
     );
  }
}
 
export default App;