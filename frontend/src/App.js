import React from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
import GetDateTime from './GetDateTime';

function App(){
    
    const [dateTimeString, setDateTimeString] = useState ("");
    const [username, setUsername] = useState ("");
    const [message, setMessage] = useState ("");

    const [messagesArray, setMessagesArray] = useState ([]);

    useEffect(function(){
        axios.get('http://localhost:5000/getmessages')
        .then(function(response){
            const messageDataObjectArray = JSON.parse(response.data);
            const formattedMessageData = messageDataObjectArray.map(message => ({
                datetime: message.datetime,
                username: message.username,
                message: message.message
            }));

            setMessagesArray(formattedMessageData);
            scrollToBottom();
        })
        .catch(function(error){
            toast.error("Can't reach server or can't connect to database. Contact devs.");
            toast.error("<ERROR> "+error);
            console.error(error);
        });
    }, []);

    const SetUsername = function(event){
        setUsername(event.target.value);
        setDateTimeString(GetDateTime());
    }
    const SetMessage = function(event){
        setMessage(event.target.value);
        setDateTimeString(GetDateTime());
    }


    const Submit = async function(){
        setDateTimeString(GetDateTime());
        let toSubmitData = {
            sdatetime: dateTimeString,
            susername: username,
            smessage: message
        };
        if(message.length > 0)
        {
            try{
                await axios.post('http://localhost:5000/submitmessage', toSubmitData);
                setMessagesArray([...messagesArray, {
                    datetime: dateTimeString,
                    username: username,
                    message: message
                }])
                scrollToBottom();
            } catch (error) {
                toast.error(error);
            }
        } else {
            toast.error('Type a message to submit.');
        }
    }

    const submitByEnter = function(event){
        if(event.key === "Enter"){
            event.preventDefault();
            Submit();
        }
    }
    const username_handleEnter = function(event){
        if(event.key === "Enter"){
            event.preventDefault();
        }
    }

    const scrollToBottom = function(){
        var div = document.getElementById('messageBodyDiv');
        div.scrollTop = div.scrollHeight;
    }

    return(
        <>
            <h1>School Online Freedom Wall</h1>
            <p>Say anything, don't name drop and don't use your real name here.</p>
            <hr></hr>
            <br/>
            <form>
                <label htmlFor="usernameInput">
                    Your in-chat name:
                </label>
                <br/>
                    <input
                        type="text"
                        id="usernameInput"
                        name="usernameInput"
                        placeholder="Username..."
                        autoComplete="off"
                        value={username}
                        onChange={SetUsername}
                        onKeyDown={username_handleEnter}
                    />
                <br/><br/>
                <label htmlFor="messageInput">
                    Type your message here:
                </label>
                    <br/>
                    <textarea 
                        className="messageInput"
                        id="messageInput"
                        name="messageInput"
                        placeholder="Type your message here..."
                        value={message}
                        onChange={SetMessage}
                        onKeyDown={submitByEnter}
                    />
            </form>
            <button type="submit" className="submitButton" onClick={Submit}>Submit your message</button>
            <br/><br/>
            <hr></hr>
            <h2>Stored Messages:</h2>
            <div className="messageBodyDiv" id='messageBodyDiv'>
                <ul>
                    {messagesArray.map((message, index) => (
                        <li key={index}>
                            &lt;{message.datetime}&gt;  {message.username}:  {message.message}
                        </li>
                    ))}
                </ul>
            </div>
            <br/>
            <br/>
            <small>&copy;2024 by Placeholder National High School's Student Council - IT Department<br/>Made with ReactJS<br/>Available at: localhost:3000 &#40;BETA&#41;</small>
            <br/><small className="smallmobiletext"></small>
            <ToastContainer/>
        </>
    );
}
export default App;