import React from 'react';
import ReactDOM from 'react-dom';
import {About} from './about.jsx';

function App() {
    return (
        <div>
            <About />
        </div>
    );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
