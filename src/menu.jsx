import React from 'react';
import {Link, IndexLink} from 'react-router'

export default class Menu extends React.Component{
    render() {
        return (
            <div className="menu">
                <ul>
                    <li><h1>Birdsong</h1></li>
                    <li><Link to="/">Sign Out</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/">Feed</Link></li>
                </ul>
            </div>
        )
    }
}