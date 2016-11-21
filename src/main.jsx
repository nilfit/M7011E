import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory} from 'react-router';
import Menu from './menu.jsx';
import About from './views/about.jsx';
import Feed from './views/feed.jsx';
import Profile from './views/profile.jsx';

class Main extends React.Component{
  render() {
    return (
      <div>
        <Menu />
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
      <IndexRoute component={Feed}/>
      <Route path="/about" component={About}/>
      <Route path="/profile" component={Profile}/>
    </Route>
  </Router>,
document.getElementById('root')
);
