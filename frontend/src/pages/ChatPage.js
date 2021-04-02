import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import io from "socket.io-client";
import axios from '../api'
import { ChatmsgList } from "../components/ChatmsgList";
import CLIMG from "../images/chevron-left.svg";
import SENDIMG from "../images/send.svg";
const ls = require("local-storage")

const ENDPOINT = 'http://localhost:3000';

let socket;

export const ChatPage = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  let query = new URLSearchParams(useLocation().search)
  let uid = query.get("id")
  function roomname(x, y) {
    if (x > y)
      return x + y
    else
      return y + x
  }
  useEffect(() => {

    let name = uid
    let room = roomname(uid, ls('user_id'))
    var connectionOptions = {
      "force new connection": true,
      "reconnectionAttempts": "Infinity",
      "timeout": 10000,
      "transports": ["websocket"]
    };

    socket = io.connect(ENDPOINT, connectionOptions);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
    return () => {
      console.log('closed')
      socket.removeAllListeners();
      socket.close();
    };
  }, []);

  useEffect(() => {
    console.log(messages)
  }, [messages])
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }
  var [usertwo, setUser_two] = useState([])
  var [loading, setloading] = useState(true);
  var [err, seterr] = useState(false);
  async function getUser(id) {
    //console.log(formData)
    setloading(true)
    seterr(false)
    try {
      let url = "/users/" + id
      const response = await axios.get(url);
      setloading(false)
      if (response.data) {
        console.log(response.data)
        return response.data
      }

    } catch (error) {
      seterr(error);
      // setloading(false)
    }
  }

  useEffect(() => {
    getUser(uid).then(data => {
      console.log(data)
      setUser_two(data[0])

    })
  }, [])

  return (
    <div className="bg-white col-md-4 m-auto m-0 p-0 " >
      <div className="main-chat-div" >
        <div className="nav-top-new" >
          <div className="d-flex flex-row mb-0 text-black us-none">
            <div className="pl-2 pt-3 pr-0">
              <img src={CLIMG} width="30px" />
            </div>
            <div className="p-2 pl-0">
              <img className="user-pic2" src={"https://picsum.photos/50?random="} />
            </div>
            <div className="p-2 ">
              <h5 className="mb-0" >{usertwo.name} </h5>
              <span className="text-muted" ><small> {usertwo.email} </small></span>
            </div>
          </div>
        </div>
        <div className="msg-list-box" >
          <ChatmsgList msg={messages} ></ChatmsgList>
        </div>


        <div className="nav-bottom-new" >
          <form className="form">
            <div className="container " >
            <div className="row" >
              <div className="col-10 " >
                <input
                  className="input form-control"
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={({ target: { value } }) => setMessage(value)}
                  onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                />
              </div>
              <div className="col-2 px-0" >
                <button className="btn btn-primary sendButton" onClick={e => sendMessage(e)}> <img src={SENDIMG} width="22px" /></button>
              </div>
            </div>
            </div>
          </form>
        </div>

      </div>
    </div>

  )
}
