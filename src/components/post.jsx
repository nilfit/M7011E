import React from 'react';
import {Link} from 'react-router';

export default class Post extends React.Component {
    render() {        
        var audio = this.props.audio;//change later
        var img = this.props.img;
        var user = this.props.user;
        
        var currentDate = new Date();
        var date = "Date: " + currentDate.getFullYear() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getDate();
        return (
            <div className="post">
                <ul className="post_user">
                    <li><img src={img} height="60" width="60" alt="profile picture" className="post_img"/></li>
                    <li><Link to="/profile">birdboy94</Link></li>
                </ul>
                <ul className="post_user">
                    <li>
                        <audio controls>
                            <source src={audio+".ogg"} type="audio/ogg"/>
                            <source src={audio+".mp3"} type="audio/mpeg"/>
                            <source src={audio+".wav"} type="audio/wav"/>
                            Your browser does not support the audio element.
                        </audio>
                    </li>
                    <li>{date}</li>
                </ul>
            </div>
        );
    }
}