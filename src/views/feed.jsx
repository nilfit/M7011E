import React from 'react';
import Post from '../components/post.jsx';

export default class Feed extends React.Component {
    render() {
        return (
            <div>
                <p>This is a feed</p>
                <Post name="birdboy94" audio="./marmot" img="./bird.png"/>
            </div>
        );
    }
}