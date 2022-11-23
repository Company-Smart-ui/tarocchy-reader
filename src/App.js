import logo from "./logo.svg";
import "./App.css";
import "./Styles/Styles.css";
import { useEffect } from "react";

import ReaderSingle from "./Screens/ReaderSingle";
import Readers from "./Screens/Readers";

import { events } from "./ServerCommunication";
import globalThis from "./Global";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//134.122.23.207:8020/chatapp_unsafe

//wss://do.tarocchy.com:8120
//ws://139.59.187.199:8020/chatapp_unsafe
globalThis.url = "wss://do.tarocchy.com:8120";
const imageServer = "ws://do.tarocchy.com:8020";

for (const event in events) {
    globalThis.events.registerEvent(events[event]);
}

function App() {
    useEffect(() => {
        // console.log('SOCKET CREATED!');
        let socket = new WebSocket(globalThis.url);
        socket.onopen = socketOnOpen;
        socket.onerror = socketOnError;
        socket.onclose = socketOnClose;
        socket.onmessage = socketOnMessage;
        globalThis.socket = socket;
        /* let imageSocket = new WebSocket(imageServer);
        imageSocket.onopen = socketOnOpen2;
        imageSocket.onerror = socketOnError2;
        imageSocket.onclose = socketOnClose2;
        imageSocket.onmessage = socketOnMessage2;
        globalThis.imageSocket = imageSocket;*/
    }, []);

    function socketOnClose() {
        globalThis.online = false;
        //  globalThis.events.triggerEvent(events.disconnected);
        setTimeout(() => {
            reconnect();
        }, 3000);
        console.log("Connection closed");
    }

    function socketOnError() {
        globalThis.socket.close();
        globalThis.online = false;
        console.log("WebSocket error");
    }

    function reconnect() {
        //   console.log('Attempting to reconnect...');
        let socket = new WebSocket(globalThis.url);
        socket.onopen = socketOnOpen;
        socket.onerror = socketOnError;
        socket.onclose = socketOnClose;
        socket.onmessage = socketOnMessage;
        globalThis.socket = socket;
    }

    function socketOnMessage(e) {
        //console.log("asdasd");
        // console.log(e.data.length);
        let data = JSON.parse(e.data);
        // console.log(data);
        for (const event in events) {
            if (data.event === events[event]) {
                globalThis.events.triggerEvent(events[event], data);
            }
        }
        /* if (data.event === events.downloadAgentProfilePictureResponse) {
            //console.log(data.agentPIN);
            var agentPIN = data.agentPIN;
            var imageBase64 = data.imageBase64;
            globalThis.events.triggerEvent(events.downloadAgentProfilePictureResponse, agentPIN, imageBase64);
        }*/
    }

    function socketOnOpen() {
        console.log("socket open");
        // toast.success("Connected to the chat server");
        //globalThis.events.triggerEvent(events.downloadAgentProfilePictureRequest);
        globalThis.events.triggerEvent(events.allAgentPINsRequest);
        //globalThis.events.triggerEvent(events.requestData);
        globalThis.online = true;
        keepConnection();
    }

    function keepConnection() {
        if (globalThis.online) {
            globalThis.socket.send(JSON.stringify({ events: "ping" }));
            setTimeout(() => {
                keepConnection();
            }, 50000);
        }
    }

    return (
        <div className="App">
            <Readers />
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable limit={3} />
        </div>
    );
}

export default App;
