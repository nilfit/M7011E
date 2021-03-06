import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
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
  
  //sets the user to be logged in
  setLogin(id) {
    id = id.replace(/^"(.*)"$/, '$1');
    this.setState({loginId: id});
    localStorage.id = id;
  }
  
  //sets the user to be not logged in
  unsetLogin() {
    this.setState({loginId: null});
    delete localStorage.id;
    
    browserHistory.push('/');
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

//If not logged in, redirect to home page ("/")
function requireAuth(nextState, replace) {
  if (!localStorage.id) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

//Render components depending on the browser address bar URL. The main component is always rendered
//and only one of the nested components is rendered.
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Home}/>
      <Route path="/feed" component={Feed} onEnter={requireAuth}/>
      <Route path="/feed/:tag" component={Feed} onEnter={requireAuth}/>
      <Route path="/about" component={About}/>
      <Route path="/profile/:userId" component={Profile} onEnter={requireAuth}/>
    </Route>
  </Router>,
document.getElementById('root')
);
