
import React, { useRef } from 'react';
import SocketIOClient from 'socket.io-client'
import { useLocation } from 'react-router';

const Chatroom = (props) => {
    const { state } = useLocation();
    const { name, gender } = state;

    // const socket = React.useRef(SocketIOClient.connet("http://localhost:3010/socket"));
    const socket = React.useRef(SocketIOClient.connect("http://localhost:3010/socket"));


    console.log(socket);


    return (
        <div>
            asdd
        </div>
    );
}

export default Chatroom;
