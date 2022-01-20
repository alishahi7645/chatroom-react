
import React, { useRef, useEffect } from 'react';
import SocketIOClient from 'socket.io-client'
import { useLocation } from 'react-router';
import './chatroom.css';
import { FaSeedling, FaPaperPlane, FaUser, FaUserCircle, FaUserClock,FaTrash  } from 'react-icons/fa';
import { useState } from 'react/cjs/react.development';

// const messages = [
//     {
//         id: "",
//         msg: "سلام خوب هستید ؟",
//         sender: {
//             name: "علی",
//             gender: 0,
//         },
//     },
//     {
//         id: "",
//         msg: "خیلی ممنون",
//         sender: {
//             name: "محمد",
//             gender: "0",
//         },
//     },
//     {
//         id: "",
//         msg: "خبببببببب",
//         sender: {
//             name: "علی",
//             gender: "0",
//         },
//     },
//     {
//         id: "",
//         msg: "چیکار داری ؟!",
//         sender: {
//             name: "علی",
//             gender: "0",
//         },
//     },
//     {
//         id: "",
//         msg: "فردا امتحان چی داریم ؟",
//         sender: {
//             name: "محمد",
//             gender: "0",
//         },
//     },
//     {
//         id: "",
//         msg: "امتحان کنسله",
//         sender: {
//             name: "زهرا",
//             gender: "1",
//         },
//     },
// ];
const Chatroom = (props) => {
    const { state } = useLocation();
    const { name, gender } = state;
    const [messages, setmessages] = useState([]);
    const socket = React.useRef(SocketIOClient.connect("http://localhost:3010/socket"));
    const [message, setmessage] = useState([]);
    let messageitem = 'message-item';
    let messagereverse = 'message-reverse';
    const scrollableGrid = useRef();

    useEffect(() => {
        socket.current.on("newMessage", (message) => {
            console.log(message);
            setmessages(messages => messages.concat(message));
            scrollableGrid.current.scroll(0, scrollableGrid.current.scrollHeight);
        })
        socket.current.on("deleteMsg", id => {
            setmessages(function (messages) {
              let findIndex = -1;
              messages.forEach((message, index) => {
                if (message.id == id) {
                  findIndex = index;
                }
              });
              return removeItemWithSlice(messages, findIndex);
            });
          })
    }, [])
    const removeItemWithSlice = (items, index) => {
        if (index === -1) return items;
        return [...items.slice(0, index), ...items.slice(index + 1)];
      };
    const messagechange = (e) => {
        setmessage(e.target.value);
    }
    const deletmessage =(id)=>{
        socket.current.emit("deleteMsg",id);
    }
    const sendmessage = () => {
        if (message == '') {
            return;
        } else {
            socket.current.emit("newMessage", {
                id: "",
                msg: message,
                sender: {
                    name: name,
                    gender: gender,
                },
            });

        }

    }
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            sendmessage()
        }
    }
    return (
        <div className='chatroom'>
            <div className='chatroom-section'>
                <div className='header'>
                    <h1>AzarChat</h1>
                    <p>{name} <FaUser /></p>
                </div>
                <div className='received-message' ref={scrollableGrid}>
                    {
                        messages.map((message) => {
                            return <div className={message.sender.name !== name ? messagereverse : messageitem}>
                                <div className='message-user'>
                                    <img title={message.sender.name}
                                        src={message.sender.gender == 0 ? "/images/male_user.png" : "/images/famale_user.png"}
                                        alt={message.sender.name} className='message-image' />
                                </div>
                                <p>{message.sender.name}</p>
                                <div className='messages'>
                                    <p className='message-paragraf'>{message.msg}</p>
                                    <div className='senddate'>
                                        <p className='date'>{message.date.split("T")[1].split(".")[0]}</p>
                                        {
                                            message.sender.name === name &&
                                            <p className='deletmessage' onClick={()=>deletmessage(message.id)}><FaTrash/></p>
                                        }
                                        
                                    </div>
                                </div>

                            </div>
                        }
                        )
                    }
                </div>
                <div className='submit-message'>
                    <input type="text" value={message} onChange={messagechange} onKeyDown={handleEnter} />
                    <button onClick={sendmessage}><FaPaperPlane /></button>
                </div>
            </div>
        </div>
    );
}

export default Chatroom;
