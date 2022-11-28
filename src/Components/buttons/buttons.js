import React from 'react';
import {userStatus} from "../../ServerCommunication";
import {IconChat, IconPhone} from "./icons";



export const Buttons = ({status ,phoneStatus , pi}) => {
    const PIN = pi

    function openChat(e) {
        e.stopPropagation();
        document.cookie = `pin=${PIN}`;
        window.location.href = `/chat?pin=${PIN}`;
    }
    function openCall(e) {
        e.stopPropagation();
        window.location.href = `/chat?redirect=call&pin=${PIN}`;
    }
    return  <div className="reader-button-container">

        {status === userStatus.online && (
            <button className="reader-button user-online" onClick={openChat}>
                CHAT NOW
            </button>
        )}
        {status === userStatus.offline && (
            <button className="reader-button user-offline reader-button-icon" onClick={openChat}>
               <IconChat/>
                OFFLINE
            </button>
        )}
        {status === userStatus.busy && (
            <button className="reader-button user-busy" onClick={openChat}>
                BUSY
            </button>
        )}
        {status === userStatus.away && (
            <button className="reader-button user-away" onClick={openChat}>
                AWAY
            </button>
        )}

        {phoneStatus === userStatus.online && (
            <button className="reader-button user-online" onClick={openCall}>
                CALL NOW
            </button>
        )}
        {phoneStatus === userStatus.offline && (
            <button className="reader-button user-offline reader-button-icon" onClick={openCall}>
              <IconPhone/>    OFFLINE
            </button>
        )}
        {phoneStatus === userStatus.busy && (
            <button className="reader-button user-busy" onClick={openCall}>
                BUSY
            </button>
        )}
        {phoneStatus === userStatus.away && (
            <button className="reader-button user-away" onClick={openCall}>
                AWAY
            </button>
        )}
        {phoneStatus === null && (
            <button className="reader-button user-offline reader-button-icon" onClick={openCall}>
                <IconPhone/> OFFLINE
            </button>
        )}
    </div>
};
 