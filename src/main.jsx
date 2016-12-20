import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory} from 'react-router';
import Menu from './menu.jsx';
import About from './views/about.jsx';
import Feed from './views/feed.jsx';
import Home from './views/home.jsx';
import Profile from './views/profile.jsx';

class Main extends React.Component{
  constructor(props) {
    super(props);
    this.setLogin = this.setLogin.bind(this);
    this.unsetLogin = this.unsetLogin.bind(this);
    this.state = {loginId: null};
  }
  
  setLogin(id) {
    id = id.replace(/^"(.*)"$/, '$1');
    this.setState({loginId: id});
    window.id = id;
  }
  unsetLogin() {
    this.setState({loginId: null});
    delete window.id;
  }
  
  render() {
    return (
      <div>
        <Menu setLogin={this.setLogin} unsetLogin={this.unsetLogin} loginId={this.state.loginId}/>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Home}/>
      <Route path="/feed" component={Feed}/>
      <Route path="/feed/:tag" component={Feed}/>
      <Route path="/about" component={About}/>
      <Route path="/profile/:userId" component={Profile}/>
    </Route>
  </Router>,
document.getElementById('root')
);
