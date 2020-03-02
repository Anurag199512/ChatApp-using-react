import React,{useState,useEffect} from 'react';
import io from 'socket.io-client';
import '../css/style.css'
import Messages from './Messages';

let socket;

export function Chat({location}){
    const [userName, setUserName] = useState('');
    const [room, setRoom] = useState('');
    const endPoint='http://localhost:5000';
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        const ob=new URLSearchParams(location.search);
        let userName=ob.get('name');
        let room=ob.get('room');
        setUserName(userName);
        setRoom(room);

        socket=io(endPoint);
          
        socket.emit("join",{name:userName,room},(error)=>{
            if(error)
                {
                    alert(error);
                    window.location.href='/';
                }
        })
                
        return () => {
            socket.emit('disconnect');
            socket.off();
          }

    },[endPoint,location.search]);

    useEffect(()=>{
        socket.on("greetMessage",(msg)=>{
            setMessages([...messages,msg]);

        })
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();
    
        if(message) {
          socket.emit('newMessage', message, () => setMessage(''));
        }
      }
    return(
        <div><h4>Room id :{room} <a href="/"><i className="small material-icons">close</i></a></h4> 
        <div className="row" id="chatRoom">
        
            <Messages messages={messages} name={userName}/>
            <form className="col s12">
               
                <div className="input-field col s8">
                <input value={message} placeholder="Type your message...."  id="msg" type="text" 
                onChange={(e) => setMessage(e.target.value)} 
                onKeyPress={(e) => e.key==='Enter'?sendMessage(e):null} />
                </div><br/>
                <button onClick={e => sendMessage(e)} className="waves-effect waves-light btn">
                    <i className="tiny material-icons">send</i>
                </button>
            </form>
        </div></div>)
};
