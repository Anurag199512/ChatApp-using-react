import {Link} from 'react-router-dom';
import React, { useState } from 'react';

export function Room(){

    const [userName, setUserName] = useState('');
    const [room, setRoom] = useState('');

    return(
        <div className="row">
        <h4>Join with a username </h4>
            <form className="col s6" id="roomForm">
                <div className="row">
                    <div className="input-field col s6">
                        <input  placeholder="Username" id="userName" type="text" onChange={(event) => setUserName(event.target.value)} className="validate"/>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                    <input placeholder="Enter room id"  id="roomID" type="text" onChange={(event) => setRoom(event.target.value)} className="validate"/>
                    </div>
                </div><br/>

                <Link onClick={e => (!userName || !room) ? e.preventDefault() : null} to={`/chat?name=${userName}&room=${room}`}>
                    <button className="waves-effect waves-light btn">Create or join room</button>
                </Link>
            </form>
        </div>)
}
