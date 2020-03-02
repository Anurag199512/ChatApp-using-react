import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import {Chat} from './components/Chat';
import {Room} from './components/Room';


export default function app(){
    return(
        <div>
            <BrowserRouter>
                <Route path="/" component={Room} exact={true}/>
                <Route path="/chat" component={Chat} exact={true}/> 
            </BrowserRouter>        
        </div>);

}