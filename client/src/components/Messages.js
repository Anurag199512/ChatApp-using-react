import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import '../css/messages.css';

const Messages = (props) => (
  <ScrollToBottom className="messages">
    {props.messages.map((message, i) => 
            {
                var display=(<div>
                    {
                        message.user===props.name?(<div><div key={i} id="textMsg"  className="sender">{message.text}</div></div>)
                        :(<div><div key={i} className="receiver" id="textMsg">{message.text}</div><div className="user">from {message.user}</div></div>)
                    }        
                    
                    </div>)
                return (<div key ={i}>{display}</div>)              
            }   
            
        )
    }
  </ScrollToBottom>
);

export default Messages;